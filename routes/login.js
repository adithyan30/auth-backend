const express = require("express");
const { AuthenticateUser } = require("../controllers/login");
const client = require("../redis");
const router = express.Router();

client
  .connect()
  .then(() => {
    console.log("connected to redis");
  })
  .catch((e) => {
    console.log(e);
  });

router.post("/", async (req, res) => {
  try {
    const { email, password } = await req.body;
    var loginCredentials = await AuthenticateUser(email, password);
    console.log(loginCredentials);
    if (loginCredentials === "invalid user name or password") {
      res.status(200).send("invalid user name or password");
    } else if (loginCredentials === "server busy") {
      res.status(200).send("server busy");
    } else {
      res.status(200).json({ token: loginCredentials.token });
    }
  } catch (e) {
    console.log(e);
    return "server busy";
  }
});

module.exports = router;
