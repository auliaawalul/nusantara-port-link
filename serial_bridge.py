import serial
import requests
import time
import json

# --- KONFIGURASI PENGGUNA ---
# Ganti 'COM3' dengan port serial ESP32 Anda yang terdeteksi di Device Manager
SERIAL_PORT = 'COM5' 
BAUD_RATE = 115200
# Alamat root dari API PHP Anda
API_URL = 'http://localhost/nusantara-port-link/api/'

# --- INISIALISASI ---
try:
    ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
    print(f"Berhasil terhubung ke port serial {SERIAL_PORT}")
except serial.SerialException as e:
    print(f"Error: Tidak bisa membuka port serial {SERIAL_PORT}.")
    print(f"Pastikan tidak ada Serial Monitor lain yang terbuka dan port sudah benar.")
    print(f"Detail error: {e}")
    exit()

def process_data_from_esp32(data):
    """Memproses data yang diterima dari ESP32 dan mengirimkannya ke API yang sesuai."""
    data = data.strip()
    print(f"Menerima data dari ESP32: {data}")

    # Memisahkan perintah dan nilai, contoh: "RFID_SCAN:1234ABCD"
    if ':' not in data:
        return

    command, value = data.split(':', 1)

    # 1. Logika untuk Pengecekan RFID di Gerbang
    if command == "RFID_SCAN":
        endpoint = 'gate_check.php'
        payload = {'rfid_tag': value}
        
        try:
            response = requests.post(API_URL + endpoint, data=payload)
            response.raise_for_status() # Akan error jika status code bukan 2xx
            
            response_data = response.json()
            print(f"Respons dari server: {response_data}")
            
            # Kirim kembali hasilnya ke ESP32
            if response_data.get('status') == 'valid':
                ser.write(b'GATE_VALID\n')
                print("Mengirim perintah 'GATE_VALID' ke ESP32.")
            else:
                ser.write(b'GATE_INVALID\n')
                print("Mengirim perintah 'GATE_INVALID' ke ESP32.")

        except requests.exceptions.RequestException as e:
            print(f"Error saat menghubungi API: {e}")
            ser.write(b'SERVER_ERROR\n')
            print("Mengirim perintah 'SERVER_ERROR' ke ESP32.")

    # 2. Logika untuk Update Status Parkir
    elif command == "PARKING":
        # Value akan berbentuk "P1=1"
        slot_name, is_occupied = value.split('=')
        endpoint = 'update_parking_status.php'
        payload = {'slot_name': slot_name, 'is_occupied': is_occupied}
        
        try:
            response = requests.post(API_URL + endpoint, data=payload)
            response.raise_for_status()
            print(f"Update status parkir {slot_name} berhasil dikirim.")
            # Biasanya tidak perlu respons balik ke ESP32 untuk update parkir
            
        except requests.exceptions.RequestException as e:
            print(f"Error saat update parkir: {e}")


# --- LOOP UTAMA ---
print(f"Menunggu data dari ESP32 di port {SERIAL_PORT}...")
while True:
    try:
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            if line:
                process_data_from_esp32(line)
        time.sleep(0.1) # Jeda singkat agar CPU tidak bekerja terlalu keras
    except KeyboardInterrupt:
        print("\nProgram dihentikan.")
        break
    except Exception as e:
        print(f"Terjadi error: {e}")
        break

ser.close()
print("Koneksi serial ditutup.")
