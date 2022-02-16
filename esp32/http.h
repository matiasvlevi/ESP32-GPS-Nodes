#include <Arduino.h>

#ifndef HTTP
#define HTTP
namespace http
{
  template <class initialHTTPContent>
  String toHTTPContent(initialHTTPContent data[]);
  String registerDevice(String macAdress);
  String GET(String path, String content);
}
#endif