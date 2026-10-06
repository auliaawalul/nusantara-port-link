<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => 'Akses ditolak atau data tidak lengkap.'];

// Pastikan hanya Perusahaan Mitra yang bisa mengakses
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'perusahaan_mitra') {
    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form-data
    $company_id = $_SESSION['user_id'];
    $employee_rfid = $_POST['employee_rfid'] ?? '';
    $employee_name = $_POST['employee_name'] ?? '';
    // ... ambil semua field lain dari $_POST
    $vehicle_plate = $_POST['vehicle_plate'] ?? '';
    $container_type = $_POST['container_type'] ?? '';
    $container_weight = $_POST['container_weight'] ?? 0;
    $origin = $_POST['origin'] ?? '';
    $destination = $_POST['destination'] ?? '';
    $total_price = $_POST['total_price'] ?? 0;

    // Direktori untuk menyimpan file upload
    $upload_dir = '../uploads/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    // Fungsi untuk menangani upload file
    function handle_upload($file_key, $upload_dir) {
        if (isset($_FILES[$file_key]) && $_FILES[$file_key]['error'] == 0) {
            $file_name = uniqid() . '-' . basename($_FILES[$file_key]['name']);
            $target_path = $upload_dir . $file_name;
            if (move_uploaded_file($_FILES[$file_key]['tmp_name'], $target_path)) {
                return 'uploads/' . $file_name; // Simpan path relatif
            }
        }
        return null;
    }

    $photo_sender_url = handle_upload('photo_sender', $upload_dir);
    $card_employee_url = handle_upload('card_employee', $upload_dir);
    $payment_proof_url = handle_upload('payment_proof', $upload_dir);

    // Validasi dasar
    if (empty($employee_rfid) || empty($employee_name) || empty($vehicle_plate)) {
        $response['message'] = 'Field wajib (ID Karyawan, Nama, Plat Nomor) harus diisi.';
        echo json_encode($response);
        exit;
    }

    // Buat shipment_id unik
    $shipment_id = 'SHP-' . strtoupper(uniqid());

    // Masukkan ke database
    $stmt = $conn->prepare(
        "INSERT INTO shipments (shipment_id, company_id, employee_name, employee_rfid, vehicle_plate, container_type, container_weight, origin, destination, total_price, photo_sender_url, card_employee_url, payment_proof_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("sisssssddsiss", 
        $shipment_id, $company_id, $employee_name, $employee_rfid, $vehicle_plate, 
        $container_type, $container_weight, $origin, $destination, $total_price, 
        $photo_sender_url, $card_employee_url, $payment_proof_url
    );

    if ($stmt->execute()) {
        // Ambil ID user pelanggan berdasarkan RFID
        $user_stmt = $conn->prepare("SELECT id, full_name FROM users WHERE rfid_tag = ? AND role = 'pelanggan'");
        $user_stmt->bind_param("s", $employee_rfid);
        $user_stmt->execute();
        $user_result = $user_stmt->get_result();
        if ($pelanggan = $user_result->fetch_assoc()) {
            // Buat notifikasi untuk Pelanggan (kru)
            $message_to_pelanggan = "Pengiriman baru #{$shipment_id} telah ditugaskan kepada Anda.";
            $notif_stmt = $conn->prepare("INSERT INTO notifications (user_id_to, user_id_from, message, related_id) VALUES (?, ?, ?, ?)");
            $notif_stmt->bind_param("iiss", $pelanggan['id'], $company_id, $message_to_pelanggan, $shipment_id);
            $notif_stmt->execute();
        }
        
        $response = [
            'status' => 'success',
            'message' => 'Data pengiriman berhasil disimpan.',
            'data' => [ // Data untuk E-Dokumen
                'shipment_id' => $shipment_id,
                'company_name' => $_SESSION['full_name'], // Nama Perusahaan Mitra
                'employee_name' => $employee_name,
                'employee_rfid' => $employee_rfid,
                'vehicle_plate' => $vehicle_plate,
                'origin' => $origin,
                'destination' => $destination,
                'container_type' => $container_type,
                'container_weight' => $container_weight
            ]
        ];

    } else {
        $response['message'] = 'Gagal menyimpan data ke database: ' . $stmt->error;
    }
    $stmt->close();
}

echo json_encode($response);
?>

