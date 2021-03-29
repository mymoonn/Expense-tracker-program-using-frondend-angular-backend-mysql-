<?php
include('dbconn.php');
$request_body = file_get_contents('php://input');
$data =json_decode($request_body, true);
//$data =$_POST;
    $type = $data['type'];
    $id =$data['id'];
    $date = $data['date'];
    $amount =$data['amount'];
    $description = $data['description'];
    $sql= "UPDATE incomeexpense SET date='$data', type='$type',  description='$description', amount='$amount' WHERE id=$id";
    echo $sql;
    if (!$type) {
        $resp = array(
            'success' => false,
            'message' => 'Invalid type',
            'amount' => $amount,
            'data' => $data
        );
        echo json_encode($resp);  
        exit;      
    }
    $err = $conn->query($sql);
    $resp = array(
        'success' => true,
        'message' => 'Updated successfully!!',
        'amount' => $amount,
        'data' => $data
    );
    echo json_encode($resp);
?>


