<?php

include 'db_connect.php';

$logFile = 'scan_log.json';

$response = ['status' => 'error', 'message' => 'Invalid request'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rfid_tag = $_POST['rfid_tag'] ?? '';

    if (!empty($rfid_tag)) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE rfid_tag = ?");
        $stmt->bind_param("s", $rfid_tag);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response['message'] = 'RFID tag already registered.';
        } else {
            $data = [
                'rfid_tag' => $rfid_tag,
                'timestamp' => time() 
            ];
            file_put_contents($logFile, json_encode($data));
            $response = ['status' => 'success', 'message' => 'Scan recorded for registration.'];
        }
        $stmt->close();
    } else {
        $response['message'] = 'RFID tag not provided.';
    }
}

$conn->close();
echo json_encode($response);
?>
