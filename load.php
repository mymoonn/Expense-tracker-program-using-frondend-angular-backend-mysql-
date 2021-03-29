<?php 
    include('dbconn.php');
    
 
    $sql = "SELECT * FROM incomeexpense";
    $res = $conn->query($sql)->fetchAll();
    
    
    $resp = array(
        'success' => true,
        'data' => $res,
        'message' => 'Loaded successfully!!'
    );
    echo json_encode($resp);
?>