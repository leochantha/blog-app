const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Blog = new Schema(
    {
        author: { type: String, required: true },
        title: { type: String, required: true},
        content: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('blogs', Blog)