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
SoftwareSerial gpsSerial(16, 17);

void setup()
{

  // Serials
  Serial.begin(BAUD_RATE);
  gpsSerial.begin(9600);

  // Wifi Signal LED Pin
  pinMode(signalPin, OUTPUT);
  digitalWrite(signalPin, HIGH);

  // Connect to network
  IPAddress ip = network::connect(env::SSID, env::PASS, signalPin);
  Serial.println("Connected " + network::IpToString(ip));

  // Connect, if fail, abort.
  if (!client.connect(env::SERVER, env::PORT))
    return;

  // Send the request
  //             http://serverIP:port/register?id=MACADRRESS
  client.println(http::GET("register", http::registerDevice(network::getMacAdress())));
  client.println();
}

gpsLocation out;

void loop()
{
  // Connect, if fail, abort.
  if (!client.connect(env::SERVER, env::PORT))
    return;

  out = gps.getLocation(gpsSerial);

  // Send the request
  //             http://serverIP:port/hit?lon=LONGITUDE&lat=LATITUDE
  client.println(http::GET("hit", http::location(out.lon, out.lat)));
  client.println();
  delay(UPDATE_DELAY);
}