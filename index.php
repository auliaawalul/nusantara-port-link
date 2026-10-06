<?php
session_start();
if (isset($_SESSION['user_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nusantara Port-Link</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="app-container">

        <!-- ===== HALAMAN 1: PEMILIHAN PERAN ===== -->
        <main id="page-role-selection" class="auth-page active">
            <div class="auth-container">
                <header class="auth-header">
                    <img src="assets/logo_nusantara_port-link.png" alt="Logo Nusantara Port-Link" class="logo">
                    <h1 data-lang-key="companyName">Nusantara Port-Link</h1>
                </header>
                <div class="toolbar">
                    <button id="lang-toggle-role" class="toolbar-button"><i class="ph-fill ph-translate"></i></button>
                    <button id="theme-toggle-role" class="toolbar-button"><i class="ph-fill ph-moon"></i><i class="ph-fill ph-sun hidden"></i></button>
                </div>
                <h2 data-lang-key="roleSelectionTitle">Masuk atau Daftar Sebagai:</h2>
                <button class="role-selection-btn" data-role="pelanggan"><i class="ph-fill ph-user"></i><span data-lang-key="roleCustomer">Pelanggan</span></button>
                <button class="role-selection-btn" data-role="perusahaan_mitra"><i class="ph-fill ph-buildings"></i><span data-lang-key="roleCompany">Perusahaan Mitra</span></button>
                <button class="role-selection-btn" data-role="admin_pelabuhan"><i class="ph-fill ph-user-gear"></i><span data-lang-key="roleAdmin">Admin Pelabuhan</span></button>
                
                <div class="auth-links">
                    <a href="#" class="form-link info-link" data-target="page-about" data-lang-key="aboutTitle">Tentang Nusantara Port-Link</a>
                    <a href="#" class="form-link info-link" data-target="page-faq" data-lang-key="faqTitle">FAQ</a>
                </div>
                <footer class="auth-footer"><p data-lang-key="footer">Copyright - Nusantara Port-Link 2025</p></footer>
            </div>
        </main>

        <!-- ===== HALAMAN 2: LOGIN (Tampilan Diperbarui) ===== -->
        <main id="page-login" class="auth-page hidden">
             <div class="auth-container">
                <header class="auth-header">
                    <button class="back-btn" data-target="page-role-selection"><i class="ph ph-arrow-left"></i></button>
                    <img src="assets/logo_nusantara_port-link.png" alt="Logo Nusantara Port-Link" class="logo">
                </header>
                <h2 id="login-role-title" class="login-title">Login</h2>
                <form id="login-form">
                    <div id="login-message" class="message-box hidden"></div>
                    <div class="form-group"><input type="text" name="username" required placeholder="Username"></div>
                    <div class="form-group"><input type="password" name="password" required placeholder="Password"></div>
                    <div class="login-options"><a href="#" class="form-link" data-lang-key="forgotPassword">Lupa Password?</a></div>
                    <button type="submit" class="btn-submit" data-lang-key="loginButton">Masuk</button>
                    <p class="form-switch-text"><span data-lang-key="noAccount"></span> <a href="#" class="form-link" id="go-to-register" data-lang-key="registerButton"></a></p>
                </form>
             </div>
        </main>
        
        <!-- ===== HALAMAN 3: REGISTRASI (Tampilan Baru) ===== -->
        <main id="page-register" class="auth-page hidden">
            <div class="auth-container register-container">
                 <header class="auth-header">
                    <button class="back-btn" data-target="page-login"><i class="ph ph-arrow-left"></i></button>
                    <img src="assets/logo_nusantara_port-link.png" alt="Logo Nusantara Port-Link" class="logo">
                </header>
                <h2 id="register-role-title">Registrasi Pelanggan</h2>
                <form id="register-form">
                    <div id="register-message" class="message-box hidden"></div>
                    <input type="hidden" id="register-rfid-tag" name="rfid_tag">
                    <div class="form-group"><input type="text" name="fullName" required placeholder="Nama Lengkap"></div>
                    <div class="form-group"><input type="text" name="username" required placeholder="Username"></div>
                    <div class="form-group"><input type="email" name="email" required placeholder="E-mail"></div>
                    <div class="form-group"><input type="password" name="password" required placeholder="Password"></div>
                    <div class="form-group"><input type="password" name="confirmPassword" required placeholder="Konfirmasi Password"></div>
                    <div class="form-group"><textarea name="address" required placeholder="Alamat"></textarea></div>
                    <div class="form-group"><input type="text" name="job_title" required placeholder="Jabatan"></div>
                    <div class="form-group"><input type="text" name="company_name" required placeholder="Nama Perusahaan"></div>
                    <div class="form-group"><input type="tel" name="phone_number" required placeholder="Nomor Telepon"></div>
                    <button type="submit" class="btn-submit" data-lang-key="saveButton">Simpan & Daftar</button>
                </form>
            </div>
        </main>

        <!-- ===== HALAMAN 3: SCAN RFID (KHUSUS PELANGGAN) ===== -->
        <main id="page-rfid-scan" class="auth-page hidden">
            <div class="auth-container">
                <header class="auth-header">
                     <button class="back-btn" data-target="page-login"><i class="ph ph-arrow-left"></i></button>
                     <img src="assets/logo_nusantara_port-link.png" alt="Logo Nusantara Port-Link" class="logo">
                </header>
                <div class="rfid-scan-content">
                    <i class="ph-fill ph-radio-tower rfid-icon"></i>
                    <h2>Pindai E-Port Anda</h2>
                    <p>Silakan dekatkan E-Port (Tag RFID) baru Anda ke Mesin E-Port (RFID Reader) yang tersedia.</p>
                    <div class="loader"></div>
                    <div id="rfid-scan-message" class="message-box hidden"></div>
                </div>
            </div>
        </main>

        <!-- ===== HALAMAN INFO (TENTANG) ===== -->
        <main id="page-about" class="auth-page hidden">
            <div class="auth-container info-page">
                <header class="auth-header">
                    <button class="back-btn" data-target="page-role-selection"><i class="ph ph-arrow-left"></i></button>
                    <h1 data-lang-key="aboutTitle"></h1>
                </header>
                <div class="info-content" id="about-content"></div>
            </div>
        </main>

        <!-- ===== HALAMAN INFO (FAQ) ===== -->
        <main id="page-faq" class="auth-page hidden">
            <div class="auth-container info-page">
                <header class="auth-header">
                    <button class="back-btn" data-target="page-role-selection"><i class="ph ph-arrow-left"></i></button>
                    <h1 data-lang-key="faqTitle"></h1>
                </header>
                <div id="faq-list" class="info-content"></div>
            </div>
        </main>

    </div>
    <script src="js/main.js"></script>
</body>
</html>

