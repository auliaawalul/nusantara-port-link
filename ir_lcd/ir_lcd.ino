#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>

#define SS_PIN    5   // RFID SDA
#define RST_PIN   4   // RFID RST
#define SCK_PIN   18  // RFID SCK
#define MISO_PIN  19  // RFID MISO
#define MOSI_PIN  23  // RFID MOSI
#define SERVO_PIN 13  // Servo Motor
#define IR1_PIN   16  // Sensor Parkir 1
#define IR2_PIN   17  // Sensor Parkir 2
#define IR3_PIN   32  // Sensor Parkir 3
#define IR4_PIN   33 // Sensor Parkir 4

MFRC522 mfrc522(SS_PIN, RST_PIN);
LiquidCrystal_I2C lcd(0x27, 16, 2); 
Servo gateServo;

unsigned long gateOpenMillis = 0;
const long gateTimeout = 5000; 
bool isGateOpen = false;

void setup() {
  Serial.begin(115200);
  SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
  mfrc522.PCD_Init();
  
  lcd.begin();
  lcd.backlight();
  displayLCD("Gate In System", "Tempelkan Kartu");

  gateServo.attach(SERVO_PIN);
  gateServo.write(0);

  pinMode(IR1_PIN, INPUT_PULLUP);
  pinMode(IR2_PIN, INPUT_PULLUP);
  pinMode(IR3_PIN, INPUT_PULLUP);
  pinMode(IR4_PIN, INPUT_PULLUP);
  
  Serial.println("=== Sistem Gate Serial Aktif ===");
}

void loop() {
  handleRFIDGateCheck();
  handleSerialFromServer();

  if (isGateOpen && (millis() - gateOpenMillis > gateTimeout)) {
    closeGate();
  }

  checkParkingSensor(IR1_PIN, "P1");
  checkParkingSensor(IR2_PIN, "P2");
  checkParkingSensor(IR3_PIN, "P3");
  checkParkingSensor(IR4_PIN, "P4");
  delay(100);
}

void handleRFIDGateCheck() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  String rfidTag = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidTag.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    rfidTag.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  rfidTag.toUpperCase();
  rfidTag.trim();
  Serial.println("RFID_SCAN:" + rfidTag);
  displayLCD("Memverifikasi...", rfidTag);
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();

  delay(2000); 
}

void handleSerialFromServer() {
  if (Serial.available() > 0) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    
    if (command == "GATE_VALID") {
      displayLCD("Akses Diberikan", "Silakan Masuk");
      openGate();
    } else if (command == "GATE_INVALID") {
      displayLCD("Akses Ditolak", "Kartu Tdk Valid");
    } else if (command == "SERVER_ERROR") {
      displayLCD("Koneksi Server", "Gagal!");
    }
  }
}

void checkParkingSensor(int pin, String slotName) {
  static int lastStatus = -1;
  int currentStatus = digitalRead(pin);

  if (currentStatus != lastStatus) {
    int is_occupied = (currentStatus == LOW) ? 1 : 0;
    Serial.println("PARKING:" + slotName + "=" + String(is_occupied));
    lastStatus = currentStatus;
  }
}

void displayLCD(String line1, String line2) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(line1.substring(0, 16));
  lcd.setCursor(0, 1);
  lcd.print(line2.substring(0, 16));
}

void openGate() {
  gateServo.write(90);
  isGateOpen = true;
  gateOpenMillis = millis();
}

void closeGate() {
  gateServo.write(0);
  isGateOpen = false;
  displayLCD("Sistem Siap", "Tempelkan Kartu");
}


// #include <SPI.h>
// #include <MFRC522.h>
// #include <LiquidCrystal_I2C.h>
// #include <ESP32Servo.h>

// // ---------------- PIN KONFIGURASI ----------------
// #define SS_PIN    5
// #define RST_PIN   4
// #define SCK_PIN   18
// #define MISO_PIN  19
// #define MOSI_PIN  23
// #define IR1_PIN   16
// #define IR2_PIN   17
// #define IR3_PIN   32
// #define SERVO_PIN 13
// #define RED_LED_PIN 2
// #define GREEN_LED_PIN 0


// // ---------------- INISIALISASI ----------------
// MFRC522 mfrc522(SS_PIN, RST_PIN);
// LiquidCrystal_I2C lcd(0x27, 20, 4);
// Servo gateServo;

// // ---------------- VARIABEL GLOBAL ----------------
// int parkingStatus[3];
// int lastParkingStatus[3] = {-1, -1, -1};

// String lastTag = "";
// bool tagDetected = false;
// unsigned long lastTagTime = 0;
// const unsigned long tagTimeout = 10000;

// void setup() {
//   Serial.begin(115200);  // kirim data ke komputer via RX/TX
//   delay(500);

