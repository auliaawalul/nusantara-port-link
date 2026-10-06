<?php
header('Content-Type: application/json');
require 'includes/db_connect.php';

$response = ['success' => false, 'message' => 'Permintaan tidak valid.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    $role = $_POST['role'] ?? '';

    if (empty($username) || empty($password) || empty($role)) {
        $response['message'] = 'Username, password, dan peran harus diisi.';
        echo json_encode($response);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, full_name, email, password, profile_pic, role FROM users WHERE username = ? AND role = ?");
    $stmt->bind_param("ss", $username, $role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            // Login sukses, simpan data ke session
            $_SESSION['loggedin'] = true;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $username;
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['role'] = $user['role'];
            $_SESSION['profile_pic'] = $user['profile_pic'] ?? 'assets/images/default_profile.png';
            
            $response['success'] = true;
            $response['message'] = 'Login berhasil! Mengarahkan...';
        } else {
            $response['message'] = 'Password atau peran salah.';
        }
    } else {
        $response['message'] = 'Username tidak ditemukan untuk peran ini.';
    }
    $stmt->close();
}

$conn->close();
echo json_encode($response);
?>

