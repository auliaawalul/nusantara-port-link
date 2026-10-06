<aside id="sidebar" class="sidebar">
    <div class="sidebar-header">
        <img src="assets/images/logo.png" alt="Logo" class="logo">
        <h2>Nusantara Port</h2>
        <button id="close-sidebar-btn" class="close-sidebar-btn"><i class="ph-bold ph-x"></i></button>
    </div>
    <nav class="sidebar-nav">
        <ul>
            <li><a href="dashboard.php?page=dashboard_content" class="<?php echo ($page == 'dashboard_content' ? 'active' : ''); ?>"><i class="ph-fill ph-gauge"></i><span data-lang-key="navDashboard">Dashboard</span></a></li>
            
            <?php if ($_SESSION['role'] == 'Perusahaan Mitra' || $_SESSION['role'] == 'Admin Pelabuhan'): ?>
                <li><a href="dashboard.php?page=administrasi" class="<?php echo ($page == 'administrasi' ? 'active' : ''); ?>"><i class="ph-fill ph-file-text"></i><span data-lang-key="navDocuments">Administrasi</span></a></li>
            <?php endif; ?>

            <li><a href="dashboard.php?page=notifikasi" class="<?php echo ($page == 'notifikasi' ? 'active' : ''); ?>"><i class="ph-fill ph-bell"></i><span>Notifikasi</span></a></li>

            <?php if ($_SESSION['role'] != 'Pelanggan'): ?>
                 <li><a href="dashboard.php?page=parking" class="<?php echo ($page == 'parking' ? 'active' : ''); ?>"><i class="ph-fill ph-car"></i><span>Smart Parking</span></a></li>
            <?php endif; ?>

            <li><a href="dashboard.php?page=peta" class="<?php echo ($page == 'peta' ? 'active' : ''); ?>"><i class="ph-fill ph-map-trifold"></i><span data-lang-key="navMap">Peta Logistik</span></a></li>
        </ul>
    </nav>
    <div class="sidebar-footer">
        <a href="dashboard.php?page=pengaturan" class="<?php echo ($page == 'pengaturan' ? 'active' : ''); ?>"><i class="ph-fill ph-gear"></i><span data-lang-key="navSettings">Pengaturan</span></a>
        <a href="logout.php"><i class="ph-fill ph-sign-out"></i><span data-lang-key="logoutButton">Log Out</span></a>
    </div>
</aside>

