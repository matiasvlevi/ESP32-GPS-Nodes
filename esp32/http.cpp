#include "http.h"

namespace http
{
  template <class initialHTTPContent, unsigned int N>
  String toContent(initialHTTPContent data[N])
  {
    String content = "";
    char delim = '&';
    for (int i = 0; i < N; i++)
    {
      if (i == N - 1)
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