<?php
session_start();
include 'db_connect.php';

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => 'Invalid request'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $action = $data['action'] ?? '';

    // --- PROSES LOGIN ---
    if ($action === 'login') {
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $role = $data['role'] ?? '';

        $stmt = $conn->prepare("SELECT id, username, password, role, full_name, company_name FROM users WHERE username = ? AND role = ?");
        $stmt->bind_param("ss", $username, $role);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role'];
                // Untuk Perusahaan Mitra, gunakan company_name. Jika tidak, gunakan full_name.
                $_SESSION['full_name'] = ($user['role'] === 'perusahaan_mitra' && !empty($user['company_name'])) ? $user['company_name'] : $user['full_name'];
                
                $response = ['status' => 'success', 'message' => 'Login successful'];
            } else {
                $response['message'] = 'Password yang Anda masukkan salah.';
            }
        } else {
            $response['message'] = 'Username atau Peran tidak ditemukan.';
        }
        $stmt->close();
    } 
     // --- PROSES REGISTRASI PELANGGAN ---
    else if ($action === 'register_pelanggan') {
        $fullName = $data['fullName'] ?? '';
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';
        $confirmPassword = $data['confirmPassword'] ?? '';
        $email = $data['email'] ?? '';
        $rfid_tag = $data['rfid_tag'] ?? ''; // <--- KUNCI UTAMA
        $address = $data['address'] ?? '';
        $job_title = $data['job_title'] ?? '';
        $company_name = $data['company_name'] ?? '';
        $phone_number = $data['phone_number'] ?? '';

        // PERBAIKAN: Validasi server-side yang lebih ketat
        if (empty($fullName) || empty($username) || empty($password) || empty($email) || empty($rfid_tag)) {
            $response['message'] = 'Nama, Username, Password, Email, dan RFID wajib diisi.';
        } elseif ($password !== $confirmPassword) {
            $response['message'] = 'Konfirmasi password tidak cocok.';
        } else {
            // Cek duplikasi, hash password, dan INSERT
            $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR rfid_tag = ?");
            $stmt->bind_param("ss", $username, $rfid_tag);
            $stmt->execute();
            if ($stmt->get_result()->num_rows > 0) {
                $response['message'] = 'Username atau RFID Tag sudah terdaftar.';
            } else {
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                $role = 'pelanggan';

                $insertStmt = $conn->prepare(
                    "INSERT INTO users (username, password, full_name, email, role, rfid_tag, address, job_title, phone_number, company_name) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
                );
                
                $insertStmt->bind_param("ssssssssss", $username, $hashedPassword, $fullName, $email, $role, $rfid_tag, $address, $job_title, $phone_number, $company_name);

                if ($insertStmt->execute()) {
                    $response = ['status' => 'success', 'message' => 'Registrasi Pelanggan berhasil! Silakan Login.'];
                } else {
                    $response['message'] = 'Registrasi gagal: ' . $insertStmt->error;
                }
                $insertStmt->close();
            }
            $stmt->close();
        }
    }
}

$conn->close();
echo json_encode($response);
?>


