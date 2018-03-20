const EventEmitter = require('events');

class WithLog extends EventEmitter {
  // execute(taskFunc) {
  //   console.log('Before executing');
  //   this.emit('begin');
  //   taskFunc();
  //   this.emit('end');
  //   console.log('After executing');
  // }
  async execute(taskFunc) {
    console.log('Before executing');
    try {
      this.emit('begin');
      const result = await taskFunc();
      this.emit('end');
      console.log('After executing');
    } catch (error) {
      this.emit("error", error);
    }
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to execute'));
withLog.on('end', () => console.log('Done with execute'));

// withLog.execute(() => console.log('*** Executing task ***'));

withLog.execute(() => {
  // 模拟异步的情况
  setImmediate(() => {
    console.log('*** Executing task ***')
  });
});