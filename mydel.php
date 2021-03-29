<?php


include('dbconn.php');
$request_body = file_get_contents('php://input');
$data =json_decode($request_body, true);
    $id = $data['id'];
   
    $sql= "DELETE FROM incomeexpense WHERE id=$id";
   
     if (!$id) {
        $resp = array(
            'success' => false,
            'message' => 'Invalid type',
            'id' => $id,
            'data' => $data
        );
        echo json_encode($resp);  
        exit;      
    }
    $err = $conn->query($sql);
    $resp = array(
        'success' => true,
        'message' => 'Deleted successfully!!',
        'id' => $id,
        'data' => $data
    );
    echo json_encode($resp);
?>


