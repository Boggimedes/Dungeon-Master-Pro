<?php
class DbHandler {
    private $conn;
    function __construct($conn) {
        //require_once dirname(__FILE__) . '/DbConnect.php';
        // opening db connection
       // $db = new DbConnect();
        $this->conn = $conn;
    }
    /* ------------- `users` table method ------------------ */
    /**
     * Creating new user
     * @param String $name User full name
     * @param String $email User login email id
     * @param String $password User login password
     */
    public function createUser($name, $email, $password) {
        require_once 'PassHash.php';
        $response = array();
        // First check if user already existed in db
        if (!$this->isUserExists($email)) {
            // Generating password hash
            $password_hash = PassHash::hash($password);
            // Generating API key
            //$api_key = $this->generateApiKey();
            // insert query
            $stmt = $this->conn->prepare("INSERT INTO users(name, email, password_hash, settings) values(?, ?, ?, ?)");
            $settings = '{"monsterImages":true,"advDisAdv":true,"customCSS":"default","defaultMonsters":true,"defaultSpells":true}';
            $stmt->bind_param("ssss", $name, $email, $password_hash, $settings);
            $result = $stmt->execute();
            $stmt->close();
            // Check for successful insertion
            if ($result) {
                // User successfully inserted
                return $this->conn->insert_id;
            } else {
                // Failed to create user
                return USER_CREATE_FAILED;
            }
        } else {
            // User with same email already existed in the db
            return USER_ALREADY_EXISTED;
        }
        return $response;
    }
    /**
     * Checking user login
     * @param String $email User login email id
     * @param String $password User login password
     * @return boolean User login status success/fail
     */
    public function checkLogin($email, $password) {
        // fetching user by email
        $stmt = $this->conn->prepare("SELECT password_hash, name, email, settings, id, paymentId FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($password_hash,$name,$email,$settings,$id,$paymentId);
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            // Found user with the email
            // Now verify the password
            $stmt->fetch();
            $stmt->close();
            if (PassHash::check_password($password_hash, $password)) {
                // User password is correct
                $return = [];
                $return['settings'] = $settings;
                $return['name'] = $name;
                $return['email'] = $email;
                $return['id'] = $id;
                $return['paymentId'] = $paymentId;
                return $return;
            } else {
                // user password is incorrect
                return FALSE;
            }
        } else {
            $stmt->close();
            // user not existed with the email
            return FALSE;
        }
    }

   public function resetPassword($id, $newPw) {
        require_once 'PassHash.php';
        $response = array();
        // First check if user already existed in db
            $password_hash = PassHash::hash($newPw);
            // Generating API key
            //$api_key = $this->generateApiKey();
            // insert query
            $stmt = $this->conn->prepare("UPDATE users(password_hash) values(?)");
            $stmt->bind_param("s", $password_hash);
            $result = $stmt->execute();
            $stmt->close();
            // Check for successful insertion
            if ($result) {
                // User successfully inserted
                return PASSWORD_RESET_SUCCESS;
            } else {
                // Failed to create user
                return USER_CREATE_FAILED;
            }
    }

    public function checkToken($token) {
        // fetching user by email
        $stmt = $this->conn->prepare("SELECT name, email, settings, id, paymentId FROM users WHERE token = ?");
        $stmt->bind_param("s", $token);
        $stmt->execute();
        $stmt->bind_result($name,$email,$settings,$id,$paymentId);
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            // Found user with the email
            // Now verify the password
            $stmt->fetch();
            $stmt->close();
                // User password is correct
                $return = [];
                $return['settings'] = $settings;
                $return['name'] = $name;
                $return['email'] = $email;
                $return['id'] = $id;
                $return['paymentId'] = $paymentId;
                return $return;
        } else {
            $stmt->close();
            // user not existed with the email
            return FALSE;
        }
    }

    public function setToken($token) {
        echo "set-token";
        if(!isset($_SESSION["id"])) return;

            $stmt = $this->conn->prepare("UPDATE users SET token = ? WHERE id = ?");
            $stmt->bind_param("ss", $token, $_SESSION["id"]);
            $result = $stmt->execute();
            $stmt->close();
            // Check for successful insertion
            if ($result) {
                // User successfully inserted
                return USER_CREATED_SUCCESSFULLY;
            } else {
                // Failed to create user
                return USER_CREATE_FAILED;
            }
    }


    /**
     * Checking for duplicate user by email address
     * @param String $email email to check in db
     * @return boolean
     */
    private function isUserExists($email) {
        $stmt = $this->conn->prepare("SELECT id from users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->store_result();
        $num_rows = $stmt->num_rows;
        $stmt->close();
        return $num_rows > 0;
    }
    /**
     * Fetching user by email
     * @param String $email User email id
     */
    public function getUserByEmail($email) {
        $stmt = $this->conn->prepare("SELECT name, email, api_key, status, joinDate FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();
            return $user;
        } else {
            return NULL;
        }
    }

    public function updateUser($userData, $id){
    $qArray = [];
    foreach($userData as $key=>$value){
        if(is_numeric($value)) $qArray[] = " `$key` = $value";
            else $qArray[] = " `$key` = '".$this->conn->real_escape_string($value)."'";
        }
    $qArray = implode(",",$qArray);
    $query = "UPDATE users SET $qArray WHERE id=$id";
    $this->conn->query($query);
    if ($this->conn->errno) { 
    echo "Mysqli failed.\n"; 
    var_dump($this->conn->error); 
    } 
    }
}
?>