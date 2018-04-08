const request = require("request");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const utilities = require("../utilities");

// 第二步：抽取可重用的函数
function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), err => {
    if (err)
      return callback(err);
      
    fs.writeFile(filename, contents, callback);
  })
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err)
      return callback(err);

    saveFile(filename, body, err => {
      if (err)
        return callback(err);

      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    });
  });
}

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, exists => {
    // 第一步：提早返回
    if (exists) 
      return callback(null, filename, false);
    
    // 使用可重用的函数
    download(url, filename, err => {
      if (err)
        return callback(err);
      
      callback(null, filename, true);
    })
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
})