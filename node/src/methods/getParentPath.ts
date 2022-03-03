function getParentPath(n: number): string {
  let path = __dirname.split('\\');
  for (let i = 0; i < n; i++) {
    path.pop();
  }
  return path.join('\\');
}

export default getParentPath;