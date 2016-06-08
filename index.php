<?php
if (PHP_SAPI == 'cli-server') {
    // To help the built-in PHP dev server, check if the request was actually for
    // something which should probably be served as a static file
    $file = __DIR__ . $_SERVER['REQUEST_URI'];
    if (is_file($file)) {
        return false;
    }
}
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
// require_once 'include/DbHandler.php';  
// require_once 'include/PassHash.php';  
require_once __DIR__ . '/vendor/autoload.php';
require_once 'include/Utils.php';  
// require __DIR__ . '/classes/citizenAPI.php';
spl_autoload_register(function ($classname) {
    require ("classes/" . $classname . ".php");
});
session_start();
ini_set("session.gc_maxlifetime", 28800);
if(!isset($_SESSION["logged-in"])) $_SESSION["logged-in"] = false;
if(!isset($_SESSION["roll"])) $_SESSION["roll"] = '';
if(!isset($_SESSION["id"])) $_SESSION["id"] = '';

// Instantiate the app
$settings = require __DIR__ . '/src/settings.php';
$config['displayErrorDetails'] = true;

$config['db']['host']   = "p:localhost";
$config['db']['user']   = "localadmin";
$config['db']['pass']   = "2o3i!2oi3hf0923ih68";
$config['db']['dbname'] = "gm_master_tools";

$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {

        $db = $c['settings']['db'];

        $mysqli = new mysqli($db['host'],$db['user'],$db['pass'],'gm_master_tools' );
        /* check connection */
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        }
        $mysqli->set_charset("utf8");

    return $mysqli;
};

$container['view'] = function ($container) {
    return new \Slim\Views\PhpRenderer('');
};

// (Optional) Check if debug is true, show Slim debug report
//if(SLIM_DEBUG){$app->config('debug',true);}

// Set up dependencies
require __DIR__ . '/src/dependencies.php';

// Register middleware
require __DIR__ . '/src/middleware.php';

// Register routes
require __DIR__ . '/src/routes.php';

// Run app

$app->get('/', function (Request $request, Response $response) {
    $response = file_get_contents('index.html');
    return $response;
});


$auth = function ($request, $response, $next) {
     if($_SESSION['logged-in']) {
        $response = $next($request, $response);
         return $response;
             }
        elseif(isset($_COOKIE["token"])){
            $db = new DbHandler($this->db);
            $check = $db->checkToken($_COOKIE["token"]);
            if ($check) {
            $_SESSION["logged-in"] = true;
            $_SESSION["roll"] = "admin";
            $_SESSION["id"] = $check["id"];
            $_SESSION["settingsText"] = $check["settings"];
            $_SESSION["settings"] = json_decode($check["settings"]);
            $_SESSION["name"] = $check["name"];
            $_SESSION["email"] = $check["email"];
            $_SESSION["paymentId"] = $check["paymentId"];
            $token = bin2hex(random_bytes(78));
            setcookie("token", $token, time()+360000,"/");  /* expire in 1 hour */
            $db->setToken($token);
            $response = $next($request, $response);
            return $response;
            }
            else  return $response->withStatus(401); 
           
            }
            else  return $response->withStatus(401); 
};


$app->map(['GET', 'POST'],'/login', function (Request $request, Response $response, $args) use($app) {
    if($request->getMethod()=="GET"){
        return $this->view->render($response, 'login.php', ['message' => ""]);   
        }
        else{
            $param = $request->getParsedBody();
            $email = $param['email'];
            $password = $param['password'];
            $db = new DbHandler($this->db);
            // check for correct email and password
            $check = $db->checkLogin($email, $password);
            if ($check) {
            // get the user by email
            $_SESSION["logged-in"] = true;
            $_SESSION["roll"] = "admin";
            $_SESSION["id"] = $check["id"];
            $_SESSION["settingsText"] = $check["settings"];
            $_SESSION["settings"] = json_decode($check["settings"]);
            $_SESSION["name"] = $check["name"];
            $_SESSION["email"] = $check["email"];
            $_SESSION["paymentId"] = $check["paymentId"];
            $token = bin2hex(random_bytes(78));
            setcookie("token", $token, time()+360000,"/");  /* expire in 1 hour */
            $db->setToken($token);
            return $response->withStatus(200);
            } else {
            // user credentials are wrong
            $resp['error'] = true;
            $resp['message'] = 'Login failed. Incorrect credentials';
            $body = $response->getBody();
            $body->write("Login failed. Incorrect credentials");
            return $response->withStatus(401);
            }

            }
            $this->db->close();

});


