import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <img
      src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1702363349/Group_7484_1_mvcgex.png"
      className="not-found-img"
      alt="not found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="para">
      We are sorry, the page you requested could not be found. please go back to
      the home page
    </p>
    <Link to="/">
      <button type="button" className="back-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
