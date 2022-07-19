import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
  }

  // implement a login function. token returned state in apps stater user
  return (
    <div>
      <h2>blogs</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name= 'Username'
            onChange={({ target }) => setUserName(target.value)}
          />
        </div>
        <div>
          password
            <input 
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type ='submit'>login</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
