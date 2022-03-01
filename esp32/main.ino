#include "http.h"
#include "network.h"
#include "gps.h"
#include "uenv.h"

// HTTP Client
WiFiClient client;

// LED Pin
short int signalPin = 2;

GPSDevice gps;

void setup()
{
  Serial.begin(115200);

  pinMode(signalPin, OUTPUT);
  digitalWrite(signalPin, HIGH);

<<<<<<< Updated upstream
  String ip = network::connect(env::SSID, env::PASS, signalPin);

  Serial.println("Connected " + ip);

  // HTTP Client register to server
  if (client.connect(env::SERVER, env::PORT))
  {
    client.println(http::GET("register", http::registerDevice(network::getMacAdress())));
    client.println();
  }
}

// Sample send data
short int sampleData[] = {23, 54, 12, 34};

void loop()
{
  // HTTP Client update data
  if (client.connect(env::SERVER, env::PORT))
  {
    // TODO: get GPS data and convert to HTTPContent String
=======
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

// Sample gps data
// float sampleData[] = {47.2012f, 51.8234f};
// Arduino String reduces floats to .2f
// for precise GPS location,
// we would need a way to convert floating values to strings

void loop()
{
  // Connect, if fail, abort.
  // if (!client.connect(env::SERVER, env::PORT))
  //  return;
>>>>>>> Stashed changes

    client.println(http::GET("hit", http::toContent<short>(sampleData)));
    client.println();

<<<<<<< Updated upstream
    delay(1000);
  }
=======
  gpsout out = gps.getData();

  Serial.println(out.lat);
  Serial.println(out.lon);
  Serial.println(out.alt);

  // Send the request
  //             http://serverIP:port/hit?0=47.20&1=51.82
  // client.println(http::GET("hit", http::toContent<float, 2>(sampleData)));
  // client.println();
  delay(UPDATE_DELAY);
>>>>>>> Stashed changes
}