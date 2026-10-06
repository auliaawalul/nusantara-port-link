<?php
session_start();
// Jika pengguna belum login, tendang kembali ke halaman index.php
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php");
    exit();
}

// Muat Header dan Sidebar SATU KALI saja
include 'includes/header.php';
include 'includes/sidebar.php';
?>

<!-- Wadah utama untuk semua konten dinamis -->
<div class="dashboard-container">
    <main class="main-content">
        <div id="content-wrapper">
            <?php
            // Logika untuk memuat file konten dari folder /pages/
            $page = isset($_GET['page']) ? $_GET['page'] : 'dashboard_content';
            $allowed_pages = ['dashboard_content', 'administrasi', 'notifikasi', 'parking', 'peta', 'pengaturan'];
            $file_path = 'pages/' . $page . '.php';

            if (in_array($page, $allowed_pages) && file_exists($file_path)) {
                include $file_path;
            } else {
                include 'pages/dashboard_content.php'; // Halaman default
            }
            ?>
        </div>
    </main>
</div>

<?php
// Muat Footer SATU KALI saja
include 'includes/footer.php';
?>

