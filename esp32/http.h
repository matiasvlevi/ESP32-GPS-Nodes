#include <Arduino.h>

#ifndef HTTP
#define HTTP

namespace http
{
  /**
   * Get http formatted data for longitude, latitude
   *
   * Format two doubles, into an HTTP parameter string.
   *
   * @param longitude
   * @param latitude
   * @return String
   */
  String location(double longitude, double latitude);

  /**
   * Get this device mac adress formatted as http content
   *
   * @example
   * <code>
   * String content = http::registerDevice();
   * String req = http::GET("api/url/path", content);
   * </code>
   *
   * @return String Formatted register request with mac adress
   */
  String registerDevice();

  /**
   * Format to a GET request
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