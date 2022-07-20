import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }
}
  // 1 of 2 helper functions for generating forms
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={( {target} ) => setUserName(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={( {target} ) => setPassword(target.value)}
          />
      </div>
      <button type='submit'>login</button>
    </form>
  )
    // 2 of 2 helper functions for generating forms 
    const blogForm = () => (
      <form onSubmit={addBlog}>
        <input
          value={newBlog}
          onChange={handleBlogChange}
        />
      </form>
    )


  // implement a login function. token returned state in apps stater user
  return (
    <div>
      <h1>blogs</h1>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          {blogForm()}
          </div>
        }
        
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
