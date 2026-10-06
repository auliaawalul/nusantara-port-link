"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const state = {
        currentRoleSelection: null,
        scannedRfidTag: null,
        rfidPollingInterval: null,
        currentTheme: localStorage.getItem('theme') || 'dark',
        currentLang: localStorage.getItem('lang') || 'id',
        currentPage: 'dashboard',
        currentUser: null,
        charts: {},
        leafletMap: null,
        activeInterval: null,
        weatherData: null,
    };

    const translations = {
        id: {
            // Role & Auth
            navAdminShipment: "Administrasi & Pengiriman",
            shipmentFormTitle: "Formulir SOP Pengiriman Kontainer",
            shipmentFormSubtitle: "Isi semua detail yang diperlukan untuk proses pengiriman.",
            employeeName: "Nama Karyawan",
            employeeId: "ID Karyawan",
            jobTitle: "Jabatan",
            companyOrigin: "Asal Perusahaan",
            vehiclePlate: "Plat Nomor Kendaraan",
            emailLabel: "E-mail",
            phoneLabel: "Nomor Telepon/WA",
            containerType: "Jenis Kontainer",
            containerWeight: "Berat Kontainer (kg)",
            origin: "Asal Pengiriman",
            destination: "Destinasi Pengiriman",
            totalPrice: "Total Harga Kirim (Rp)",
            uploadSenderPhoto: "Unggah Foto Pengirim",
            uploadEmployeeCard: "Unggah Kartu Karyawan",
            uploadPaymentProof: "Unggah Bukti Pembayaran",
            rfidTagToAssign: "Tempel & Pindai Tag RFID Truk",
            submitShipment: "Submit Data Pengiriman",
            companyName: "Nusantara Port-Link",
            roleSelectionTitle: "Masuk atau Daftar Sebagai:",
            roleCustomer: "Pelanggan",
            roleCompany: "Perusahaan Mitra",
            roleAdmin: "Admin Pelabuhan",
            aboutTitle: "Tentang Nusantara Port-Link",
            faqTitle: "FAQ",
            footer: "Copyright - Nusantara Port-Link 2025",
            usernameLabel: "Username",
            passwordLabel: "Password",
            loginButton: "Masuk",
            noAccount: "Belum punya akun?",
            registerButton: "Daftar",
            userRegistration: "Registrasi User",
            fullName: "Nama Lengkap",
            ktpNumber: "Nomor KTP",
            emailLabel: "Email",
            confirmPassword: "Konfirmasi Password",
            address: "Alamat",
            jobTitle: "Jabatan",
            phoneNumber: "Nomor Telepon",
            saveButton: "Simpan & Daftar",
            loginFailed: "Login Gagal! Cek kembali username, password, atau peran Anda.",
            registerSuccess: "Registrasi berhasil! Silakan login.",
            passwordMismatch: "Konfirmasi password tidak cocok.",
            forgotPassword: "Lupa Password?",
            navAIPredictive: "AI Predictive",
            aboutContent: `<p><strong>Platform Ekosistem Logistik Pelabuhan Terintegrasi</strong> adalah sebuah solusi digital yang dirancang untuk mengatasi tantangan utama di pelabuhan...</p><h3>Visi Kami</h3><p>Menciptakan alur logistik yang efisien, transparan, dan terprediksi...</p><h3>Fitur Utama</h3><p><strong>1. Sistem Manajemen Truk...</strong></p>`,
            faqData: [
                { q: "Apa itu Nusantara Port-Link?", a: "Platform digital terintegrasi untuk efisiensi logistik pelabuhan." },
                { q: "Siapa saja yang bisa menggunakan platform ini?", a: "Semua pihak dalam ekosistem pelabuhan." },
                { q: "Bagaimana cara mendaftar?", a: "Pilih peran di halaman utama, klik 'Daftar' di halaman login, lalu isi formulir." },
            ],
            // Sidebar Menus
            navDashboard: "Dashboard Utama",
            navAdminShipment: "Administrasi Pengiriman",
            navAdminCollection: "Administrasi Pengambilan",
            navNotifications: "Notifikasi",
            navSmartParking: "Smart Parking",
            navLogisticsMap: "Peta Logistik",
            navSettings: "Pengaturan",
            logoutButton: "Keluar",
            navCheckDocs: "Cek Dokumen & Pemesanan",
            navHistory: "Riwayat Pengiriman",
            // Main Dashboard
            dashboardTitle: "Dashboard Operasional Utama",
            statTrucksToday: "Truk Masuk Hari Ini",
            statVesselsDocked: "Kapal Bersandar",
            statContainersProcessed: "Kontainer Diproses",
            statAvgWaitTime: "Waktu Tunggu Rata-rata (mnt)",
            chartTitle: "Aktivitas Bongkar Muat (TEUs)",
            // Halaman lain
            smartParkingTitle: "Manajemen Parkir Cerdas",
            mapTitle: "Peta Jaringan Logistik",
        },
        en: {
            navAdminShipment: "Shipment Administration",
            shipmentFormTitle: "Container Shipment SOP Form",
            shipmentFormSubtitle: "Fill in all required details for the shipment process.",
            employeeName: "Employee Name",
            employeeId: "Employee ID",
            jobTitle: "Job Title",
            companyOrigin: "Company Origin",
            vehiclePlate: "Vehicle Plate Number",
            emailLabel: "E-mail",
            phoneLabel: "Phone/WA Number",
            containerType: "Container Type",
            containerWeight: "Container Weight (kg)",
            origin: "Shipment Origin",
            destination: "Shipment Destination",
            totalPrice: "Total Shipping Price (IDR)",
            uploadSenderPhoto: "Upload Sender's Photo",
            uploadEmployeeCard: "Upload Employee Card",
            uploadPaymentProof: "Upload Payment Proof",
            rfidTagToAssign: "Tap & Scan Truck's RFID Tag",
            submitShipment: "Submit Shipment Data",
            companyName: "Nusantara Port-Link",
            roleSelectionTitle: "Login or Register As:",
            roleCustomer: "Customer",
            roleCompany: "Partner Company",
            roleAdmin: "Port Administrator",

            aboutTitle: "About Nusantara Port-Link",
            faqTitle: "FAQ",
            footer: "Copyright - Nusantara Port-Link 2025",

            usernameLabel: "Username",
            passwordLabel: "Password",
            loginButton: "Login",
            noAccount: "Don't have an account?",
            registerButton: "Register",
            userRegistration: "User Registration",
            fullName: "Full Name",
            ktpNumber: "National ID Number (KTP)",
            emailLabel: "Email",
            confirmPassword: "Confirm Password",
            address: "Address",
            jobTitle: "Job Title",
            phoneNumber: "Phone Number",
            saveButton: "Save & Register",
            loginFailed: "Login Failed! Please check your username, password, or selected role.",
            registerSuccess: "Registration successful! Please log in.",
            passwordMismatch: "Password confirmation does not match.",
            forgotPassword: "Forgot Password?",
            navAIPredictive: "AI Predictive",
            aboutContent: `
                <p><strong>Integrated Port Logistics Ecosystem Platform</strong> is a digital solution designed to address key challenges in ports, such as truck queues, uncertain vessel schedules, and complex administrative processes.</p>
                <h3>Our Vision</h3>
                <p>To create an efficient, transparent, and predictable logistics flow through technology. We integrate all stakeholders — from shipping agents, trucking companies, customs authorities, to cargo owners — into a single centralized platform.</p>
                <h3>Main Features</h3>
                <p><strong>1. Truck Management System:</strong> Enables online booking of truck arrival time slots to eliminate gate queues.</p>
                <p><strong>2. Vessel & Berth Management System:</strong> Tracks vessel positions in real time and automatically allocates berths for optimal docking efficiency.</p>
                <p><strong>3. Digital Administration System:</strong> Simplifies document submissions through a unified platform and provides a transparent online payment system.</p>
            `,
            faqData: [
                { q: "What is Nusantara Port-Link?", a: "An integrated digital platform for port logistics efficiency." },
                { q: "Who can use this platform?", a: "All stakeholders within the port ecosystem." },
                { q: "How do I register?", a: "Select your role on the main page, click 'Register' on the login page, and fill out the registration form." },
            ],
            navDashboard: "Main Dashboard",
            navAdminShipment: "Shipment Administration",
            navAdminCollection: "Collection Administration",
            navNotifications: "Notifications",
            navSmartParking: "Smart Parking",
            navLogisticsMap: "Logistics Map",
            navSettings: "Settings",
            logoutButton: "Logout",
            navCheckDocs: "Check Documents & Orders",
            navHistory: "Shipment History",
            dashboardTitle: "Main Operational Dashboard",
            statTrucksToday: "Trucks Entered Today",
            statVesselsDocked: "Vessels Docked",
            statContainersProcessed: "Containers Processed",
            statAvgWaitTime: "Average Waiting Time (min)",
            chartTitle: "Loading & Unloading Activity (TEUs)",
            smartParkingTitle: "Smart Parking Management",
            mapTitle: "Logistics Network Map",
            }};

            function navigateTo(pageId) {
        document.querySelectorAll('.auth-page').forEach(p => {
            p.classList.toggle('active', p.id === pageId);
            p.classList.toggle('hidden', p.id !== pageId);
        });
    }

    function showMessage(elementId, message, isSuccess = false) {
        const el = document.getElementById(elementId);
        if(!el) return;
        el.textContent = message;
        el.className = `message-box ${isSuccess ? 'success' : 'error'}`;
        el.classList.remove('hidden');
    }

    function hideMessage(elementId) {
        const el = document.getElementById(elementId);
        if(el) el.classList.add('hidden');
    }

    async function handleShipmentSubmit(event) {
        if (pageId === 'administrasi-pengiriman') {
    const shipmentForm = document.getElementById('shipment-form');
    shipmentForm?.addEventListener('submit', handleShipmentSubmit);
        }
        event.preventDefault();
        const form = event.target;
        const messageBox = document.getElementById('shipment-message');
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        submitButton.disabled = true;
        submitButton.textContent = 'Mengirim...';
        messageBox.classList.add('hidden');

        const formData = new FormData(form);

        try {
            const response = await fetch('api/submit_shipment.php', {
                method: 'POST',
                body: formData 
            });
            const result = await response.json();
            
            messageBox.textContent = result.message;
            if (result.status === 'success') {
                messageBox.className = 'message-box success';
                form.reset();
            } else {
                messageBox.className = 'message-box error';
            }
        } catch (error) {
            messageBox.textContent = 'Gagal terhubung ke server.';
            messageBox.className = 'message-box error';
        } finally {
            messageBox.classList.remove('hidden');
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    function startTruckRfidPolling() {
    if (state.rfidPollingInterval) clearInterval(state.rfidPollingInterval);
    const messageEl = document.getElementById('truck-rfid-scan-message');
    const rfidInput = document.getElementById('truck-rfid-input');
    const scanBtn = document.getElementById('start-truck-rfid-scan-btn');
    const originalBtnText = scanBtn.textContent;

    scanBtn.disabled = true;
    scanBtn.textContent = 'Menunggu Pindai...';
    messageEl.classList.add('hidden');
    showMessage('truck-rfid-scan-message', 'Siap memindai Tag RFID Truk...', true);

    state.rfidPollingInterval = setInterval(async () => {
        try {
            // Menggunakan API yang sama dengan Pelanggan
            const response = await fetch('api/check_rfid_scan.php'); 
            const result = await response.json();

            if (result.status === 'success' && result.rfid_tag) {
                clearInterval(state.rfidPollingInterval);
                state.scannedRfidTag = result.rfid_tag;
                rfidInput.value = state.scannedRfidTag;
                
                showMessage('truck-rfid-scan-message', `Tag RFID Truk ${state.scannedRfidTag} terdeteksi! Data siap disubmit.`, true);
                scanBtn.disabled = false;
                scanBtn.textContent = originalBtnText;
                
            }
        } catch (error) {
            console.error('Polling error:', error);
            showMessage('truck-rfid-scan-message', 'Gagal terhubung ke server pengecekan.', false);
        }
    }, 2500); 
}

    function getAdministrasiPengirimanPage() {
    const t = translations[state.currentLang];
    return `
        <div class="content-page">
            <div class="content-header">
                <h1>${t.shipmentFormTitle}</h1>
                <p>${t.shipmentFormSubtitle}</p>
            </div>
            <div class="card">
                <form id="shipment-form" enctype="multipart/form-data">
                    <div id="shipment-message" class="message-box hidden"></div>
                    
                    <h3 style="margin-bottom: 1rem; color: var(--accent-primary);">Detail Pengirim</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="form-group"><input type="text" name="employee_name" required placeholder="${t.employeeName}"></div>
                        <div class="form-group"><input type="text" name="employee_rfid" required placeholder="${t.employeeId}" title="RFID Karyawan/Pengirim"></div>
                        <div class="form-group"><input type="text" name="job_title" required placeholder="${t.jobTitle}"></div>
                        <div class="form-group"><input type="text" name="vehicle_plate" required placeholder="${t.vehiclePlate}"></div>
                    </div>

                    <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent-primary);">Detail Kontainer</h3>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <select name="container_type" required style="width: 100%; padding: 14px; border: 1px solid var(--border-color); background-color: var(--main-bg); border-radius: 8px; color: var(--text-primary);">
                                <option value="">Pilih Jenis Kontainer</option>
                                <option value="20ft">20 Kaki</option>
                                <option value="40ft">40 Kaki</option>
                            </select>
                        </div>
                        <div class="form-group"><input type="number" name="container_weight" required placeholder="${t.containerWeight}"></div>
                    </div>
                    
                    <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent-primary);">Rute & Pembayaran</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="form-group"><input type="text" name="origin" required placeholder="${t.origin}"></div>
                        <div class="form-group"><input type="text" name="destination" required placeholder="${t.destination}"></div>
                        <div class="form-group"><input type="number" name="total_price" required placeholder="${t.totalPrice}"></div>
                    </div>
                    
                    <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent-primary);">Tag RFID Truk (Wajib)</h3>
                    <div class="form-group">
                        <input type="text" id="truck-rfid-input" name="truck_rfid_tag" required readonly placeholder="${t.rfidTagToAssign}" style="margin-bottom: 0.5rem;">
                        <button type="button" id="start-truck-rfid-scan-btn" class="btn-submit" style="background-color: var(--accent-secondary); margin-top: 0; max-width: 300px;">Pindai RFID Truk</button>
                        <p id="truck-rfid-scan-message" class="message-box hidden" style="margin-top: 0.5rem; max-width: 300px;"></p>
                    </div>

                    <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--accent-primary);">Unggah Dokumen</h3>
                     <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <label for="photo_sender">${t.uploadSenderPhoto}</label>
                            <input type="file" id="photo_sender" name="photo_sender" accept="image/*" required style="padding-top: 10px;">
                        </div>
                        <div class="form-group">
                            <label for="card_employee">${t.uploadEmployeeCard}</label>
                            <input type="file" id="card_employee" name="card_employee" accept="image/*" required style="padding-top: 10px;">
                        </div>
                        <div class="form-group">
                            <label for="payment_proof">${t.uploadPaymentProof}</label>
                            <input type="file" id="payment_proof" name="payment_proof" accept="image/*" required style="padding-top: 10px;">
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-submit">${t.submitShipment}</button>
                </form>
            </div>
        </div>`;
}

/**
 * @param {string} pageId -
 */
    function renderDashboardContent(pageId) {
            state.currentPage = pageId;
            const wrapper = document.getElementById('dashboard-content-wrapper');
            if (!wrapper) return;
            wrapper.innerHTML = `<div class="loader"></div>`;
            if (state.activeInterval) clearInterval(state.activeInterval);

            document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
                link.classList.toggle('active', link.dataset.page === pageId);
            });

            let contentHTML = '';
            switch (pageId) {
                case 'dashboard':
                    contentHTML = getDashboardHomePage();
                    fetchDashboardData(); 
                    break;
                case 'smart-parking':
                    contentHTML = getSmartParkingPage(); 
                    fetchParkingData(); 
                    state.activeInterval = setInterval(fetchParkingData, 3000); 
                    break;
                   case 'peta-logistik':
                contentHTML = getLogisticsMapPage();
                setTimeout(() => {
                    initLeafletMap();
                }, 100); 
                break;
               case 'administrasi-pengiriman':
    contentHTML = getAdministrasiPengirimanPage();
    setTimeout(() => {
        const shipmentForm = document.getElementById('shipment-form');
        shipmentForm?.addEventListener('submit', handleShipmentSubmit);
        document.getElementById('start-truck-rfid-scan-btn')?.addEventListener('click', startTruckRfidPolling); // << INI PENTING
    }, 300); 
    break;
                case 'riwayat':
                    contentHTML = getShipmentHistoryPage(); 
                    break;
                case 'ai-predictive':
                    renderAIPredictivePage();
                    renderAIPredictivePageOffline();
                    return;
                default:
                contentHTML = `<div class="content-page"><div class="content-header"><h1>${pageId}</h1><p>Tidak Ada Notifikasi Masuk.</p></div></div>`;
        }

        setTimeout(() => {
        wrapper.innerHTML = contentHTML;
        if (pageId === 'administrasi-pengiriman') {
            const shipmentForm = document.getElementById('shipment-form');
            shipmentForm?.addEventListener('submit', handleShipmentSubmit);
            // NEW: Tambahkan listener untuk tombol scan RFID Truk
            document.getElementById('start-truck-rfid-scan-btn')?.addEventListener('click', startTruckRfidPolling);
        } else if (pageId === 'peta-logistik') {
                initLeafletMap();
            }
            else if (pageId === 'ai-predictive') {
                initAIchart();
            }
            setLanguage(state.currentLang);
        }, 200);
    }

    function getShipmentHistoryPage() {
    const t = translations[state.currentLang];
    return `
        <div class="content-page">
            <div class="content-header">
                <h1 data-lang-key="navHistory">${t.navHistory}</h1>
                <p>Daftar riwayat semua pengiriman yang diajukan oleh perusahaan Anda.</p>
            </div>
            <div class="card">
                <h3>Tabel Riwayat Pengiriman</h3>
                <p style="margin-top: 1rem;">Memuat data... (Implementasi tabel di PHP/JS diperlukan)</p>
            </div>
        </div>`;
}

