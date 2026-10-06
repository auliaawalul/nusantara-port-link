<?php
// API ini dipanggil oleh ESP32 di gerbang
include 'db_connect.php';

$response = [
    'status' => 'invalid', 
    'message' => 'RFID Tag not provided'
];

// gate_check.php
// ...
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rfid_tag_from_reader = $_POST['rfid_tag'] ?? ''; // Ini adalah Tag RFID Truk yang dipindai
    
    if (!empty($rfid_tag_from_reader)) {
        $stmt = $conn->prepare(
            "SELECT s.id, s.shipment_id, s.employee_name, u.full_name as company_name 
             FROM shipments s
             JOIN users u ON s.company_id = u.id
             WHERE s.truck_rfid_tag = ? AND (s.status = 'approved' OR s.status = 'pending')" // Ubah 's.rfid_tag' menjadi 's.truck_rfid_tag'
        );
        $stmt->bind_param("s", $rfid_tag_from_reader);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $shipment = $result->fetch_assoc();
            // ... (KODE SUKSES) ...
            $response = [
                'status' => 'valid',
                'message' => 'Data Valid. Gate Dibuka untuk Truk: ' . $shipment['shipment_id'],
                'data' => $shipment
            ];
            // Update status pengiriman di database
            $update_stmt = $conn->prepare("UPDATE shipments SET status = 'on_gate' WHERE id = ?");
            // ... (sisa update statement)
        } else {
            // Data tidak ditemukan atau tidak valid
            $response = [
                'status' => 'invalid',
                'message' => 'Perusahaan Anda tidak terdaftar. Silakan keluar.'
            ];
        }
        $stmt->close();
    }
}

$conn->close();
echo json_encode($response);
?>
