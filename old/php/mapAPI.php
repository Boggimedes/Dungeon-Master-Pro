<?php

class mapAPI {

   var $account;

function __construct($account, $db) {
	$this->mysqli = $db;
	$this->account = $account;
	}

function getMaps($data){
	$whereStr = null;
	$where = null;
	if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
	$maps=[];
	if($where){
		$whereStr=[];
		foreach($where as $key=>$value){
			$whereStr[]="`$key` = '$value'";
		}
		$whereStr = implode(" and ",$whereStr);
		$whereStr='WHERE '.$whereStr;
	}
	$mapQuery = "(SELECT * FROM maps WHERE account = $this->account) AS maps";
	$query = "SELECT * FROM $mapQuery $whereStr";

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()) {
			$row['file']="/maps/$this->account/{$row['id']}.jpg";
			$maps[]=$row;
		}
	    $result->close();
	}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $maps;
}

function getMarkers($data){


	$query = "SELECT * FROM map_markers WHERE  map_id = {$data['map_id']}";

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc())
		{
			$row['zoom']=json_decode($row['zoom']);
			$markers[]=$row;
		}
	    $result->close();
	}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $markers;
}


function addMap($data){
	if(array_key_exists("file", $data)){
		$name = $data["file"]->getClientFilename();
		$name = "/{id}.jpg";
		$directory = "/maps/".$this->account;
		$file = $data["file"];
		$data['file']=$directory.$name;
		unset($data["file"]);
	}

	$query = "INSERT INTO maps SET account = $this->account";
	foreach($data as $key=>$value){
		if(is_numeric($value)) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$insertId = $this->mysqli->insert_id;

	if(isset($file)){
		$name=$insertId.".jpg";
		$directory = $_SERVER["DOCUMENT_ROOT"].$directory;
		if (!file_exists($directory)) mkdir($directory, 0755, true);
        $file->moveTo($directory."/$name");
	} 
	
	return $insertId;
}

function addMarker($data){
	$query = "INSERT INTO map_markers SET ";
	$qarray = array();
	foreach($data as $key=>$value){
		if($key == "zoom" ){
			$qarray[] = " `$key` = '".$this->mysqli->real_escape_string(json_encode($value))."'";
			continue;
		}
		if(is_numeric($value)) $qarray[] = " `$key` = $value";
			else $qarray[] = " `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}
	$query .= implode(",",$qarray);

	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$data['id'] = $this->mysqli->insert_id;
	
	return $data;
}

function updateMarker($data){
	$query = "UPDATE map_markers SET ";
	$qarray = array();
	$id = $data['id'];
    unset($data['id']);
	foreach($data as $key=>$value){
		if($key == "zoom" ){
			$qarray[] = " `$key` = '".$this->mysqli->real_escape_string(json_encode($value))."'";
			continue;
		}
		if(is_numeric($value)) $qarray[] = " `$key` = $value";
			else $qarray[] = " `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}
	$query .= implode(",",$qarray);

	$this->mysqli->query($query." WHERE id = $id");
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $id;
}


function updateMap($data){

	if(array_key_exists("file", $mapData)){
		$name = $mapData["file"]->getClientFilename();
		$file = $mapData["file"];
		$mapData['file']=$name;
	}
	$query = " account = $this->account";
	foreach($mapData as $key=>$value){
		if($value === 0 || $value === 1) $query .= ", `$key` = $value";
			else $query .= ", `$key` = '".$this->mysqli->real_escape_string($value)."'";
		}

	$query = "INSERT INTO maps SET $query ON DUPLICATE KEY UPDATE $query";
	$this->mysqli->query($query);
	$return = $this->mysqli->insert_id;
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	if(isset($file)){
		$name=$return.".jpg";
		if($return==0) $name = $mapData['id'].".jpg";
		$directory = $_SERVER["DOCUMENT_ROOT"]."/maps/".$this->account;
		if (!file_exists($directory)) mkdir($directory, 0755, true);
        $file->moveTo($directory."/$name");
	} 
	
	return $return;
}


function deleteMap($id){
	$id = $id['id'];
	$query = "DELETE FROM maps WHERE account = $this->account AND id = $id";

	$result = $this->mysqli->query($query);

	$query = "DELETE FROM map_markers WHERE account = $this->account AND map_id = $id";

	$result = $this->mysqli->query($query);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	else unlink( $_SERVER["DOCUMENT_ROOT"]."/maps/".$this->account."/$id.jpg");
	
	return "Deleted record ".$id['value'];
}

function deleteMarker($id){
	$id = $id['id'];
	$query = "DELETE FROM map_markers WHERE id = $id";

	$result = $this->mysqli->query($query);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return "Deleted record ".$id['value'];
}


}
?>