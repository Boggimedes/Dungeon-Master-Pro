<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SoundController extends Controller
{
    function getScenes($data){
        $whereStr = null;
        $where = null;
        $fields = null;
        $collection = null;
        if(is_array($data)) if(array_key_exists("fields", $data)) $fields = $data['fields'];
        if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
        if(is_array($data)) if(array_key_exists("collection", $data)) $collection = $data['collection'];
        $scenes=[];
        if($where){
            $whereStr='';
            foreach($where as $key=>$value){
                $whereStr.="and scene.`$key` = '$value' ";
            }
        }
        if($collection){
        if($collection == 'default'){
            $query = "SELECT id FROM collection WHERE account = $this->account AND `default` = 1 LIMIT 1";
            if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
            $collection=$row['id'];
            }
            $result->close();
            }
        }
    
        $query = "SELECT scene_id FROM collection2scene WHERE `collection_id` = $collection";
    
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $scenes[]=$row['scene_id'];
                }
            $result->close();
            }
        $scenelist = implode(",",$scenes);
         $whereStr.="AND scene.id IN($scenelist)";
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
                ) AS CHAR(10000) CHARACTER SET utf8),",]","]") AS effects  FROM gm_master_tools.scene LEFT JOIN scene2effect on scene.id = scene_id LEFT JOIN effect on effect.id = effect_id WHERE scene.account = '.$this->account." ".$whereStr." GROUP BY scene.`name`";
            else $query = "SELECT name, img, id FROM scene WHERE account = $this->account".$whereStr;
    
            $scenes=[];
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                if(array_key_exists('effects', $row)){
                if($row['effects']==null) $row['effects']=[];
                    else $row['effects']=json_decode($row['effects']);
                }
                $scenes[]=$row;
            }
            $result->close();
            //if(count($scenes)==1) $scenes = $scenes[0];
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
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
        
        return $effects;
        }
    
    function getCollection($data){
        $whereStr = null;
        $where = null;
        if(is_array($data)) if(array_key_exists("where", $data)) $where = $data['where'][0];
        $collections=[];
        if($where){
            $whereStr='';
            foreach($where as $key=>$value){
                $whereStr.=" and collection.`$key` = '$value' ";
            }
        }
        $query = 'SELECT collection.*, REPLACE(CAST(
                CONCAT(
                "[",
                GROUP_CONCAT(
                    scene.id
                    SEPARATOR \',\'
                ),
                "]"
                ) AS CHAR(10000) CHARACTER SET utf8),",]","]") AS scenes  FROM collection LEFT JOIN collection2scene on collection.id = collection_id LEFT JOIN scene on scene.id = scene_id WHERE collection.account = '.$this->account.$whereStr." GROUP BY collection.`name` LIMIT 1";
    
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                if($row['scenes']==null) $row['scenes']=[];
                    else $row['scenes']=json_decode($row['scenes']);
                $collection=$row;
            }
            $result->close();
            //if(count($collections)==1) $collections = $collections[0];
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        return $collection;
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
                ) AS CHAR(10000) CHARACTER SET utf8),",]","]") AS scenes  FROM collection LEFT JOIN collection2scene on collection.id = collection_id LEFT JOIN scene on scene.id = scene_id WHERE collection.account = '.$this->account.$whereStr." GROUP BY collection.`name`";
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                if($row['scenes']==null) $row['scenes']=[];
                    else $row['scenes']=json_decode($row['scenes']);
                $collections[]=$row;
            }
            $result->close();
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        return $collections;
        }
    
    function updateSoundRecord($recordType, $data){
        if($recordType == "effect") $data['sounds'] = json_encode($data['sounds'],JSON_NUMERIC_CHECK );
        if($recordType == "scene"){
            $effects=[];
            foreach($data['effects'] as $effect){$effects[]=$effect['id'];}
            unset($data['effects']);
            if(array_key_exists("file", $data)){
                $name = $data["file"]->getClientFilename();
                $ext = explode(".", $name);
                $ext = $ext[count($ext)-1]; 
                $name = "/{id}.$ext";
                if($this->account == 1){
                $directory = "/img/";
                $name = "/scene-".$data['name'].".$ext";
                }
                else $directory = "/img/".$this->account;
                $data['img']=$directory.$name;
                $file = $data["file"];
                unset($data["file"]);
            }
    
        }    
        if($recordType == "collection"){
            $scenes=[];
            $data['scenes'] = array_unique($data['scenes']);
            foreach($data['scenes'] as $scene){$scenes[]=$scene;}
            unset($data['scenes']);
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
        $return = $this->mysqli->insert_id;
        if($recordType == "scene") $this->updateScene2Effect($data['id'],$effects);
        if($recordType == "collection") $this->updateCollection2Scene($data['id'],$scenes);
    
        if(isset($file)){
            if($return==0) $name = $data['id'];
            $directory = $_SERVER["DOCUMENT_ROOT"].$directory;
            if($this->account == 1) $name = "/scene-".$data['name'].".$ext";
            if (!file_exists($directory)) mkdir($directory, 0755, true);
            $file->moveTo($directory.$name);
        }
    
    
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
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
    
    function updateCollection2Scene($id, $scenes){
        $queries = [];
        $queries[] = "DELETE FROM collection2scene WHERE collection_id = $id";
        foreach($scenes as $scene){$queries[] = "INSERT INTO collection2scene SET collection_id = $id, scene_id = $scene";}
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
        
        return "Deleted record ".$id['value'];
        }
    
    function getUiScrollSounds($descriptor){
        $nFilter = '';
        $tFilter = '';
        if(array_key_exists("nFilter", $descriptor)) $nFilter = $descriptor['nFilter'];
        if(array_key_exists("tFilter", $descriptor)) $tFilter = $descriptor['tFilter'];
        $queryMeat = "FROM sounds WHERE (account = $this->account OR account = 0) AND (`name` LIKE '%$nFilter%' OR `desc` LIKE '%$nFilter%') AND `tags` LIKE '%$tFilter%'";
        $query = "SELECT COUNT(`name`) $queryMeat";
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
                $query = "SELECT * FROM (SELECT *,1 as rank $queryMeat ORDER BY `name` DESC LIMIT $limit) a
                            UNION ALL SELECT * FROM (SELECT *,2 as rank $queryMeat LIMIT $blimit) b
                            ORDER BY Rank ,`name`";
            }
            else $query = "SELECT * FROM (SELECT * $queryMeat ORDER BY `name` DESC LIMIT $index, $dcount) a ORDER BY `name`";
        } 
        else{
            if($index+$dcount > $count){
                $blimit = (abs($index)+$dcount)-$count;
                $limit = $count - abs($index);
                $query = "SELECT * FROM (SELECT *,1 as rank $queryMeat LIMIT $limit) a
                            UNION ALL SELECT * FROM (SELECT *,2 as rank $queryMeat ORDER BY `name` DESC LIMIT $blimit) b
                            ORDER BY Rank ,`name`";
            }
            else $query = "SELECT * $queryMeat ORDER BY `name` LIMIT $index, $dcount";
    
        } 
        error_log ($dcount."|".$index."|".$descriptor['index']."|".$query);
        $sounds=[];
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $sounds[]=$row;
            }
            $result->close();
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n $query \n"; 
        var_dump($this->mysqli->error); 
        } 
        
    
        return $sounds;
        }
    
    function getSounds(){
        $query = "SELECT * FROM sounds WHERE account = $this->account OR account = 1";
        $sounds= [];
        $tags= [];
        $tags['ambience'] = [];
        $tags['fx'] = [];
        $tags['music'] = [];
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $tagArray = explode(",",$row['tags']);
                $tags[$row['category']] = array_merge($tags[$row['category']],$tagArray);
                $sounds[$row['category']][]=$row;
            }
            $result->close();
        }
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
        } 
        
        $tags['ambience'] = array_unique($tags['ambience']);
        $tags['fx'] = array_unique($tags['fx']);
        $tags['music'] = array_unique($tags['music']);
        return array("sounds"=>$sounds,"tags"=>$tags);
        }
    
    function duplicateCollection($param){
        $account = $this->account;
        $fromCollection = $param['collectionId'];
        $query = "SELECT * FROM collection2scene WHERE collection_id=$fromCollection";
        $scenes= [];
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $scenes[]=$row['scene_id'];
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
            $query = "INSERT IGNORE INTO collection2scene SET collection_id = $toCollection, scene_id = $value";
            $this->mysqli->query($query);
            }
    
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
                echo "\n\n".$query; 
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
            $value = $this->duplicateEffect($newParam);
            }
        $query = "INSERT INTO scene (`name`,
            `account`,
            `desc`,
            `vol`,
            `fadeIn`,
            `fadeOut`,
            `sceneSolo`,
            `img`) 
            SELECT `name`,
            $account,
            `desc`,
            `vol`,
            `fadeIn`,
            `fadeOut`,
            `sceneSolo`,
            `img` FROM scene WHERE id=$fromScene AND NOT EXISTS (SELECT * FROM scene s1 JOIN scene s2 ON s1.`name` = s2.`name` WHERE s1.id = $fromScene AND s2.account = $account)";
            echo $query."<br><br>";
        $this->mysqli->query($query);
        $toScene = $this->mysqli->insert_id;
        if($toScene == 0){
        $query = "SELECT s2.* FROM scene s1 JOIN scene s2 ON s1.`name` = s2.`name` WHERE s1.id = $fromScene AND s2.account = $account";
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $toScene=$row['id'];
            }
            $result->close();
        }		
        }
    
        foreach($effects as $value){
            $query = "INSERT IGNORE INTO scene2effect SET scene_id = $toScene, effect_id = $value";
            $this->mysqli->query($query);
            }
    
        if ($this->mysqli->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->mysqli->error); 
                echo "\n\n".$query; 
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
                `seq` FROM effect WHERE id=$fromEffect AND NOT EXISTS (SELECT * FROM effect s1 JOIN effect s2 ON s1.`name` = s2.`name` WHERE s1.id = $fromEffect AND s2.account = $account)";
        echo $query."<br><br>";
        $this->mysqli->query($query);
        $toEffect = $this->mysqli->insert_id;
        if($toEffect == 0){
        $query = "SELECT s2.* FROM effect s1 JOIN effect s2 ON s1.`name` = s2.`name` WHERE s1.id = $fromEffect AND s2.account = $account";
        if ($result = $this->mysqli->query($query)) {
            while($row=$result->fetch_assoc()){
                $toEffect=$row['id'];
            }
            $result->close();
        }		
        }
            if ($this->mysqli->errno) { 
                echo "Mysqli failed.\n"; 
                var_dump($this->mysqli->error); 
                echo "\n\n".$query; 
                } 
            return $toEffect;
    
        }
    
    }