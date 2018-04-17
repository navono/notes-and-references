const stream = require('stream');
const util = require('util');

class ReplaceStream extends stream.Transform {
  constructor(searchString, replaceString) {
    super();
    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = '';
  }

  _transform(chunk, encoding, callback) {
    const piece = (this.tailPiece + chunk).split(this.searchString);
    const lastpiece = piece[piece.length - 1];
    const tailPieceLen = this.searchString.length - 1;

    this.tailPiece = lastpiece.slice(-this.tailPiece);
    piece[piece.length - 1] = lastpiece.slice(0, -this.tailPiece);

    this.push(piece.join(this.replaceString));
    callback();
  }

  _flush(callback) {
    this.push(this.tailPiece);
    callback();
  }
}

module.exports = ReplaceStream;
