#include "http.h"
#include "network.h"

namespace http
{
  String registerDevice(String macAdress)
  {
    return "id=" + macAdress + " ";
  }

  String location(double longitude, double latitude)
  {
    return String("lon") + "=" + String(longitude, 9) + String("&") +
           String("lat") + "=" + String(latitude, 9) + String("&") +
           registerDevice(network::getMacAdress());
  }

  String GET(String path, String content)
  {
    return "GET /" + path + "?" + content + "HTTP/1.0";
  }
}