<?php
// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Database connection parameters
$servername = "localhost";  
$username = "root";     
$password = "chesta";    
$database = "cloudserver";   

// Create connection
$db_conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($db_conn->connect_error) {
    die("Connection failed: " . $db_conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        $alluser= mysqli_query($db_conn, "SELECT * FROM users"); 
        if(mysqli_num_rows($alluser) > 0)
        {
            while($row= mysqli_fetch_array($alluser))
            {
                $json_array["userdata"][]= array("email"=>$row['email'], "companyName"=>$row["companyName"], "password"=>$row["password"]);
            }
            echo json_encode($json_array["userdata"]);
            return;
        } else {
            echo json_encode(["result"=>"Please check the Data"]); 
            return;
        }
        break;

    case "POST":
        $userpostdata= json_decode(file_get_contents("php://input"));
        // echo "success data";
        // print_r($userpostdata); die;

        if(isset($userpostdata->login)){
            // Login validation
            $email = $userpostdata->email;
            $password = $userpostdata->password;
            
            $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
            $result = $db_conn->query($sql);

            if ($result->num_rows > 0) {// Fetch user data
                $row = $result->fetch_assoc();
                $email = $row['email'];
                $companyName = $row['companyName'];

                // Return success message along with email and companyName
                echo json_encode(["success" => "Login successful", "email" => $email, "companyName" => $companyName]);
            } else {
                echo json_encode(["error" => "Invalid email or password"]);
            }
        } elseif(isset($userpostdata->signup)){
            $email= $userpostdata->email;
        $companyName= $userpostdata->companyName;
        $password= $userpostdata->password;
        $result= mysqli_query($db_conn, "INSERT INTO users (email, companyName, password) 
        VALUES('$email', '$companyName', '$password')");

        if($result)
        {
            // Insert corresponding record into cloudrequirement table with default values
            $insertQuery = "INSERT INTO cloudrequirement (email, companyName) VALUES ('$email', '$companyName')";
            mysqli_query($db_conn, $insertQuery);

            echo json_encode(["success"=>"User Added Successfully"]);
            return;
        } else {
            echo json_encode(["success"=>"Please Check the User Data!"]);
            return; 
        }
        }
        
        break;
}
?>