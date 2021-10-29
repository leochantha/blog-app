const express = require("express");
const login = require("./login");
const blog = require("./blog");
const user = require("./user");
const fs = require("fs");
const htmlTemplates = require("../static/Templates");


const router = express.Router();

router.use(login);
router.use(blog);
router.use(user);

router.get("/", async (req, res) => {
  const db = req.app.get("db");
  let content = "";
  await db.getBlogs().then((rows) => {
    rows.forEach((blog) => {
      content += `
              <div class="border shadow-sm p-4 my-2">
                <a href="/blog/${blog.blogId}"><h3>${blog.title}</h3></a>
                <hr>
                <p>${blog.content.split("\n").join("<br>")}</p>
                <small>Created by ${blog.author}</small>
              </div>
            `;
    });
  });
  if (req.session.username) {
    const index = fs
      .readFileSync("./src/static/index.html", "utf8")
      .replace(
        "$login$",
        htmlTemplates.htmlLoggedInFunctionalities +
          `Hello ${req.session.username}!` +
          htmlTemplates.htmlLogoutForm
      )
      .replace("$content$", content);
    res.send(index);
  } else {
    const index = fs
      .readFileSync("./src/static/index.html", "utf8")
      .replace("$login$", htmlTemplates.htmlLoginForm)
      .replace("$content$", content);
    res.send(index);
  }
});

module.exports = router