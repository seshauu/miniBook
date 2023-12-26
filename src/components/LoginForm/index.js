import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    error: false,
    errorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const fetchedData = await response.json()

    if (response.ok) {
      const jwtToken = fetchedData.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = fetchedData.error_msg
      this.setState({error: true, errorMsg})
    }
  }

  render() {
    const {error, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-bg-con">
        <div className="website-login-img-lg">
          <img
            src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1701498861/Rectangle_1467loginphoto_thsmlx.png"
            className="website-login-lg"
            alt="website login"
          />
        </div>
        <div className="con2">
          <div className="website-login-responsive-con">
            <div className="website-login-con">
              <div className="website-login-img-con-sm">
                <img
                  src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1701581069/Ellipse_99sm_v1prbd.png"
                  className="img-sm"
                  alt="website-logo"
                />
              </div>
              <form
                onSubmit={this.onSubmitUserDetails}
                className="login-form-con"
              >
                <div className="login-website-logo-con">
                  <img
                    src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1701500299/Group_7731logo_u0msbb.png"
                    className="website-logo"
                    alt="login website logo"
                  />
                </div>
                <div className="login-input-con">
                  <label className="login-label" htmlFor="username">
                    Username<sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="login-input"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="login-input-con">
                  <label className="login-label" htmlFor="password">
                    Password<sup>*</sup>
                  </label>
                  <input
                    type="password"
                    className="login-input"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                  {error && <p className="error-msg">{errorMsg}</p>}
                </div>
                <button className="login-btn" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
