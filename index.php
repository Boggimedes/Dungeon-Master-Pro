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
if(!isset($_SESSION["logged-in"])) $_SESSION["logged-in"] = false;
if(!isset($_SESSION["roll"])) $_SESSION["roll"] = '';
if(!isset($_SESSION["id"])) $_SESSION["id"] = 1;

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
if(SLIM_DEBUG){$app->config('debug',true);}

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






// /**
// * User registration
// * url - /register
// * method - POST
// * params - name, email, password
// */
$app->post('/register', function() use ($app) {
  // check for required params
  verifyRequiredParams(array('name', 'email', 'password'));
  $response = array();
  // reading post params
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  // validating email address
  validateEmail($email);

  $db = new DbHandler($this->db);
  $res = $db->createUser($name, $email, $password);
  if ($res == USER_CREATED_SUCCESSFULLY) {
      $response["error"] = false;
      $response["message"] = "You are successfully registered";
      echoResponse(201, $response);
     return $response;
 } else if ($res == USER_CREATE_FAILED) {
      $response["error"] = true;
      $response["message"] = "Oops! An error occurred while registereing";
      echoResponse(200, $response);
     return $response;
  } else if ($res == USER_ALREADY_EXISTED) {
      $response["error"] = true;
      $response["message"] = "Sorry, this email already existed";
     return $response;
      echoResponse(200, $response);
  }
});
// /**
// * User Login
// * url - /login
// * method - POST
// * params - email, password
// */


$app->map(['GET', 'POST'],'/login', function (Request $request, Response $response, $args) use($app) {
    if($request->getMethod()=="GET"){
        return $this->view->render($response, 'login.php', ['message' => ""]);   
        }
        else{
            $email = $_POST['email'];
            $password = $_POST['password'];
            $db = new DbHandler($this->db);
            // check for correct email and password
            if ($db->checkLogin($email, $password)) {
            // get the user by email
            $_SESSION["logged-in"] = true;
            $_SESSION["roll"] = "admin";
            return $response->withStatus(200)->withHeader('Location', '/');
            } else {
            // user credentials are wrong
            $resp['error'] = true;
            $resp['message'] = 'Login failed. Incorrect credentials';
            return $this->view->render($response, 'login.php', ['message' => $resp['message']]);   
            }

            }

});

// $app->post('/login', function(Request $request, Response $response) {
//     $resp = verifyRequiredParams(array('email', 'password'));
//   // reading post params
//     $test = "test";
  // $email = $_POST['email'];
  // $password = $_POST['password'];
  // $db = new DbHandler($this->db);
  // // check for correct email and password
  // if ($db->checkLogin($email, $password)) {
  //     // get the user by email

  //   $_SESSION["logged-in"] = true;
  //   $_SESSION["roll"] = "admin";
  //     } else {
  //         // user credentials are wrong
  //  $resp = array();
  //        $resp['error'] = true;
  //         $resp['message'] = 'Login failed. Incorrect credentials';
  //     }
  //     $response = $resp;
//    return "test";
// });


