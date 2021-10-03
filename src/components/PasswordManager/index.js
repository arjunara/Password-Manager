import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'

import './index.css'

const backgroundColorContainerList = ['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6']

class PasswordManager extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    isPasswordShow: false,
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({isPasswordShow: event.target.checked})
  }

  onAddPasswordDetails = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const bgClassName =
      backgroundColorContainerList[Math.ceil(Math.random() * 6 - 1)]
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      bgclassname: bgClassName,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const filteredPasswordsList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredPasswordsList})
  }

  getFilteredSearchList = () => {
    const {passwordsList, searchInput} = this.state
    const searchResultsList = passwordsList.filter(eachPasswordDetails =>
      eachPasswordDetails.website
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )
    this.setState({passwordsList: searchResultsList})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
    this.getFilteredSearchList()
  }

  showNoPasswordPage = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-image"
      />
      <p className="no-password-text">No Passwords</p>
    </div>
  )

  showPasswordsList = () => {
    const {passwordsList, isPasswordShow} = this.state
    return (
      <ul className="password-list-container">
        {passwordsList.map(eachPasswordDetails => (
          <PasswordItem
            passwordDetails={eachPasswordDetails}
            key={eachPasswordDetails.id}
            isPasswordShow={isPasswordShow}
            onDeletePassword={this.onDeletePassword}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {
      passwordsList,
      websiteInput,
      usernameInput,
      passwordInput,
    } = this.state

    return (
      <div className="app-bg-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="top-section-bg-container">
            <div className="input-container">
              <form
                className="form-control"
                onSubmit={this.onAddPasswordDetails}
              >
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Website"
                    onChange={this.onChangeWebsiteInput}
                    value={websiteInput}
                  />
                </div>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icon"
                  />
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Username"
                    onChange={this.onChangeUserInput}
                    value={usernameInput}
                  />
                </div>
                <div className="input-box">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icon"
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Enter Password"
                    onChange={this.onChangePasswordInput}
                    value={passwordInput}
                  />
                </div>
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password-manager-image"
              />
            </div>
          </div>
          <div className="bottom-section-bg-container">
            <div className="bottom-header">
              <div className="password-count-container">
                <h1 className="your-passwords">Your Passwords</h1>
                <p className="password-count">{passwordsList.length}</p>
              </div>
              <div className="search-input-box">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-icon"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <div className="show-password-container">
              <input
                type="checkbox"
                className="check-box"
                id="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label className="show-password-label" htmlFor="checkbox">
                Show Passwords
              </label>
            </div>
            {passwordsList.length === 0
              ? this.showNoPasswordPage()
              : this.showPasswordsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
