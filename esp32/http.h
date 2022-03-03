#include <Arduino.h>

#ifndef HTTP
#define HTTP

namespace http
{
  /**
   * @method location
   *
   * Format two doubles, into an HTTP parameter string.
   *
   * @param longitude
   * @param latitude
   * @return String
   */
  String location(double longitude, double latitude);

  /**
   * @method registerDevice
   *
   * @param macAdress Mac adress as a string
   *
   * @example
   * <code>
   * String myMacAdress = "34:f5:2e:6d:54:da";
   * String content = http::registerDevice(myMacAdress);
   *
   * String req = http::GET("api/url/path", content);
   * </code>
   *
   * @return String Formatted register request with mac adress
   */
  String registerDevice(String macAdress);

  /**
   * @method GET
   *
   * @param path HTTP Call path
   * @param content HTTP Call content
   *
   * @example
   * <code>
   * String req = http::GET("api/url/path","x1=56&y1=32");
   * client.println(req);
   * client.println();
   * </code>
   * @return String Complete HTTP request ready to be sent by a client.
   */
  String GET(String path, String content);
}

#endif