function getLogisticsMapPage() {
    const t = translations[state.currentLang];
    return `
        <div class="content-page">
            <div class="content-header">
                <h1 data-lang-key="navLogisticsMap">${t.navLogisticsMap}</h1>
                <p>Visualisasi lokasi pelabuhan utama di Indonesia.</p>
            </div>
            <div class="card" style="height: 70vh; padding: 0;">
                <div id="leaflet-map-container" style="height: 100%; border-radius: 8px; z-index: 1;"></div>
            </div>
        </div>`;
}

    function generateOfflineWeatherPrediction() {
            // Fungsi ini membuat data cuaca dummy secara acak
            const scenarios = [
                // Skenario 1: Aman
                { temp: 29, description: 'Cerah Berawan', wind_speed: 4.5, weather_id: 802 },
                // Skenario 2: Waspada Angin
                { temp: 27, description: 'Berangin', wind_speed: 11.2, weather_id: 803 },
                // Skenario 3: Bahaya Hujan Deras
                { temp: 24, description: 'Hujan Deras', wind_speed: 8.0, weather_id: 502 },
                // Skenario 4: Bahaya Badai & Angin Ekstrem
                { temp: 22, description: 'Badai Petir', wind_speed: 18.0, weather_id: 211 },
            ];
            // Pilih salah satu skenario secara acak
            return scenarios[Math.floor(Math.random() * scenarios.length)];
        }

        function renderAIPredictivePageOffline() {
            const wrapper = document.getElementById('dashboard-content-wrapper');
            wrapper.innerHTML = `<div class="loader"></div>`;

            // 1. Hasilkan data cuaca offline
            const weather = generateOfflineWeatherPrediction();
            
            // 2. Analisis data cuaca offline
            let recommendation = {
                level: 'safe', title: 'Operasi Normal', message: 'Kondisi cuaca terpantau aman untuk semua aktivitas bongkar muat.', icon: 'ph-check-circle', reasons: []
            };

            // Logika analisis tetap sama, hanya sumber datanya yang berbeda
            if (weather.wind_speed > 10.8) {
                recommendation.level = 'caution';
                recommendation.title = 'Waspada Angin Kencang';
                recommendation.message = 'Kurangi aktivitas di ketinggian. Amankan peralatan yang mudah terbang.';
                recommendation.icon = 'ph-warning';
                recommendation.reasons.push(`Angin ${weather.wind_speed.toFixed(1)} m/s`);
            }

            if ((weather.weather_id >= 502 && weather.weather_id <= 531) || (weather.weather_id >= 200 && weather.weather_id <= 232)) {
                recommendation.level = 'danger';
                recommendation.title = 'Hentikan Aktivitas Bongkar Muat';
                recommendation.message = 'Cuaca buruk (hujan deras/badai) terdeteksi. Hentikan sementara semua aktivitas.';
                recommendation.icon = 'ph-x-circle';
                recommendation.reasons.push('Hujan Deras / Badai');
            }
            
            if (weather.wind_speed > 17.2) {
                 recommendation.level = 'danger';
                 recommendation.title = 'BAHAYA: Hentikan Semua Aktivitas';
                 recommendation.message = 'Angin sangat kencang terdeteksi. Risiko tinggi kerusakan dan kecelakaan.';
                 recommendation.icon = 'ph-x-circle';
                 if (!recommendation.reasons.includes('Hujan Deras / Badai')) {
                     recommendation.reasons.push(`Angin Ekstrem ${weather.wind_speed.toFixed(1)} m/s`);
                 }
            }
            
            // 3. Tampilkan halaman dengan data & rekomendasi offline
            wrapper.innerHTML = getAIPredictivePageHTML(recommendation, weather);
            initAIChart();
        }

    async function renderAIPredictivePage() {
            const wrapper = document.getElementById('dashboard-content-wrapper');
            wrapper.innerHTML = `<div class="loader"></div>`;

            // Pastikan data cuaca terbaru sudah diambil
            await getInitialLocationAndWeather(); 
            
            // Analisis data cuaca
            const weather = state.weatherData;
            let recommendation = {
                level: 'safe',
                title: 'Operasional dan Aktivitas Normal',
                message: 'Kondisi cuaca dan kecepatan angin terpantau aman untuk semua aktivitas bongkar muat Petikemas di Pelabuhan.',
                icon: 'ph-check-circle',
                reasons: []
            };

            if (weather) {
                // Cek Angin Kencang (lebih dari 10.8 m/s atau ~39 km/jam)
                if (weather.wind_speed > 10.8) {
                    recommendation.level = 'caution';
                    recommendation.title = 'Waspada Angin Laut Kencang';
                    recommendation.message = 'Kurangi aktivitas. Bongkar muat Kontainer perlu ditunda. Kapal kontainer tidak diperbolehkan bersandar dahulu, silakan menunggu di perairan hingga kondisi baik. Truk Kontainer dihimbau untuk tidak menuju pelabuhan dahulu';
                    recommendation.icon = 'ph-warning';
                    recommendation.reasons.push(`Angin ${weather.wind_speed.toFixed(1)} m/s`);
                }

                // Cek Hujan Deras (ID cuaca OpenWeatherMap untuk hujan lebat/badai)
                // 502-504 (hujan lebat), 521-531 (hujan deras
                if ((weather.weather_id >= 502 && weather.weather_id <= 531) || (weather.weather_id >= 200 && weather.weather_id <= 232)) {
                    recommendation.level = 'danger';
                    recommendation.title = 'Hentikan Aktivitas Bongkar Muat Pelabuhan!';
                    recommendation.message = 'Cuaca buruk hujan deras/badai besar terdeteksi. Hentikan semua aktivitas bongkar muat di area dermaga untuk keselamatan. Kapal kontainer tidak diperbolehkan bersandar dahulu, silakan menunggu di perairan hingga kondisi baik. Truk Kontainer dihimbau untuk tidak menuju pelabuhan dahulu';
                    recommendation.icon = 'ph-x-circle';
                    recommendation.reasons.push('Hujan Deras / Badai');
                }
                
                // Jika angin sangat kencang (badai), tingkatkan ke level bahaya
                if (weather.wind_speed > 17.2) {
                     recommendation.level = 'danger';
                     recommendation.title = 'BAHAYA: Hentikan Semua Aktivitas';
                     recommendation.message = 'Angin dan Badai sangat kencang terdeteksi. Resiko tinggi kerusakan dan kecelakaan. Evakuasi area bongkar muat.Kapal kontainer tidak diperbolehkan bersandar dahulu, silakan menunggu di perairan hingga kondisi baik. Truk Kontainer dihimbau untuk tidak menuju pelabuhan dahulu. ';
                     recommendation.icon = 'ph-x-circle';
                     if (!recommendation.reasons.includes('Hujan Deras / Badai')) {
                         recommendation.reasons.push(`Angin Ekstrem ${weather.wind_speed.toFixed(1)} m/s`);
                     }
                }
            } else {
                 recommendation.level = 'unknown';
                 recommendation.title = 'Data Cuaca Tidak Tersedia';
                 recommendation.message = 'Tidak dapat mengambil data cuaca saat ini untuk memberikan rekomendasi prediksi.';
                 recommendation.icon = 'ph-question';
            }
            
            wrapper.innerHTML = getAIPredictivePageHTML(recommendation);
            initAIChart(); 
        }

        function getAIPredictivePageHTML(recommendation) {
            const weather = state.weatherData;
            return `
            <div class="content-page">
                <div class="content-header">
                    <h1>Prediksi AI - Kontrol Aktivitas Pelabuhan</h1>
                    <p>Analisis real-time berdasarkan kondisi cuaca untuk rekomendasi operasional.</p>
                </div>

                <div class="recommendation-card ${recommendation.level}">
                    <div class="icon-wrapper"><i class="ph-fill ${recommendation.icon}"></i></div>
                    <div class="details-wrapper">
                        <h3>${recommendation.title}</h3>
                        <p>${recommendation.message}</p>
                    </div>
                </div>

                <div class="stats-grid" style="margin-top: 24px;">
                    <div class="stat-card card"><div class="card-icon info-bg"><i class="ph-fill ph-thermometer-simple info-text"></i></div><div class="card-info"><span class="value">${weather ? weather.temp + '°C' : '--'}</span><span class="label">Suhu Saat Ini</span></div></div>
                    <div class="stat-card card"><div class="card-icon warning-bg"><i class="ph-fill ph-wind warning-text"></i></div><div class="card-info"><span class="value">${weather ? weather.wind_speed.toFixed(1) + ' m/s' : '--'}</span><span class="label">Kecepatan Angin</span></div></div>
                    <div class="stat-card card"><div class="card-icon success-bg"><i class="ph-fill ph-cloud-sun success-text"></i></div><div class="card-info"><span class="value">${weather ? weather.description : '--'}</span><span class="label">Kondisi Cuaca</span></div></div>
                    <div class="stat-card card"><div class="card-icon danger-bg"><i class="ph-fill ph-warning-octagon danger-text"></i></div><div class="card-info"><span class="value">${recommendation.reasons.length > 0 ? recommendation.reasons.join(', ') : 'Aman'}</span><span class="label">Parameter Peringatan</span></div></div>
                </div>

                <div class="card" style="margin-top: 24px;">
                    <h3>Prediksi Volume Truk per Jam (Terlepas dari Cuaca)</h3>
                    <div class="chart-container"><canvas id="ai-chart"></canvas></div>
                </div>
            </div>`;
        }

        function initAIChart() {
            const ctx = document.getElementById('ai-chart')?.getContext('2d');
            if (!ctx) return;
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                    datasets: [{
                        label: 'Jumlah Truk',
                        data: [25, 38, 30, 55, 48, 22],
                        backgroundColor: 'rgba(59, 130, 246, 0.6)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 1
                    }]
                },
                options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
            });
        }

    function getDashboardHomePage() {
    return `
        <div class="content-page">
            <div class="content-header">
                <h1 data-lang-key="dashboardTitle"></h1>
                <p id="current-date-display"></p>
            </div>
            <div class="stats-grid">
                <div class="stat-card card">
                    <div class="card-icon info-bg"><i class="ph-fill ph-truck info-text"></i></div>
                    <div class="card-info">
                        <span class="value" id="stat-trucks">...</span>
                        <span class="label" data-lang-key="statTrucksToday"></span>
                    </div>
                </div>
                <div class="stat-card card">
                    <div class="card-icon success-bg"><i class="ph-fill ph-anchor-simple success-text"></i></div>
                    <div class="card-info">
                        <span class="value" id="stat-vessels">...</span>
                        <span class="label" data-lang-key="statVesselsDocked"></span>
                    </div>
                </div>
                <div class="stat-card card">
                    <div class="card-icon warning-bg"><i class="ph-fill ph-package warning-text"></i></div>
                    <div class="card-info">
                        <span class="value" id="stat-containers">...</span>
                        <span class="label" data-lang-key="statContainersProcessed"></span>
                    </div>
                </div>
                <div class="stat-card card">
                    <div class="card-icon danger-bg"><i class="ph-fill ph-clock-countdown danger-text"></i></div>
                    <div class="card-info">
                        <span class="value" id="stat-wait-time">...</span>
                        <span class="label" data-lang-key="statAvgWaitTime"></span>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-top: 24px;">
                <h3 data-lang-key="chartTitle"></h3>
                <div class="chart-container"><canvas id="main-chart"></canvas></div>
            </div>
        </div>`;
}

 function getSmartParkingPage() {
            return `
            <div class="content-page">
                <div class="content-header">
                    <h1>Smart Parking Management</h1>
                    <p>Monitor status slot parkir truk secara real-time.</p>
                </div>
                <div id="parking-grid-container" class="parking-grid">
                    <!-- Slot parkir akan dirender di sini oleh JS -->
                    <div class="loader"></div> 
                </div>
            </div>`;
 }

