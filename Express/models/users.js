const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const listAllUsers = (cb) => {
  fs.readFile(path.resolve(__dirname, "./users.txt"),"utf8", (err, users) => {
    if (err) throw err;
    cb(users);
  });
};

const signUp = (userData, cb) => {
  listAllUsers(usersData => {
    const users = JSON.parse(usersData);
    userData["id"] = users.length + 1;
    userData["token"] = crypto.randomBytes(16).toString('hex');
    users.push(userData);
    fs.writeFile(path.resolve(__dirname, "./users.txt"), JSON.stringify(users), 'utf8', () => {});
    cb(userData);
  });
};

const signIn = (userCredentials, cb) => {
  let userToReturn = {};
  listAllUsers(usersData => {
    const users = JSON.parse(usersData);
    for (const user of users) {
      if (user.email == userCredentials.email && user.token == userCredentials.token && user.password == userCredentials.password) {
        userToReturn = user;
      }
    }
    cb(userToReturn);
  });
};


module.exports = {
  signIn,
  signUp,
}
