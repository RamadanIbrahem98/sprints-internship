const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const doctorsRoutes = require("./routes/doctors");
const signs = require("./routes/sign");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Auth = (req, res, next) => {
  fs.readFile(path.join(__dirname, "./models/users.txt"), "utf8", (err, users) => {
    for (const user of JSON.parse(users)) {
      if (user.token == req.headers.authorization) {
        return next();
      }
    }
    return res.status(403).send({message: "Access denied."});
  })
};

app.use('/doctors', Auth, doctorsRoutes);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