function getLogisticsMapPage() {
    return `
        <div class="content-page">
            <div class="content-header"><h1 data-lang-key="mapTitle"></h1></div>
            <div class="card map-card"><div id="map"></div></div>
        </div>`;
}

function navigateAuthPage(pageId) {
        document.querySelectorAll('.auth-page').forEach(p => {
            p.classList.toggle('active', p.id === pageId);
            p.classList.toggle('hidden', p.id !== pageId);
        });
    }

async function fetchDashboardData() {
    try {
        const response = await fetch('api/get_dashboard_data.php');
        const result = await response.json();
        if (result.status === 'success') {
            document.getElementById('current-date-display').textContent = result.current_date;
            document.getElementById('stat-trucks').textContent = result.stats.trucks_today;
            document.getElementById('stat-vessels').textContent = result.stats.vessels_docked_string;
            document.getElementById('stat-containers').textContent = result.stats.containers_processed;
            document.getElementById('stat-wait-time').textContent = result.stats.avg_wait_time;
            initDashboardChart(result.chart_data);
        }
    } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
    }
}

async function fetchParkingData() {
            try {
                const response = await fetch('api/get_parking_status.php');
                const result = await response.json();
                const container = document.getElementById('parking-grid-container');
                if (!container || result.status !== 'success') return;

                container.innerHTML = ''; 
                result.data.pengiriman.forEach(slot => {
                    const isOccupied = slot.is_occupied == 1;
                    const slotEl = document.createElement('div');
                    slotEl.className = `parking-slot-card ${isOccupied ? 'occupied' : 'available'}`;
                    slotEl.innerHTML = `
                        <div class="icon-wrapper">
                            <i class="ph-fill ph-truck"></i>
                        </div>
                        <div class="details-wrapper">
                            <span class="slot-name">${slot.slot_name}</span>
                            <span class="slot-status">${isOccupied ? 'Terisi' : 'Kosong'}</span>
                        </div>
                    `;
                    container.appendChild(slotEl);
                });

                const summary = result.summary.pengiriman;
                const summaryCard = document.createElement('div');
                summaryCard.className = 'parking-slot-card summary';
                summaryCard.innerHTML = `
                    <div class="icon-wrapper">
                        <i class="ph-fill ph-stack"></i>
                    </div>
                    <div class="details-wrapper">
                        <span class="slot-name">${summary.available}</span>
                        <span class="slot-status">Sisa Slot</span>
                    </div>
                `;
                container.appendChild(summaryCard);

            } catch (error) {
                console.error("Gagal mengambil data parkir:", error);
                const container = document.getElementById('parking-grid-container');
                if(container) container.innerHTML = '<p>Gagal memuat data parkir.</p>';
            }
        }

