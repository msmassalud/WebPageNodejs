'use-strict'
var User = require('../models/user');
const expiringTime = 365; //days

function getAllUsers(req, res) {
  User.find({},
    (err, users) => {
      if (err) {
        throw err;
      }
      res.render('pages/index', {
        userList: users
      });
    });
}

function createMember(req) {
  let user = new User();
  user.name = req.body.name;
  user.dadLastName = req.body.dadLastName;
  user.momLastName = req.body.momLastName;
  //user.birthday     = req.body.birthday;
  user.email = req.body.email;
  user.password = user.generateHash(req.body.memberId);
  user.cp = req.body.cp;
  //user.gender       = req.body.gender;
  user.cellphone = req.body.cellphone;

  user.membership.memberId = req.body.memberId;
  user.membership.expiringDate = Date.now();
  user.membership.expiringDate.setTime(
    user.membership.expiringDate.getTime() + expiringTime * 86400000);

  return user;
}

function insertMember(req, res) {
  User.findOne({
      'email': req.body.email
    },
    (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        let member = createMember(req);
        console.log(`Member created: ${member}`);
        member.save((err) => {
          if (err) {
            throw err;
          }

          res.status(200).redirect('/');
        });
        //res.status(200).redirect('#');
      } else {
        console.log(`User found: ${user}`);
        res.status(500).render('pages/500', {
          message: 'El usuario ya existe'
        });
      }
    }
  );
}

function getMembersByName(req, res) {
  let name = req.query.name;
  User.find({
      'name' : new RegExp(name),
      'accType' : 'member'
    },
    (err, members) => {
      if(err){
        throw err;
      }
      if(members.length == 0){
        res.status(204).send('Not found');
      }else{
        res.status(200).send(members);
      }
    });
}

function loadMemberProfile(req, res){

  User.findOne({ 'membership.memberId' : req.body.memberId},
    (err, member) => {
      if(err) {
        throw err;
      }
      if(member){
        res.status(200).render('pages/profile', {user: member});
      }
      else{
        res.status(204).redirect('error');
      }
    });
}

module.exports = {
  getAllUsers,
  insertMember,
  getMembersByName,
  loadMemberProfile
}
