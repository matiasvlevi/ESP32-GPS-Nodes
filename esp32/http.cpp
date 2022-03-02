#include "http.h"

namespace http
{
  template <class initialHTTPContent, unsigned int length>
  String toContent(initialHTTPContent data[length])
  {
    String content = "";
    char delim = '&';

    for (int i = 0; i < length; i++)
    {
      if (i == length - 1)
        delim = ' ';
      content += String(i) + "=" + String(data[i]) + String(delim);
    }
    return content;
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