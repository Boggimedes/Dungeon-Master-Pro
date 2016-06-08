<?php
// Routes

// /**
// * User registration
// * url - /register
// * method - POST
// * params - name, email, password
// */
$app->post('/register', function (Request $request, Response $response, $args) use($app) {
  // check for required params
  verifyRequiredParams(array('name', 'email', 'password'));
  // reading post params
             $param = $request->getParsedBody();
 $name = $param['name'];
  $email = $param['email'];
  $password = $param['password'];
  // validating email address
  validateEmail($email);

  $db = new DbHandler($this->db);
  $res = $db->createUser($name, $email, $password);
  if ($res == USER_CREATED_SUCCESSFULLY) {
      $_SESSION["logged-in"] = true;
      $_SESSION["roll"] = "admin";
      $body = $response->getBody();
      $body->write("You are successfully registered");
      return $response->withStatus(200)->withHeader('Location', '/');
 } else if ($res == USER_CREATE_FAILED) {
      $body = $response->getBody();
      $body->write("You are successfully registered");
      return $response->withStatus(500);
  } else if ($res == USER_ALREADY_EXISTED) {
      $body = $response->getBody();
      $body->write("Sorry, this email already existed");
      return $response->withStatus(406);
  }
});

// /**
// * User Login
// * url - /login
// * method - POST
// * params - email, password
// */



