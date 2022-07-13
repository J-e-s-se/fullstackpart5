import { useState } from 'react'

const BlogForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    handleCreate({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            data-testid="titleinput"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            data-testid="authorinput"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            data-testid="urlinput"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm