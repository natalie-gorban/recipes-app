const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  let message = 'Message not initialized'
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user) {
        message = `This user [${req.body.username}] is already registered.`;
        console.log("signup message", message);
        res.status(500).send({ message });
      } else {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        })
          .then((user) => {
            message = `User [${req.body.username}] was registered successfully!`;
            console.log("signup message", message);
            res.send({ message });
          })
          .catch((err) => {
            message = err.message;
            console.log("signup message", message);
            res.status(500).send({
              message,
            });
          });
      }
    })
    .catch((err) => {
      message = err.message;
      console.log("signup message", message);
      res.status(500).send({
        message,
      });
    });
};

exports.signin = (req, res) => {
  let message = 'Message not initialized'
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        message = `User [${req.body.username}] not found.`;
        console.log('signin message', message, user)
        return res.status(404).send({ message });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        message = `Invalid Password for user [${req.body.username}]!`;
        console.log('signin message', message)
        return res.status(401).send({
          accessToken: null,
          message
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      message = `[${user.username}] logged in successfully.`;
      console.log("signin message", message);
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token,
        message,
      });

    })
    .catch(err => {
      message = err.message
      console.log('signin message', message)
      res.status(500).send({ message });
    });
};
