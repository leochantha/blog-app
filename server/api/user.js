const express = require("express");
const fs = require("fs");
const Templates = require("../static/Templates");

const router = express.Router();

router.get("/users", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
    return;
  } else {
    const db = req.app.get("db");
    let userContent = "";
    await db.getUsers().then((rows) => {
      rows.forEach((user) => {
        userContent += `
            <tr>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td><button type="button" class="btn btn-danger" onclick="deleteUser('${user.username}')">Delete</button></td>
            </tr>
            `;
      });
    });
    const content = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                ${userContent}
            </tbody>
        </table>
    `;
    const index = fs
      .readFileSync("static/index.html", "utf8")
      .replace(
        "$username$",
        Templates.Functionalities +
          `Hello ${req.session.username}!` +
          Templates.LogoutForm
      )
      .replace("$content$", content);
    res.send(index);
  }
});

router.delete("/users/:username", async (req, res) => {
  if (!req.session.username) {
    res.redirect("/");
  } else {
    const db = req.app.get("db");
    await db.deleteUser(req.params.username);
    res.sendStatus(200);
  }
});

module.exports = router;