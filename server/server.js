const express = require('express')
const session = require('express-session')
const db = require('./database')
const api = require('./api')

const app = express()
const apiPort = 3000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("db", db)

app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
      },
    })
  )

app.use(api)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))