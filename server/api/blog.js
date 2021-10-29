const express = require("express");
const htmlTemplates = require("../static/htmlTemplates");
const fs = require("fs");

const router = express.Router();

router.get("/addBlog", (req, res) => {
  if (req.session.username) {
    const index = fs
      .readFileSync("./src/static/index.html", "utf8")
      .replace(
        "$login$",
        htmlTemplates.htmlLoggedInFunctionalities +
          `Hello ${req.session.username}!` +
          htmlTemplates.htmlLogoutForm
      )
      .replace("$content$", htmlTemplates.htmlAddBlog);
    res.send(index);
  } else {
    res.redirect("/");
  }
});

router.get("/blog/:blogId", async (req, res) => {
  const db = req.app.get("db");
  const commentList = (
    await db.getComments().catch((err) => console.log(err))
  );
  let content = "";
  await db
    .getBlogById(req.params.blogId)
    .then((blog) => {
      content += `
              <div class="border shadow-sm p-4 my-2">
                <a href="/blog/${blog.blogId}">
                <h3>${blog.title}</h3></a>
                <hr>
                <p>${blog.content.split("\n").join("<br>")}</p>
                <small>Created by ${blog.author}</small>
              </div>
            `;
    })
    .catch(() => {
      console.log("Error!");
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

router.post("/blog", (req, res) => {
  const { title, content } = req.body;
  if (req.session.username) {
    if (title && content) {
      const db = req.app.get("db");
      db.addBlog(req.session.username, title, content, (err) => {
        if (err) {
          console.error(err);
        }
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;