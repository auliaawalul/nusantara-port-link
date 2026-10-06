<?php
header('Content-Type: application/json');
require 'includes/db_connect.php';

$response = ['success' => false, 'message' => 'Permintaan tidak valid.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form
    $role = $_POST['role'] ?? 'Pelanggan';
    $full_name = trim($_POST['full_name'] ?? '');
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // Validasi dasar
    if (empty($role) || empty($full_name) || empty($username) || empty($email) || empty($password)) {
        $response['message'] = 'Semua kolom wajib diisi.';
        echo json_encode($response);
        exit;
    }
    if ($password !== $confirm_password) {
        $response['message'] = 'Konfirmasi password tidak cocok.';
        echo json_encode($response);
        exit;
    }

    // Cek apakah username atau email sudah ada
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        $response['message'] = 'Username atau email sudah terdaftar.';
        $stmt->close();
        echo json_encode($response);
        exit;
    }
    $stmt->close();

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Proses upload foto profil
    $profile_pic_path = null;
    if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/profile_pics/';
        if (!is_dir($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        $file_name = uniqid() . '-' . basename($_FILES['profile_pic']['name']);
        $target_file = $upload_dir . $file_name;
        if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $target_file)) {
            $profile_pic_path = $target_file;
        }
    }

    // Masukkan data ke database
    $stmt = $conn->prepare("INSERT INTO users (role, full_name, username, email, password, profile_pic) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $role, $full_name, $username, $email, $hashed_password, $profile_pic_path);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Registrasi berhasil! Silakan login.';
    } else {
        $response['message'] = 'Terjadi kesalahan saat menyimpan data.';
    }
    $stmt->close();
}

$conn->close();
echo json_encode($response);
?>

