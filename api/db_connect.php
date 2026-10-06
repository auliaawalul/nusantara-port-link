<?php
$servername = "localhost";
$username = "root";
$password = "";    
$dbname = "nusantara_port_db";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
  // Hentikan eksekusi dan tampilkan error jika koneksi gagal
  die("Connection failed: " . $conn->connect_error);
}
?>