$app->post('/api/user/reset-password', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $param['account'] = $_SESSION["id"];

    $db = new DbHandler($this->db);
    // check for correct email and password
    $check = $db->checkLogin($email, $password);
    $this->db->close();
    return $response;
    })->add($auth);

$app->map(['GET', 'POST'],'/register', function (Request $request, Response $response, $args) use($app) {
    if($request->getMethod()=="GET"){
        return $this->view->render($response, 'partials/sign-up.html', ['message' => ""]);   
        }
        else{
            $param = $request->getParsedBody();
            $name = $param['name'];
            $email = $param['email'];
            $password = $param['password'];
            $db = new DbHandler($this->db);
            // check for correct email and password
            $check = $db->createUser($name,$email, $password);
            if ($check) {
            // get the user by email
            // $_SESSION["logged-in"] = true;
            // $_SESSION["roll"] = "admin";
            // $_SESSION["id"] = $check["id"];
            // $_SESSION["settings"] = $check["settings"];
            // $_SESSION["name"] = $check["name"];
            // $_SESSION["email"] = $check["email"];
            // $token = bin2hex(random_bytes(78));
            // setcookie("token", $token, time()+360000);  /* expire in 1 hour */
            // $db->setToken($token);
            $param=[];

           //Create Races
        $query  = "INSERT INTO gm_master_tools.race 
            (`race`.`name`,
            `race`.`adulthood`,
            `race`.`middleAge`,
            `race`.`oldAge`,
            `race`.`venerable`,
            `race`.`maxAge`,
            `race`.`friendRate`,
            `race`.`enemyRate`,
            `race`.`account`)
        SELECT 
            `race`.`name`,
            `race`.`adulthood`,
            `race`.`middleAge`,
            `race`.`oldAge`,
            `race`.`venerable`,
            `race`.`maxAge`,
            `race`.`friendRate`,
            `race`.`enemyRate`,
            '$check' AS `account`
        FROM `gm_master_tools`.`race` WHERE account = 1";
        $result = $this->db->query($query);
        $query = "SELECT CONCAT('{',GROUP_CONCAT(CONCAT('\"',id,'\":{\"race\":\"',`name`,'\",\"value\":',IF(`name`='Human',40,20),'}') SEPARATOR ','),'}') AS racialBalance FROM race where account = $check AND `name` IN('Dwarf','Human','Gnome','Halfling','Half-Elf','Elf')";
        $result = $this->db->query($query);
        $row=$result->fetch_assoc();
        $param['racialBalance']= $row['racialBalance'];

            //Create Default Region
            $tmpdb = $this->db;
            $api = new citizenAPI($check, $param,$tmpdb);
            $param['name']="Default Region";
            $param['epoch']=1;

            $api->addNPCRecord("region",$param);


            //Create Descriptives
        $query  = "INSERT INTO gm_master_tools.descriptives 
            (`descriptives`.`account`,
            `descriptives`.`type`,
            `descriptives`.`text`,
            `descriptives`.`gender`)
        SELECT 
            '$check' AS `account`,
            `descriptives`.`type`,
            `descriptives`.`text`,
            `descriptives`.`gender`
        FROM `gm_master_tools`.`descriptives` WHERE account = 1";

        $result = $this->db->query($query);

            //Create Names
        $query  = "INSERT INTO gm_master_tools.names 
            (`names`.`account`,
            `names`.`name`,
            `names`.`race`,
            `names`.`gender`)
        SELECT 
            '$check' AS `account`,
            `names`.`name`,
            `names`.`race`,
            `names`.`gender`
        FROM `gm_master_tools`.`names` WHERE account = 1";

        $result = $this->db->query($query);

           //Create Professions
        $query  = "INSERT INTO gm_master_tools.profession 
            (`profession`.`name`,
            `profession`.`rate`,
            `profession`.`minAge`,
            `profession`.`maxAge`,
            `profession`.`account`)
        SELECT 
            `profession`.`name`,
            `profession`.`rate`,
            `profession`.`minAge`,
            `profession`.`maxAge`,
            '$check' AS `account`
        FROM `gm_master_tools`.`profession` WHERE account = 1";

        $result = $this->db->query($query);

            //Seed Region
            $tmpdb = $this->db;
            $api = new citizenAPI($check, null,$tmpdb);
            $api->seedRegion();
            //Age Region
            $api = new citizenAPI($check, null,$tmpdb);
            $api->ageRegion(200);

            //Duplicate Sounds from Base
            $api = new soundAPI($check,$this->db);
            $param=[];
            $param['collectionId'] = 1;
            $api->duplicateCollection($param);
            $param['collectionId'] = 2;
            $api->duplicateCollection($param);

            $this->db->close();
            return $response->withStatus(200);
            } else {
            // user credentials are wrong
            $resp['error'] = true;
            $resp['message'] = 'Login failed. Incorrect credentials';
            $body = $response->getBody();
            $body->write("Login failed. Incorrect credentials");
            return $response->withStatus(401);
            }

            }
});



