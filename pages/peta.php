<div class="content-page">
    <div class="content-header">
        <h1>Peta Logistik Pelabuhan</h1>
        <p>Lacak pergerakan kapal kontainer dan lihat titik pelabuhan utama.</p>
    </div>
    <div class="card map-card">
        <div id="map"></div>
    </div>
</div>

<script>
// Pindahkan inisialisasi peta ke sini agar hanya berjalan di halaman peta
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        const map = L.map('map').setView([-2.548926, 118.0148634], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Data dummy untuk pelabuhan
        const ports = [
            { name: 'Tanjung Priok, Jakarta', coords: [-6.105, 106.887] },
            { name: 'Tanjung Perak, Surabaya', coords: [-7.218, 112.730] },
            { name: 'Belawan, Medan', coords: [3.783, 98.683] },
            { name: 'Soekarno-Hatta, Makassar', coords: [-5.114, 119.415] }
        ];

        ports.forEach(port => {
            L.marker(port.coords).addTo(map)
                .bindPopup(`<b>${port.name}</b>`)
                .openPopup();
        });
    }
});
</script>
