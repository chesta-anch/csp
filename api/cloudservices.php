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
        $allservices = mysqli_query($db_conn, "SELECT * FROM cloudservices");
        if (mysqli_num_rows($allservices) > 0) {
            while ($row = mysqli_fetch_array($allservices)) {
                $json_array["serverdata"][] = array("serviceName" => $row['serviceName'], "cloudType" => $row["cloudType"], "dataSecurityFeatures" => $row["dataSecurityFeatures"], "yearlyBudget" => $row["yearlyBudget"]);
            }
            echo json_encode($json_array["serverdata"]);
            return;
        } else {
            echo json_encode(["result" => "Please check the Data"]);
            return;
        }
        break;

    case "POST":
        // Retrieve user input data
        $cloudServiceData = json_decode(file_get_contents('php://input'), true);
        $noOfEmployees = $cloudServiceData['noOfEmployees'];
        $annualRevenue = $cloudServiceData['annualRevenue'];
        $cloudType = $cloudServiceData['cloudServicesType'];
        $dataSecurityFeatures = $cloudServiceData['dataStorageSecurity'];
        $budget = $cloudServiceData['budget'];

        // Define weights for each criterion
        $weights = [
            'noOfEmployees' => 0.1,
            'revenue' => 0.1,
            'cloudType' => 0.15,
            'dataSecurityFeatures' => 0.15,
            'budget' => 0.1
        ];
        
        // Retrieve cloud services data from the database
        $allservices = mysqli_query($db_conn, "SELECT * FROM cloudservices");
        if ($allservices) {
            // Assign scores for each criterion
            $scores = [];
            while ($server = mysqli_fetch_array($allservices)) {
                $score = 0;
                $scoreNoOfEmployees = $weights['noOfEmployees'] * $noOfEmployees;
                $score += $scoreNoOfEmployees;
                
                $scoreAnnualRevenue = $weights['revenue'] * $annualRevenue;
                $score += $scoreAnnualRevenue;
                
                $serverCloudType = json_decode($server['cloudType'], true);
                if (is_array($serverCloudType) && count($serverCloudType) > 0) {
                    if(is_array($cloudType) && count($cloudType) > 0){
                        if(count(array_intersect($cloudType, $serverCloudType)) > 0){
                            $score += $weights['cloudType'] * ((count(array_intersect($cloudType, $serverCloudType)))+1);
                        }
                    }
                }
                
                // Step: Score calculation for dataSecurityFeatures
                $serverSecurityFeatures = json_decode($server['dataSecurityFeatures'], true);
                if (is_array($serverSecurityFeatures) && count($serverSecurityFeatures) > 0 && is_array($dataSecurityFeatures) && count($dataSecurityFeatures) > 0) {
                    $matchingSecurityFeatures = array_intersect($dataSecurityFeatures, $serverSecurityFeatures);
                    if (count($matchingSecurityFeatures) > 0) {
                        $score += $weights['dataSecurityFeatures'] * count($matchingSecurityFeatures);
                    }
                }
                
    

                // Step: Score calculation for budget
                $budgetRange = explode(' - ', $server['yearlyBudget']);
                $minBudget = intval(str_replace('$', '', $budgetRange[0])); // Remove '$' and convert to integer
                $maxBudget = intval(str_replace('$', '', $budgetRange[1])); // Remove '$' and convert to integer
                $avgBudget = ($minBudget + $maxBudget) / 2; // Calculate average budget
                // Normalize the yearlyBudget to a scale of 0 to 1
                $normalizedBudget = (($avgBudget - $minBudget) / ($maxBudget - $minBudget))/1000;
                // Normalize the user-input budget to a scale of 0 to 1
                $normalizedUserBudget = (($budget - $minBudget) / ($maxBudget - $minBudget))/1000;
                // Use the maximum of the normalized user-input budget and the normalized budget range average
                $finalNormalizedBudget = max($normalizedBudget, $normalizedUserBudget);
                // Use the final normalized budget for calculation
                $scoreBudget = $weights['budget'] * $finalNormalizedBudget;
                $score += $scoreBudget;

                $scores[$server['serviceName']] = $score; // Use 'serviceName' instead of 'name'
            }
    
            // Sort scores in descending order
            arsort($scores);
    
            // Select top three cloud services
            $topThree = array_slice($scores, 0, 3);
    
            // Output the top three cloud services along with scores and steps
            $output = [];
            $output['topThreeCloudServices'] = [];
            foreach ($topThree as $serviceName => $score) { // Use 'serviceName' instead of 'name'
                $final = mysqli_query($db_conn, "SELECT * FROM cloudservices WHERE serviceName = '$serviceName'");
                if ($final && mysqli_num_rows($final) > 0) {
                    while ($row = mysqli_fetch_assoc($final)) {
                        $output['topThreeCloudServices'][] = [
                            'serviceName' => $row['serviceName'],
                            'score' => $score,
                            'cloudType' => $row["cloudType"],
                            'dataSecurityFeatures' => $row["dataSecurityFeatures"],
                            'yearlyBudget' => $row["yearlyBudget"],
                            'jsx' => $row["jsx"]
                        ];
                    }
                }
            }
            // Add scores and steps to the output
            $output['scores'] = $scores;
            echo json_encode($output);
        } else {
            echo json_encode(["result" => "Error retrieving cloud services"]);
        }
        break;        
}
?>
