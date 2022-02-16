#include "http.h"

namespace http
{
  template <class initialHTTPContent>
  String toContent(initialHTTPContent data[])
  {
    String content = "";
    int len = sizeof(data);
    char delim = '&';

    for (int i = 0; i < len; i++)
    {
      if (i == len - 1)
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