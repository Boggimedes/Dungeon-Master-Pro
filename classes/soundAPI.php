<?php


class soundAPI {

	protected $db;
   var $account;

function __construct($account,$db) {
	$this->mysqli = $db;
	$this->account = $account;
	}

function getScenes($data){
	$whereStr = null;
	$where = null;
	$fields = null;
	if(is_array($data)) if(array_key_exists("fields", $data)) $fields = $data['fields'];
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$scenes=[];
	if($where){
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.="and scene.`$key` = '$value' ";
		}
	}
	if($fields == 'all') $query = 'SELECT scene.*, REPLACE(CAST(
			CONCAT(
			"[",
			GROUP_CONCAT(
				CONCAT(
				"{\"name\": \"",
				effect.`name`,
				"\",\"desc\": \"",
				effect.`desc`,
				"\",\"sounds\": ",
				effect.`sounds`,
				",\"vol\": ",
				effect.vol,
				",\"preDelay\": ",
				CAST(effect.preDelay AS DECIMAL(1,0)),
				",\"loop\": ",
				CAST(effect.`loop` AS DECIMAL(1,0)),
				",\"delayL\": ",
				effect.delayL,
				",\"delayH\": ",
				effect.delayH,
				",\"optional\": ",
				CAST(effect.optional AS DECIMAL(1,0)),
				",\"seq\": ",
				CAST(effect.seq AS DECIMAL(1,0)),
				",\"id\": ",
				effect.id,
				"}"
				) SEPARATOR \',\'
			),
			"]"
			) AS CHAR(10000) CHARACTER SET utf8),",]","]") AS effects  FROM gm_master_tools.scene JOIN scene2effect on scene.id = scene_id JOIN effect on effect.id = effect_id WHERE scene.account = '.$this->account." ".$whereStr." GROUP BY scene.`name`";
		else $query = "SELECT name, img, id FROM scene WHERE account = $this->account ".$whereStr;

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			if(array_key_exists('effects', $row)){
				$row['effects']=json_decode($row['effects']);
			}
			$scenes[]=$row;
		}
	    $result->close();
	    if(count($scenes)==1) $scenes = $scenes[0];
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return $scenes;
}

function getEffects($data){
	$whereStr = null;
	$where = null;
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$effects=[];
	if($where){
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.="and `$key` = '$value' ";
		}
	}
	$query = "SELECT * FROM effect WHERE account = $this->account ".$whereStr;

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$row['sounds']=json_decode($row['sounds']);
			$effects[]=$row;

		}
	    $result->close();
	    if(count($effects)==1) $effects = $effects[0];
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return $effects;
}

function getCollections($data){
	$whereStr = null;
	$where = null;
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$collections=[];
	if($where){
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.=" and `$key` = '$value' ";
		}
	}
	$query = 'SELECT collection.*, REPLACE(CAST(
			CONCAT(
			"[",
			GROUP_CONCAT(
				CONCAT(
				"{\"name\": \"",
				scene.`name`,
				"\",\"img\": \"",
				scene.`img`,
				"\",\"id\": ",
				scene.id,
				"}"
				) SEPARATOR \',\'
			),
			"]"
			) AS CHAR(10000) CHARACTER SET utf8),",]","]") AS scenes  FROM collection JOIN collection2scene on collection.id = collection_id JOIN scene on scene.id = scene_id WHERE collection.account = '.$this->account.$whereStr." GROUP BY collection.`name`";

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$row['scenes']=json_decode($row['scenes']);
			$collections[]=$row;
		}
	    $result->close();
	    if(count($collections)==1) $collections = $collections[0];
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return $collections;
}

function updateSoundRecord($recordType, $data){
    if($recordType == "effect") $data['sounds'] = json_encode($data['sounds'],JSON_NUMERIC_CHECK );
    if($recordType == "scene"){
        $effects=[];
        foreach($data['effects'] as $effect){$effects[]=$effect['id'];}
        unset($data['effects']);
    }    
    $new = false;
    	unset($data['account']);
    if($data['id']=="new") {
    	$new=true;
    	unset($data['id']);
    }
	$query = "REPLACE INTO $recordType SET account = $this->account";
	foreach($data as $key=>$value){
		if($value === 0 || $value === 1) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}
		echo $query;
	$this->mysqli->query($query);
	if($new) $data['id'] = $this->mysqli->insert_id;	    
	if($recordType == "scene") $this->updateScene2Effect($data['id'],$effects);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return "updated";
}