async function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.role = state.currentRoleSelection;
        data.action = 'login';

        try {
            const response = await fetch('api/user_auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.status === 'success') {
                window.location.href = 'dashboard.php';
            } else {
            }
        } catch (error) {}
    }

    function handleRegister() {
        const form = document.getElementById('register-form');
        const formData = new FormData(form);
        const data = {};
        
        formData.forEach((value, key) => {
            data[key] = value.trim(); 
        });

        if (!data.full_name || data.full_name.length === 0) {
            alert('DEBUGGING FAILED: Nama Lengkap terdeteksi kosong sebelum dikirim. Cek form HTML!');
            console.error('Data registrasi gagal: full_name kosong', data);
            return;
        }
        
        if (data.password !== data.confirm_password) {
            alert('Konfirmasi password tidak cocok!');
            return;
        }

        data.action = 'register';
        data.role = state.currentRoleSelection || document.getElementById('reg-role').value || 'customer';

        const btn = document.getElementById('save-register-btn');
        btn.textContent = 'Processing...';
        btn.disabled = true;

        fetch('user_auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            if (res.status === 'success') {
                alert(res.message + ' Akun telah dibuat. Silakan login.');
                showPage('page-auth'); 
                
                document.getElementById('login-username').value = data.username;
            } else {
                alert('Gagal Registrasi: ' + res.message);
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            alert('Terjadi kesalahan saat menghubungi server.');
        })
        .finally(() => {
            // Kembalikan tombol ke keadaan semula
            btn.textContent = translations[state.currentLang].saveButton || 'Save & Register';
            btn.disabled = false;
        });
    }

