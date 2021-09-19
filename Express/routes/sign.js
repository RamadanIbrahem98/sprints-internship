const router = require("express").Router();
const { signIn, signUp } = require("../models/users");

router.post("/signin", (req, res, next) => {
  const user = {email: req.body.email, password: req.body.password, token: req.headers.authorization};
  signIn(user, user => {
    if (user.token) {
      res.setHeader("Authorization", user.token);
      return res.redirect("/doctors/")
    }
    return res.status(401).send({message: "wrong credintials"});
  });
});

router.post("/signup", (req, res, next) => {
  const user = {email: req.body.email, password: req.body.password};
  signUp(user, user => {
    if (user.token) {
      res.setHeader("Authorization", user.token);
      return res.redirect("/doctors/")
    }
    return res.status(401).send({message: "something went wrong"});
  });
});

module.exports = router;
