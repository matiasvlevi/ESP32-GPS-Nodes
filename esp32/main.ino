#include "http.h"
#include "network.h"

// TODO: Add in separate files
//  Network
const char ssid[] = "YOUR_NETWORK_NAME";
const char pass[] = "YOUR_NETWORK_PASSWORD";
// Your Listener server IP:
IPAddress server(192, 168, 67, 213);
// Listener server Port
const int port = 1880;

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

  String ip = network::connect(ssid, pass, signalPin);

  Serial.println("Connected");
  Serial.println(ip);

  digitalWrite(signalPin, HIGH);
  if (client.connect(server, port))
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
  if (client.connect(server, port))
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
