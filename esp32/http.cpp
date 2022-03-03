#include "http.h"

namespace http
{
  String location(double longitude, double latitude)
  {
    return String("lon") + "=" + String(longitude, 9) + String("&") +
           String("lat") + "=" + String(latitude, 9) + String(" ");
  }

  String registerDevice(String macAdress)
  {
    return "id=" + macAdress + " ";
  }

  String GET(String path, String content)
  {
    return "GET /" + path + "?" + content + "HTTP/1.0";
  }
}