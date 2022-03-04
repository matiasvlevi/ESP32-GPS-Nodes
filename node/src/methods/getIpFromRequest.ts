function getIPFromRequest(req: any) {
  // Try multiple ways of getting the ip from the client
  let ipString: string =
    req.headers['cf-connecting-ip'] ||
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    'X.X.X.X';

  // If no numbers are matched in the headers, no IP is detected.
  let matches: string[] | null = ipString.match(/[0-9].*/gm);
  // Probably upgrade for some more IP agressive regex    ^ this just looks for numbers
  if (matches === null) return 'X.X.X.X';

  // Return the first match
  return matches[0];
}

export default getIPFromRequest;