<div class="content-page">
    <div class="content-header">
        <h1>Administrasi & Pengiriman Kontainer</h1>
        <p>Isi formulir SOP Pengiriman Kontainer di bawah ini.</p>
    </div>

    <div class="card">
        <form id="pengiriman-form" class="detailed-form">
            <div class="form-grid">
                <div class="form-group"><input type="text" name="nama_karyawan" required placeholder=" "><label>Nama Karyawan</label></div>
                <div class="form-group"><input type="text" name="id_karyawan" required placeholder=" "><label>ID Karyawan</label></div>
                <div class="form-group"><input type="text" name="jabatan" required placeholder=" "><label>Jabatan</label></div>
                <div class="form-group"><input type="text" name="asal_perusahaan" required placeholder=" "><label>Asal Perusahaan</label></div>
                <div class="form-group"><input type="text" name="plat_nomor" required placeholder=" "><label>Plat Nomor Kendaraan</label></div>
                <div class="form-group"><input type="email" name="email" required placeholder=" "><label>E-mail</label></div>
                <div class="form-group"><input type="tel" name="telepon" required placeholder=" "><label>Nomor Telepon/WhatsApp</label></div>
                 <div class="form-group">
                    <select name="jenis_kontainer" required>
                        <option value="" disabled selected>Pilih Jenis Kontainer</option>
                        <option value="20ft">20 Feet</option>
                        <option value="40ft">40 Feet</option>
                        <option value="45ft_hc">45 Feet High Cube</option>
                    </select>
                </div>
                <div class="form-group"><input type="number" name="berat_kontainer" required placeholder=" "><label>Berat Kontainer (Ton)</label></div>
                <div class="form-group"><input type="text" name="asal_pengiriman" required placeholder=" "><label>Asal Pengiriman</label></div>
                <div class="form-group"><input type="text" name="destinasi_pengiriman" required placeholder=" "><label>Destinasi Pengiriman</label></div>
                <div class="form-group"><input type="text" name="total_harga" readonly placeholder=" "><label>Total Harga Kirim</label></div>

                <div class="form-group file-upload full-width"><label>Unggah Foto Pengirim</label><input type="file" name="foto_pengirim"></div>
                <div class="form-group file-upload full-width"><label>Unggah Kartu Karyawan</label><input type="file" name="kartu_karyawan"></div>
                <div class="form-group file-upload full-width"><label>Unggah Bukti Pembayaran</label><input type="file" name="bukti_pembayaran"></div>
            </div>
             <button type="submit" class="btn-submit">Submit</button>
        </form>
    </div>
     <div class="card" style="margin-top: 24px;">
        <h3>Riwayat Pengiriman & Pengambilan</h3>
        <p>Tabel riwayat akan ditampilkan di sini.</p>
    </div>
</div>
