#pragma once

#include <Arduino.h>
#include "WiFi.h"

#ifndef NETWORK
#define NETWORK

namespace network
{
  /**
   * @method connect
   *
   * @param ssid Network's name
   * @param pass Network's password
   * @param signalPin Which pin number to use to display network status
   *
   * @return ESP32's ip adress.
   *
   * @example
   * <code>
   * IPAddress ip = network::connect("MY_NETWORK", "MY_PASSWORD", 2);
   * Serial.println(ip);
   * // output 10.0.0.49
   * </code>
   *
   * @return String IPv4 adress
   */
  IPAddress connect(const char ssid[], const char pass[], int signalPin);

  /**
   * @method IpToString
   *
   * Convert an Arduino IPAdress type to a Arduino String.
   *
   * @example
   * <code>
   * IPAdress myIp(10, 0, 0, 8);
   * String Ipstr = IpToString(myIp);
   * Serial.println(Ipstr);
   * // output: 10.0.0.8
   * </code>
   *
   * @param ipAddress Ip to convert
   * @return String Ip as a string
   */
  String IpToString(const IPAddress &ipAddress);

  /**
   * @method getMacAdress
   *
   * Get your microcontroller's mac adress
   *
   * @return String Device's Mac adress
   */
  String getMacAdress(void);
}

#endif