const level = require('level');
const sublevel = require('level-sublevel');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const async = require('async');

const db = sublevel(level('example-db'), {valueEncoding: 'json'});
const userDb = db.sublevel('users');

const users = [
  {username: 'alice', password: 'secret'},
  {username: 'bob', password: 'secret'},
  {username: 'trudy', password: 'secret'}
];

async.forEach(users, (user, callback) => {
  userDb.put(user.username, {
    hash: bcrypt.hashSync(user.password, 8)
  }, callback);
}, err => {
  if (err) return console.log(err);

  console.log('DB populated');
})