$app->post('/api/user/membership', function (Request $request, Response $response) {
\Stripe\Stripe::setApiKey("sk_test_WRGKCK6Yb6uFfWFJmJ7C01up");
    $param = $request->getParsedBody();

    // Get the credit card details submitted by the form
    $token = $param['id'];
    if($_SESSION["paymentId"]==null){
        $customer = \Stripe\Customer::create(array(
          "source" => $token,
          "plan" => $param["payType"],
          "email" => $_SESSION["id"])
        );
    $userData=[];
    $userData['paymentId'] = $customer['id'];
    $user = new DbHandler($this->db);
    $user->updateUser($userData, $_SESSION["id"]);
    }    
    else{
        $cu = \Stripe\Customer::retrieve($_SESSION["paymentId"]);
        $cu->source = $token;
        $cu->plan = $param["payType"];
    if(array_key_exists("quantity", $param)) $cu->quantity = $param["quantity"];    
        $cu->save();
    }
    return $response;

});



$app->post('/api/main/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $param['account'] = $_SESSION["id"];

    switch($action){

     case 'setshowfile':
        $path = $param['path'];
        $accnt = $param['account'];
        $query  = "UPDATE users SET showfile = '$path' WHERE id = $accnt";

        $result = $this->db->query($query);

        if ($this->db->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->db->error); 
        } 

         break;
    }
    $this->db->close();
    return $response;
    })->add($auth);

$app->get('/account/{accnt}/view', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $accnt = $request->getAttribute('accnt');


        $query  = "SELECT showfile FROM users  WHERE id = $accnt";
        $result = $this->db->query($query);
        $row=$result->fetch_assoc();
        $file= $row['showfile'];

        if ($this->db->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->db->error); 
        } 
        $response = "<script src=\"http://livejs.com/live.js\"></script><img src='/$file' />";
        $this->db->close();
    return $response;
    });

$app->post('/api/citizens/seedregion', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $return = $api->seedRegion();
    $this->db->close();
    return $return;
    })->add($auth);

$app->post('/api/citizens/getcitizens', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $api->getCitizensArray($param);
    $citizens = json_encode($api->citizens);
    $this->db->close();
    return $citizens;
    })->add($auth);


$app->post('/api/citizens/getcitizen', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $id = $request->getAttribute('id');
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $citizen = json_encode($api->getCitizenDetails($param));
    $this->db->close();
    return $citizen;
    })->add($auth);


$app->post('/api/citizens/getraces', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $races = json_encode($api->races);
    $this->db->close();
    return $races;
    })->add($auth);


$app->post('/api/citizens/getaspects', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $aspects = json_encode($api->getAspects());
    $this->db->close();
    return $aspects;
    })->add($auth);

$app->post('/api/citizens/ageregion', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);
    $return = $api->ageRegion($param['years']);
    $this->db->close();
    return $return;
    })->add($auth);


