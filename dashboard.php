<?php
session_start();
// Jika user belum login, tendang ke halaman index.php
if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$user_role = $_SESSION['role'];
$user_name = $_SESSION['full_name'];
?>
<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Nusantara Port-Link</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Simpan data user dari PHP ke atribut data HTML untuk dibaca JS -->
    <div id="user-data" data-role="<?php echo htmlspecialchars($user_role); ?>" data-name="<?php echo htmlspecialchars($user_name); ?>"></div>

    <div id="page-dashboard" class="dashboard-container active">
        <aside id="sidebar" class="sidebar">
             <div class="sidebar-header">
                <img src="assets/logo_nusantara_port-link.png" alt="Logo" class="logo">
                <h2 data-lang-key="companyName">Nusantara Port-Link</h2>
                <button id="close-sidebar-btn" class="close-sidebar-btn"><i class="ph-bold ph-x"></i></button>
            </div>
            <nav id="sidebar-nav" class="sidebar-nav">
                <!-- Menu akan di-generate oleh main.js berdasarkan peran user -->
            </nav>
             <div class="sidebar-footer">
                 <a href="#" class="nav-link" data-page="pengaturan"><i class="ph-fill ph-gear"></i><span data-lang-key="navSettings"></span></a>
                 <a href="logout.php" class="nav-link"><i class="ph-fill ph-sign-out"></i><span data-lang-key="logoutButton"></span></a>
            </div>
        </aside>
        <div id="sidebar-overlay" class="sidebar-overlay"></div>

        <main class="main-content">
            <header class="main-header">
                <button id="open-sidebar-btn" class="toolbar-button open-sidebar-btn"><i class="ph-bold ph-list"></i></button>
                <div class="header-toolbar">
                   <div id="weather-widget" class="weather-widget">
                        <div class="weather-icon-placeholder">
                            <div class="weather-loader"></div> <!-- SPINNER BARU -->
                        </div>
                        <div class="weather-details">
                            <span id="weather-temp">--°C</span>
                            <span id="weather-desc">Memuat...</span>
                        </div>
                    </div>
                    <button id="lang-toggle-dash" class="toolbar-button"><i class="ph-fill ph-translate"></i></button>
                    <button id="theme-toggle-dash" class="toolbar-button"><i class="ph-fill ph-moon"></i><i class="ph-fill ph-sun hidden"></i></button>
                    <div class="user-profile">
                         <div class="notification-bell"><i class="ph-fill ph-bell"></i><span class="notification-dot"></span></div>
                        <div id="profile-menu-trigger" class="profile-info-wrapper">
                            <div class="profile-info">
                                <span id="profile-name"><?php echo htmlspecialchars($user_name); ?></span>
                                <small id="profile-role"><?php echo str_replace('_', ' ', ucwords($user_role)); ?></small>
                            </div>
                            <img src="assets/foto profil.png" alt="Foto Profil" class="profile-pic">
                        </div>
                    </div>
                </div>
            </header>
            <div id="dashboard-content-wrapper">
                <div class="loader"></div>
            </div>
        </main>
    </div>
    <script src="js/main.js"></script>
</body>
</html>

