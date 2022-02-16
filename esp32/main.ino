#include "http.h"
#include "network.h"
#include "uenv.h"

// HTTP Client
WiFiClient client;

// LED Pin
short int signalPin = 2;

// Sample send data
int sampleData[] = {23, 54, 12, 34};

void setup()
{
  Serial.begin(115200);

  pinMode(signalPin, OUTPUT);

  String ip = network::connect(env::SSID, env::PASS, signalPin);

  Serial.println("Connected");
  Serial.println(ip);

  digitalWrite(signalPin, HIGH);

  // HTTP Client connect
  if (client.connect(env::SERVER, env::PORT))
  {
    String data = network::getMacAdress();

    Serial.println("Registered");
    Serial.println(data);

    String req = http::registerDevice(data);

    client.println(http::GET("register", req));
    client.println();
  }
}

void loop()
{
  // HTTP Client connect
  if (client.connect(env::SERVER, env::PORT))
  {
    // TODO: get GPS data and convert to HTTPContent String

    // Send sample data
    String request = http::GET("hit", http::toHTTPContent<int>(sampleData));

    // HTTP client send
    client.println(request);
    client.println();
    // Debug display
    Serial.println(request);

    delay(1000);
  }
}
