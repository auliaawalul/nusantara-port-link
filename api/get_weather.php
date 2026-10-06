<?php
header('Content-Type: application/json');

// --- KONFIGURASI ---
$apiKey = '4370bc953127e387fdd5de4eb1869a8e'; // Ganti dengan API Key Anda
$lang = 'id'; 
$units = 'metric';

$lat = $_GET['lat'] ?? null;
$lon = $_GET['lon'] ?? null;

if (!$lat || !$lon) {
    // Fallback ke Jakarta jika tidak ada koordinat
    $lat = -6.2088;
    $lon = 106.8456;
}

$apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$apiKey}&units={$units}&lang={$lang}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
$apiResponse = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode == 200) {
    $weatherData = json_decode($apiResponse, true);

    // PERBAIKAN: Kirim lebih banyak data ke frontend untuk dianalisis
    $response = [
        'status' => 'success',
        'temp' => round($weatherData['main']['temp']),
        'description' => ucwords($weatherData['weather'][0]['description']),
        'icon' => $weatherData['weather'][0]['icon'],
        'location' => $weatherData['name'],
        'wind_speed' => $weatherData['wind']['speed'], // Kecepatan angin (meter/detik)
        'weather_id' => $weatherData['weather'][0]['id'] // ID kondisi cuaca (misal: 501 untuk hujan sedang)
    ];
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Gagal mengambil data cuaca.']);
}
?>

