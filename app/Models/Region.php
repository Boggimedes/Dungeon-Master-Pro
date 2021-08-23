<?php

namespace App\Models;

use \Illuminate\Database\Eloquent\Model;


class Region extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'racial_balance',
        'user_id',
        'prof_balance',
        'epoch',
    ];

    private $transients = 0;
    private $yearlyBirths = 0;
    private $mailOrderFathers = 0;
    private $mailOrderBrides = 0;
    private $yearlyDeaths = 0;
    private $funerals = 0;
    private $births = 0;
    private $weddings = 0;
    private $potentialBirthing = null;
    private $potentialParent = null;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'racial_balance' => 'array',
        'prof_balance' => 'array',
        'aspect_types' => 'array',
    ];

    public function world()
	{
		return $this->belongsTo(World::class);
	}
	public function npcs()
	{
		return $this->hasMany(Npc::class, 'region_id');
	}
    public function seed()
    {
        $this->npcs()->delete();
        foreach($this->racial_balance as $id => $balace){
            for ($i = 0; $i < $balace; $i++)
            {
                $this->generateNpc(['race_id' => $id]);
            } 
        }
    }
    public function stats()
    {
        $stats = [];
        foreach($this->world->races as $race) {
            $stats[$race->name] = [
                'race_id' => $race->id,
                'average_age%' => round(100*$this->npcs()->where('race_id',$race->id)->where('alive', 1)->avg('age')/$race->old_age),
                'children' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[0,$race->adulthood+1])->count(),
                'adults' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->adulthood,$race->middle_age+1])->count(),
                'middle_age' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->middle_age,$race->old_age+1])->count(),
                'old_age' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->where('age','>', $race->old_age)->count(),
                'immortal' => $this->npcs()->where('race_id',$race->id)->where('alive', '>',1)->where('age','>', $race->old_age)->count(),
                'living' => $this->npcs()->where('race_id',$race->id)->where('alive', '>',0)->count()
            ];
        }
        return collect($stats);
    }
    public function randomRace()
    {
        $balance = $this->racial_balance;
        $rand = mt_rand(1,100);
        $below = 0;
        foreach($balance as $race => $value) {
            $below += $value;
            if ($rand < $below) {
                return Race::find($race);
            }
        }
    }
    function ageRegion($years)
    {
        $start = microtime(true);
        $this->births = 0;
        $this->funerals = 0;
        $increment = 1;
        if ($years >= 25) $increment = 5;
        for($y=0;$y<$years;$y += $increment){
            $npcs = $this->npcs()->where([['excluded','!=', 1], ['alive', '>', 0]])->get();
            $this->births += $this->yearlyBirths;
            $this->funerals += $this->yearlyDeaths;
            $this->yearlyBirths = 0;
            $this->yearlyDeaths = 0;
            $this->epoch += $increment;
            if ($y % 5 === 0 || $y === 0) {
                $this->potentialBirthing = collect([]);
                $this->potentialParent = collect([]);
                foreach($npcs as $npc){
                    if($npc->gender == key($npc->race->genders[0]) &&
                        (!$npc->married || mt_rand(1,50) == 1)) $this->potentialBirthing->push($npc);
                    if(!$npc->married || mt_rand(1,20)==1) $this->potentialParent->push($npc);
                }
                    }
            foreach($npcs as &$npc) {
                $npc->alive = $this->deathCheck($npc, $increment);  
                if($npc->alive) {
                    $this->weddingBells($npc, $increment);  
                    $this->newChild($npc, $increment); 
                    if($npc->age > $npc->race->adulthood/2) $this->ratRace($npc, $increment);
                }
            }
            $this->npcs()->where([['alive',0], ['generation', '<', $this->npcs()->where('alive',0)->min('generation') - 6]])->delete();
        }

        $time_elapsed_secs = microtime(true) - $start;
        \Log::info(round($time_elapsed_secs/60,2) . " Min");

        $this->save();
        $this->stats()->each(function($stat, $key) {if($stat['living'] > 0) error_log("$key\n" . print_r($stat));});
        error_log("Population: " . $this->npcs()->where('alive','>',0)->count());
        error_log("Births: " . $this->births);
        error_log("Funerals: " . $this->funerals);
        error_log("Weddings: " . $this->weddings);
        error_log("Transients: " . $this->transients);
        error_log("Mail Order Fathers: " . $this->mailOrderFathers);
        error_log("Mail Order Brides: " . $this->mailOrderBrides);
        error_log("Population Balance: " . ($this->births+$this->mailOrderBrides+$this->mailOrderFathers+$this->transients-$this->funerals));
        }

    function generateNpc($npcData = [])
    {
        if (empty($npcData['race_id'])) {
            $race = $this->randomRace();
        } else {
            $race = Race::find($npcData['race_id']);
        }

        $npc = New Npc();
        if (empty($npcData['gender'])) {
            if (count($race->genders) == 1) {
                $npc->gender = key($race->genders[0]);
            } else {
                $npc->gender = key($race->genders[mt_rand(0, count($race->genders) - 1)]);
            }
        } else $npc->gender = $npcData['gender'];
        $aspects = $this->generateAspectSet($npc->gender);
        $npc->fill($aspects);
        $lineage = $aspects['Lineage'];
        if(strtolower(substr($lineage,0,8)) == 'immortal')
        {
            $npc->alive = 2;
        } else $npc->alive = 1;
        $npc->lineage = str_replace(['Immortal (',')'],['', ''], $lineage);
        $npc->race_id = $race->id;
        $npc->age = !empty($npcData['age']) ? $npcData['age'] : mt_rand($race->adulthood/2, $race->adulthood * 1.1);
        $npc->abilities = null;
        $npc->region_id = $this->id;
        $npc->generation = array_key_exists('generation', $npcData) ? $npcData['generation'] : 1;
        $npc->birth_year = $this->epoch - $npc->age;
        $npc->excluded      = 0;
        $npc->user_id      = $this->user->id;
        $npc->name = 'NPC';
        if (array_key_exists('Manner', $aspects)) $npc->mannerisms = $aspects['Manner'];
        if (array_key_exists('Quirk', $aspects)) $npc->quirks = $aspects['Quirk'];
        if (array_key_exists('Features', $aspects)) $npc->features = $aspects['Features'];
        if (array_key_exists('birthing_parent_id', $npcData)) $npc->birthing_parent_id = $npcData['birthing_parent_id'];
        if (array_key_exists('parent_id', $npcData)) $npc->parent_id = $npcData['parent_id'];
        $npc->save();

        if ($this->user->settings->preGenNames) {
            $npc->generateName();
        } else {
            $npc->name = 'NPC' . $npc->id;
        }

        return Npc::find($npc['id']);
    }
    function generateAspectSet($gender = null)
    {
        $aspects = [];
        foreach ($this->aspect_types as $aspectType) {
            if ($aspectType['name'] == 'Body Extra') {
                $bodyExtra = $aspectType['chance'];
            } elseif(substr($aspectType['name'],0,4) == "Body") {
                $body = $aspectType['chance'];
            } 

            $query = Descriptive::where([['type', $aspectType['name']], ['user_id',$this->user->id]])->where(function ($q)  use($gender){
                $q->where('gender', $gender)->orWhereNull('gender');
            });
            $aspects[$aspectType['name']] = ucfirst($this->aspectChance($aspectType['chance'], $query)['text']);
        }
        $body = $this->aspectChance($body, Descriptive::where([['type','like','Body%'], ['user_id',$this->user->id]]));
        if ($body['text']) {
            $aspects['Body'] = ucfirst($body['text']);
            $query = Descriptive::where([['type', str_replace(['Body (',')'],['', ' Extra'],$body['type'])], ['user_id',$this->user->id]])->where(function ($q)  use($gender){
                $q->where('gender', $gender)->orWhereNull('gender');
            });
            $aspects['Body Extra'] = ucfirst($this->aspectChance($bodyExtra, $query)['text']);
        }
        return $aspects;
    }
    private function aspectChance($chance, $query)
    {
        if (rand(1, 100) > $chance) return ['text' => ''];
        $value = $query->get();
        if(!$value->isEmpty()) return $value->random(1)[0];
        return ['text' => ''];
    }
    private function deathCheck($npc, $increment = 1)
    {
        // $deathChance = (log10((($npc->age - $npc->race->adulthood)/($npc->race->maxAge))*2 + 0.85) - sin((($npc->age - $npc->race->adulthood)/($npc->race->maxAge))*2+0.85)+0.87)/($npc->race->maxAge/71);
        $a=2.2765E-06;
        $b=-0.00040584;
        $c=0.022322;
        $d=-0.37058;
        $f=1.377;
        $x = ($npc->age*100)/$npc->race->max_age;
    
        $deathChance = max($a*pow($x,4) + $b*pow($x,3) + $c*pow($x,2) + $d*$x + $f,0.1)*10;
        $deathChance *= $increment;
        if ($npc->alive > 1) $deathChance = $deathChance / 50;
        if(mt_rand(1,1000) < $deathChance || ($npc->age >= $npc->race->max_age && $npc->alive < 2)) {
            $this->yearlyDeaths++;
            $npc->alive=0;
            $racialBalance = array_key_exists($npc->race->id, $this->racial_balance) ? $this->racial_balance[$npc->race->id] : 0;
            if($this->npcs()->where([['alive', '>', 0], ['race_id', $npc->race->id]])->count() < ($racialBalance + 1)) {
                $this->transients++;
                $this->generateNpc([
                    'age' => mt_rand($npc->race->adulthood,$npc->race->adulthood*2), 
                    'race_id' => $npc->race->id, 
                    'generation' => $npc->generation
                ]);
            }
            $randYear = mt_rand(0, $increment);
            $npc->notes .= "Died in ". ($this->epoch + $randYear) ." at ". ($npc->age + $randYear) ." years old \n";
            if (!empty($npc->spouse)) {
                $npc->spouse->notes .= "Spouse(".$npc->name.") died in ". ($this->epoch + $randYear) ."\n";
                $npc->spouse->married = 2;
                if($npc->spouse->gender == $npc->spouse->race->otherGender && $npc->spouse->age > $npc->race->middle_age && mt_rand(1,20) == 1) 
                    $npc->spouse->married = 0;
                if($npc->spouse->gender == $npc->spouse->race->otherGender && $npc->spouse->age < $npc->race->middle_age && mt_rand(1,10) <= 3) 
                    $npc->spouse->married = 0;
                if($npc->spouse->gender == $npc->spouse->race->birthGender &&  mt_rand(1,10) <= 3 && $npc->spouse->race->birthGender != $npc->spouse->race->otherGender) 
                    $npc->spouse->married = 0;
                }
                if(empty($npc->children)) return;
                if($npc->gender == $npc->race->birthGender) $parentGender = "Birthing Parent";
                    else $parentGender = "Parent";
                foreach($npc->children as $child){
                    if($child == "") continue;
                    $child->notes .= $parentGender." died in ". ($this->epoch + $randYear) ." when he/she was " . ($child->age + $randYear) . "\n";
                    $child->save();
                }
        } else {
            $npc->age += $increment; 
        }
        $npc->save();
        return $npc->alive;
    }
    private function ratRace($npc, $increment = 1)
    {
        $randYear = mt_rand(0, $increment);
        if($npc->profession){
            $maxAge = $npc->profession->max_age;
            if($maxAge == "none") $maxAge=9999;
            if($npc->age >= $maxAge){
                if(mt_rand(1,12) == 1) {
                    $npc->notes.="Retired at ".$npc->age.".\n";
                    $npc->retired = 1;
                }
            }
            return;
        }
        $getAJob = 10;
        if ($npc->age < $npc->race->adulthood) $getAJob = 30;
        $getAJob = max($getAJob / $increment, 2);
        if (mt_rand(1,$getAJob) == 1){
            $balanceTotal=0;
            $profList=[];
            foreach($this->prof_balance as $id => $value){
                $tmpValue = $value;
                if($npc->parent && $npc->parent->profession && $npc->parent->profession->id == $id ) $tmpValue *= 3;
                if($npc->birthingParent && $npc->birthingParent->profession && $npc->birthingParent->profession->id == $id ) $tmpValue *= 3;
                $balanceTotal += $tmpValue;
                $profList[$id] = $tmpValue;
            }
            $randResult = mt_rand(0, $balanceTotal);
            foreach($profList as $id => $value){
                $profession = Profession::find($id);
                $balanceTotal -= $value;
                $minAge = $profession->min_age;
                if($minAge == "none") $minAge=0;
                $maxAge = $profession->max_age;
                if($maxAge == "none") $maxAge=9999;

                if($randResult >= $balanceTotal && $npc->age >= $minAge && $npc->age < $maxAge){
                    $npc->notes.="Became a/an $profession->name at " . ($npc->age + $randYear) . "\n";
                    $npc->profession = $profession;
                    return;
                }
            }
        }
    }
    private function weddingBells($npc, $increment = 1)
    {
        $randYear = mt_rand(0, $increment);
            if($npc->married || ($npc->isBirthing() &&  mt_rand(1,20) > 1) || $npc->age < $npc->race->adulthood ) return;
            if(mt_rand(1,100/$increment) > (($npc->race->max_age - $npc->age) / max($npc->race->middle_age - $npc->age,1)/4)) return;
            $marryAge = $npc->race->adulthood - $npc->race->middle_age/12;

            $family = $npc->family;
            $racialBalance = 5;
            if (array_key_exists($npc->race->id, $this->racial_balance)) $racialBalance = $this->racial_balance[$npc->race->id];
            $spouseOptions=collect([]);

            foreach($this->potentialBirthing as $k){
                if(
                    $k->age > $npc->age+5 || 
                    $k->age < $marryAge ) continue;
                if(in_array($k->id,$family->toArray())) continue;
                if($k->race->id != $npc->race->id && mt_rand(1,20) > max(1,20 - $racialBalance)) continue;
                $spouseOptions->push($k);
            }
    
            if($spouseOptions->count() == 0) {
                $npcData = [
                    'age' => mt_rand($marryAge,$npc->age+5),
                    'race_id' => $npc->race->id,
                    'generation' => $npc->generation,
                ];
                $mailOrderBride = $this->generateNpc($npcData);
                $this->mailOrderBrides++;
                $newSpouse = $mailOrderBride;
           }
            
            if(!isset($mailOrderBride)) {
                $spouseOptionsArray = $spouseOptions->toArray();
                usort($spouseOptionsArray, function($a,$b){
                    $aR = mt_rand(1,$a['age']);
                    $bR = mt_rand(1,$b['age']);
                    if($aR<$bR) return -1;
                    if($aR>$bR) return 1;
                    if($aR==$bR) return $a['age'] - $b['age'];
                });
                $newSpouse = Npc::find($spouseOptionsArray[0]['id']);
            
                $this->potentialBirthing = $this->potentialBirthing->whereNotIn('id', [$newSpouse->id]);
            }
    
            $note = $newSpouse->notes . "Married at " . ($newSpouse->age + $randYear) . " years old to " . $npc->name ." (".($this->epoch + $randYear).")\n";
    
            $this->weddings++;
            $newSpouse->married = 1;
            $newSpouse->spouse_id = $npc->id;
            $newSpouse->notes =  $note;
            $newSpouse->save();
    
            $note = $npc->notes . "Married at " . ($npc->age + $randYear) . " years old to " . $newSpouse->name ." (".($this->epoch + $randYear).")\n";
    
            $npc->married = 1;
            $npc->spouse_id = $newSpouse->id;
            $npc->notes = $note;
            $npc->save();
    }
    private function newChild($npc, $increment = 1)
    {
        $randYear = mt_rand(0, $increment);
        if($npc->isBirthing() || $npc->age < $npc->race->adulthood || $npc->age > ($npc->race->old_age)) return;
        $racialBalance = array_key_exists($npc->race->id, $this->racial_balance) ? $this->racial_balance[$npc->race->id] : 5;
        if($npc->alive > 2 || ($npc->spouse && $npc->spouse->alive > 2)) {
            $birthRate = 3;
        } else {
            $birthRate = (2 + (200 / (($npc->race->middle_age*1.3)-$npc->race->adulthood))) - $npc->children->count();
            if($npc->married){$birthRate += 5;}
            $idealBirthAgeLow = $npc->race->adulthood+(($npc->race->middle_age - $npc->race->adulthood)*.25);
            $idealBirthAgeHigh = $npc->race->adulthood+(($npc->race->middle_age - $npc->race->adulthood)*.75);
            if($npc->age >= $idealBirthAgeLow && $npc->age <= $idealBirthAgeHigh){$birthRate = $birthRate*1.5;}
            $birthRate -= max($this->stats()[$npc->race->name]['living'] - ($racialBalance/2),-2)/($racialBalance/5);

            //(pow(1.038-($racialBalance/10000),$this->racialBalance[$npc->race->name])/($racialBalance*10));
            $birthRate = 1000*($birthRate/(($npc->race->middle_age*1.3)-$npc->race->adulthood - 15));    
        }
        $randResult = mt_rand(1,1000);
        $birthRate *= $increment;
        if($randResult > $birthRate) return;
        $this->yearlyBirths++;

        if($npc->married && mt_rand(1,100) > 3 && $npc->spouse) {
            $father = $npc->spouse;
        } else {
        
            $family = $npc->family;

            $fatherOptions = collect([]);
            foreach($this->potentialParent as $k) {
                if($k->age < $npc->race->adulthood ) continue;
                if(in_array($k->id,$family->toArray())) continue;
                if($k->race->id != $npc->race->id && mt_rand(1,20) > max(1,20-$racialBalance)) continue;
                $fatherOptions->push($k);
            }

            if($fatherOptions->count() == 0) {
                $npcData = [
                    'age' => mt_rand($npc->age,$npc->age*2),
                    'race_id' => $npc->race->id,
                    'gender' => $npc->race->otherGender,
                    'generation' => $npc->generation
                ];
                $mailOrderFather = $this->generateNpc($npcData);
                $father = $mailOrderFather;
                $this->mailOrderFathers++;
            }
            
            if(!isset($mailOrderFather)){
                $fatherOptionsArray = $fatherOptions->toArray();
                usort($fatherOptionsArray, function($a,$b){
                    $aR = mt_rand(1,2);
                    $bR = mt_rand(1,2);
                    if($aR<$bR) return -1;
                    if($aR>$bR) return 1;
                    if($aR==$bR) return $a['age'] - $b['age'];
                });
                $father = Npc::find($fatherOptionsArray[0]['id']);
                $this->potentialParent = $this->potentialParent->whereNotIn('id', [$father->id]);
            }
        }
        
        $childLineage = null;
        if(mt_rand(1,100) < 50) $childRace = $npc->race;
        else $childRace = $father->race;
        if($father->race->id == $npc->race->id) {$childRace = $npc->race;}
        else{

            if((strtolower($father->race->name) =='elf' && 
                        strtolower($npc->race->name) == 'human') || 
                (strtolower($father->race->name) == 'human' && 
                    strtolower($npc->race->name) == 'elf')) {
                $childRace = $this->world->races()->where('name', 'Half-Elf')->first();
            } elseif((strtolower($father->race->name) =='half-celestial' && 
                        strtolower($npc->race->name) != 'half-celestial') || 
                (strtolower($father->race->name) != 'half-celestial' && 
                    strtolower($npc->race->name) == 'half-celestial')){
                $childRace = $this->world->races()->where('name', 'Aasimar')->first();
                if(!$childRace) $childLineage = "Part-Celestial";
            } elseif((strtolower($father->race->name) =='half-celestial' && 
                        strtolower($npc->race->name) == 'half-celestial')){
                $childRace = $this->world->races()->where('name', 'Half-Celestial')->first();
                if(!$childRace) $childLineage = "Part-Celestial";
            } elseif((strtolower($father->race->name) =='half-infernal' && 
                        strtolower($npc->race->name) != 'half-infernal') || 
                (strtolower($father->race->name) != 'half-infernal' && 
                    strtolower($npc->race->name) == 'half-infernal')) {
                $childRace = $this->world->races()->where('name', 'Tiefling')->first();
                if(!$childRace) $childLineage = "Part-Infernal";
            } else {
                $halfRace = $this->world->races()->where('name', 'Half-' . $father->race->name)->first();
                if($halfRace) $childRace = $halfRace;
            }
        }

        if(strtolower($father->lineage) == "lycanthrope" && strtolower($npc->lineage) == "lycanthrope") {
            $childLineage = "Lycanthrope";
        } elseif(strtolower($father->lineage) == "lycanthrope"  || strtolower($npc->lineage) == "lycanthrope") {
            $childLineage = mt_rand(1,100) < 50? $childLineage = "Lycanthrope" : $childLineage = null;
        }

        if(strtolower($father->lineage) == "demon"  && strtolower($npc->lineage) == "demon") {
            $childLineage = "Demon";
        } elseif(strtolower($father->lineage) == "demon"  || strtolower($npc->lineage) == "demon") {
            $childRace = $this->world->races()->where('name', 'Tiefling')->first();
            if(!$childRace) $childLineage = "Half-Infernal";
        }

        if(strtolower($father->lineage) == "fiend"  && strtolower($npc->lineage) == "fiend") {
            $childLineage = "Fiend";
        } elseif(strtolower($father->lineage) == "fiend"  || strtolower($npc->lineage) == "fiend"){
            $childRace = $this->world->races()->where('name', 'Half-Infernal')->first();
            if(!$childRace) $childLineage = "Half-Infernal";
        }

        if(strtolower($father->lineage) == "angel"  && strtolower($npc->lineage) == "angel") {
            $childLineage = "Angel";
        } elseif(strtolower($father->lineage) == "angel"  || strtolower($npc->lineage) == "angel") {
            $childRace = $this->world->races()->where('name', 'Half-Celestial')->first();
            if(!$childRace) $childLineage = "Half-Celestial";
        }

        if(strtolower($father->lineage) == "demigod"  && strtolower($npc->lineage) == "demigod") {
            $childLineage = "Demigod";
        } elseif(strtolower($father->lineage) == "demigod"  || strtolower($npc->lineage) == "demigod") {
            $childLineage = mt_rand(1,100) < 50? $childLineage = "Demigod": $childLineage = null;
        }

        if(strtolower($father->lineage) == "deity"  && strtolower($npc->lineage) == "deity") {
            $childLineage = "Deity";
        } elseif(strtolower($father->lineage) == "deity"  || strtolower($npc->lineage) == "deity") {
            $childLineage = "Demigod";
        }
        $childrenPerBirth = 0;
        do{
            if (!$childrenPerBirth) $childrenPerBirth = 1;
            else $childrenPerBirth++;

            if (!$childRace) {
                if(mt_rand(1,100) < 50) $childRace = $npc->race;
                else $childRace = $father->race;
            }
            $npcData = [
                'age' => 0,
                'race_id' => $childRace->id,
                'generation' => $npc->generation+1,
                'lineage' => $childLineage,
                'parent_id' => $father->id,
                'birth_parent_id' => $npc->id
            ];
            $newNpc = $this->generateNpc($npcData);
            $this->yearlyBirths++;

            $npc->notes = $npc->notes . "Child(" . $newNpc->name . ") born in " . ($this->epoch + $randYear) . "-> Parent:" . $father->name . "\n";
            $npc->save();
            $note  = $father->notes . "Child(" . $newNpc->name . ") born in " . ($this->epoch + $randYear) . "-> Birth-Parent:" . $npc->name . "\n";
            $father->notes =  $note;
            $father->save();
        
        } while(mt_rand(0,100)<(1 * $increment));
        if ($childrenPerBirth == 2) \Log::info("Twins!");
        if ($childrenPerBirth == 3) \Log::info("Triplets!");
        if ($childrenPerBirth == 4) \Log::info("... something is off.");
    }
    public function clear()
    {
        $this->npcs->delete();
    }
}
