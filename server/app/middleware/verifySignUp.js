const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  let message = "Message not initialized";
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      message = `Failed! Username [${user.username}] is already in use!`;
      console.log("checkDuplicateUsernameOrEmail message", message);
      res.status(400).send({
        message,
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        message = `Failed! Email of [${user.email}] is already in use!`;
        console.log("checkDuplicateUsernameOrEmail message", message);
        res.status(400).send({
          message,
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
