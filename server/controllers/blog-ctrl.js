createBlog = (req, res) => {
    const { title, content } = req.body
    const author = ""
    if (req.session.username) {
        author = req.session.username
    } else {
        author = "Anonymous"
    }

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a blog',
        })
    }
    
    body.author = req.query.author

    const blog = new Blog(body)

    if (!blog) {
        return res.status(400).json({ success: false, error: err })
    }

    blog
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: blog._id,
                message: 'Blog created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Blog not created!',
            })
        })
}

deleteBlog = async (req, res) => {
    await Blog.findOneAndDelete({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!blog) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }

        return res.status(200).json({ success: true, data: blog })
    }).catch(err => console.log(err))
}

getBlogById = async (req, res) => {
    await Blog.findOne({ _id: req.params.id }, (err, blog) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!blog) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }
        return res.status(200).json({ success: true, data: blog })
    }).catch(err => console.log(err))
}

getBlogs = async (req, res) => {
    await Blog.find({}, (err, blogs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!blogs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Blog not found` })
        }
        return res.status(200).json({ success: true, data: blogs })
    }).catch(err => console.log(err))
}

module.exports = {
    createBlog,
    deleteBlog,
    getBlogs,
    getBlogById,
}