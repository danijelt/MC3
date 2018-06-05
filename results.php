<?php

$results_file = "./results.json";

if (!file_exists($results_file)) {
    $myfile = fopen($results_file, "w") or die("Unable to open file!");
    fwrite($myfile, "{\"Me\": 1}");
    fclose($myfile);
}

$results = json_decode(file_get_contents($results_file), true);

if (isset($_POST["set_result"])) {
    //echo "set_result\n";
    $player = $_POST["player"];
    //echo "player:" . $player . "\n";

    if (array_key_exists($player, $results)) {
        //echo "key exists";
        $results[$player]++;
    } else {
        //echo "key doesn't exist";
        $results[$player] = 1;
    }
    //echo "\nfile put content\n";
    file_put_contents($results_file, json_encode($results));
    //echo "return\n";
    return http_response_code(200);
}

if (isset($_POST["get_results"])) {
    header('Content-type: application/json');
    echo json_encode($results);
}

?>