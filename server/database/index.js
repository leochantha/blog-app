const sqlite3 = require("sqlite3");
const entities = require("../static/databaseEntities");

let db = new sqlite3.Database(':memory:');

init = () => {
  db.serialize(() => {
    db.run("CREATE TABLE user (username TEXT PRIMARY KEY, password TEXT NOT NULL)")
    db.run("CREATE TABLE blog (blogId INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE NOT NULL, content TEXT NOT NULL, author TEXT NOT NULL, FOREIGN KEY (author) REFERENCES user (username))")
    
    const userStatement = db.prepare("INSERT INTO user VALUES (?, ?)");
    entities.users.forEach((user) =>
      userStatement.run([user.login, user.password])
    );
    userStatement.finalize();

    const blogStatement = db.prepare("INSERT INTO blog (title, content, author) VALUES (?, ?, ?)");
    entities.blogs.forEach((blog) =>
      blogStatement.run([blog.title, blog.content, blog.author])
    );
    blogStatement.finalize();
  })
} 

login = (user, password) => {
  return new Promise((resolve, reject) =>
    db.get(
      `SELECT login FROM user WHERE username LIKE '${user}' AND password = '${password}'`,
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(row);
        }
      }
    )
  );
}

addBlog = (user, title, content) => {
  const statement = db.prepare(
    "INSERT INTO blog (title, content, author) VALUES (?, ?, ?)"
  );
  statement.run([title, content, user]);
  statement.finalize();
}

getBlogs = () => {
  return new Promise((resolve, reject) =>
    db.all(
      "SELECT * FROM blog",
      (err, rows) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(rows);
        }
      }
    )
  );
}

getBlogById = (blogId) => {
  return new Promise((resolve, reject) => {
    const blogStatement = db.prepare(
      "SELECT * FROM blog WHERE blogId = (?)"
    );
    blogStatement.get(blogId, (err, row) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(row);
      }
      blogStatement.finalize();
    });
  });
}

getUsers = () => {
  return new Promise((resolve, reject) =>
    db.all("SELECT * FROM user", (err, rows) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(rows);
      }
    })
  );
}

init()
module.exports = {
  db,
  login,
  getBlogs,
  getBlogById,
  getUsers
}