#include "http.h"
#include "network.h"
#include "gps.h"
#include "uenv.h"

// HTTP Client
// WiFiClient client;

// LED Pin
// short int signalPin = 2;
GPSDevice gps;
SoftwareSerial gpsSerial(16, 17); // use UART #2
TinyGPSPlus gpsDev;
void setup()
{

  Serial.begin(BAUD_RATE);

  gps.begin(gpsSerial, 9600);
  // pinMode(signalPin, OUTPUT);
  // digitalWrite(signalPin, HIGH);

  // Connect to network
  // IPAddress ip = network::connect(env::SSID, env::PASS, signalPin);
  // Serial.println("Connected " + network::IpToString(ip));

  // Connect, if fail, abort.
  // if (!client.connect(env::SERVER, env::PORT))
  //  return;

  // Send the request
  //             http://serverIP:port/register?id=MACADRRESS
  // client.println(http::GET("register", http::registerDevice(network::getMacAdress())));
  // client.println();
}

gpsout out;
void loop()
{
  // Connect, if fail, abort.
  // if (!client.connect(env::SERVER, env::PORT))
  //   return;

  // while (gpsSerial.available() > 0)
  // {
  //   char c = gpsSerial.read();
  //   gpsDev.encode(c);
  // }

  out = gps.getData(gpsSerial);

  // out = {gpsDev.location.lat(),
  //        gpsDev.location.lng(),
  //        gpsDev.altitude.meters()};
  if (gpsDev.altitude.isUpdated())
  {
    Serial.println(String("Lat: ") + String(out.lat(), 16));
    Serial.println(String("Lon: ") + String(out.lng(), 16));
  }
  // Serial.println(out.alt);

  // Send the request
  //             http://serverIP:port/hit?0=47.20&1=51.82
  // client.println(http::GET("hit", http::toContent<float, 2>(sampleData)));
  // client.println();
  // delay(UPDATE_DELAY);
}