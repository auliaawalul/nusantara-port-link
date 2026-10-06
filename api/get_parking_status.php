<?php
include 'db_connect.php';

$response = ['status' => 'error', 'message' => 'Could not fetch data'];

$sql = "SELECT slot_name, type, is_occupied FROM parking_slots";
$result = $conn->query($sql);

if ($result) {
    $parking_data = [
        'pengiriman' => [],
        'pengambilan' => []
    ];
    $total_pengiriman = 0;
    $occupied_pengiriman = 0;
    $total_pengambilan = 0;
    $occupied_pengambilan = 0;

    while($row = $result->fetch_assoc()) {
        if ($row['type'] == 'pengiriman') {
            $parking_data['pengiriman'][] = $row;
            $total_pengiriman++;
            if ($row['is_occupied'] == 1) $occupied_pengiriman++;
        } else {
            $parking_data['pengambilan'][] = $row;
            $total_pengambilan++;
            if ($row['is_occupied'] == 1) $occupied_pengambilan++;
        }
    }
    
    $response = [
        'status' => 'success',
        'data' => $parking_data,
        'summary' => [
            'pengiriman' => [
                'total' => $total_pengiriman,
                'occupied' => $occupied_pengiriman,
                'available' => $total_pengiriman - $occupied_pengiriman
            ],
            'pengambilan' => [
                'total' => $total_pengambilan,
                'occupied' => $occupied_pengambilan,
                'available' => $total_pengambilan - $occupied_pengambilan
            ]
        ]
    ];
}

$conn->close();
echo json_encode($response);
?>
