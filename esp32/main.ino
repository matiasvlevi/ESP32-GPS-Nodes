#include "http.h"
#include "network.h"
#include "uenv.h"

// HTTP Client
WiFiClient client;

// LED Pin
short int signalPin = 2;

void setup()
{
  Serial.begin(115200);

  pinMode(signalPin, OUTPUT);
  digitalWrite(signalPin, HIGH);

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

    client.println(http::GET("hit", http::toContent<short>(sampleData)));
    client.println();

    delay(1000);
  }
}