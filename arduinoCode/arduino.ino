#include <ESP8266WiFi.h>
#include <Losant.h>
#include <Servo.h>

// WiFi credentials.
const char* WIFI_SSID = "UnionHallGuest";
const char* WIFI_PASS = "1311Vine";

// Losant credentials.
const char* LOSANT_DEVICE_ID = "587e9734d2c6680001d743b6";
const char* LOSANT_ACCESS_KEY = "fe6c4f32-164a-4331-9dc0-1c1af8cd592f";
const char* LOSANT_ACCESS_SECRET = "323e5c8b9d1070ab2ed5a86f66d6b1ff7d11c9f1887de2b513d96a4500dc7f1d";

//variables

Servo brandonServo;
const int button = 5;
boolean locked = true;



// For an unsecure connection to Losant.
WiFiClientSecure wifiClient;

LosantDevice device(LOSANT_DEVICE_ID);


void unlock() {
 if (locked) {
    brandonServo.attach(4);
    brandonServo.write(83);              // tell servo to go to position in variable 'pos'
    delay(1000);
    locked = !locked;
    brandonServo.detach();
 }
}

void lock() {
  if (!locked) {
    brandonServo.attach(4);
    brandonServo.write(102);
    delay(1000);
    locked = true;
    brandonServo.detach();
  }
}

void handleCommand(LosantCommand *command) {
  Serial.print("Command received: ");
  Serial.println(command->name);

  if(strcmp(command->name, "unlock") == 0) {
    unlock();
  }

  if(strcmp(command->name, "lock") == 0) {
    lock();
  }
}

void connect() {

  // Connect to Wifi.
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(WIFI_SSID);

  WiFi.begin(WIFI_SSID, WIFI_PASS);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Connect to Losant.
  Serial.println();
  Serial.print("Connecting to Losant...");

  device.connectSecure(wifiClient, LOSANT_ACCESS_KEY, LOSANT_ACCESS_SECRET);

  while(!device.connected()) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected!");
  Serial.println();
  Serial.println("This device is now ready for use!");
}


void setup() {
   Serial.begin(115200);
   
   delay(2000);

  Serial.println("Running MySevoMotor");
  // put your setup code here, to run once:
  brandonServo.attach(4);
  pinMode(button, INPUT);
  pinMode(4, OUTPUT);
  digitalWrite(button, LOW);

 // Register the command handler to be called when a command is received
  // from the Losant platform.
  device.onCommand(&handleCommand);

  connect();
}

void loop() {

bool toReconnect = false;

  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("Disconnected from WiFi");
    toReconnect = true;
  }

  if(!device.connected()) {
    Serial.println("Disconnected from Losant");
    Serial.println(device.mqttClient.state());
    toReconnect = true;
  }

  if(toReconnect) {
    connect();
  }

  device.loop();

}
