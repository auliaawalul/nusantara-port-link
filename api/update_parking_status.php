<?php
// API ini dipanggil oleh ESP32
include 'db_connect.php';

$response = ['status' => 'error', 'message' => 'Invalid data'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $slot_name = $_POST['slot_name'] ?? '';
    $is_occupied = $_POST['is_occupied'] ?? '';

    if (!empty($slot_name) && is_numeric($is_occupied)) {
        $stmt = $conn->prepare("UPDATE parking_slots SET is_occupied = ? WHERE slot_name = ?");
        $stmt->bind_param("is", $is_occupied, $slot_name);
        
        if ($stmt->execute()) {
            $response = ['status' => 'success', 'message' => 'Parking status updated successfully for ' . $slot_name];
        } else {
            $response['message'] = 'Database update failed';
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
?>