$app->post('/api/citizens/{table}/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $table = $request->getAttribute('table');
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);

    switch($action){

     case 'add':
        $api->addNPCRecord($table,$param);
        break;

     case 'update':
        $response = $api->updateNPCRecord($table,$param);
     break;

     case 'delete':
        $api->deleteNPCRecord($table,$param);
        break;

     case 'clear':
        $api->clearRegion();
        break;

     case 'get':
        if($table == "region") $response = json_encode($api->getRegions($param));
        if($table == "descriptives") $response = json_encode($api->getDescriptives($param));
        break;
    }
    $this->db->close();
    return $response;
    })->add($auth);

$app->post('/api/sound/{table}/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $table = $request->getAttribute('table');
    $account=$_SESSION["id"];
    $api = new soundAPI($account,$this->db);
    $files = $request->getUploadedFiles();
    if (!empty($files['file'])) {
        $param['file']=$files['file'];
    }

    switch($action){

        case 'get':
            if($table == "scene"){
                $response = json_encode($api->getScenes($param),JSON_NUMERIC_CHECK );
            }
            if($table == "effect"){
                $response = json_encode($api->getEffects($param),JSON_NUMERIC_CHECK );
            }
            if($table == "collection"){
                $response = json_encode($api->getCollections($param),JSON_NUMERIC_CHECK );
            }
            if($table == "sounds"){
                $response = json_encode($api->getSounds(),JSON_NUMERIC_CHECK );
            }
        break;
        case 'getdetails':
            if($table == "collection"){
                $response = json_encode($api->getCollection($param),JSON_NUMERIC_CHECK );
            }
        break;
        case 'getui':
            $soundDescriptor = $param['descriptor'];
            $response = $api->getUiScrollSounds($soundDescriptor);
            $response = json_encode($response);
        break;

        case 'update':
            $response = json_encode($api->updateSoundRecord($table, $param),JSON_NUMERIC_CHECK );
        break;

        case 'add':
            print_r($param);
            $response = json_encode($api->addSoundRecord($table, $param),JSON_NUMERIC_CHECK );
        break;

        case 'delete':
            $response = json_encode($api->deleteSoundRecord($table, $param),JSON_NUMERIC_CHECK );
        break;
    }

    $this->db->close();
    return $response;
    })->add($auth);

$app->post('/api/monster/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $files = $request->getUploadedFiles();
    if (!empty($files['file'])) {
        $param['file']=$files['file'];
    }

    $api = new monsterAPI($_SESSION["id"],$this->db);

    switch($action){

         case 'getui':
            $monsterDescriptor = $param['descriptor'];
            $response = $api->getUiScrollMonsters($monsterDescriptor);

            // print_r($response);
            $response = json_encode($response);
            // echo json_last_error_msg();
        break;
        case 'get':
            $response = json_encode($api->getMonsters($param));
            //echo json_last_error_msg();
        break;

        case 'getspells':
            $response = json_encode($api->getSpells($param));
            //echo json_last_error_msg();
        break;

        case 'add':
            $response = json_encode($api->addMonster($param));
        break;

        case 'update':

            $response = json_encode($api->updateMonster($param));
        break;

        case 'delete':
            $response = json_encode($api->deleteMonster($param));
        break;

   }

    $this->db->close();
        return $response;
    })->add($auth);

$app->post('/api/spell/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $param['account']=$_SESSION["id"];
    $api = new spellAPI($param['account'],$this->db);

    switch($action){

         case 'getui':
            $monsterDescriptor = $param['descriptor'];
            $response = $api->getUiScrollMonsters($monsterDescriptor);

            // print_r($response);
            $response = json_encode($response);
            // echo json_last_error_msg();
        break;
        case 'get':
            $response = json_encode($api->getSpells($param));
            //echo json_last_error_msg();
        break;

        case 'getspells':
            $response = json_encode($api->getSpells($param));
            //echo json_last_error_msg();
        break;


        case 'getspellbasics':
            $response = json_encode($api->getSpellBasics($param));
            //echo json_last_error_msg();
        break;

        case 'add':
            print_r($param);
            $response = json_encode($api->addSpell($param));
        break;

        case 'update':
            print_r($param);
            $response = json_encode($api->updateSpell($param));
        break;

        case 'delete':
            $response = json_encode($api->updateSpell($param));
        break;

   }
    $this->db->close();
        return $response;
    })->add($auth);

