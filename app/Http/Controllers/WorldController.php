<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorldController extends Controller
{
    function getNames(){
    
        $query  = "SELECT * FROM names WHERE account = $this->account ";

        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_object()){
                            $names[] = $row;
                        }
                        $result->close();
                    }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        $this->citizenNames = $names;
        return $names;
        }
    function getDescriptives($data){
        $whereStr = null;
        $where = null;
            if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
            $descriptives=[];
            if($where){
                $whereStr='';
                foreach($where as $key=>$value){
                    $whereStr.="and `$key` = '$value' ";
                }
            }
            //$this->getRegion($this->region);
            $query  = "SELECT * FROM descriptives WHERE account = $this->account $whereStr";

            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_assoc()){
                                $descriptives[] = $row;
                            }
                            $result->close();
            //if(count($descriptives)==1) $descriptives = effects[0];
                        }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 
            //
            return $descriptives;
        }
    function getProfessions($data){
        $whereStr = null;
        $where = null;
            if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
            $profession=[];
            if($where){
                $whereStr='';
                foreach($where as $key=>$value){
                    $whereStr.="and `$key` = '$value' ";
                }
            }
            //$this->getRegion($this->region);
            $query  = "SELECT * FROM profession WHERE account = $this->account $whereStr";

            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_assoc()){
                                $profession[] = $row;
                            }
                            $result->close();
            //if(count($profession)==1) $profession = effects[0];
                        }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 
            //
            return $profession;
        }



    function upsertRecord($data,$table){
            $query = "REPLACE INTO $table SET ";
            foreach($data as $key=>$value){
                if(is_numeric($value)) $query .= $key." = ".$value.",";
                    else $query .= $key." = '".$value."',";
            }
            $query = rtrim($query, ',');
            $this->mysqli = $this->checkCon($this->mysqli);
            if ($result = $this->mysqli->query($query)) {
                    /* store first result set */
                    return $this->mysqli->insert_id;
                        $result->close();
            }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 

        }
    function getCitizenDetails($data = null){
        $whereStr = null;
        $where = null;
            if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
            $this->citizens=[];
            if($where){
                $whereStr='';
                foreach($where as $key=>$value){
                    $whereStr.="and `$key` = '$value' ";
                }
            }
            $this->getRegion($this->region);
            $query  = "SELECT * FROM citizen WHERE region = {$this->region->id} AND account = $this->account $whereStr";

            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_object()){
                                $row->features = json_decode($row->features);
                                $this->citizen = $row;
                            }
                            $result->close();
                        }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 

            //$this->citizen->features = json_decode($this->citizen->features);
            if($this->citizen->race && array_key_exists($this->citizen->race, $this->races)) $this->citizen->race 		= $this->races[$this->citizen->race];
            $this->citizen->children = explode(",",$this->citizen->children);
            return $this->citizen;
        }

    function getCitizens($data = null){
        $whereStr = null;
        $where = null;
            if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'];
            $this->citizens=[];
            if($where){
                $whereStr='';
                foreach($where as $key=>$value){
                    $whereStr.="and `$key` = '$value' ";
                }
            }
            $this->getRegion($this->region);
            $query  = "SELECT * FROM citizen WHERE region = {$this->region->id} AND account = $this->account $whereStr";

            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_object()){
                                $this->citizens[$row->id] = $row;
                            }
                            $result->close();
                        }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 

            foreach($this->citizens as &$citizen){
            $citizen->features = json_decode($citizen->features);
            if($citizen->spouse && array_key_exists($citizen->spouse, $this->citizens)) $citizen->spouse 	=&$this->citizens[$citizen->spouse];
            if($citizen->race && array_key_exists($citizen->race, $this->races)) $citizen->race 		= $this->races[$citizen->race];
            $citizen->children = explode(",",$citizen->children);
            if($citizen->alive == 1 && $citizen->age < $citizen->race->oldAge){
                if(array_key_exists($citizen->race->name, $this->racialBalance)) $this->racialBalance[$citizen->race->name]++;
                    else $this->racialBalance[$citizen->race->name]=1;
                }

            }
        }

    function getCitizensArray($data){
            $whereStr = null;
            $where = null;
            if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
            $this->citizens=[];
            if($where){
                $whereStr='';
                foreach($where as $key=>$value){
            if($value === 0 || $value === 1) $whereStr.="and `$key` = $value ";
                else $whereStr.="and `$key` = '$value' ";
                }
            }
            $this->getRegion($this->region);
            $query  = "SELECT firstName, lastName, gender, age, alive, race, profession, lineage, excluded, metParty, residentCity, id FROM citizen WHERE region = {$this->region->id} AND account = $this->account $whereStr";

            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_assoc()){
                                $this->citizens[] = $row;
                            }
                            $result->close();
                        }
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 
            //
            // print_r($this->citizens);

            foreach($this->citizens as &$citizen){

            if($citizen['race'] && array_key_exists($citizen['race'], $this->races)){
                $race = $this->races[$citizen['race']];
                $citizen['race'] = $race->name;
            } 
            if($citizen['age']<$race->adulthood) $citizen['ageGroup'] = "Youth";
            if($citizen['age']>=$race->adulthood && $citizen['age']<$race->middleAge) $citizen['ageGroup'] = "Adult";
            if($citizen['age']>=$race->middleAge && $citizen['age']<$race->oldAge) $citizen['ageGroup'] = "MiddleAged";
            if($citizen['age']>=$race->oldAge) $citizen['ageGroup'] = "Old";




            }
        }

    function seedRegion(){
            $this->getRegion($this->region);
            $racialBalance = $this->region->racialBalance;
            //print_r($racialBalance);
            $query = [];
            foreach($racialBalance as $key=>$entry){
                for ($i = 0; $i < $entry->value; $i++) {
                    $gender = ($i % 2 == 0) ? 'male':'female';
                    $aspects = $this->getAspects(strtoupper(substr($gender, 0, 1)));
                    $mannerisms  = $this->mysqli->real_escape_string($aspects['Manner']);
                    $lineage     = $this->mysqli->real_escape_string($aspects['Lineage']);
                    if(!strcasecmp($lineage, "demigod") || !strcasecmp($lineage, "fiend") || !strcasecmp($lineage, "demon") || !strcasecmp($lineage, "angel"))
                        $lineage = $lineage."', `immortal` = '1 ";
                    $quirks      = $this->mysqli->real_escape_string($aspects['Quirk']);
                    $features     = $this->mysqli->real_escape_string($aspects['features']);
                    $race = $key;
                    $raceName = $entry->race;
                    if($this->citizenNames == null) $this->getNames();
                    $nameList = array_filter($this->citizenNames, function($k) use($raceName, $gender){
                    if(strtoupper($k->gender) == strtoupper($gender) || strtoupper($k->gender) == strtoupper("unisex")) return true;
                    if(strtoupper($k->race) == strtoupper($raceName) || strtoupper($k->race) == strtoupper("generic")) return true;
                    return false;
                    });
                    $nameList = array_values($nameList);
                    $firstName = $nameList[mt_rand(0, count($nameList))-1]->name;
                    $lastName = '';
                    $age = mt_rand($this->races[$key]->adulthood, $this->races[$key]->oldAge);
                    $abilities = null;
                    $region = $this->region->id;
                    $profession = null;
                    $birthYear = $this->region->epoch - $age;

                    $query[]= "INSERT INTO citizen SET account = $this->account, firstName = '$firstName', lastName = '$lastName', race = '$race', age = '$age', gender = '$gender', mannerisms = '$mannerisms', lineage = '$lineage', quirks = '$quirks', abilities = '$abilities', features = '$features', region = '$region', generation = 1, profession = '$profession', birthYear = $birthYear";
                } 
            }


            if ($this->mysqli->multi_query(implode(';', $query))) {
                    $i = 0; 
                    do { 
                        $i++; 
                        $this->mysqli->next_result();
                    } while ($this->mysqli->more_results());
            }
            if ($this->mysqli->errno) { 
            echo "Batch execution prematurely ended on statement $i.\n"; 
            var_dump($this->mysqli->error); 
            } 


        $this->region->stats = [];
        $query = "SELECT ROUND(AVG(age)) as avgAge, count(firstName) as livingCount, race.name FROM citizen JOIN race on citizen.race = race.id where alive = 1 AND citizen.account = $this->account AND region = {$this->region->id} group by race";
            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_object()){
                    $this->region->stats[] = $row;
                    }
                    $result->close();
                }
        $this->region->stats = json_encode($this->region->stats);
        $this->region->racialBalance = json_encode($this->region->racialBalance);
        $this->region->profBalance = json_encode($this->region->profBalance);
        $this->upsertRecord($this->region,"region");
        return $this->region->stats;
            /* close connection */
            // 
        }
    function ageRegion($years){

        $this->getCitizens(array("where"=>array("excluded"=>0)));
        for($y=0;$y<$years;$y++){
            $this->yearlyBirths=0;
            $this->region->epoch++;
            // $this->wives = array_filter($this->citizens, function($k){
            // if($k->gender != 'female') return false;
            // if($k->alive != 1) return false;
            // if($k->married) return false;
            // if($k->married == null && mt_rand(1,50) > 1) return false;
            // return true;
            // });
            // $this->fathers = array_filter($this->citizens, function($k){
            // if($k->gender != 'male') return false;
            // if($k->alive != 1) return false;
            // if($k->married || mt_rand(1,20)==1) return false;
            // return true;
            // });

            $this->wives=[];
            $this->fathers=[];
                foreach($this->citizens as &$k){
                    // error_log(print_r($k,true));
                if($k->gender == 'female' &&
                    $k->alive == 1 &&
                    (!$k->married || $k->married == null || mt_rand(1,50) == 1)) $this->wives[$k->id]=&$k;
                if($k->gender == 'male' &&
                    $k->alive == 1 &&
                    ($k->married || mt_rand(1,20)==1)) $this->fathers[$k->id]=&$k;
                }

            foreach($this->citizens as &$currentCitizen){

            $spliceDead=[];
            if($currentCitizen->alive == 0) continue;
            //$currentCitizen = $this->deathCheck($currentCitizen);  
            $this->deathCheck($currentCitizen);  
            if($currentCitizen->alive){
                //$currentCitizen = $this->weddingBells($currentCitizen);  
                //$currentCitizen = $this->newChild($currentCitizen); 
                $this->weddingBells($currentCitizen);  
                $this->newChild($currentCitizen); 
                if($currentCitizen->alive && $currentCitizen->age>$currentCitizen->race->adulthood/2) $this->ratRace($currentCitizen);
            // }
            // else{spliceDead->push(i);}
            }
            // for(var i in spliceDead){citizens->splice(spliceDead[i],1);}
        }
        //$this->sqlArray[]  = "UPDATE citizen SET age = age + 1 WHERE alive = 1 AND account = $this->account AND region = {$this->region->id}";
        }
        $query  = "DELETE citizen FROM citizen JOIN (SELECT MAX(generation) as gen, race FROM gm_master_tools.citizen WHERE alive = 0 AND account = $this->account AND region = {$this->region->id} group by race) as gMin on citizen.race = gMin.race WHERE alive = 0 AND account = $this->account AND region = {$this->region->id} AND generation < gMin.gen-10";
        $this->mysqli->query($query);

        if ($this->mysqli->errno) { echo "Aging Region failed.\n"; }
        $this->sqlArray=[];
        foreach($this->citizens as $citizen){
            if(is_object($citizen->spouse)){
                $tmpSpouse = $citizen->spouse->id;
                unset($citizen->spouse);
                $citizen->spouse = $tmpSpouse;
            }
            $citizen->race = $citizen->race->id;
            $citizen->features = json_encode($citizen->features);
            $citizen->children = implode(",",$citizen->children);
            $query = "REPLACE INTO citizen SET ";
            foreach($citizen as $key=>$value){
                if($value === NULL ) $query = $query;
                    elseif(is_numeric($value) || $value == "NULL") $query .= $key." = ".$value.",";
                        else $query .= $key." = '".$this->mysqli->real_escape_string($value)."',";
            }
            $query = rtrim($query, ',');
            $this->sqlArray[]=$query;
        }
        $this->multiQuery($this->sqlArray);
        $this->region->stats = [];
        $query = "SELECT ROUND(AVG(age)) as avgAge, count(firstName) as livingCount, race.name FROM citizen JOIN race on citizen.race = race.id where alive = 1 AND citizen.account = $this->account AND citizen.immortal = 0 AND region = {$this->region->id} group by race";
            if ($result = $this->mysqli->query($query)) {
                while($row=$result->fetch_object()){
                    $this->region->stats[] = $row;
                    }
                    $result->close();
                }
        $return = json_encode($this->region);
        $this->region->stats = json_encode($this->region->stats);
        $this->region->racialBalance = json_encode($this->region->racialBalance);
        $this->region->profBalance = json_encode($this->region->profBalance);
        $this->upsertRecord($this->region,"region");
        
        return $return;
        }
    function getRegion($region){
        $query  = "SELECT * FROM region WHERE account = '{$this->account}' AND id = $region";
        if ($result = $this->mysqli->query($query)) {
            while ($row = $result->fetch_object ()) {$this->region = $row;}
            $result->close();
        }
        $this->region->racialBalance = json_decode($this->region->racialBalance);
        $this->region->profBalance = json_decode($this->region->profBalance);
        $this->region->stats = json_decode($this->region->stats);
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        }
    function clearRegion(){
        $region = $this->region;
        $query  = "DELETE FROM citizen WHERE account = '{$this->account}' AND region = $region AND (excluded = 0 OR excluded is null)";
        $result = $this->mysqli->query($query);
        $query  = "UPDATE region SET stats = '[]' WHERE account = '{$this->account}' AND id = $region";
        $result = $this->mysqli->query($query);
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        }
    function newCitizen($age, $race, $gender, $generation, $mother = null, $father = null, $lineage = null){

                $aspects = $this->getAspects(strtoupper(substr($gender, 0, 1)));
                $this->racialBalance[$race->name]++;
                if($this->citizenNames == null) $this->getNames();
                $nameList = array_filter($this->citizenNames, function($k) use($race, $gender){
                if(strtoupper($k->gender) == strtoupper($gender) || strtoupper($k->gender) == strtoupper("unisex")) return true;
                if(strtoupper($k->race) == strtoupper($race->name) || strtoupper($k->race) == strtoupper("generic")) return true;
                return false;
                });
                $nameList = array_values($nameList);
                $newCitizen = new stdClass;
                $newCitizen->immortal       = 0;
                $newCitizen->excluded       = 0;
                if($lineage == null){
                    $lineage = $aspects['Lineage'];
                    if(!strcasecmp($lineage, "demigod") || !strcasecmp($lineage, "fiend") || !strcasecmp($lineage, "demon") || !strcasecmp($lineage, "angel"))
                        $newCitizen->immortal       = 1;
                    }	

                $newCitizen->age				= $age;
                $newCitizen->gender				= $gender;
                $newCitizen->mannerisms			= $aspects['Manner'];
                $newCitizen->lineage			= $lineage;
                $newCitizen->quirks				= $aspects['Quirk'];
                $newCitizen->abilities			= null;
                $newCitizen->features			= $aspects['features'];
                $newCitizen->race				= $race->id;
                $newCitizen->firstName			= $nameList[mt_rand(0, count($nameList)-1)]->name;
                $newCitizen->lastName			= '';
                $newCitizen->alive				= 1;
                $newCitizen->region				= $this->region->id;
                $newCitizen->married			= 0;
                $newCitizen->mother				= $mother;
                $newCitizen->father				= $father;
                $newCitizen->generation			= $generation;
                $newCitizen->birthYear			= $this->region->epoch - $age;
                $newCitizen->account			= $this->account;
                $newCitizen->profession				= '';
                $newCitizen->notes				= '';
                $newCitizen->children  			= '';
                $newCitizen->spouse 			= '';


            $query = "INSERT INTO citizen SET ";
            foreach($newCitizen as $key=>$value){
                if(is_numeric($value)) $query .= $key." = ".$value.",";
                    else $query .= $key." = '".$this->mysqli->real_escape_string($value)."',";
            }
            $query = rtrim($query, ',');
            $this->mysqli = $this->checkCon($this->mysqli);
            $result = $this->mysqli->query($query);
            $newCitizen->id = intval($this->mysqli->insert_id);
            if ($this->mysqli->errno) { 
            echo "Mysqli failed.\n"; 
            var_dump($this->mysqli->error); 
            } 
            return $newCitizen;

        }
    function updateNPCRecord($recordType,$data){
        if($recordType == "citizen"){
            $data = $data['citizen'];
                unset($data['account']);

        $data['children'] = json_encode($data['children']);
        $data['features'] = json_encode($data['features']);
        $data['race'] = $data['race']['id'];
        $data['alive'] = $data['alive']?1:0;
        $data['married'] = $data['married']?1:0;
        $data['immortal'] = $data['immortal']?1:0;
        $data['excluded'] = $data['excluded']?1:0;
        }
        if($recordType == "region"){
            $data = $data['region'];
                unset($data['account']);
            $data['stats'] = json_encode($data['stats']);
            $data['racialBalance'] = json_encode($data['racialBalance']);
            $data['profBalance'] = json_encode($data['profBalance']);
        }
        $set = " account = $this->account";
        foreach($data as $key=>$value){
            if(is_numeric($value) || $value == "NULL") $set .= ", `$key` = $value";
                else $set .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
            }

        $query = "INSERT INTO $recordType SET $set ON DUPLICATE KEY UPDATE $set";
        $this->mysqli->query($query);
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        return $this->mysqli->insert_id;
        }
    function addNPCRecord($recordType, $data){
        $query = "INSERT INTO $recordType SET account = $this->account";
        foreach($data as $key=>$value){
            if(is_numeric($value)) $query .= ",".$key." = ".$value;
                else $query .= ', '.$key." = '".$this->mysqli->real_escape_string($value)."'";
            }
        $this->mysqli->query($query);
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        return "added";
        }
    function deleteNPCRecord($recordType, $id){
        $values = "'".implode("','",$id['value'])."'";
        $query = "DELETE FROM $recordType WHERE account = $this->account AND ".$id['field']." IN($values)";
        $this->mysqli->query($query);
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        return "Deleted record ".$values;
        }
    function getRegions($data){
        $whereStr = null;
        $where = null;
        if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
        $regions=[];
        if($where){
            $whereStr='';
            foreach($where as $key=>$value){
                $whereStr.="and `$key` = '$value' ";
            }
        }
        $query = "SELECT * FROM region WHERE account = $this->account ".$whereStr;
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $row['profBalance']=json_decode($row['profBalance']);
                $row['racialBalance']=json_decode($row['racialBalance']);
                $row['stats'] = json_decode($row['stats']);
                $regions[]=$row;
            }
            $result->close();
            //if(count($regions)==1) $regions = $regions[0];
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        //
        return $regions;
        }
}
