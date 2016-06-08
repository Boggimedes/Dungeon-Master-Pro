<?php

class citizenAPI {

   var $account;
   var $wives;
   var $fathers;
   var $citizens;
   var $races;
   var $sqlArray=[];
   var $totals = [];
   var $racialBalance=[];
   var $citizenNames;
   var $yearlyBirths;

function __construct($account, $param, $db) {
   		$this->account = $account;
		$this->mysqli = $db;
		$query  = "SELECT * FROM race WHERE account = '{$this->account}'";

		/* execute multi query */
		if ($result = $this->mysqli->query($query)) {
		        /* store first result set */
		            while ($row = $result->fetch_object ()) {
		            	// print_r($row);
		                $this->races[$row->id] = $row;
		                $this->races[$row->name] = $row;
	        			$this->racialBalance[$row->name] = 0;

		            }
		            $result->close();
		}
		$query  = "SELECT * FROM profession WHERE account = '{$this->account}'";

		/* execute multi query */
		if ($result = $this->mysqli->query($query)) {
		        /* store first result set */
		            while ($row = $result->fetch_object ()) {
		            	// print_r($row);
		                $this->professions[$row->id] = $row;
		                $this->professions[$row->name] = $row;
		            }
		            $result->close();
		}
		if($param == null) $param = [];
 		if(array_key_exists("region",$param)) $this->region = $param['region'];
 			else $this->region = 'default';
		if($this->region == 'default' || $this->region== null){
		$query  = "SELECT * FROM region WHERE account = '{$this->account}' LIMIT 1";

		if ($result = $this->mysqli->query($query)) {
		            while ($row = $result->fetch_array()) {
		                $this->region = $row['id'];
		            }
		            $result->close();
		}
		 }

		if ($this->mysqli->errno) { 
		echo "Mysqli failed.\n"; 
		var_dump($this->mysqli->error); 
		} 

	}

function getAspects($gender = null){
	$account = $this->account;
	$sql = "SELECT if((FLOOR(RAND()*100))<50,`text`,'') as `text`,`Extra`, 'Body Type' as `Name` FROM (SELECT d1.text ,if((FLOOR(RAND()*100))<20,d2.`text`,'') as `Extra` FROM gm_master_tools.descriptives d1 join gm_master_tools.descriptives d2 WHERE (d1.gender = '$gender' OR d1.gender is null) AND (d2.gender = '$gender' OR d2.gender is null) AND d1.account = '$account' AND d2.account = '$account' AND d1.`type` like 'Body%' AND d2.`type` = concat(REPLACE(REPLACE(d1.`type`,'Body (',''),')',''),' Extra') ORDER BY RAND() LIMIT 1) as Body

	UNION ALL SELECT if((FLOOR(RAND()*100))<5,`text`,'') as descript, '', 'Special' FROM (SELECT * FROM descriptives WHERE type = 'Special' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<40,`text`,'') as descript, '', 'Face Shape' FROM (SELECT * FROM descriptives WHERE type = 'Face Shape' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<30,`text`,'') as descript, '', 'Skin Complexion' FROM (SELECT * FROM descriptives WHERE type = 'Skin Complexion' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<40,`text`,'') as descript, '', 'Skin Color' FROM (SELECT * FROM descriptives WHERE type = 'Skin Color' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT `text` as descript, '', 'Hair Color' FROM (SELECT * FROM descriptives WHERE type = 'Hair Color' AND (gender LIKE '%' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<50,`text`,'') as descript, '', 'Hair Description' FROM (SELECT * FROM descriptives WHERE type = 'Hair Description' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<30,`text`,'') as descript, '', 'Eye Description' FROM (SELECT * FROM descriptives WHERE type = 'Eye Description' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT `text` as descript, '', 'Eye Color' FROM (SELECT * FROM descriptives WHERE type = 'Eye Color' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<15,`text`,'') as descript, '', 'Clothing' FROM (SELECT * FROM descriptives WHERE type = 'Clothing' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<40,`text`,'') as descript, '', 'Quirk' FROM (SELECT * FROM descriptives WHERE type = 'Quirk' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT `text` as descript, '', 'Manner' FROM (SELECT * FROM descriptives WHERE type = 'Manner' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special

	UNION ALL SELECT if((FLOOR(RAND()*100))<2,`text`,'') as descript, '', 'Lineage' FROM (SELECT * FROM descriptives WHERE type = 'Lineage' AND (gender LIKE '$gender' or gender is null) AND account = '$account' ORDER BY RAND() LIMIT 1) as Special";

	$aspects = [];
		if ($result = $this->mysqli->query($sql)) {
		        /* store first result set */
		            while ($row = $result->fetch_assoc ()) {
		                $aspects[$row['Name']] = $row['text'];
		                if($row['Extra']!="") $aspects[$row['Name']." Extra"] = $row['Extra'];
		            }
		            $result->close();
		}
		if ($this->mysqli->errno) { 
		echo "Batch execution prematurely ended on statement $i.\n"; 
		var_dump($this->mysqli->error); 
		} 
		$aspects['features'] = '{"Special": "'.str_replace('"', '\"', $aspects['Special']).'"';
		$aspects['features'] .= ', "Face Shape": "'.str_replace('"', '\"', $aspects['Face Shape']).'"';
		$aspects['features'] .= ', "Skin Complexion": "'.str_replace('"', '\"', $aspects['Skin Complexion']).'"';
		$aspects['features'] .= ', "Skin Color": "'.str_replace('"', '\"', $aspects['Skin Color']).'"';
		$aspects['features'] .= ', "Hair Description": "'.str_replace('"', '\"', $aspects['Hair Description']).'"';
		$aspects['features'] .= ', "Hair Color": "'.str_replace('"', '\"', $aspects['Hair Color']).'"';
		$aspects['features'] .= ', "Eye Description": "'.str_replace('"', '\"', $aspects['Eye Description']).'"';
		$aspects['features'] .= ', "Eye Color": "'.str_replace('"', '\"', $aspects['Eye Color']).'"';
		$aspects['features'] .= ', "Clothing": "'.str_replace('"', '\"', $aspects['Clothing']).'"';
		$aspects['features'] .= ', "Body Type": "'.str_replace('"', '\"', $aspects['Body Type']).'"';
		if(array_key_exists("Body Type Extra", $aspects)) $aspects['features'] .= ', "Body Type Extra": "'.str_replace('"', '\"', $aspects['Body Type Extra']).'"';
		$aspects['features'] .= '}';


		return $aspects;

}
   
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


private function checkCon($connection) {
    if (!$connection->ping()) {
        $connection->close();
        $connection = new mysqli($this->config['db_hostname'],$this->config['db_username'],$this->config['db_password'],'gm_master_tools' );
    } 
    return $connection;
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

private function deathCheck(&$currentCitizen)  {
	// $deathChance = (log10((($currentCitizen->age - $currentCitizen->race->adulthood)/($currentCitizen->race->maxAge))*2 + 0.85) - sin((($currentCitizen->age - $currentCitizen->race->adulthood)/($currentCitizen->race->maxAge))*2+0.85)+0.87)/($currentCitizen->race->maxAge/71);
$a=2.2765E-06;
$b=-0.00040584;
$c=0.022322;
$d=-0.37058;
$f=1.377;
$x = ($currentCitizen->age*100)/$currentCitizen->race->maxAge;

	$deathChance = max($a*pow($x,4) + $b*pow($x,3) + $c*pow($x,2) + $d*$x + $f,0.1)*10;
	//error_log("DR:".$deathChance);
	$preSQL = "UPDATE citizen SET";
	error_log($currentCitizen->age."|". $currentCitizen->race->maxAge);
	if((mt_rand(1,1000) < $deathChance || $currentCitizen->age >= $currentCitizen->race->maxAge) && $currentCitizen->immortal != 1){
	    $this->racialBalance[$currentCitizen->race->name]--;
        $racialBalance = null;
        foreach($this->region->racialBalance as $key=>$race){if($key == $currentCitizen->race->id) $racialBalance = $this->region->racialBalance->$key->value;}

        if($racialBalance != null && $racialBalance > $this->racialBalance[$currentCitizen->race->name]) {
        	//echo $racialBalance."|".$this->racialBalance[$currentCitizen->race->name];
        if(mt_rand(1,100) < 50) $transplantGender = "male";
            else $transplantGender = "female";
            $transplant = $this->newCitizen(mt_rand($currentCitizen->race->adulthood,$currentCitizen->race->adulthood*2), $currentCitizen->race, $transplantGender, $currentCitizen->generation);
            $transplant->race = $currentCitizen->race;
            $transplant->region = $currentCitizen->region;
            $transplant->children = explode(",",$transplant->children);
            $this->citizens[$transplant->id] = $transplant;
		    $this->racialBalance[$currentCitizen->race->name]++;
        }
   	    $currentCitizen->alive=0;
		$note = $currentCitizen->notes."Died in ".$this->region->epoch." at ".$currentCitizen->age." years old \n";
		//$this->sqlArray[]="$preSQL alive = 0, notes = '$note' WHERE id = $currentCitizen->id";
 		//echo $this->sqlArray[count($this->sqlArray)-1]."<br>";
		if(gettype($currentCitizen->spouse) == "object"){
			$note = $currentCitizen->spouse->notes."Spouse died in ".$this->region->epoch."\n";
			//$this->sqlArray[]="$preSQL married = null, notes = '$note' WHERE id = ".$currentCitizen->spouse->id;
 		//echo $this->sqlArray[count($this->sqlArray)-1]."<br>";
			if($currentCitizen->gender == 'male' && $currentCitizen->spouse->age > $currentCitizen->race->middleAge && mt_rand(1,20) == 1) 
				$currentCitizen->spouse->married = 0;
			if($currentCitizen->gender == 'male' && $currentCitizen->spouse->age < $currentCitizen->race->middleAge && mt_rand(1,10) <= 3) 
				$currentCitizen->spouse->married = 0;
			if($currentCitizen->gender == 'female' &&  mt_rand(1,10) <= 3) 
				$currentCitizen->spouse->married = 0;

			$currentCitizen->spouse->notes = $currentCitizen->spouse->notes."Spouse(".$currentCitizen->firstName.") died in ".$this->region->epoch."\n";

			// if($index =$this->object_search($currentCitizen->spouse->id,$this->citizens,"id")){
			// 	$this->citizens[$index]->married = null;
			// 	$this->citizens[$index]->notes = $this->citizens[$index]->notes."Spouse(".$currentCitizen->firstName.") died in ".$this->region->epoch."\n";
			// 	}
			}
		if(!is_array($currentCitizen->children)) return;// $currentCitizen;
		if($currentCitizen->gender == "male") $parentGender = "Father";
			else $parentGender = "mother";
		foreach($currentCitizen->children as $child){
			if($child == "") continue;
			$note = $parentGender." died in ".$this->region->epoch." when he/she was ";
			//$this->sqlArray[]="$preSQL notes = CONCAT(notes,'$note',age,'\n') WHERE id = $child";
 		//echo $this->sqlArray[count($this->sqlArray)-1]."<br>";

			// if($index =$this->object_search($child,$this->citizens,"id")){
			// 	$this->citizens[$index]->notes = $this->citizens[$index]->notes.$note;
			// 	}
			if(array_key_exists($child, $this->citizens)) $this->citizens[$child]->notes = $this->citizens[$child]->notes.$note.$this->citizens[$child]->age."\n";
			}
		} 
		else{
			$currentCitizen->age += 1; 
			if($currentCitizen->age >= $currentCitizen->race->oldAge && $currentCitizen->age-1 < $currentCitizen->race->oldAge) $this->racialBalance[$currentCitizen->race->name]--;
			// $this->sqlArray[]="$preSQL age = $currentCitizen->age WHERE id = $currentCitizen->id";
 		// echo $this->sqlArray[count($this->sqlArray)-1]."<br>";
			}
	//return $currentCitizen;
	}

 private function  multiQuery($queries){
 		if($queries == []) return;
		$this->mysqli = $this->checkCon($this->mysqli);
			    $i = 0; 
 		if ($this->mysqli->multi_query(implode(';', $queries))) {
			    while($this->mysqli->more_results()){ 
			        $i++; 
					$this->mysqli->next_result();
		        } 
		}
		if ($this->mysqli->errno) { 
		echo "Batch execution prematurely ended on statement $i.\n"; 
		error_log($queries[$i]);
		error_log($this->mysqli->error); 
		} 
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

private function ratRace(&$currentCitizen){

			if($currentCitizen->profession != ""){
				if(array_key_exists($currentCitizen->profession, $this->professions)){
				$maxAge = $this->professions[$currentCitizen->profession]->maxAge;
				if($maxAge == "none") $maxAge=9999;
					else $maxAge = $currentCitizen->race->$maxAge;
					if($currentCitizen->age >= $maxAge){
						if(mt_rand(1,12) == 1) {
							$currentCitizen->notes.="Retired at ".$currentCitizen->age.".\n";
							$currentCitizen->profession = "Retired ".$currentCitizen->profession;
						}
					}

				}
				return;
			}
			$getAJob = 10;
			if($currentCitizen->age < $currentCitizen->race->adulthood) $getAJob = 30;
			if(mt_rand(1,$getAJob)==1){
				$profBalance = $this->region->profBalance;
				$balanceTotal=0;
				$profList=[];
				if(!is_object($profBalance)) return;
				foreach($profBalance as $prof){
					$tmpValue = $prof->value;
						if(@$this->citizens[$currentCitizen->father]->profession == $prof->prof || @$this->citizens[$currentCitizen->father]->profession == "Retired ".$prof->prof ||
							@$this->citizens[$currentCitizen->mother]->profession == $prof->prof || @$this->citizens[$currentCitizen->mother]->profession == "Retired ".$prof->prof ) $tmpValue = $prof->value*3;
						$balanceTotal += $tmpValue;
						$profList[]=array($prof->prof,$tmpValue);
				}
				$randResult = mt_rand(0,$balanceTotal);
				foreach($profList as $prof){
					$balanceTotal -= $prof[1];
					$minAge = $this->professions[$prof[0]]->minAge;
					if($minAge == "none") $minAge=0;
						else $minAge = $currentCitizen->race->$minAge;
					$maxAge = $this->professions[$prof[0]]->maxAge;
					if($maxAge == "none") $maxAge=9999;
						else $maxAge = $currentCitizen->race->$maxAge;

					if($randResult>=$balanceTotal && $currentCitizen->age >= $minAge && $currentCitizen->age < $maxAge){
						$currentCitizen->notes.="Became a/an $prof[0] at ".$currentCitizen->age."\n";
						$currentCitizen->profession = $prof[0];
						return;
					}
				}
			}
}

private function weddingBells(&$currentCitizen)  {
        if($currentCitizen->married || ($currentCitizen->gender == "female" &&  mt_rand(1,20) > 1) || $currentCitizen->age < $currentCitizen->race->adulthood ) return $currentCitizen;
        if(mt_rand(1,100) > (($currentCitizen->race->maxAge-$currentCitizen->age)/max($currentCitizen->race->middleAge-$currentCitizen->age,1)/4)) return $currentCitizen;
        $marryAge = $currentCitizen->race->adulthood - $currentCitizen->race->middleAge/12;
        $preSQL = "UPDATE citizen SET";
        $family = implode(",",$currentCitizen->children);
        if($currentCitizen->father && array_key_exists($currentCitizen->father, $this->citizens)){
        	$father = $this->citizens[$currentCitizen->father];
        	$family .= ",".implode(",",$father->children);
		    $family .= ",".$father->id;
			}
        if($currentCitizen->mother && array_key_exists($currentCitizen->mother, $this->citizens)){
        	$mother = $this->citizens[$currentCitizen->mother];-
        	$family .= ",".implode(",",$mother->children);
		    $family .= ",".$mother->id;
			}
        $family = explode(",",$family);		
        // $spouseOptions = array_filter($this->wives, function($k) use($currentCitizen,$marryAge,$family){
        //     if($k->age > $currentCitizen->age+5 || $k->age < $marryAge ) return false;
        //     if(in_array($k->id,$family)) return false;
        //     if($k->race->id != $currentCitizen->race->id && mt_rand(1,20) > 1) return false;
        //     return true;
        // });
        $racialBalance = 5;
        foreach($this->region->racialBalance as $key=>$race){if($key == $currentCitizen->race->id) $racialBalance = $this->region->racialBalance->$key->value;}
        $spouseOptions=[];
        foreach($this->wives as &$k){
            if($k->age > $currentCitizen->age+5 || $k->age < $marryAge ) continue;
            if(in_array($k->id,$family)) continue;
            if($k->race->id != $currentCitizen->race->id && mt_rand(1,20) > max(1,20-$racialBalance)) continue;
            $spouseOptions[]=&$k;
        }

        if(count($spouseOptions) == 0) {
            $mailOrderBride = $this->newCitizen(mt_rand($marryAge,$currentCitizen->age+5), $currentCitizen->race, 'female', $currentCitizen->generation);
            $mailOrderBride->race = $currentCitizen->race;
            $mailOrderBride->region = $currentCitizen->region;
            $mailOrderBride->children = explode(",",$mailOrderBride->children);
            $this->citizens[$mailOrderBride->id] = $mailOrderBride;
            $newSpouse =&$this->citizens[$mailOrderBride->id];
       }
        
        if(!isset($mailOrderBride)){
        usort($spouseOptions, function($a,$b){
            $aR = mt_rand(1,$a->age);
            $bR = mt_rand(1,$b->age);
            if($aR<$bR) return -1;
            if($aR>$bR) return 1;
            if($aR==$bR) return $a->age-$b->age;
        });
        $newSpouse =&$spouseOptions[0];
        
			unset($this->wives[$newSpouse->id]);
        }

		$note = $newSpouse->notes . "Married at " . $newSpouse->age . " years old to " . $currentCitizen->firstName ." (".$this->region->epoch.")\n";

		$this->sqlArray[]="$preSQL notes = '$note', spouse = $currentCitizen->id, married = 1 WHERE id = $newSpouse->id";
			// if($index =$this->object_search($newSpouse->id,$this->citizens,"id")){
   //                  $this->citizens[$index]->married = 1;
   //                  $this->citizens[$index]->spouse = $currentCitizen;
   //                  $this->citizens[$index]->notes =  $note;
   //          }
		$newSpouse->married = 1;
		$newSpouse->spouse =&$currentCitizen;
		$newSpouse->notes =  $note;

		$note = $currentCitizen->notes . "Married at " . $currentCitizen->age . " years old to " . $newSpouse->firstName ." (".$this->region->epoch.")\n";

		$this->sqlArray[]="$preSQL notes = '$note', spouse = $newSpouse->id, married = 1 WHERE id = $currentCitizen->id";

            $currentCitizen->married = 1;
            $currentCitizen->spouse =&$newSpouse;
            $currentCitizen->notes = $note;
		//return $currentCitizen;
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

function prof_flag($str)
{
    global $prof_timing, $prof_names;
    $prof_timing[] = microtime(true);
    $prof_names[] = $str;
}

// Call this when you're done and want to see the results
function prof_print()
{
    global $prof_timing, $prof_names;
    $size = count($prof_timing);
    for($i=0;$i<$size - 1; $i++)
    {
        echo "\n{$prof_names[$i]} ";
        echo sprintf("\t%f", $prof_timing[$i+1]-$prof_timing[$i]);
    }
    echo "<b>{$prof_names[$size-1]}</b><br>";
}

private function object_search($value,$objectArray,$key){
	foreach($objectArray as $id=>$object){
		if($object->$key == $value) return $id;
	}
}

private function newChild(&$currentCitizen)  {
        if($currentCitizen->gender == "male" || $currentCitizen->age < $currentCitizen->race->adulthood || $currentCitizen->age > ($currentCitizen->race->oldAge)) return $currentCitizen;
        $birthRate = 4-(count($currentCitizen->children));
        $br = new stdClass;
        $br->base = $birthRate;
        $br->children = count($currentCitizen->children);
        if($currentCitizen->married){$birthRate += 1;}
        $br->married = $birthRate;
        $idealBirthAgeLow = $currentCitizen->race->adulthood+(($currentCitizen->race->middleAge-$currentCitizen->race->adulthood)*.25);
        $idealBirthAgeHigh = $currentCitizen->race->adulthood+(($currentCitizen->race->middleAge-$currentCitizen->race->adulthood)*.75);
        if($currentCitizen->age>=$idealBirthAgeLow && $currentCitizen->age<=$idealBirthAgeHigh){$birthRate = $birthRate*1.5;}
        $name = $currentCitizen->race->name;
        $br->idealAge = $birthRate;
        $racialBalance = 5;
        foreach($this->region->racialBalance as $key=>$race){if($key == $currentCitizen->race->id) $racialBalance = $this->region->racialBalance->$key->value;}
		//if(array_key_exists($currentCitizen->race->id, $this->region->racialBalance)) $racialBalance = $this->region->racialBalance->$name;
		//	else $racialBalance = 5;
         $br->balanceMinus = max($this->racialBalance[$currentCitizen->race->name]-($racialBalance/2),0)/($racialBalance/10);
       $birthRate -= max($this->racialBalance[$currentCitizen->race->name]-($racialBalance/2),0)/($racialBalance/10);


        //(pow(1.038-($racialBalance/10000),$this->racialBalance[$currentCitizen->race->name])/($racialBalance*10));
        $br->balance = $birthRate;
        $br->rbvar = $racialBalance;
        $br->adultpop = $this->racialBalance[$currentCitizen->race->name];
        $randResult = mt_rand(1,1000);
        $birthRate = 1000*($birthRate/(($currentCitizen->race->middleAge*1.3)-$currentCitizen->race->adulthood));
        $br->final = $birthRate;
        $br->yearlyBirths = $this->yearlyBirths;
       if($currentCitizen->immortal == 1) $birthRate = 3;
        if($currentCitizen->spouse != null && is_object($currentCitizen->spouse))
	        if($currentCitizen->spouse->immortal == 1) $birthRate = 3;
	    if($this->yearlyBirths>=($racialBalance/10)) $birthRate = 20;
		if($randResult > $birthRate) return;
		$this->yearlyBirths++;
        $preSQL = "UPDATE citizen SET";
        if($currentCitizen->married && mt_rand(1,100) > 3){$father =&$currentCitizen->spouse;}
        else{

        $family = implode(",",$currentCitizen->children);
        if($currentCitizen->father && array_key_exists($currentCitizen->father, $this->citizens)){
        	$father = $this->citizens[$currentCitizen->father];
        	$family .= ",".implode(",",$father->children);
		    $family .= ",".$father->id;
			}
        if($currentCitizen->mother && array_key_exists($currentCitizen->mother, $this->citizens)){
        	$mother = $this->citizens[$currentCitizen->mother];
        	$family .= ",".implode(",",$mother->children);
		    $family .= ",".$mother->id;
			}       
		$family = explode(",",$family);

        // $fatherOptions = array_filter($this->fathers, function($k) use($currentCitizen,$family){
        //     if($k->age < $currentCitizen->race->adulthood ) return false;
        //     if(in_array($k->id,$family)) return false;
        //     if($k->race->id != $currentCitizen->race->id && mt_rand(1,50) > 1) return false;
        //     return true;
        // });
		$fatherOptions=[];
        foreach($this->fathers as $k){
            if($k->age < $currentCitizen->race->adulthood ) continue;
            if(in_array($k->id,$family)) continue;
            if($k->race->id != $currentCitizen->race->id && mt_rand(1,20) > max(1,20-$racialBalance)) continue;
            $fatherOptions[]=$k;
        }

        if(count($fatherOptions) == 0) {
            $mailOrderFather = $this->newCitizen(mt_rand($currentCitizen->age,$currentCitizen->age*2), $currentCitizen->race, 'male', $currentCitizen->generation);
            $mailOrderFather->race = $currentCitizen->race;
            $mailOrderFather->region = $currentCitizen->region;
            $mailOrderFather->children = explode(",",$mailOrderFather->children);
            $this->citizens[$mailOrderFather->id] = $mailOrderFather;
            $father =&$this->citizens[$mailOrderFather->id];
		print_r($father);
        }
        
        if(!isset($mailOrderFather)){
        usort($fatherOptions, function($a,$b){
            $aR = mt_rand(1,2);
            $bR = mt_rand(1,2);
            if($aR<$bR) return -1;
            if($aR>$bR) return 1;
            if($aR==$bR) return $a->age-$b->age;
        });
            $father =&$this->citizens[$fatherOptions[0]->id];
        
			unset($this->fathers[$father->id]);
        }
	    }
        
		$childLineage = null;
		$childRace = $currentCitizen->race;
		if(!is_object($currentCitizen->race)) $this->races[$currentCitizen->race];
		if(!is_object($father->race)) $this->races[$father->race];
        if($father->race->id == $currentCitizen->race->id){$childRace = $currentCitizen->race;}
            else{

                if(($father->race->id == $this->races["Elf"]->id && 
                			$currentCitizen->race->id == $this->races["Human"]->id) || 
                	($father->race->id == $this->races["Human"]->id && 
                			$currentCitizen->race->id == $this->races["Elf"]->id)){
                	$childRace = $this->races["Half-Elf"];
            		}
                elseif(array_key_exists("Half-Celestial", $this->races)){
                	if(($father->race->id == $this->races["Half-Celestial"]->id && 
                			$currentCitizen->race->id != $this->races["Half-Celestial"]->id) || 
                	($father->race->id != $this->races["Half-Celestial"]->id && 
                			$currentCitizen->race->id == $this->races["Half-Celestial"]->id)){
			        	if(array_key_exists("Aasimar", $this->races)) $childRace = $this->races["Aasimar"];
			        		else $childLineage = "Part-Celestial";
            		}}
                elseif(array_key_exists("Half-Infernal", $this->races)){
                	if(($father->race->id == $this->races["Half-Infernal"]->id && 
                			$currentCitizen->race->id != $this->races["Half-Infernal"]->id) || 
                	($father->race->id != $this->races["Half-Infernal"]->id && 
                			$currentCitizen->race->id == $this->races["Half-Infernal"]->id)){
			        	if(array_key_exists("Tiefling", $this->races)) $childRace = $this->races["Tiefling"];
			        		else $childLineage = "Part-Infernal";
            		}}
                    else{
                        if(mt_rand(1,100) < 50) $childRace = $currentCitizen->race;
                            else $childRace = $father->race;
                    }
            }

		if(!strcasecmp($father->lineage, "Lycanthrope")  || !strcasecmp($currentCitizen->lineage, "Lycanthrope"))
			$childLineage = mt_rand(1,100) < 50? $childLineage = "Lycanthrope": $childLineage = null;

		if(!strcasecmp($father->lineage, "Lycanthrope") && !strcasecmp($currentCitizen->lineage, "Lycanthrope"))
			$childLineage = "Lycanthrope";

		if(!strcasecmp($father->lineage, "Demon")  || !strcasecmp($currentCitizen->lineage, "Demon")){
        	if(array_key_exists("Half-Infernal", $this->races)) $childRace = $this->races["Half-Infernal"];
        		else $childLineage = "Half-Infernal";
			}

		if(!strcasecmp($father->lineage, "Fiend")  || !strcasecmp($currentCitizen->lineage, "Fiend")){
        	if(array_key_exists("Half-Infernal", $this->races)) $childRace = $this->races["Half-Infernal"];
        		else $childLineage = "Half-Infernal";
			}

		if(!strcasecmp($father->lineage, "Angel")  || !strcasecmp($currentCitizen->lineage, "Angel")){
        	if(array_key_exists("Half-Celestial", $this->races)) $childRace = $this->races["Half-Celestial"];
        		else $childLineage = "Half-Celestial";
			}

		if(!strcasecmp($father->lineage, "Angel")  && !strcasecmp($currentCitizen->lineage, "Angel"))
        	$childLineage = "Angel";

		if(!strcasecmp($father->lineage, "Demon")  && !strcasecmp($currentCitizen->lineage, "Demon"))
        	$childLineage = "Demon";

		if(!strcasecmp($father->lineage, "Fiend")  && !strcasecmp($currentCitizen->lineage, "Fiend"))
        	$childLineage = "Fiend";

		if(!strcasecmp($father->lineage, "Demigod")  || !strcasecmp($currentCitizen->lineage, "Demigod"))
			$childLineage = mt_rand(1,100) < 50? $childLineage = "Demigod": $childLineage = null;

		if(!strcasecmp($father->lineage, "Deity")  || !strcasecmp($currentCitizen->lineage, "Deity"))
			$childLineage = "Demigod";

		if(!strcasecmp($father->lineage, "Deity")  && !strcasecmp($currentCitizen->lineage, "Deity"))
			$childLineage = "Deity";

        do{
        if(mt_rand(1,100) < 50) $childGender = "male";
            else $childGender = "female";

            $newCitizen = $this->newCitizen(0, $childRace, $childGender, $currentCitizen->generation+1, $currentCitizen->id, $father->id, $childLineage);
            $newCitizen->race = $childRace;
            $newCitizen->region = $currentCitizen->region;
            $newCitizen->children = explode(",",$newCitizen->children);

            $this->citizens[$newCitizen->id] = $newCitizen;
            array_push($currentCitizen->children,$newCitizen->id);

           $currentCitizen->notes = $currentCitizen->notes . "Child(" . $newCitizen->firstName . ") born in " . $this->region->epoch . "-> Father:" . $father->firstName . "\n";

         
           $note  = $father->notes . "Child(" . $newCitizen->firstName . ") born in " . $this->region->epoch . "-> Mother:" . $currentCitizen->firstName . "\n";
			// if($index = $this->object_search($father->id,$this->citizens,"id")){
   //            array_push($this->citizens[$index]->children,$newCitizen->id);
   //                  $this->citizens[$index]->notes =  $note;
   //          }
           array_push($father->children,$newCitizen->id);
           $father->notes =  $note;

         $currentCitizen->children = array_filter($currentCitizen->children);
         $children = implode(",",$currentCitizen->children);
		//$this->sqlArray[]="$preSQL notes = '$currentCitizen->notes', children = '$children' WHERE id = $currentCitizen->id";

         $father->children = array_filter($father->children);
         $children = implode(",",$father->children);
		//$this->sqlArray[]="$preSQL notes = '$note', children = '$children' WHERE id = $father->id";
        
        } while(mt_rand(1,100)<2);
     //return $currentCitizen;
	}


//    private function newEnemy()  {
//              var $currentCitizen = this->citizen;
       
//       return $currentCitizen;
//    }

//    private function newFriend()  {
//              var $currentCitizen = this->citizen;
       
//      return $currentCitizen;
//     }

//     }



  
}
?>
