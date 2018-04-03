class Log {
  constructor(name) {
    this.name = name;
  }

  log(message) {
    console.log(`${this.name} ${message}`);
  }

  info(message) {
    this.log(`info: ${message}`);
  }

  verbose(message) {
    this.log(`verbose: ${message}`);
  }
}

function Logger(name) {
  if (!new.target) {
    return new Log(name);
  }

  this.name = name;
}

module.exports = Logger;
