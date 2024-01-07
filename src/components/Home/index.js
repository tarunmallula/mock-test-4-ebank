import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="home-image"
        />
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
      <h1 className="home-title">Your Flexibility, Our Excellence</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
        className="card-image"
      />
    </div>
  )
}

export default Home
