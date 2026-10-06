"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const state = {
        currentRoleSelection: null,
    };

    function renderPage(pageName) {
        app.innerHTML = templates[pageName];
    }

    function initEventListeners() {
        app.addEventListener('click', e => {
            // Handle role selection
            const roleBtn = e.target.closest('.role-selection-btn');
            if (roleBtn) {
                currentRole = roleBtn.dataset.role;
                renderPage('login');
                document.getElementById('login-role-title').textContent = `Login sebagai ${currentRole}`;
                document.getElementById('login-role-input').value = currentRole;
                return;
            }

            // Handle back button
            const backBtn = e.target.closest('.back-btn');
            if (backBtn) {
                renderPage('roleSelection');
                return;
            }

            // Handle link to register page
            const registerLink = e.target.closest('[data-page="register"]');
            if (registerLink) {
                e.preventDefault();
                renderPage('register');
                document.getElementById('register-role-input').value = currentRole;
                return;
            }
        });

        app.addEventListener('submit', e => {
            if (e.target.id === 'login-form') {
                e.preventDefault();
                const formData = new FormData(e.target);
                const messageDiv = document.getElementById('login-message');
                fetch('auth.php', { method: 'POST', body: formData })
                    .then(res => res.json())
                    .then(data => {
                        messageDiv.textContent = data.message;
                        messageDiv.className = data.success ? 'message success' : 'message error';
                        if (data.success) {
                            setTimeout(() => window.location.href = 'dashboard.php', 1000);
                        }
                    });
            } else if (e.target.id === 'register-form') {
                e.preventDefault();
                const formData = new FormData(e.target);
                const messageDiv = document.getElementById('register-message');
                fetch('register_process.php', { method: 'POST', body: formData })
                    .then(res => res.json())
                    .then(data => {
                        messageDiv.textContent = data.message;
                        messageDiv.className = data.success ? 'message success' : 'message error';
                        if (data.success) {
                            setTimeout(() => {
                                renderPage('login');
                                document.getElementById('login-role-title').textContent = `Login sebagai ${currentRole}`;
                                document.getElementById('login-role-input').value = currentRole;
                            }, 2000);
                        }
                    });
            }
        });

        app.addEventListener('change', e => {
            if (e.target.id === 'profile_pic') {
                const preview = document.getElementById('profile-pic-preview');
                const file = e.target.files[0];
                if (file) {
                    preview.src = URL.createObjectURL(file);
                }
            }
        });
    }

    renderPage('roleSelection');
    initEventListeners();

    const faqData = [
        { q: "Apa itu Nusantara Port-Link?", a: "Nusantara Port-Link adalah platform digital terintegrasi yang bertujuan untuk menyederhanakan dan mengefisienkan seluruh proses logistik di pelabuhan, mulai dari kedatangan truk hingga keberangkatan kapal." },
        { q: "Siapa saja yang bisa menggunakan platform ini?", a: "Platform ini dirancang untuk semua pihak yang terlibat dalam ekosistem pelabuhan, termasuk Perusahaan Mitra (misalnya, perusahaan trucking, agen kargo), Pelanggan (misalnya, supir truk), dan Admin Pelabuhan." },
        { q: "Bagaimana cara mendaftarkan akun?", a: "Anda dapat mendaftar dengan memilih peran Anda pada halaman utama, lalu klik link 'Daftar' di halaman login. Isi formulir dengan data yang valid, dan akun Anda akan segera aktif." },
        { q: "Apakah data saya aman?", a: "Ya, kami menggunakan standar keamanan tertinggi dengan enkripsi data untuk melindungi semua data pengguna dan transaksi yang terjadi di platform." },
        { q: "Apa keuntungan utama menggunakan sistem ini?", a: "Keuntungan utamanya adalah efisiensi waktu, pengurangan biaya operasional, transparansi biaya, dan kemudahan dalam memonitor pergerakan kargo dan kendaraan secara real-time." },
        { q: "Bagaimana sistem pembayaran bekerja?", a: "Semua tagihan jasa pelabuhan akan diterbitkan secara digital melalui platform. Perusahaan Mitra dapat membayarnya langsung menggunakan metode pembayaran elektronik yang tersedia." },
        { q: "Bagaimana sistem RFID di gerbang berfungsi?", a: "Setiap truk yang terdaftar akan memiliki Tag RFID. Saat mendekati gerbang, sensor akan memindai tag, mencocokkan datanya dengan database pengiriman, dan membuka gerbang secara otomatis jika data valid." },
        { q: "Apa yang terjadi jika data RFID saya tidak valid?", a: "LCD di gerbang akan menampilkan pesan bahwa data tidak terdaftar, dan Anda akan diarahkan untuk keluar melalui jalur yang disediakan. Anda perlu menghubungi Perusahaan Mitra Anda untuk verifikasi data." },
        { q: "Bagaimana cara kerja Smart Parking?", a: "Sensor inframerah di setiap slot parkir mendeteksi keberadaan truk. Data ini dikirim secara real-time ke aplikasi, sehingga supir truk (Pelanggan) dapat melihat slot mana yang tersedia sebelum tiba di area parkir." },
        { q: "Apakah saya bisa melacak posisi kapal saya?", a: "Ya, pada menu 'Peta Logistik', Perusahaan Mitra dan Admin Pelabuhan dapat melihat posisi kapal yang dijadwalkan sandar secara real-time (menggunakan data dummy)." },
        { q: "Bagaimana jika saya lupa password?", a: "Gunakan fitur 'Lupa Password?' pada halaman login. Anda akan diminta untuk memasukkan email terdaftar untuk proses verifikasi dan pembuatan password baru." },
        { q: "Apakah notifikasi dikirim secara real-time?", a: "Ya, semua notifikasi, seperti persetujuan dokumen pengiriman atau alokasi slot parkir, dikirimkan secara real-time ke akun Pelanggan yang bersangkutan." },
        { q: "Dokumen apa saja yang bisa diunggah?", a: "Pada formulir administrasi, Anda dapat mengunggah dokumen penting seperti foto pengirim, kartu identitas karyawan, dan bukti pembayaran untuk kelengkapan data." },
        { q: "Apakah ada aplikasi mobile?", a: "Saat ini kami fokus pada platform web yang responsif dan dapat diakses dari browser perangkat apa pun. Pengembangan aplikasi mobile sedang dalam perencanaan kami untuk masa depan." },
        { q: "Siapa yang harus dihubungi jika saya mengalami masalah teknis?", a: "Anda dapat menghubungi tim dukungan teknis kami melalui menu 'Bantuan' di dalam dashboard atau mengirim email ke support@nusantaraportlink.com." }
    ];

    function renderFaq() {
        const faqList = document.getElementById('faq-list');
        if (!faqList) return;
        faqList.innerHTML = '';
        faqData.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `<div class="faq-question">${item.q}</div><div class="faq-answer"><p>${item.a}</p></div>`;
            faqList.appendChild(faqItem);
        });
    }

    function navigateTo(pageId) {
        document.querySelectorAll('.auth-page').forEach(page => {
            page.classList.remove('active');
            page.classList.add('hidden');
        });

        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('active');
            if (pageId === 'page-faq') {
                renderFaq();
            }
        } else {
            console.error(`Error: Halaman dengan ID "${pageId}" tidak ditemukan.`);
        }
    }

    function handleLoginSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const messageDiv = document.getElementById('login-message');
        formData.append('role', state.currentRoleSelection);

        fetch('auth.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = 'Login berhasil! Mengarahkan...';
                messageDiv.className = 'message success';
                setTimeout(() => {
                    window.location.href = 'dashboard.php';
                }, 1000);
            } else {
                messageDiv.textContent = data.message || 'Login gagal!';
                messageDiv.className = 'message error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Terjadi kesalahan koneksi ke server.';
            messageDiv.className = 'message error';
        });
    }

    function handleRegisterSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const messageDiv = document.getElementById('register-message');
        
        // Tambahkan peran dari state
        formData.append('role', state.currentRoleSelection);

        fetch('register_process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message success';
                setTimeout(() => {
                    navigateTo('page-login');
                }, 2000);
            } else {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Terjadi kesalahan koneksi.';
            messageDiv.className = 'message error';
        });
    }

    function initEventListeners() {
        document.body.addEventListener('click', (event) => {
            const target = event.target;
            const roleButton = target.closest('.role-selection-btn');
            if (roleButton) {
                state.currentRoleSelection = roleButton.dataset.role;
                const loginTitle = document.getElementById('login-role-title');
                if (loginTitle) {
                    loginTitle.textContent = `Login sebagai ${state.currentRoleSelection}`;
                }
                navigateTo('page-login');
                return;
            }

            const backButton = target.closest('.back-btn');
            if (backButton) {
                navigateTo(backButton.dataset.target);
                return;
            }

            const navLink = target.closest('.form-link[data-page]');
            if (navLink) {
                event.preventDefault();
                const pageId = "page-" + navLink.dataset.page;
                navigateTo(pageId);
                return;
            }
            
            const faqQuestion = target.closest('.faq-question');
            if (faqQuestion) {
                faqQuestion.parentElement.classList.toggle('active');
            }
        });

        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLoginSubmit);
        }

        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', handleRegisterSubmit);
        }

        const profilePicInput = document.getElementById('profile_pic');
        const profilePicPreview = document.getElementById('profile-pic-preview');
        if (profilePicInput && profilePicPreview) {
            profilePicInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        profilePicPreview.src = e.target.result;
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    initEventListeners();
    navigateTo('page-role-selection');
});


