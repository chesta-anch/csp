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

switch ($method) {
    case "GET":
        $allcloudrequirements = mysqli_query($db_conn, "SELECT * FROM cloudrequirement");
        if (mysqli_num_rows($allcloudrequirements) > 0) {
            $json_array = []; // Initialize the JSON array
            while ($row = mysqli_fetch_assoc($allcloudrequirements)) {
                // Build the array for each row of data
                $cloudrequirementData = [
                    "email" => $row['email'],
                    "companyName" => $row['companyName'],
                    //"password" => $row['password'],
                    "annualRevenue" => $row['annualRevenue'],
                    "budget" => $row['budget'],
                    //"cloudServiceProvider" => $row['cloudServiceProvider'],
                    "cloudServicesType" => json_decode($row['cloudServicesType']),
                    "contactNumber" => $row['contactNumber'],
                    "contactPerson" => $row['contactPerson'],
                    "costPreference" => $row['costPreference'],
                    "dataStorageSecurity" => json_decode($row['dataStorageSecurity']),
                    "industry" => $row['industry'],
                    "noOfEmployees" => $row['noOfEmployees'],
                    //"otherReasonText" => $row['otherReasonText'],
                    "performanceExpectation" => json_decode($row['performanceExpectation']),
                    "performanceMetrics" => json_decode($row['performanceMetrics']),
                    "scalabilityRequirement" => json_decode($row['scalabilityRequirement']),
                    "specificRequirements" => $row['specificRequirements'],
                    "typesOfData" => json_decode($row['typesOfData']),
                    "usingCloudServices" => $row['usingCloudServices']
                ];

                // Push each row's data into the JSON array
                $json_array[] = $cloudrequirementData;
            }

            // Encode the JSON array and echo it
            echo json_encode($json_array);
            return;
        } else {
            echo json_encode(["result" => "Please check the Data"]);
            return;
        }
        break;

    case "POST":
        // Read POST data
        $cloudRequirementPostData = json_decode(file_get_contents('php://input'), true);

        // Check if the required keys exist in the $cloudRequirementPostData array
        $requiredKeys = ['email', 'companyName', 'annualRevenue', 'budget', 'cloudServicesType', 'contactNumber', 'contactPerson', 'costPreference', 'dataStorageSecurity', 'industry', 'noOfEmployees', 'performanceExpectation', 'performanceMetrics', 'scalabilityRequirement', 'specificRequirements', 'typesOfData', 'usingCloudServices'];
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $cloudRequirementPostData)) {
                $cloudRequirementPostData[$key] = ''; // Set the value to '' if the key is missing
            }
        }

        // Extract data from POST request
        $email = $cloudRequirementPostData['email'];
        $companyName = $cloudRequirementPostData['companyName'];
        $annualRevenue = $cloudRequirementPostData['annualRevenue'];
        $budget = $cloudRequirementPostData['budget'];
        $cloudServicesType = json_encode($cloudRequirementPostData['cloudServicesType']);
        $contactNumber = $cloudRequirementPostData['contactNumber'];
        $contactPerson = $cloudRequirementPostData['contactPerson'];
        $costPreference = $cloudRequirementPostData['costPreference'];
        $dataStorageSecurity = json_encode($cloudRequirementPostData['dataStorageSecurity']);
        $industry = $cloudRequirementPostData['industry'];
        $noOfEmployees = $cloudRequirementPostData['noOfEmployees'];
        $performanceExpectation = json_encode($cloudRequirementPostData['performanceExpectation']);
        $performanceMetrics = json_encode($cloudRequirementPostData['performanceMetrics']);
        $scalabilityRequirement = json_encode($cloudRequirementPostData['scalabilityRequirement']);
        $specificRequirements = $cloudRequirementPostData['specificRequirements'];
        $typesOfData = json_encode($cloudRequirementPostData['typesOfData']);
        $usingCloudServices = $cloudRequirementPostData['usingCloudServices'];

        // Convert empty string to NULL for integer fields
        $annualRevenue = ($annualRevenue === '') ? 'NULL' : $annualRevenue;
        $budget = ($budget === '') ? 'NULL' : $budget;
        $noOfEmployees = ($noOfEmployees === '') ? 'NULL' : $noOfEmployees;

        // Check if the record exists for the given email and company name
        $checkQuery = "SELECT * FROM cloudrequirement WHERE email='$email' AND companyName='$companyName'";
        $checkResult = mysqli_query($db_conn, $checkQuery);

        if (mysqli_num_rows($checkResult) > 0) {
            // Update the existing record
            $updateQuery = "UPDATE cloudrequirement SET ";
            // Add update statements for each field
            $updateQuery .= "annualRevenue = $annualRevenue, ";
            $updateQuery .= "budget = $budget, ";
            $updateQuery .= "cloudServicesType = '$cloudServicesType', ";
            $updateQuery .= "contactNumber = '$contactNumber', ";
            $updateQuery .= "contactPerson = '$contactPerson', ";
            $updateQuery .= "costPreference = '$costPreference', ";
            $updateQuery .= "dataStorageSecurity = '$dataStorageSecurity', ";
            $updateQuery .= "industry = '$industry', ";
            $updateQuery .= "noOfEmployees = $noOfEmployees, ";
            $updateQuery .= "performanceExpectation = '$performanceExpectation', ";
            $updateQuery .= "performanceMetrics = '$performanceMetrics', ";
            $updateQuery .= "scalabilityRequirement = '$scalabilityRequirement', ";
            $updateQuery .= "specificRequirements = '$specificRequirements', ";
            $updateQuery .= "typesOfData = '$typesOfData', ";
            $updateQuery .= "usingCloudServices = '$usingCloudServices' ";
            $updateQuery .= "WHERE email='$email' AND companyName='$companyName'";

            // Execute the update query
            mysqli_query($db_conn, $updateQuery);

            echo json_encode(["result" => "Record updated successfully"]);
        } else {
            // Insert a new record
            $insertQuery = "INSERT INTO cloudrequirement (companyName, annualRevenue, budget, cloudServicesType, contactNumber, contactPerson, costPreference, dataStorageSecurity, industry, noOfEmployees,  performanceExpectation, performanceMetrics, scalabilityRequirement, specificRequirements, typesOfData, usingCloudServices) 
            VALUES('$companyName', $annualRevenue, $budget, '$cloudServicesType', '$contactNumber', '$contactPerson', '$costPreference', '$dataStorageSecurity', '$industry', $noOfEmployees, '$performanceExpectation', '$performanceMetrics', '$scalabilityRequirement', '$specificRequirements', '$typesOfData', '$usingCloudServices' ) ";

            // Execute the insert query
            mysqli_query($db_conn, $insertQuery);

            echo json_encode(["result" => "Record inserted successfully"]);
        }

        return;
}
?>
