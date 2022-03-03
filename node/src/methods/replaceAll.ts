function replaceAll(content: string, ch: string): string {
  let str: string = content;
  while (str.includes(ch))
    str = str.replace(ch, '');

  return str;
}

export default replaceAll;