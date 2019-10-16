<?php
include "conn.php";
$result = $conn->query("select  * from item limit 0,9");
$item = array();
for ($i = 0; $i < $result->num_rows; $i++) {
    $item[$i] = $result->fetch_assoc();
}

echo json_encode($item);