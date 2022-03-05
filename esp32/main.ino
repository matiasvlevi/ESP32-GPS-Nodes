#include "http.h"
#include "network.h"
#include "gps.h"
#include "uenv.h"

// HTTP Client
WiFiClient client;

// Wifi Signal LED Pin
uint8_t signalPin = 2;

// GPS
GPSDevice gps;

SoftwareSerial serial(
    gpsenv::GPS_TX_PIN,
    gpsenv::GPS_RX_PIN);

void setup()
{
  // Serials
  Serial.begin(BAUD_RATE);
  serial.begin(9600);

  // Wifi Signal LED Pin
  pinMode(signalPin, OUTPUT);
  digitalWrite(signalPin, HIGH);

  // Connect to network
  network::connect(env::SSID, env::PASS, signalPin);

  // Connect, if fail, abort.
  if (!client.connect(env::SERVER, env::PORT))
  {
    Serial.println("Could not connect to the web server");
    return;
  }

  // Send the request
  //             http://serverIP:port/register?id=MACADRRESS
  client.println(http::GET("register", http::registerDevice()));
  client.println();

  Serial.println("Sent registration request");
}

gpsLocation out;
void loop()
{
  // Connect, if fail, abort.
  if (!client.connect(env::SERVER, env::PORT))
  {
    Serial.println("Could not connect to the web server");
    return;
  }

  out = gps.getLocation(serial);
  if (out.updated)
  {
    // Send the GPS request
    //             http://serverIP:port/hit?lon=LONGITUDE&lat=LATITUDE&id=MACADRESS
    client.println(http::GET("hit", http::location(out.lon, out.lat)));
    client.println();

    Serial.println("Sent updated GPS data");
  }

  // delay(UPDATE_DELAY);
}