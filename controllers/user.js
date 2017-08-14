'use-strict'
var User = require('../models/user');

function getAllUsers(req, res) {
  console.log("finding users");
  User.find({},
    (err, users) => {
      if (err) {
        throw err;
      }
      console.log(users);
      res.render('pages/index', {
        userList: users
      });
    });
}

module.exports = {
  getAllUsers
}
