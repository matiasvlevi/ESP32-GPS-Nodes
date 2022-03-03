function getIPFromRequest(req: any) {
  let ip: string = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  ip = ip[ip.length - 1];
  return ip;
}

export default getIPFromRequest;