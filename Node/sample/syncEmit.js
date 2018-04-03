const EventEmitter = require('events').EventEmitter;

class SyncEmit extends EventEmitter {
  constructor() {
    super();
    this.emit('ready');
  }
}

const syncEmit = new SyncEmit();

// never invoked
syncEmit.on('ready', () => console.log('Object is ready to be used'));
