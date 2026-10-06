<?php
// File API baru untuk menyediakan data statistik ke dashboard utama.
// Untuk saat ini, kita akan menggunakan data dummy (contoh).
include 'db_connect.php';

// Fungsi untuk mendapatkan tanggal hari ini dalam format Indonesia
function getCurrentDateInIndonesian() {
    $days = array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu');
    $months = array(1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember');
    
    $day = $days[date('w')];
    $date = date('d');
    $month = $months[date('n')];
    $year = date('Y');
    
    return "$day, $date $month $year";
}

// Simulasi data dari database
// Di aplikasi nyata, Anda akan menjalankan query SQL di sini
$trucks_today = rand(100, 250);
$vessels_docked = rand(5, 12);
$total_vessels = 15;
$containers_processed = rand(300, 800);
$avg_wait_time = rand(12, 35);

$response = [
    'status' => 'success',
    'current_date' => getCurrentDateInIndonesian(),
    'stats' => [
        'trucks_today' => $trucks_today,
        'vessels_docked_string' => "$vessels_docked / $total_vessels",
        'containers_processed' => $containers_processed,
        'avg_wait_time' => $avg_wait_time
    ],
    'chart_data' => [
        'labels' => ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        'data' => [rand(50,100), rand(80,150), rand(120,200), rand(150,250), rand(100,180), rand(60,120)]
    ]
];

echo json_encode($response);
?>
