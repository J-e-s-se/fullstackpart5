import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog, blogOwner }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      {' '}
      {blog.author}
      {' '}
      <button onClick={() => setView(!view)}>{view? 'hide' : 'view'}</button>

      {view &&
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={likeBlog}>like</button></p>
          {blog.user? <p>{blog.user.name}</p> : null}
          {blogOwner && <button onClick={removeBlog}>remove</button>}
        </div>
      }
    </div>
  )
}

export default Blog