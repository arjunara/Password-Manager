import './index.css'

const passwordWithStars = () => (
  <img
    src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
    alt="stars"
    className="stars-image"
  />
)

const PasswordItem = props => {
  const {passwordDetails, isPasswordShow, onDeletePassword} = props
  const {id, website, username, password, bgclassname} = passwordDetails
  const customizedPassword = isPasswordShow ? password : passwordWithStars()

  const logoInitial = website.toUpperCase()[0]

  const onClickDeletePasswordDetails = () => {
    onDeletePassword(id)
  }
  return (
    <li className="list-item-container">
      <div className="password-details-card">
        <div className={`profile-logo-container ${bgclassname}`}>
          <p className="profile-logo">{logoInitial}</p>
        </div>
        <div className="password-details-container">
          <p className="password-details">{website}</p>
          <p className="password-details">{username}</p>
          <p className="password-details">{customizedPassword}</p>
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        testid="delete"
        onClick={onClickDeletePasswordDetails}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
