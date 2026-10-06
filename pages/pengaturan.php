<div class="content-page">
    <div class="content-header">
        <h1>Pengaturan</h1>
        <p>Kelola preferensi akun dan tampilan website Anda.</p>
    </div>

    <div class="card">
        <h3>Tampilan</h3>
        <div class="form-group">
            <label>Mode Tampilan (Cerah/Gelap)</label>
            <p>Tombol untuk mengganti mode ada di header.</p>
        </div>
        <div class="form-group">
            <label>Bahasa (Language)</label>
             <p>Tombol untuk mengganti bahasa ada di header.</p>
        </div>
    </div>

    <div class="card" style="margin-top: 24px;">
        <h3>Akun Saya</h3>
        <p><strong>Username:</strong> <?php echo $_SESSION['username']; ?></p>
        <p><strong>Peran:</strong> <?php echo $_SESSION['role']; ?></p>
        <button class="btn-submit" style="background-color: var(--danger-text); margin-top: 1rem;" onclick="location.href='logout.php'">Log Out</button>
    </div>
    
     <div class="card" style="margin-top: 24px;">
        <h3>Info Website</h3>
        <p><strong>Versi:</strong> 1.0.0-beta</p>
    </div>
</div>
