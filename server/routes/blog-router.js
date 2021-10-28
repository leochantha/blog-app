const express = require('express')

const BlogCtrl = require('../controllers/blog-ctrl')

const router = express.Router()

router.post('/blog', BlogCtrl.createMovie)
router.delete('/blog/:id', BlogCtrl.deleteMovie)
router.get('/blog/:id', BlogCtrl.getMovieById)
router.get('/blogs', BlogCtrl.getMovies)

module.exports = router