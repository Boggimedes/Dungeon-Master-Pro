<?php

class storyAPI {

   var $account;

function __construct($account, $db) {
	$this->mysqli = $db;
	$this->account = $account;
	}

function getStories(){

	$query = "SELECT * FROM stories  WHERE account = $this->account";

	if ($result = $this->mysqli->query($query)) {
		while($row=$result->fetch_assoc()) {
			$stories[]=$row;
		}
	    $result->close();
	}

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return $stories;
}

function addStory(){
	$query = "INSERT INTO stories SET account = $this->account, title = 'New Story'";

	$this->mysqli->query($query);
	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	$insertId = $this->mysqli->insert_id;
	
	return $insertId;
}

function updateStory($data){
	$query = "UPDATE stories SET ";
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

function deleteStory($id){
	$id = $id['id'];
	$query = "DELETE FROM stories WHERE id = $id";

	$result = $this->mysqli->query($query);

	if ($this->mysqli->errno) { 
	echo "Mysqli failed.\n"; 
	var_dump($this->mysqli->error); 
	} 
	
	return "Deleted record ".$id['value'];
}


}
?>