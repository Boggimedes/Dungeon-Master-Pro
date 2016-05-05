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
		$whereStr='';
		foreach($where as $key=>$value){
			$whereStr.="and `$key` = '$value' ";
		}
	}
	$query = "SELECT * FROM monster WHERE account = $this->account ".$whereStr;

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
	$this->mysqli->close();
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
	$this->mysqli->close();
	return $spells;
}

function getUiScrollMonsters($descriptor){
	$nFilter = '';
	$cFilter = '';
	if(array_key_exists("nFilter", $descriptor)) $nFilter = $descriptor['nFilter'];
	if(array_key_exists("cFilter", $descriptor)) $cFilter = $descriptor['cFilter'];
	if($cFilter){$cFilter = " AND `cr` = $cFilter ";}
	$query = "SELECT COUNT(`name`) FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter";
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_array()){$count=$row[0];}
	    $result->close();
	}
	$dcount = $descriptor['count'];
	$index = ($descriptor['index']-1)/$count;
	$index = round(substr($index,strpos($index,"."))*$count);
	if($descriptor['index'] < 0){
		if($index+$dcount > $count){
			$blimit = ($index+$dcount)-$count;
			$limit = $count - $index;
			$query = "SELECT * FROM (SELECT *,1 as rank FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter ORDER BY `name` DESC LIMIT $limit) a
						UNION ALL SELECT * FROM (SELECT *,2 as rank FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter LIMIT $blimit) b
						ORDER BY Rank ,`name`";
		}
		else $query = "SELECT * FROM (SELECT * FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter ORDER BY `name` DESC LIMIT $index, $dcount) a ORDER BY `name`";
	} 
	else{
		if($index+$dcount > $count){
			$blimit = (abs($index)+$dcount)-$count;
			$limit = $count - abs($index);
			$query = "SELECT * FROM (SELECT *,1 as rank FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter LIMIT $limit) a
						UNION ALL SELECT * FROM (SELECT *,2 as rank FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter ORDER BY `name` DESC LIMIT $blimit) b
						ORDER BY Rank ,`name`";
		}
		else $query = "SELECT * FROM monster WHERE account = $this->account AND `name` LIKE '%$nFilter%' $cFilter ORDER BY `name` LIMIT $index, $dcount";

	} 
	error_log ($dcount."|".$index."|".$descriptor['index']."|".$query);
	$monsters=[];
	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()){
			$row['skills']=json_decode($row['skills']);
			$row['attacks']=json_decode($row['attacks']);
			$row['legendaryActions']=json_decode($row['legendaryActions']);
			//echo json_last_error_msg ();
			$monsters[]=$row;
		}
	    $result->close();
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n $query \n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();

	return $monsters;
}

function addMonster($monsterData){
	$query = "INSERT INTO monster SET account = $this->account";
	foreach($monsterData as $key=>$value){
		if($value === 0 || $value === 1) $query .= $key." = ".$value.",";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}
	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return "added";
}


function updateMonster($monsterData){
	$this->account = 1;
	$query = "REPLACE INTO monster SET account = $this->account";
    unset($monsterData['account']);
	foreach($monsterData as $key=>$value){
		if($key == "skills" || $key == "attacks" || $key == "legendaryActions"){
			$query .= ", `$key` = '".$this->mysqli->real_escape_string(json_encode($value))."'";
			continue;
		}
		if($value === 0 || $value === 1) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$this->mysqli->query($query);
	
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return "updated";
}


function deleteMonster($id){
	$query = "DELETE FROM monster WHERE account = $this->account AND ".$id['field']." = '".$id['value']."'";

	if ($result = $this->mysqli->query($query)) {
	    $result->close();
	}
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$this->mysqli->close();
	return "Deleted record ".$id['value'];
}


}
?>