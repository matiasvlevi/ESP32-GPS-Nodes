#include "http.h"
#include "network.h"

namespace http
{
  String registerDevice()
  {
    return "id=" + network::getMacAdress();
  }

  String location(double longitude, double latitude)
  {
    return String("lon") + "=" + String(longitude, 9) + String("&") +
           String("lat") + "=" + String(latitude, 9) + String("&") +
           registerDevice();
  }

  String GET(String path, String content)
  {
    return "GET /" + path + "?" + content + " HTTP/1.0";
  }
}