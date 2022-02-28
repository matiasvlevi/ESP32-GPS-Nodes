#include "network.h"
namespace network
{
  IPAddress connect(const char ssid[], const char pw[], int signalPin)
  {
    WiFi.begin(ssid, pw);
    uint16_t fail = 0;
    do
    {
      if (fail % 2)
        digitalWrite(signalPin, HIGH);
      else
        digitalWrite(signalPin, LOW);

      delay(200);

      Serial.println("Waiting for connection...");

      fail++;
      if (fail > 255)
        ESP.restart();
    } while (WiFi.status() != WL_CONNECTED);
    return WiFi.localIP();
  }
  String IpToString(const IPAddress &ip)
  {
    return String(ip[0]) + String(".") +
           String(ip[1]) + String(".") +
           String(ip[2]) + String(".") +
           String(ip[3]);
  }
  String getMacAdress()
  {
    byte macAdress[6];
    WiFi.macAddress(macAdress);
    return String(macAdress[0], HEX) + String(":") +
           String(macAdress[1], HEX) + String(":") +
           String(macAdress[2], HEX) + String(":") +
           String(macAdress[3], HEX) + String(":") +
           String(macAdress[4], HEX) + String(":") +
           String(macAdress[5], HEX);
  }
}