function initDashboardChart(chartData) {
    const ctx = document.getElementById('main-chart')?.getContext('2d');
    if (!ctx) return;

    if (state.charts.main) state.charts.main.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);
    gradient.addColorStop(0, state.currentTheme === 'dark' ? 'rgba(129, 140, 248, 0.4)' : 'rgba(79, 70, 229, 0.4)');
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    state.charts.main = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'TEUs',
                data: chartData.data,
                borderColor: state.currentTheme === 'dark' ? '#A5B4FC' : '#4f46e5',
                backgroundColor: gradient,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: state.currentTheme === 'dark' ? '#9CA3AF' : '#6B7280' } },
                y: { ticks: { color: state.currentTheme === 'dark' ? '#9CA3AF' : '#6B7280' } }
            }
        }
    });
}

function initLeafletMap() {
        if (state.leafletMap) state.leafletMap.remove();
        const mapEl = document.getElementById('map');
        if (!mapEl || !L) return;

        state.leafletMap = L.map(mapEl).setView([-2.5489, 118.0149], 5);
        const tileUrl = state.currentTheme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        L.tileLayer(tileUrl, { maxZoom: 18, attribution: '&copy; OpenStreetMap contributors' }).addTo(state.leafletMap);
        
        const ports = [
            { name: 'Tanjung Priok, DKI Jakarta', coords: [-6.1054, 106.882] },
            { name: 'Tanjung Perak, Surabaya, Jawa Timur', coords: [-7.2023, 112.730] },
            { name: 'Belawan, Medan, Sumatera Utara', coords: [3.784, 98.691] },
            { name: 'Soekarno-Hatta, Makassar, Sulawesi Selatan', coords: [-5.118, 119.41] },
            { name: 'Tanjung Emas, Semarang, Jawa Tengah', coords: [-6.95, 110.416] },
            { name: 'Boom Baru, Palembang, Sumatera Selatan', coords: [-2.979336395668242, 104.77682092227636] },
            { name: 'Dwikora, Pontianak, Kalimantan Barat', coords: [-0.01695797698739511, 109.33447746275489] },
            { name: 'Kariangau, Balikpapan, Kalimantan Selatan', coords: [-1.153445208138209, 116.79046321271322] },
            { name: 'Bitung, Manado, Sulawesi Utara', coords: [1.4715006302566038, 125.19311632918301] },
            { name: 'Tenau Kupang, Kupang, NTT', coords: [-10.197560311934437, 123.52867700042748] },
            { name: 'Jayapura, Jayapura, Papua', coords: [-2.5437104479146995, 140.71318183955424] },
            { name: 'Yoes Sudarso, Ambon, Maluku', coords: [-3.6938845784447203, 128.17600195296944] },
            { name: 'Sorong, Sorong, Papua Barat Daya', coords: [-0.8775637002560106, 131.24693713948795] },
            { name: 'Benoa, Denpasar, Bali', coords: [-8.741245991857609, 115.21205899201465] },
            { name: 'Teluk Bayur, Padang, Sumatera Barat', coords: [-0.9948117880996117, 100.37018032987538] },
        
        ];
        ports.forEach(port => L.marker(port.coords).addTo(state.leafletMap).bindPopup(port.name));
    }

    /**
 * @param {string} role - Peran pengguna saat ini.
 */