$app->get('/api/citizens/getWorld', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI($_SESSION["id"], $param,$this->db);

    $response = new stdClass;

    $response->races = [];
    foreach($api->races as $key=>$value){
        if(is_numeric($key)){$response->races[]=$value;}
    }
    $response->descriptives = $api->getDescriptives($param);
    $response->professions = $api->getProfessions($param);
    $response->regions = $api->getRegions($param);
    $response->names = $api->getNames();
    $this->db->close();
    return json_encode($response);
})->add($auth);


$app->get('/api/settings/get', function (Request $request, Response $response) {
    $query  = "SELECT name,email,settings FROM users WHERE id = {$_SESSION['id']}";
    if ($result = $this->db->query($query)) {
                while ($row = $result->fetch_assoc ()) {
                  $row['settings'] = json_decode($row['settings']);
                  $row['loggedIn'] = true;
                  $response = $row;

                }
                $result->close();
    }    
    // require('classes/DwollaSwagger.php');
    // DwollaSwagger\Configuration::$access_token = 'PVIraViYni6kcn0zZfMMUBLwRW8wjTBBOtOkpANueEKIXUoepm';
    // $apiClient = new DwollaSwagger\ApiClient("https://api-uat.dwolla.com/");

    $this->db->close();
    return json_encode($response);
})->add($auth);


$app->post('/api/settings/set', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    if(array_key_exists("file",$param)){
$file = $param['file'];
        if($file){
        //save file as user/id/user.css
      }
    } 
    // if($param['password']){
    //   $db = new DbHandler($this->db);
    //   $res = $db->updatePassword($_SESSION['id'], $password);
    //   }
       if(array_key_exists("email",$param)){
        $set = "`email` = '".$param['email']."'";
        $_SESSION['email']=$param['email'];
        }
       if(array_key_exists("name",$param)){
        $set = "`name` = '".$param['name']."'";
        $_SESSION['name']=$param['name'];
        }
       if(array_key_exists("settings",$param)){
        $set = "`settings` = '".json_encode($param['settings'])."'";
        $_SESSION['settingsText']=json_encode($param['settings']);
        $_SESSION['settings']=json_decode(json_encode($param['settings']));
        }

    $query  = "UPDATE users SET $set WHERE id = '{$_SESSION['id']}'";
    $result = $this->db->query($query);
    $this->db->close();

    return "Updated";
})->add($auth);


$app->get('/logout', function (Request $request, Response $response) {
    $_SESSION["logged-in"] = false;
    $_SESSION["roll"] = '';
    $_SESSION["id"] = '';
    session_destroy(); 
    setcookie("token", '', 1,"/"); 
    return $response->withStatus(200)->withHeader('Location', '/');
});

$app->get('/sign-up', function (Request $request, Response $response) {
        return $this->view->render($response, 'sign-up.html', ['message' => ""]);   
});

$app->get('/api/get-waveform', function (Request $request, Response $response) {

    $param = $request->getQueryParams();

// we accept parameters as GET data
// e.g.: script.php?mode=file&wave_color=F00&prog_color=F00&back_color=0F0
$_POST['wavedir'] = __DIR__."/waveforms/";
$_POST['db'] = $this->db;
$justwave = new JustWave();
// create waveform image(s)
$justwave->create(__DIR__.$param['file']);
if($justwave->status == 'ok') {
$waveData=explode(";",$justwave->dataUrlWave);
$waveData=explode(",",$waveData[1]);
echo base64_decode($waveData[1]);
return $response->withStatus(200)->withHeader('Content-Type', 'content-type: image/png');

}
else
  echo 'Failed! Message = ' . $justwave->message;
});

$app->get('/{a}[/{b}[/{c}]]', function (Request $request, Response $response) {
        return file_get_contents('index.html');
});

$app->run();
