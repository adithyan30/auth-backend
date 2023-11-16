const express = require("express");
const { AuthorizedUser } = require("../controllers/login");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const auth_token = await req.headers.authorization;
    const loginCredentials = AuthorizedUser(auth_token);
    if (loginCredentials === false) {
      res.status(200).send("invalid token");
    } else {
      res.json(loginCredentials);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send("server busy");
  }
});

module.exports = router;
