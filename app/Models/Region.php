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
        'world_id',
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
    private $profBalance = [];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['world'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'racial_balance' => 'array',
        'prof_balance' => 'array',
        'feature_types' => 'array',
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
        if (empty($this->racial_balance)) {
            $racial_balance = [];
            $this->world->races->each(function ($r) use(&$racial_balance){
                $racial_balance[] = ['name' => $r->name, 'id' => $r->id, 'value' => 10];
            });
            $this->racial_balance = $racial_balance;
        }
        foreach($this->racial_balance as $race){
            for ($i = 0; $i < $race->value; $i++)
            {
                $this->generateNpc(['race_id' => $race->id]);
            }
        }
    }
    public function getRacialBalanceObjectAttribute() {
        $value = $this->racial_balance;
        if (empty($value)) return [];
        if (is_string($value)) $value = json_decode($value);
        $value = collect($value);
        $value = $value->keyBy('id');
        return $value;
    }
    public function getRacialBalanceAttribute($value) {
        if (empty($value)) return [];
        if (is_array($value)) return $value;
        return json_decode($value);
    }
    public function getProfBalanceAttribute($value) {
        if (empty($value)) return [];
        if (is_array($value)) return $value;
        return json_decode($value);
    }
    public function getStatsAttribute()
    {
        $stats = [];
        foreach($this->world->races as $race) {
            $stats[] = [
                'name' => $race->name,
                'average_age%' => round(100*$this->npcs()->where('race_id',$race->id)->where('alive', 1)->avg('age')/$race->old_age),
                'children' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[0,$race->adulthood])->count(),
                'adults' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->adulthood+1,$race->middle_age])->count(),
                'middle_age' => $this->npcs()->where('race_id',$race->id)->where('alive', 1)->whereBetween('age',[$race->middle_age+1,$race->old_age1])->count(),
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
        foreach($balance as $race) {
            $below += $race['value'];
            if ($rand < $below) {
                return Race::find($race['id']);
            }
        }
    }
    function age($years)
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
                    if($npc->gender == $npc->race->genders[0] &&
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
        }

    function generateNpc($npcData = [])
    {
        if (empty($npcData['race_id'])) {
            $race = $this->randomRace();
        } else {
            $race = Race::find($npcData['race_id']);
        }
        \Log::info($race);
        $npc = New Npc();
        if (empty($npcData['gender'])) {
            if (count($race->genders) == 1) {
                $npc->gender = $race->genders[0][0];
            } else {
                $npc->gender = $race->genders[mt_rand(0, count($race->genders) - 1)][0];
            }
        } else $npc->gender = $npcData['gender'];
        $features = $this->generateFeatures($npc->gender, $race);
        if (!empty($npcData['lineage'])) $features['lineage']['text'] = $npcData['lineage'];
        $npc->features = $features;
        $lineage = $features['lineage'];
        if(strtolower(substr($lineage['text'],0,8)) == 'immortal')
        {
            $npc->alive = 2;
        } else $npc->alive = 1;
        // $npc->lineage = str_replace(['Immortal (',')'],['', ''], $lineage);
        $npc->race_id = $race->id;
        $npc->age = !empty($npcData['age']) ? $npcData['age'] : mt_rand($race->adulthood/2, $race->adulthood * 1.1);
        $npc->abilities = null;
        $npc->region_id = $this->id;
        $npc->generation = array_key_exists('generation', $npcData) ? $npcData['generation'] : 1;
        $npc->birth_year = $this->epoch - $npc->age;
        $npc->excluded      = 0;
        $npc->user_id      = $this->world->user->id;
        $npc->name = 'NPC';

        if (array_key_exists('birthing_parent_id', $npcData)) $npc->birthing_parent_id = $npcData['birthing_parent_id'];
        if (array_key_exists('parent_id', $npcData)) $npc->parent_id = $npcData['parent_id'];
        $npc->save();

        if ($this->world->user->settings->preGenNames) {
            $npc->generateName();
        } else {
            $npc->name = 'NPC' . $npc->id;
        }

        return Npc::find($npc['id']);
    }
    function generateFeatures($gender = null, $race = null)
    {
        $features = [
            ["name" => "special", "chance" => 5],
            ["name" => "face shape", "chance" => 40],
            ["name" => "skin complexion", "chance" => 30],
            ["name" => "skin color", "chance" => 40],
            ["name" => "hair color", "chance" => 100],
            ["name" => "hair description", "chance" => 50],
            ["name" => "eye description", "chance" => 30],
            ["name" => "eye color", "chance" => 100],
            ["name" => "body", "chance" => 50],
            ["name" => "clothing", "chance" => 15],
            ["name" => "body extra", "chance" => 20],
            ["name" => "quirk", "chance" => 40],
            ["name" => "manner", "chance" => 100],
            ["name" => "lineage", "chance" => 2]
        ];

        if (empty($this->feature_types)) $this->feature_types = $features;
        $features = [];
        foreach ($this->feature_types as $featureType) {
            if ($featureType['name'] == 'body extra') {
                $bodyExtra = $featureType['chance'];
            } elseif(substr($featureType['name'],0,4) == "body") {
                $body = $featureType['chance'];
            } 

            $query = Descriptive::where([['type', $featureType['name']]]);
            
            if ($gender != null) {
                $query = $query->where(function ($q)  use($gender){
                    $q->where('gender', $gender)->orWhereNull('gender');
                });
            }
            if ($race != null) {
                $query = $query->where(function ($q)  use($race){
                    $q->where('race_id', $race->id)->orWhereNull('race_id');
                });
            }
            if (substr($featureType['name'], 0, 7) == 'lineage') $featureType['name'] = 'lineage';
            $features[$featureType['name']] = ['name' => $featureType['name'], 'text' => ucfirst($this->featureChance($featureType['chance'], $query)['text'])];
        }
        $body = $this->featureChance($body, Descriptive::where([['type','like','body%'], ['world_id',$this->world->id]]));
        if ($body['text']) {
            $features['body'] = ['name' => 'body', 'text' => ucfirst($body['text'])];
            $query = Descriptive::where([['type', str_replace(['body (',')'],['', ' extra'],$body['type'])], ['world_id',$this->world->id]]);
            if ($gender != null) {
                $query = $query->where(function ($q)  use($gender){
                    $q->where('gender', $gender)->orWhereNull('gender');
                });
            }
            if ($race != null) {
                $query = $query->where(function ($q)  use($race){
                    $q->where('race_id', $race->id)->orWhereNull('race_id');
                });
            }
            
            $features['body extra'] = ['name' => 'body extra', 'text' => ucfirst($this->featureChance($bodyExtra, $query)['text'])];
        }

        return $features;
    }
    private function featureChance($chance, $query)
    {
        if (rand(1, 1000) > ($chance*10)) return ['text' => ''];
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
            $racialBalance = $this->racialBalanceObject->has($npc->race->id) ? $this->racialBalanceObject[$npc->race->id]->value : 0;
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
            if (empty($this->profBalance)) 
            {
                $prof_balance = [];
                $this->world->professions->each(function ($p) use(&$prof_balance){
                    $prof_balance[] = ['name' => $p->name, 'id' => $p->id, 'value' => 10];
                });
                $this->profBalance = $prof_balance;
            }
            $profList=[];
            foreach($this->profBalance as $prof){
                $tmpValue = $prof['value'];
                if($npc->parent && $npc->parent->profession && $npc->parent->profession->id == $prof['id'] ) $tmpValue *= 3;
                if($npc->birthingParent && $npc->birthingParent->profession && $npc->birthingParent->profession->id == $prof->id ) $tmpValue *= 3;
                $balanceTotal += $tmpValue;
                $profList[$prof['id']] = $tmpValue;
            }
            $randResult = mt_rand(0, $balanceTotal);
            foreach($profList as $id => $value){
                $profession = Profession::find($id);
                $balanceTotal -= $value;
                $minAge = $profession->min_age;
                $maxAge = $profession->max_age;
                if($randResult >= $balanceTotal && ($minAge == 'none' || $npc->age >= $npc->race->$minAge) && ($maxAge == 'none' || $npc->age < $npc->race->$maxAge)){
                    $npc->notes.="Became a/an $profession->name at " . ($npc->age + $randYear) . "\n";
                    $npc->profession_id = $profession->id;
                    $npc->save();
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
            if ($this->racialBalanceObject->has($npc->race->id)) $racialBalance = $this->racialBalanceObject[$npc->race->id]->value;
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
        $racialBalance = $this->racialBalanceObject->has($npc->race->id) ? $this->racialBalanceObject[$npc->race->id]->value : 5;
        if($npc->alive > 2 || ($npc->spouse && $npc->spouse->alive > 2)) {
            $birthRate = 1;
        } else {
            $birthRate = (2 + (200 / (($npc->race->middle_age*1.3)-$npc->race->adulthood))) - $npc->children->count();
            if($npc->married){$birthRate += 5;}
            $idealBirthAgeLow = $npc->race->adulthood+(($npc->race->middle_age - $npc->race->adulthood)*.25);
            $idealBirthAgeHigh = $npc->race->adulthood+(($npc->race->middle_age - $npc->race->adulthood)*.75);
            if($npc->age >= $idealBirthAgeLow && $npc->age <= $idealBirthAgeHigh){$birthRate = $birthRate*1.5;}
            $living = $this->npcs()->where('race_id',$npc->race->id)->where('alive', '>',0)->count();
            $birthRate -= max($living - ($racialBalance/2),-2)/($racialBalance/5);

            //(pow(1.038-($racialBalance/10000),$this->racialBalance[$npc->race->name])/($racialBalance*10));
            $birthRate = 1000*($birthRate/(($npc->race->middle_age*1.3)-$npc->race->adulthood - 15));    
        }
        $randResult = mt_rand(1,1000);
        $birthRate *= $increment;
        if($randResult > $birthRate) return;
        $this->yearlyBirths++;

        if($npc->married && mt_rand(1,100) > 1 && $npc->spouse) {
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
        $possibleRaces = [$npc->race->id, $father->race->id];
        $parentRaces = [strtolower($npc->race->name), strtolower($father->race->name)];
        $parentLineage = [strtolower($npc->lineageName), strtolower($father->lineageName)];

        if($father->race->id !== $npc->race->id) {
            $half = $this->world->races()->where('name','LIKE','half%' . $npc->race->name)->first();
            if ($half) $possibleRaces[] = $half->id;
            $half = $this->world->races()->where('name','LIKE','half%' . $father->race->name)->first();
            if ($half) $possibleRaces[] = $half->id;
            if (array_search('celestial',array_map('strtolower',$parentRaces)) || 
                array_search('angel',array_map('strtolower',$parentRaces)) ||
                strpos(' ' . $parentLineage[0],'angel') > 0 || strpos(' ' . $parentLineage[1],'angel')
                ) {
                $childLineage = 'Half-Celestial';
            }
            if (array_search('fiend',array_map('strtolower',$parentRaces)) || 
                array_search('demon',array_map('strtolower',$parentRaces)) || 
                array_search('devil',array_map('strtolower',$parentRaces)) ||
                strpos(' ' . $parentLineage[0],'demon') > 0 || strpos(' ' . $parentLineage[1],'demon') ||
                strpos(' ' . $parentLineage[0],'devil') > 0 || strpos(' ' . $parentLineage[1],'devil')
                ) {
                $childLineage = 'Half-Fiend';
            }
        }

        if (strpos(' ' . $parentRaces[0],'celestial') > 0 || strpos(' ' . $parentRaces[1],'celestial') ||
            strpos(' ' . $parentRaces[0],'angel') > 0 || strpos(' ' . $parentRaces[1],'angel') ||
            strpos(' ' . $parentLineage[0],'celestial') > 0 || strpos(' ' . $parentLineage[1],'celestial')
        ) {
            $celestial = $this->world->races()->where('name','aasimar')->first();
            if ($celestial) $possibleRaces[] = $celestial->id;
            if (!$childLineage) $childLineage = 'Celestial';
        }

        if (strpos(' ' . $parentRaces[0],'fiend') > 0 || strpos(' ' . $parentRaces[1],'fiend') ||
            strpos(' ' . $parentRaces[0],'devil') > 0 || strpos(' ' . $parentRaces[1],'devil') ||
            strpos(' ' . $parentRaces[0],'demon') > 0 || strpos(' ' . $parentRaces[1],'demon') ||
            strpos(' ' . $parentLineage[0],'fiend') > 0 || strpos(' ' . $parentLineage[1],'fiend')
        ) {
            $fiend = $this->world->races()->where('name','tiefling')->first();
            if ($fiend) $possibleRaces[] = $fiend->id;
            if (!$childLineage) $childLineage = 'Fiend';
        }

        if(strtolower($father->lineageName) == "lycanthrope" && strtolower($npc->lineageName) == "lycanthrope") {
            $childLineage = "lycanthrope";
        } elseif(strtolower($father->lineageName) == "lycanthrope"  || strtolower($npc->lineageName) == "lycanthrope") {
            $childLineage = mt_rand(1,100) < 50 ? $childLineage = "lycanthrope" : '';
        }

        if(strtolower($father->lineageName) == "demigod"  && strtolower($npc->lineageName) == "demigod") {
            $childLineage = "Demigod";
        } elseif(strtolower($father->lineageName) == "demigod"  || strtolower($npc->lineageName) == "demigod") {
            $childLineage = mt_rand(1,100) < 50? $childLineage = "Demigod": '';
        }

        if(strtolower($father->lineageName) == "deity"  && strtolower($npc->lineageName) == "deity") {
            $childLineage = "Deity";
        } elseif(strtolower($father->lineageName) == "deity"  || strtolower($npc->lineageName) == "deity") {
            $childLineage = "Demigod";
        }
        $possibleRaces = collect($possibleRaces);
        $childrenPerBirth = 0;
        do{
            if (!$childrenPerBirth) $childrenPerBirth = 1;
            else $childrenPerBirth++;

            $npcData = [
                'age' => 0,
                'race_id' => $possibleRaces->random(),
                'generation' => $npc->generation+1,
                'lineage' => $childLineage,
                'parent_id' => $father->id,
                'birth_parent_id' => $npc->id
            ];
            $descriptive = $this->world->descriptives()->where('text', $childLineage)->first();
            if (!empty($descriptive) && $descriptive->alive) $npcData['alive'] = $descriptive->alive;
            if (!empty($descriptive) && $descriptive->abilities) $npcData['abilities'] = $descriptive->abilities;
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
        Npc::where('region_id', $this->id)->where('excluded',0)->delete();
    }

    function array_equal($a, $b) {
        return (
             is_array($a) 
             && is_array($b) 
             && count($a) == count($b) 
             && array_diff($a, $b) === array_diff($b, $a)
        );
    }
}
