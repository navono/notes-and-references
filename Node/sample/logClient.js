const child_process = require('child_process');
const net = require('net');

function multiplexChannels(sources, destination) {
  let totalChannel = sources.length;
  for (let i = 0; i < sources.length; i++) {
    sources[i]
      .on('readable', function() {
        let chunk;
        while ((chunk = this.read()) != null) {
          const outBuf = new Buffer(1 + 4 + chunk.length);
          outBuf.writeUInt8(i, 0);
          outBuf.writeUInt32BE(chunk.length, 1);
          chunk.copy(outBuf, 5);
          console.log(`Sending packet to channel: ${i}`);
          destination.write(outBuf);
        }
      })
      .on('end', () => {
        if (--totalChannel === 0) {
          destination.end();
        }
      })
      .on('error', err => {
        console.log(err);
      });
  }
}

const socket = net.connect(3000, () => {
  const child = child_process.fork(
    process.argv[2],
    process.argv.slice(3),
    { silent: true }
  );

  multiplexChannels([child.stdout, child.stderr], socket);
});