function updateScene2Effect($id, $effects){
	$queries = [];
	$queries[] = "DELETE FROM scene2effect WHERE scene_id = $id";
	foreach($effects as $effect){$queries[] = "INSERT INTO scene2effect SET scene_id = $id, effect_id = $effect";}

	if ($this->mysqli->multi_query(implode(';', $queries))) {
		$i = 0; 
		while($this->mysqli->more_results()){ 
			$i++; 
			$this->mysqli->next_result();
			} 
		}
	if ($this->mysqli->errno) { 
		echo "Batch execution prematurely ended on statement $i.\n"; 
		var_dump($queries[$i],$this->mysqli->error); 
	} 
}

function deleteSoundRecord($recordType, $id){
	$query = "DELETE FROM $recordType WHERE account = $this->account AND ".$id['field']." = '".$id['value']."'";

	$this->mysqli->query($query);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return "Deleted record ".$id['value'];
}


function getSounds(){
	$query = "SELECT * FROM sounds WHERE account = $this->account OR account = 0";
	$sounds= [];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			if(strpos(" ".$row['category'],"-")>0) $sounds[explode("-",$row['category'])[0]][explode("-",$row['category'])[1]][$row['name']]=$row; 
			 else $sounds[$row['category']][$row['name']]=$row;
		}
	    $result->close();
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return $sounds;
}

function duplicateCollection($param){
	$account = $this->account;
	$fromCollection = $param['collectionId'];
	$query = "SELECT * FROM collection2scene WHERE scene_id=$fromCollection";
	$scenes= [];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$scenes[]=$row['effect_id'];
		}
	    $result->close();
	}
	foreach($scenes as &$value){
		$newParam=[];
		$newParam['sceneId']=$value;
		$value = $this->duplicateScene($newParam);
		}
	$query = "INSERT INTO collection (`name`,
    `account`,
    `desc`) SELECT `name`,
	    $account,
	    `desc` FROM collection WHERE id=$fromCollection";
	$this->mysqli->query($query);
	$toCollection = $this->mysqli->insert_id;

	foreach($scenes as $value){
		$query = "INSERT INTO scene2effect scene_id = $toCollection, effect_id = $value";
		$this->mysqli->query($query);
		}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
}

function duplicateScene($param){
	$account = $this->account;
	$fromScene = $param['sceneId'];
	$query = "SELECT * FROM scene2effect WHERE scene_id=$fromScene";
	$effects= [];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$effects[]=$row['effect_id'];
		}
	    $result->close();
	}
	foreach($effects as &$value){
		$newParam=[];
		$newParam['effectId']=$value;
		$value = $this->ducpliateEffect($newParam);
		}
	$query = "INSERT INTO scene (`name`,
	    `account`,
	    `desc`,
	    `vol`,
	    `fadeIn`,
	    `fadeOut`,
	    `sceneSolo`,
	    `img`) SELECT `name`,
	    $account,
	    `desc`,
	    `sounds`,
	    `vol`,
	    `preDelay`,
	    `loop`,
	    `delayL`,
	    `delayH`,
	    `optional`,
	    `seq` FROM scene WHERE id=$fromScene";
	$this->mysqli->query($query);
	$toScene = $this->mysqli->insert_id;

	foreach($effects as $value){
		$query = "INSERT INTO scene2effect scene_id = $toScene, effect_id = $value";
		$this->mysqli->query($query);
		}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	return $toScene;
}

	function duplicateEffect($param){
		$fromEffect = $param['effectId'];
		$account = $this->account;
		$query = "INSERT INTO effect (`name`,
				`desc`,
				`account`,
				`sounds`,
				`vol`,
				`preDelay`,
				`loop`,
				`delayL`,
				`delayH`,
				`optional`,
				`seq`) SELECT `name`,
				`desc`,
				$account,
				`sounds`,
				`vol`,
				`preDelay`,
				`loop`,
				`delayL`,
				`delayH`,
				`optional`,
				`seq` FROM effect WHERE id=$fromEffect";
		$this->mysqli->query($query);
		if ($this->mysqli->errno) { 
			echo "Mysqli failed.\n"; 
			var_dump($this->mysqli->error); 
			} 
		return $this->mysqli->insert_id;

	}

}
?>