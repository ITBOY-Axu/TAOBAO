<?php
include "conn.php";
$result = $conn->query("select * from local limit 0,12");
$location = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $location[$i] = $result->fetch_assoc();
}

echo json_encode($location);

