import PropTypes from 'prop-types'
const LoginForm = (
  {
    handleLogin,
    notification,
    username,
    password,
    setUsername,
    setPassword,
    Notification
  }
) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Login to the application</h2>
      <Notification notification={notification} />
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id="login-button"
        type="submit"
      >
        login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
  Notification: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}


export default LoginForm