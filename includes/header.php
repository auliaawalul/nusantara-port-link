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
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <header class="main-header">
    <button id="open-sidebar-btn" class="toolbar-button open-sidebar-btn"><i class="ph-bold ph-list"></i></button>
        <div class="search-box-wrapper">
            <div class="search-box">
                <i class="ph ph-magnifying-glass"></i>
                <input type="text" id="search-input" placeholder="Cari kontainer, kapal...">
            </div>
        </div>
         <div class="header-toolbar">
        <!-- [PERUBAHAN] Menambahkan class -->
        <button class="toolbar-button lang-toggle-btn"><i class="ph-fill ph-translate"></i><span>ID</span></button>
        <button class="toolbar-button theme-toggle-btn">
            <i class="ph-fill ph-moon"></i>
            <i class="ph-fill ph-sun hidden"></i>
        </button>
            <div class="notification-bell"><i class="ph-fill ph-bell"></i><span class="notification-dot"></span></div>
            <div class="user-profile">
                <div id="profile-menu-trigger" class="profile-info-wrapper">
                    <div class="profile-info">
                        <span><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                        <small><?php echo htmlspecialchars($_SESSION['role']); ?></small>
                    </div>
                    <img id="profile-pic" src="assets/images/profile_default.png" alt="Foto Profil" class="profile-pic">
                </div>
                <div id="profile-dropdown" class="profile-dropdown">
                    <div class="dropdown-header">
                         <img id="dropdown-profile-pic" src="assets/images/profile_default.png" alt="Foto Profil" class="profile-pic">
                         <div class="dropdown-info">
                             <span id="dropdown-profile-name"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                             <small id="dropdown-profile-email">email@example.com</small>
                         </div>
                    </div>
                    <div class="dropdown-body">
                        <a href="dashboard.php?page=pengaturan"><i class="ph-fill ph-user-circle"></i><span data-lang-key="manageAccount">Kelola Akun</span></a>
                    </div>
                    <div class="dropdown-footer">
                        <a href="logout.php"><i class="ph-fill ph-sign-out"></i><span data-lang-key="logoutButton">Keluar</span></a>
                    </div>
                </div>
            </div>
        </div>
    </header>

