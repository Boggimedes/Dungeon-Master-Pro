<?php

class monsterAPI {

   var $account;

function __construct($account, $db) {
	$this->mysqli = $db;
	$this->account = $account;
	}

function getMonsters($data){
	$whereStr = null;
	$where = null;
    unset($data['account']);
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$monsters=[];
	if($where){
		$whereStr=[];
		foreach($where as $key=>$value){
			$whereStr[]="`$key` = '$value'";
		}
		$whereStr = implode(" and ",$whereStr);
		$whereStr='WHERE '.$whereStr;
	}
	if($_SESSION["settings"]->defaultMonsters) $monsterQuery = "(SELECT * FROM (SELECT * FROM gm_master_tools.monster WHERE account = $this->account
			UNION ALL SELECT * FROM gm_master_tools.monster WHERE account = 1) AS monster GROUP BY `name` ORDER BY `name`) AS monsters";
	 else $monsterQuery = "(SELECT * FROM gm_master_tools.monster WHERE account = $this->account) AS monsters";
	$query = "SELECT * FROM $monsterQuery $whereStr";

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$row['skills']=json_decode($row['skills']);
			$row['attacks']=json_decode($row['attacks']);
			$row['legendaryActions']=json_decode($row['legendaryActions']);
			$monsters[]=$row;
		}
	    $result->close();
	    if(count($monsters)==1) $monsters = $monsters[0];
	}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $monsters;
}

function getSpells($data){
	$whereStr = null;
	$where = null;
    unset($data['account']);
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$spells=[];
	if($where){
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.="and `$key` = '$value' ";
		}
	}
	$query = "SELECT * FROM spells WHERE account = $this->account ".$whereStr;

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$spells[]=$row;
		}
	    $result->close();
	    if(count($spells)==1) $spells = $spells[0];
	}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $spells;
}

function getScrollMonsters($descriptor){
	$nFilter = '';
	$cFilter = '';
	if($_SESSION["settings"]->defaultMonsters) $monsterQuery = "(SELECT name,img,cr,id FROM (SELECT * FROM gm_master_tools.monster WHERE account = $this->account
			UNION ALL SELECT name,img,cr,id FROM gm_master_tools.monster WHERE account = 1) AS monster GROUP BY `name` ORDER BY `name`) AS monsters";
	 else $monsterQuery = "(SELECT name,img,cr,id FROM gm_master_tools.monster WHERE account = $this->account) AS monsters";
	$query = "SELECT * FROM $monsterQuery";
	$monsters=[];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			// $row['skills']=json_decode($row['skills']);
			// $row['attacks']=json_decode($row['attacks']);
			// $row['legendaryActions']=json_decode($row['legendaryActions']);
			$row['img']=str_replace("{id}", $row['id'], $row['img']);
			//echo json_last_error_msg ();
			$monsters[]=$row;
	}
	    $result->close();
	}

	//$monsters = array_slice($monsters,$descriptor['index']-1,$descriptor['count']);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.  $query \n"; 
	var_dump($this->mysqli->error); 
	} 
	

	return $monsters;
}

function getUiScrollMonsters($descriptor){
	$nFilter = '';
	$cFilter = '';
	if(array_key_exists("nFilter", $descriptor)) $nFilter = $descriptor['nFilter'];
	if(array_key_exists("cFilter", $descriptor)) $cFilter = $descriptor['cFilter'];
	if($cFilter){$cFilter = " AND `cr` = $cFilter ";}
	if($_SESSION["settings"]->defaultMonsters) $monsterQuery = "(SELECT * FROM (SELECT * FROM gm_master_tools.monster WHERE account = $this->account
			UNION ALL SELECT * FROM gm_master_tools.monster WHERE account = 1) AS monster GROUP BY `name` ORDER BY `name`) AS monsters";
	 else $monsterQuery = "(SELECT * FROM gm_master_tools.monster WHERE account = $this->account) AS monsters";
	$query = "SELECT * FROM $monsterQuery WHERE `name` LIKE '%$nFilter%' $cFilter";
	$monsters=[];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$row['skills']=json_decode($row['skills']);
			$row['attacks']=json_decode($row['attacks']);
			$row['legendaryActions']=json_decode($row['legendaryActions']);
			$row['img']=str_replace("{id}", $row['id'], $row['img']);
			//echo json_last_error_msg ();
			$monsters[]=$row;
	}
	    $result->close();
	}

	$monsters = array_slice($monsters,$descriptor['index']-1,$descriptor['count']);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.  $query \n"; 
	var_dump($this->mysqli->error); 
	} 
	

	return $monsters;
}

function addMonster($monsterData){
	$query = "INSERT INTO monster SET account = $this->account";
    unset($monsterData['account']);
	foreach($monsterData as $key=>$value){
		if($key == "skills" || $key == "attacks" || $key == "legendaryActions"){
			$query .= ", `$key` = '".$this->mysqli->real_escape_string(json_encode($value))."'";
			continue;
		}
		if(is_numeric($value)) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$insertId = $this->mysqli->insert_id;
	
	return $insertId;
}


function updateMonster($monsterData){
	if($monsterData['account'] == 1 && $this->account != 1)unset($monsterData['id']);
	unset($monsterData['account']);
	if(array_key_exists("file", $monsterData)){
		$name = $monsterData["file"]->getClientFilename();
		$name = "/{id}.jpg";
		if($this->account == 1){
		$directory = "/mImages/";
		$name = "/".$monsterData['name'].".jpg";
		}
		else $directory = "/mImages/".$this->account;
		$monsterData['img']=$directory.$name;
		$file = $monsterData["file"];
		unset($monsterData["file"]);
	}
	$query = " account = $this->account";
	foreach($monsterData as $key=>$value){
		if($key == "skills" || $key == "attacks" || $key == "legendaryActions"){
			$query .= ", `$key` = '".$this->mysqli->real_escape_string(json_encode($value))."'";
			continue;
		}
		if($value === 0 || $value === 1) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$query = "INSERT INTO monster SET $query ON DUPLICATE KEY UPDATE $query";
	$this->mysqli->query($query);
	$return = $this->mysqli->insert_id;
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	if(isset($file)){
		$name=$return.".jpg";
		if($return==0) $name = $monsterData['id'].".jpg";
		$directory = $_SERVER["DOCUMENT_ROOT"].$directory;
		if($this->account == 1) $name = $monsterData['name'].".jpg";
		if (!file_exists($directory)) mkdir($directory, 0755, true);
        $file->moveTo($directory."/$name");
	} 
	
	return $return;
}


function deleteMonster($id){
	$query = "DELETE FROM monster WHERE account = $this->account AND ".$id['field']." = '".$id['value']."'";

	$result = $this->mysqli->query($query);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return "Deleted record ".$id['value'];
}


}
?>