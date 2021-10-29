const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let status = 500;
  if (username && password) {
    const db = req.app.get("db");
    await db
      .login(username, password)
      .then((row) => {
        if (!row) {
          status = 302;
          return;
        }
        status = 200;
        req.session.username = row.username;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  res.redirect("/", status);
});

router.post("/logout", (req, res) => {
  req.session.username = "";
  res.redirect("/");
});

module.exports = router;