function generateSidebarMenu(role) {
            const navContainer = document.getElementById('sidebar-nav');
            if (!navContainer) return;
            let menuItems = [];

            // Menu berdasarkan peran
            if (role === 'pelanggan') {
                menuItems = [
                    { id: 'dashboard', icon: 'ph-house', key: 'navDashboard' },
                    { id: 'notifikasi', icon: 'ph-bell', key: 'navNotifications' },
                    { id: 'cek-dokumen', icon: 'ph-file-text', key: 'navCheckDocs' },
                ];
            } else if (role === 'perusahaan_mitra') {
                menuItems = [
                    { id: 'dashboard', icon: 'ph-house', key: 'navDashboard' },
                    { id: 'administrasi-pengiriman', icon: 'ph-note-pencil', key: 'navAdminShipment' },
                    { id: 'riwayat', icon: 'ph-clock-counter-clockwise', key: 'navHistory' },
                    { id: 'notifikasi', icon: 'ph-bell', key: 'navNotifications' }
                ];
            } else { // Admin
                menuItems = [
                    { id: 'dashboard', icon: 'ph-house', key: 'navDashboard' },
                    { id: 'administrasi-pengambilan', icon: 'ph-anchor', key: 'navAdminCollection' },
                    { id: 'notifikasi', icon: 'ph-bell', key: 'navNotifications' }
                ];
            }

            // Menu yang ada di semua peran
            menuItems.push(
                { id: 'ai-predictive', icon: 'ph-brain', key: 'navAIPredictive' }, // BARU
                { id: 'smart-parking', icon: 'ph-car', key: 'navSmartParking' },
                { id: 'peta-logistik', icon: 'ph-map-trifold', key: 'navLogisticsMap' }
            );

            navContainer.innerHTML = menuItems.map(item => `<a href="#" class="nav-link" data-page="${item.id}"><i class="ph-fill ${item.icon}"></i><span data-lang-key="${item.key}"></span></a>`).join('');
            navContainer.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    renderDashboardContent(link.dataset.page);
                });
            });
        }

