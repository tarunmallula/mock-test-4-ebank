import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserInput = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, password} = this.state
    const userDetails = {user_id: userId, pin: password}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userId, password, showSubmitError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container">
        <div className="responsive-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="login-card" onSubmit={this.submitForm}>
            <h1 className="login-title">Welcome Back!</h1>
            <label htmlFor="userID" className="label">
              User ID
            </label>
            <input
              id="userID"
              type="text"
              placeholder="Enter User ID"
              className="user-input"
              onChange={this.onChangeUserInput}
              value={userId}
            />
            <label htmlFor="pin" className="pin-label">
              PIN
            </label>
            <input
              id="pin"
              type="password"
              placeholder="Enter PIN"
              className="user-input"
              onChange={this.onChangePassword}
              value={password}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
