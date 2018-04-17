const ReplaceStream = require('./replaceStream');

const rs = new ReplaceStream('World', 'Node.js');
rs.on('data', chunk => console.log(chunk.toString()));

rs.write('Hello W');
rs.write('orld!');
rs.end();

// pipe
// process.stdin
//   .pipe(new ReplaceStream(process.argv[2], process.argv[3]))
//   .pipe(process.stdout);