//   // Inisialisasi RFID
//   SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
//   mfrc522.PCD_Init();

//   // LCD
//   lcd.begin();
//   lcd.backlight();
//   lcd.setCursor(0, 0);
//   lcd.print("RFID Parking Ready");

//   // Servo
//   gateServo.attach(SERVO_PIN);
//   gateServo.write(0); // posisi awal tertutup

//   // Sensor IR
//   pinMode(IR1_PIN, INPUT_PULLUP);
//   pinMode(IR2_PIN, INPUT_PULLUP);
//   pinMode(IR3_PIN, INPUT_PULLUP);
//   pinMode(RED_LED_PIN, OUTPUT);
//   pinMode(GREEN_LED_PIN, OUTPUT);

//   Serial.println("=== SISTEM PARKIR SERIAL MODE ===");
// }

// void loop() {
//   handleRFID();
//   handleParking();
//   digitalWrite(RED_LED_PIN, HIGH);

//   // Tutup gate jika tag dilepas lebih dari 3 detik
//   if (tagDetected && millis() - lastTagTime > tagTimeout) {
//     tagDetected = false;
//     lastTag = "";
//     closeGate();
//   }

//   delay(100);
// }

// // ---------------- RFID HANDLER ----------------
// void handleRFID() {
//   bool cardPresent = mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial();

//   if (cardPresent) {
//     // Ambil UID RFID
//     String rfidTag = "";
//     for (byte i = 0; i < mfrc522.uid.size; i++) {
//       rfidTag += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
//       rfidTag += String(mfrc522.uid.uidByte[i], HEX);
//     }
//     rfidTag.toUpperCase();

//     // Jika tag baru terdeteksi
//     if (rfidTag != lastTag) {
//       lastTag = rfidTag;
//       tagDetected = true;
//       lastTagTime = millis();

//       Serial.println("====================");
//       Serial.println("RFID Tag: " + rfidTag);
//       Serial.println("SEND_RFID:" + rfidTag); // kirim ke PC

//       displayLCD("Kartu Terdeteksi", rfidTag);
//       digitalWrite(RED_LED_PIN, LOW);
//       digitalWrite(GREEN_LED_PIN, HIGH);

//       // Servo buka gate
//       openGate();
//     }

//     mfrc522.PICC_HaltA();
//     mfrc522.PCD_StopCrypto1();
//   } 
//   else {
//     // Jika tidak ada kartu selama > 1 detik dan sebelumnya tag aktif
//     if (tagDetected && (millis() - lastTagTime > 5000)) {
//       tagDetected = false;
//       lastTag = "";
//       closeGate();  // Tutup gate kembali
//       digitalWrite(GREEN_LED_PIN, LOW);
//       digitalWrite(RED_LED_PIN, HIGH);
//       displayLCD("Kartu Dilepas", "Gate Tertutup");
//     }
//   }
// }

// // ---------------- PARKIR HANDLER ----------------
// void handleParking() {
//   parkingStatus[0] = digitalRead(IR1_PIN) == LOW ? 1 : 0;
//   parkingStatus[1] = digitalRead(IR2_PIN) == LOW ? 1 : 0;
//   parkingStatus[2] = digitalRead(IR3_PIN) == LOW ? 1 : 0;

//   for (int i = 0; i < 3; i++) {
//     if (parkingStatus[i] != lastParkingStatus[i]) {
//       Serial.println("SEND_SLOT:P" + String(i+1) + "=" + String(parkingStatus[i]));
//       lastParkingStatus[i] = parkingStatus[i];
//     }
//   }

//   int sisa = 3 - (parkingStatus[0] + parkingStatus[1] + parkingStatus[2]);
//   String line1 = "P1:" + String(parkingStatus[0]) + " P2:" + String(parkingStatus[1]) + " P3:" + String(parkingStatus[2]);
//   String line2 = "Sisa Slot: " + String(sisa);
//   displayLCD(line1, line2);
// }

// // ---------------- LCD & SERVO ----------------
// void displayLCD(String line1, String line2) {
//   lcd.clear();
//   lcd.setCursor(0, 0);
//   lcd.print(line1);
//   lcd.setCursor(0, 1);
//   lcd.print(line2);
// }

// void openGate() {
//   gateServo.write(90);
//   lcd.setCursor(0, 2);
//   lcd.print("Gate TERBUKA");
//   digitalWrite(GREEN_LED_PIN, HIGH);
//   digitalWrite(RED_LED_PIN, LOW);
// }

// void closeGate() {
//   gateServo.write(0);
//   lcd.clear();
//   lcd.setCursor(0, 0);
//   lcd.print("Gate TERTUTUP");
//   digitalWrite(GREEN_LED_PIN, LOW);
//   digitalWrite(RED_LED_PIN, HIGH);
// }

