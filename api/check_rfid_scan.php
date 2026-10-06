<?php
// API ini dipanggil oleh JavaScript (polling) untuk mengecek apakah ada scan baru

$logFile = 'scan_log.json';
$response = ['status' => 'pending'];

if (file_exists($logFile)) {
    $data = json_decode(file_get_contents($logFile), true);
    
    // Cek apakah scan masih baru (misal: dalam 30 detik terakhir)
    if (time() - $data['timestamp'] < 30) {
        $response = [
            'status' => 'success',
            'rfid_tag' => $data['rfid_tag']
        ];
        
        // Hapus file setelah berhasil dibaca agar tidak terbaca lagi
        unlink($logFile);
    } else {
        // Hapus file jika sudah kedaluwarsa
        unlink($logFile);
        $response['message'] = 'Scan expired.';
    }
}

echo json_encode($response);
?>
