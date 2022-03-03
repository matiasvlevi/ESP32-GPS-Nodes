import { readFileSync, writeFileSync, existsSync } from 'fs'

const getData = (path: string) => {

  let data;
  if (existsSync(path))
    data = JSON.parse(readFileSync(path, 'utf-8'));
  else
    data = {};

  return data;
}

export default getData;