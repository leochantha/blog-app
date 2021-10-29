export default {
    LoginForm:`
    <form action="/login" method="post" name="testLogin">
    <input name="username" id = "login" type="text" placeholder="username"/>
    <input name="password" id = "password" type="password" placeholder="password"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
    </form>
    `,
    LogoutForm:`
    <form action="/logout" method="post">
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    `,
    Functionalities:`
    <a class btn btn-outline-success my-2 my-sm-0 mx-2" href="/blog"> new blog</a>
    a class btn btn-outline-success my-2 my-sm-0 mx-2" href="/users"> Users</a>
    `,
    AddBlog:`
    <div class = "border shadow p-4">
        <h4>add blog</h4>
        <form method"POST" action="/blog">
            <div class="form-group">
                <label for ="newBlogTitle">Title</label>
                <input type="text" class="form-control" id="newBlogTitle" name="title" placeholder="title name"/>
            </div>
            <div class="form-group">
                <label for="newBlogContent">Content</label>
                <textarea type="text" class="form-control" id="newBlogContent" name="content" placeholder="Blog Content" rows="8"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    <div>
    `
}