function setupDashboardPage() {
        const userDataEl = document.getElementById('user-data');
        if (!userDataEl) return;
        state.currentUser = {
            role: userDataEl.dataset.role,
            name: userDataEl.dataset.name,
        };
    // Setup UI
    generateSidebarMenu(state.currentUser.role);
    setLanguage(state.currentLang); // Terapkan bahasa ke menu baru
    setTheme(state.currentTheme);
    renderDashboardContent('dashboard'); // Tampilkan halaman dashboard awal

    document.getElementById('open-sidebar-btn')?.addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('sidebar-overlay').classList.add('active');
    });
    const closeSidebar = () => {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('sidebar-overlay').classList.remove('active');
    };
    document.getElementById('close-sidebar-btn')?.addEventListener('click', closeSidebar);
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);
}

  async function fetchWeatherData(coords = null) {
            const widget = document.getElementById('weather-widget');
            let apiUrl = 'api/get_weather.php';
            if (coords) {
                apiUrl += `?lat=${coords.latitude}&lon=${coords.longitude}`;
            }
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data.status === 'success') {
                    // Simpan data cuaca lengkap di state global
                    state.weatherData = data; 
                    // Update widget header
                    if(widget) {
                        widget.querySelector('#weather-temp').textContent = `${data.temp}°C`;
                        widget.querySelector('#weather-desc').textContent = data.description;
                        const iconPlaceholder = widget.querySelector('.weather-icon-placeholder');
                        iconPlaceholder.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.icon}.png" alt="Weather icon">`;
                    }
                } else {
                    if(widget) widget.querySelector('#weather-desc').textContent = 'Gagal memuat.';
                }
            } catch (error) {
                if(widget) widget.querySelector('#weather-desc').textContent = 'Error.';
            }
        }

         function getInitialLocationAndWeather() {
             if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => { fetchWeatherData(position.coords); },
                    () => { fetchWeatherData(); }
                );
            } else {
                fetchWeatherData();
            }
        }

 function setupAuthPage() {
        function startRfidPolling() {
            if (state.rfidPollingInterval) clearInterval(state.rfidPollingInterval);
            const messageEl = document.getElementById('rfid-scan-message');
            hideMessage('rfid-scan-message');

            state.rfidPollingInterval = setInterval(async () => {
                try {
                    const response = await fetch('api/check_rfid_scan.php');
                    const result = await response.json();

                    if (result.status === 'success' && result.rfid_tag) {
                        clearInterval(state.rfidPollingInterval);
                        state.scannedRfidTag = result.rfid_tag;
                        const rfidInput = document.getElementById('register-rfid-tag');
                        if (rfidInput) rfidInput.value = state.scannedRfidTag;
                        
                        showMessage('rfid-scan-message', `E-Port ${state.scannedRfidTag} terdeteksi! Lanjut mengisi form.`, true);
                        setTimeout(() => navigateTo('page-register'), 2000);
                    }
                } catch (error) {
                    console.error('Polling error:', error);
                    showMessage('rfid-scan-message', 'Gagal terhubung ke server pengecekan.', false);
                    clearInterval(state.rfidPollingInterval);
                }
            }, 2500); 
        }

        document.querySelectorAll('.role-selection-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentRoleSelection = btn.dataset.role;
                navigateTo('page-login');
            });
        });

        document.getElementById('go-to-register')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (state.currentRoleSelection === 'pelanggan') {
                navigateTo('page-rfid-scan');
                startRfidPolling();
            } else {
                navigateTo('page-register');
            }
        });
        
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (state.rfidPollingInterval) clearInterval(state.rfidPollingInterval);
                navigateTo(e.currentTarget.dataset.target);
            });
        });

        document.getElementById('register-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessage('register-message');
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            if (data.password !== data.confirmPassword) {
                const errorMsg = translations[state.currentLang]?.passwordMismatch || "Konfirmasi password tidak cocok.";
                showMessage('register-message', errorMsg, false);
                return; 
            }

            data.action = 'register_pelanggan'; 
            
            try {
                const response = await fetch('api/user_auth.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.status === 'success') {
                    showMessage('register-message', result.message, true);
                    form.reset();
                    setTimeout(() => navigateTo('page-login'), 2000);
                } else {
                    showMessage('register-message', result.message || 'Registrasi Gagal.', false);
                }
            } catch (error) {
                console.error("Registration Fetch Error:", error);
                showMessage('register-message', 'Tidak dapat terhubung ke server.', false);
            }
        });
        
        document.getElementById('login-form')?.addEventListener('submit', async (e) => {
             e.preventDefault();
             hideMessage('login-message');
             const form = e.target;
             const formData = new FormData(form);
             const data = Object.fromEntries(formData.entries());
             data.action = 'login';
             data.role = state.currentRoleSelection;

             try {
                const response = await fetch('api/user_auth.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (result.status === 'success') {
                    window.location.href = 'dashboard.php';
                } else {
                    showMessage('login-message', result.message, false);
                }
             } catch(error) {
                showMessage('login-message', 'Tidak dapat terhubung ke server.', false);
             }
        });
                setLanguage(state.currentLang);

        generateSidebarMenu(state.currentUser.role);
        renderDashboardContent('dashboard');
        getInitialLocationAndWeather(); 
        setInterval(getInitialLocationAndWeather, 30000); 
        setLanguage(state.currentLang);
        getAIPredictivePageHTML(recommendation);
        renderAIPredictivePage();
    }