// /**
// * Creating new task in db
// * method POST
// * params - name
// * url - /tasks/
// */
$app->post('/tasks', 'authenticate', function() use ($app){
  verifyRequiredParams(array('task'));
  $response = array();
  $task = $app->request->post('task');
  global $user_id;
  $db = new DbHandler($this->db);
  // creating new task
  $task_id = $db->createTask($user_id, $task);
  if ($task_id != NULL) {
      $response["error"] = false;
      $response["message"] = "Task created successfully";
      $response["task_id"] = $task_id;
  } else {
      $response["error"] = true;
      $response["message"] = "Failed to create task. Please try again";
  }
  echoResponse(201, $response);
});
// /**
// * Listing all tasks of particular user
// * method GET
// * url /tasks
// */
$app->get('/tasks', 'authenticate', function(){
  global $user_id;
  $response = array();
  $db = new DbHandler($this->db);
  // fetching all user tasks
  $result = $db->getAllUserTasks($user_id);
  $response["error"] = false;
  $response["tasks"] = array();
  // looping through result and preparing tasks array
  while ($task = $result->fetch_assoc()) {
      $tmp = array();
      $tmp["id"] = $task["id"];
      $tmp["task"] = $task["task"];
      $tmp["status"] = $task["status"];
      $tmp["createdAt"] = $task["created_at"];
      array_push($response["tasks"], $tmp);
  }
  echoResponse(200, $response);
});
// /**
// * Listing single task of particular user
// * method GET
// * url /tasks/:id
// * Return 404 if task doesn't belong to user
// */
$app->get('/tasks/:task_id', 'authenticate', function($task_id){
  global $user_id;
  $response = array();
  $db = new DbHandler($this->db);
  // fetch task
  $result = $db->getTask($task_id, $user_id);
  if ($result != NULL) {
      $response["error"] = false;
      $response["id"] = $result["id"];
      $response["task"] = $result["task"];
      $response["status"] = $result["status"];
      $response["createdAt"] = $result["created_at"];
      echoResponse(200, $response);
  } else {
      $response["error"] = true;
      $response["message"] = "The requested resource doesn't exists";
      echoResponse(404, $response);
  }
});
// /**
// * Updating existing task
// * method PUT
// * params task, status
// * url - /tasks/:id
// */
$app->put('/tasks/:task_id', 'authenticate', function($task_id) use($app) {
  verifyRequiredParams(array('task', 'status'));
  global $user_id;
  $task = $app->request->put('task');
  $status = $app->request->put('status');
  $db = new DbHandler($this->db);
  $response = array();
  // updating task
  $result = $db->updateTask($user_id, $task_id, $task, $status);
  if ($result) {
      // task updated successfully
      $response["error"] = false;
      $response["message"] = "Task updated successfully";
  } else {
      // task failed to update
      $response["error"] = true;
      $response["message"] = "Task failed to update. Please try again!";
  }
  echoResponse(200, $response);
});
// /**
//  * Deleting task. Users can delete only their tasks
//  * method DELETE
//  * url /tasks
//  */
$app->delete('/tasks/:task_id', 'authenticate', function($task_id) use($app) {
    global $user_id;
    $db = new DbHandler($this->db);
    $response = array();
    $result = $db->deleteTask($user_id, $task_id);
    if ($result) {
        // task deleted successfully
        $response["error"] = false;
        $response["message"] = "Task deleted succesfully";
    } else {
        // task failed to delete
        $response["error"] = true;
        $response["message"] = "Task failed to delete. Please try again!";
    }
    echoResponse(200, $response);
});


$app->post('/api/main/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $param['account'] = 1;

    switch($action){

     case 'setshowfile':
        $path = $param['path'];
        $accnt = $param['account'];
        $query  = "UPDATE accounts SET showfile = '$path' WHERE id = $accnt";

        $result = $this->db->query($query);

        if ($this->db->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->db->error); 
        } 

         break;
    }

    return $response;
    });

$app->get('/account/{accnt}/view', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $accnt = $request->getAttribute('accnt');


        $query  = "SELECT showfile FROM accounts  WHERE id = $accnt";
        $result = $this->db->query($query);
        $row=$result->fetch_assoc();
        $file= $row['showfile'];

        if ($this->db->errno) { 
        echo "Mysqli failed.\n"; 
        var_dump($this->db->error); 
        } 
        $response = "<script src=\"http://livejs.com/live.js\"></script><img src='/$file' />";

    return $response;
    });

$app->post('/api/citizens/seedregion', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);
    return $api->seedRegion();
    });

$app->post('/api/citizens/getcitizens', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);
    $api->getCitizensArray($param);
    $citizens = json_encode($api->citizens);
    return $citizens;
    });


$app->post('/api/citizens/getcitizen', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $id = $request->getAttribute('id');
    $api = new citizenAPI(1, $param['region'],$this->db);
    $citizen = json_encode($api->getCitizenDetails($param));
    return $citizen;
    });


$app->post('/api/citizens/getraces', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);
    $races = json_encode($api->races);
    return $races;
    });


$app->post('/api/citizens/getaspects', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);
    $aspects = json_encode($api->getAspects($param['region']));
    return $aspects;
    });

$app->post('/api/citizens/ageregion', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);
    return $api->ageRegion($param['years']);
    });


