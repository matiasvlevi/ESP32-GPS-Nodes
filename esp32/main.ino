#include "http.h"
#include "network.h"
#include "uenv.h"

// HTTP Client
WiFiClient client;

// LED Pin
uint8_t signalPin = 2;

void setup()
{
  Serial.begin(BAUD_RATE);

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

// Sample gps data
float sampleData[] = {47.2012f, 51.8234f};
// Arduino String reduces floats to .2f
// for precise GPS location,
// we would need a way to convert floating values to strings

void loop()
{
  // Connect, if fail, abort.
  if (!client.connect(env::SERVER, env::PORT))
    return;

  // TODO: get GPS data and replace `float[] sampleData`

  // Send the request
  //             http://serverIP:port/hit?0=47.20&1=51.82
  client.println(http::GET("hit", http::toContent<float, 2>(sampleData)));
  client.println();
  delay(UPDATE_DELAY);
}