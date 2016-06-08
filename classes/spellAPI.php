<?php

class spellAPI {

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
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.="and `$key` = '$value' ";
		}
	}
	$query = "SELECT * FROM (SELECT * FROM monster WHERE account = $this->account ".$whereStr.
				"UNION ALL SELECT * FROM monster WHERE account = 1 ".$whereStr.") AS monster GROUP BY name ORDER BY name";

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
		$whereStr=[];
		foreach($where as $key=>$value){
			$whereStr[]=" `$key` = '$value' ";
		}
	}
    if(count($whereStr)==0) $whereStr='';
    	else $whereStr = "WHERE".implode(" AND ",$whereStr);
	if($_SESSION["settings"]->defaultSpells) $spellsQuery = "(SELECT * FROM (SELECT * FROM gm_master_tools.spells WHERE account = $this->account
			UNION ALL SELECT * FROM gm_master_tools.spells WHERE account = 1) AS spells GROUP BY `name` ORDER BY `name`) AS spells";
	 else $spellsQuery = "(SELECT * FROM gm_master_tools.monster WHERE account = $this->account) AS spells";

	$query = "SELECT * FROM $spellsQuery $whereStr";
	$query .= " ORDER BY name";
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

function getSpellBasics($data){
	$whereStr = null;
	$where = null;
    unset($data['account']);
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$spells=[];
	if($where){
		$whereStr=[];
		foreach($where as $key=>$value){
			$whereStr[]=" `$key` = '$value' ";
		}
	}
    if(count($whereStr)==0) $whereStr='';
    	else $whereStr = "WHERE".implode(" AND ",$whereStr);
	if($_SESSION["settings"]->defaultSpells) $spellsQuery = "(SELECT * FROM (SELECT * FROM gm_master_tools.spells WHERE account = $this->account
			UNION ALL SELECT * FROM gm_master_tools.spells WHERE account = 1) AS spells GROUP BY `name` ORDER BY `name`) AS spells";
	 else $spellsQuery = "(SELECT * FROM gm_master_tools.monster WHERE account = $this->account) AS spells";

	$query = "SELECT name, level, id FROM $spellsQuery $whereStr";
	$query .= " ORDER BY name";
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

function addSpell($spellData){
	$query = "INSERT INTO spells SET account = $this->account";
	foreach($spellData as $key=>$value){
		if($value === 0 || $value === 1) $query .= $key." = ".$value.",";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}
	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 

	return "added";
}


function updateSpell($spellData){
	if($spellData['account'] == 1 && $this->account != 1)unset($spellData['id']);
	$query = " account = $this->account";
    unset($spellData['account']);
	foreach($spellData as $key=>$value){
		if($value === 0 || $value === 1) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$query = "INSERT INTO spells SET $query ON DUPLICATE KEY UPDATE $query";
	$this->mysqli->query($query);
	
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 

	return "updated";
}


function deleteSpell($id){
	$query = "DELETE FROM spells WHERE account = $this->account AND ".$id['field']." = '".$id['value']."'";

	if ($result = $this->mysqli->query($query)) {
	    $result->close();
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 

	return "Deleted record ".$id['value'];
}


}
?>