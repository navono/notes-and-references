const fs = require("fs");
const EventEmitter = require("events");
const util = require("util");

class WithTime extends EventEmitter {
  // 回调版本
  // execute(asyncFunc, ...args) {
  //   this.emit("begin");
  //   console.time("execute");

  //   asyncFunc(...args, (err, data) => {
  //     if (err) {
  //       return this.emit("error", err);
  //     }

  //     this.emit("data", data);
  //     console.timeEnd("execute");
  //     this.emit("end");
  //   });
  // }

  // 异步版本
  // 使用 fs.readFile
  // 提示：(node:7396) [DEP0013] DeprecationWarning: Calling an asynchronous function without callback is deprecated.
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    try {
      console.time("execute");
      const data = await asyncFunc(...args);
      this.emit("data", data);
      console.timeEnd("execute");
      this.emit("end");
    } catch (err) {
      return this.emit("error", err);
    }
  }
}

const withTime = new WithTime();
withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
// withTime.on("data", data => console.log(data));

// 在不订阅`error`事件的情况下， 使用异常参数，测试 `回调版本` 和 `异步版本`的区别
// withTime.on('error', (err) => {
//   // do something with err, for example log it somewhere
//   console.log(err)
// });


// 出现提示信息，进程退出
// withTime.execute(fs.readFile, "");
// withTime.execute(fs.readFile, __filename);


// 如果要使用异步版本，`fs.readFile`则需要进行以下改造：
const readFile = util.promisify(fs.readFile);

// 出现提示信息，但是进程不退出
withTime.execute(readFile, "");
withTime.execute(readFile, __filename);
