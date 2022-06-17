import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import loginServices from './services/login'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [notification, setNotification] = useState({message: null, status: null})
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

    const credentials = {username, password}

    try {
      const user = await loginServices.login(credentials)
      setUser(user)
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedinuser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch(err) {
      setNotification({message: err.response.data.error, status: 'bad'})
      setTimeout(() => {
        setNotification({message: null, status: null})
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    console.log('logging out...')
    setUser(null)
    window.localStorage.removeItem('loggedinuser')
  }

  const handleCreate = async event => {
    event.preventDefault()
    const createdata = {title, author, url}

    try {
      const newBlog = await blogServices.create(createdata)
      setBlogs(oldBlogs => oldBlogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({message: `a new blog ${newBlog.title} by ${newBlog.author} added`, status: 'good'})
      setTimeout(() => {
        setNotification({message: null, status: null})   
      }, 5000)
    }

    catch(error) {
      console.log(error)
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

          <h2>create new</h2>
          <form onSubmit={handleCreate}>
            <div>
              title:
              <input
                type='text'
                value={title}
                onChange={({target}) => setTitle(target.value)}
              />
            </div>
            <div>
              author:
              <input
                type='text'
                value={author}
                onChange={({target}) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:
              <input
                type='text'
                value={url}
                onChange={({target}) => setUrl(target.value)}
              />
            </div>
            <button>create</button>
          </form>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        :
        <form onSubmit={handleLogin}>
          <h2>Login to the application</h2>
          <Notification notification={notification} />
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button>login</button>
        </form>
      }
    </div>
  )
}

export default App