function main() {
        if (document.getElementById('page-dashboard')) {
            setupDashboardPage();
        } else if (document.getElementById('page-role-selection')) {
            setupAuthPage();
        }

         const registerButton = document.getElementById('save-register-btn');
        if (registerButton) {
            registerButton.addEventListener('click', handleRegister);
        }
        document.querySelectorAll('[id^="theme-toggle-"]').forEach(t => t.addEventListener('click', () => {
            const newTheme = state.currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
        }));
        document.querySelectorAll('[id^="lang-toggle-"]').forEach(t => t.addEventListener('click', () => {
            const newLang = state.currentLang === 'id' ? 'en' : 'id';
            setLanguage(newLang);
        }));

        setTheme(state.currentTheme);
    }

 function setTheme(theme) {
        state.currentTheme = theme;
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        // Toggle icons
        document.querySelectorAll('.toolbar-button[id^="theme-toggle-"]').forEach(toggle => {
            toggle.querySelector('.ph-moon')?.classList.toggle('hidden', theme === 'dark');
            toggle.querySelector('.ph-sun')?.classList.toggle('hidden', theme === 'light');
        });
       
        if (state.currentPage === 'dashboard' && state.charts.container) initDashboardCharts();
        if (state.currentPage === 'peta-logistik' && state.leafletMap) initLeafletMap();
    }

     function setLanguage(lang) {
        state.currentLang = lang;
        localStorage.setItem('lang', lang);
        const t = translations[lang] || translations['id'];
        document.querySelectorAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (t[key]) {
                 el.innerHTML = t[key];
            }
        });
    }

main();
if (document.getElementById('page-dashboard')) {
        setupDashboardPage();
    } else if (document.getElementById('page-role-selection')) {
        setupAuthPage();
    }
})