$app->post('/api/citizens/{table}/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $table = $request->getAttribute('table');
    $api = new citizenAPI(1, $param['region'],$this->db);

    switch($action){

     case 'add':
        $api->addNPCRecord($table,$param);
        break;

     case 'update':
        $api->updateNPCRecord($table,$param);
     break;

     case 'delete':
        $api->deleteNPCRecord($table,$param);
        break;

     case 'clear':
        $api->clearRegion($param['region']);
        break;

     case 'get':
        if($table == "region") $response = json_encode($api->getRegions($param));
        if($table == "descriptives") $response = json_encode($api->getDescriptives($param));
        break;
    }

    return $response;
    });

$app->post('/api/sound/{table}/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $table = $request->getAttribute('table');
    $account=1;
    $api = new soundAPI($account,$this->db);

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

        case 'update':
            print_r($param);
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

    return $response;
    });

$app->post('/api/monster/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $param['account']=1;
    $api = new monsterAPI($param['account'],$this->db);

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
            print_r($param);
            $response = json_encode($api->addMonster($param));
        break;

        case 'update':
            print_r($param);
            $response = json_encode($api->updateMonster($param));
        break;

        case 'delete':
            $response = json_encode($api->updateMonster($param));
        break;

   }

        return $response;
    });

$app->post('/api/spell/{action}', function (Request $request, Response $response) {

    $param = $request->getParsedBody();
    $action = $request->getAttribute('action');
    $param['account']=1;
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
            $response = json_encode($api->getMonsters($param));
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
            $response = json_encode($api->addMonster($param));
        break;

        case 'update':
            print_r($param);
            $response = json_encode($api->updateMonster($param));
        break;

        case 'delete':
            $response = json_encode($api->updateMonster($param));
        break;

   }

        return $response;
    });

$app->get('/api/citizens/getWorld', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    $api = new citizenAPI(1, $param['region'],$this->db);

    $response = new stdClass;

    $response->races = [];
    foreach($api->races as $key=>$value){
        if(is_numeric($key)){$response->races[]=$value;}
    }
    $response->descriptives = $api->getDescriptives($param);
    $response->professions = $api->getProfessions($param);
    $response->regions = $api->getRegions($param);

    return json_encode($response);
});



// $app->get('/world', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });

// $app->get('/npcs/{id}', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });


// $app->get('/soundboard', function (Request $request, Response $response) {
//     print_r($_SESSION);
//     if($_SESSION['logged-in']) {
//         $response = file_get_contents('index.html');
//         return $response;
//         }
//         else  return $response->withStatus(302)->withHeader('Location', 'user-login');

// });

$app->get('/api/settings/get', function (Request $request, Response $response) {
    $query  = "SELECT name,email,settings FROM users WHERE id = {$_SESSION['id']}";
    if ($result = $this->db->query($query)) {
                while ($row = $result->fetch_assoc ()) {
                  $row['settings'] = json_decode($row['settings']);;
                  $response = $row;
                }
                $result->close();
    }    
    return json_encode($response);
});


$app->post('/api/settings/set', function (Request $request, Response $response) {
    $param = $request->getParsedBody();
    if(array_key_exists("file",$param)) $file = $param['file'];
    // if($param['password']){
    //   $db = new DbHandler($this->db);
    //   $res = $db->updatePassword($_SESSION['id'], $password);
    //   }
       if(array_key_exists("email",$param)) $set = "`email` = '".$param['email']."'";
       if(array_key_exists("name",$param)) $set = "`name` = '".$param['name']."'";
       if(array_key_exists("settings",$param)) $set = "`settings` = '".json_encode($param['settings'])."'";
      if($file){
        //save file as user/id/user.css
      }
    $query  = "UPDATE users SET $set WHERE id = '{$_SESSION['id']}'";
    $result = $this->db->query($query);

    return "Updated";
});


$app->get('/logout', function (Request $request, Response $response) {
    session_destroy(); 
    return $response->withStatus(200)->withHeader('Location', '/login');
});

$app->get('/{a}[/{b}[/{c}]]', function (Request $request, Response $response) {
    if($_SESSION['logged-in']) {
        $response = file_get_contents('index.html');
        return $response;
        }
        else  return $response->withStatus(302)->withHeader('Location', 'login');
});



// $app->get('/edit/effect/{id}', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });


// $app->get('/edit/{type}/{id}', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });

// $app->get('/edit/monster/{id}', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });

// $app->get('/edit/spells', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });

// $app->get('/edit/spell/{id}', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });


// $app->get('/edit', function (Request $request, Response $response) {
//     $response = file_get_contents('index.html');
//     return $response;
// });



$app->run();
