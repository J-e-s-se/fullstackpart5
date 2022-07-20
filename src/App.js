import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] = useState({ message: null, status: null })
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedinuser = window.localStorage.getItem('loggedinuser')
    if (loggedinuser) {
      const userdata = JSON.parse(loggedinuser)
      setUser(userdata)
      blogServices.setToken(userdata.token)
    }
  }, [])

  useEffect(() => {
    blogServices.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in...')

    const credentials = { username, password }

    try {
      const user = await loginServices.login(credentials)
      console.log('loginuser', user)
      setUser(user)
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedinuser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch(err) {
      console.log('err', err)
      setNotification({ message: err.response.data.error, status: 'bad' })
      setTimeout(() => {
        setNotification({ message: null, status: null })
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    console.log('logging out...')
    setUser(null)
    window.localStorage.removeItem('loggedinuser')
  }

  const handleCreate = async (createdata) => {
    try {
      const newBlog = await blogServices.create(createdata)
      setBlogs(oldBlogs => oldBlogs.concat(newBlog))
      setNotification({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, status: 'good' })
      setTimeout(() => {
        setNotification({ message: null, status: null })
      }, 5000)
    }

    catch(error) {
      console.log(error)
    }
  }


  const handleBlogLike = async (id) => {

    try {
      const blog = blogs.find(blog => blog.id === id)
      console.log('blog', blog)
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      console.log('newBlog', newBlog)
      const response = await blogServices.update(newBlog)
      console.log('response', response)
      response.user = blog.user
      setBlogs(oldBlogs => oldBlogs.filter(blog => blog.id !== id).concat(response))
    }

    catch(err) {
      console.log(err)
    }
  }

  const handleBlogDelete = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      await blogServices.remove(id)
      setBlogs(oldBlogs => oldBlogs.filter(blog => blog.id !== id))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      {
        user
          ?
          <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <p>{user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>

            <Togglable buttonLabel="new blog">
              <BlogForm
                handleCreate={handleCreate}
              />
            </Togglable>
            {sortedBlogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={() => handleBlogLike(blog.id)}
                removeBlog = {() => handleBlogDelete(blog.id)}
                blogOwner={user.username === blog.user?.username}
              />
            )}
          </div>
          :
          <Togglable buttonLabel="login">
            <LoginForm
              handleLogin={handleLogin}
              notification={notification}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              Notification={Notification}
            />
          </Togglable>
      }
    </div>
  )
}

export default App
