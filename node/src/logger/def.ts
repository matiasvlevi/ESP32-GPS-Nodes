import methods from "./methods/"

class Logger {
  constructor() { }
  static getDate = methods.getDate;
  login = methods.login.bind(this);
  hit = methods.hit.bind(this);
  error = methods.error.bind(this);
}

export default Logger;