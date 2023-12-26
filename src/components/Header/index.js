import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiMenu} from 'react-icons/fi'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

class Header extends Component {
  state = {displayNavbar: false}

  onClickMenu = () => {
    this.setState(prevState => ({displayNavbar: !prevState.displayNavbar}))
  }

  onClickCross = () => {
    this.setState({displayNavbar: false})
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onClickWebsiteLogo = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    const {home, shelves} = this.props
    const activeHome = home ? 'active-tab' : ''
    const activeShelves = shelves ? 'active-tab' : ''
    const {displayNavbar} = this.state

    return (
      <div>
        <div className="header-con">
          <div>
            <Link to="/">
              <img
                className="header-website-logo"
                src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1701500299/Group_7731logo_u0msbb.png"
                alt="website logo"
              />
            </Link>
          </div>
          <ul className="tabs-con">
            <Link className="link" to="/">
              <li className={`list-item home-tab ${activeHome}`}>Home</li>
            </Link>
            <Link className="link" to="/shelf">
              <li className={`list-item bookshelves-tab ${activeShelves}`}>
                Bookshelves
              </li>
            </Link>

            <li className="list-item">
              <button
                onClick={this.onClickLogout}
                className="logout-btn"
                type="button"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="navbar-responsive-con">
          <div className="header-navbar-con">
            <img
              className="nav-bar-website-logo"
              src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1701500299/Group_7731logo_u0msbb.png"
              alt="login website logo"
            />
            <button
              onClick={this.onClickMenu}
              className="menu-icon-btn"
              type="button"
            >
              <FiMenu className="menu-icon" />
            </button>
          </div>
          {displayNavbar && (
            <>
              <div className="header-navbar-tab-con">
                <Link className="link" to="/">
                  <p className={`home-tab ${activeHome}`}>Home</p>
                </Link>
                <Link className="link" to="/shelf">
                  <p className={`bookshelves-tab ${activeShelves}`}>
                    Bookshelves
                  </p>
                </Link>
                <div className="header-navbar-tabs-con">
                  <button
                    onClick={this.onClickLogout}
                    className="logout-btn"
                    type="button"
                  >
                    Logout
                  </button>
                  <button
                    onClick={this.onClickCross}
                    className="cross-icon-btn"
                    type="button"
                  >
                    <RiCloseCircleFill className="cross" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
