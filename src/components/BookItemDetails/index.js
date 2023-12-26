import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    bookDetailsData: {},
    bookDetailsApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getBookDetailsApi()
  }

  getBookDetailsApi = async () => {
    this.setState({bookDetailsApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updateData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          readStatus: fetchedData.book_details.read_status,
          title: fetchedData.book_details.title,
          aboutAuthor: fetchedData.book_details.about_author,
        },
      }
      this.setState({
        bookDetailsData: updateData,
        bookDetailsApiStatus: apiStatus.success,
      })
    } else {
      this.setState({bookDetailsApiStatus: apiStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getBookDetailsApi()
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height={32} width={32} />
    </div>
  )

  renderBookDetailsFailureView = () => (
    <div className="top-rated-books-failure-con">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dw6hgsfbk/image/upload/v1702364226/Group_7522_cux3cw.png"
        alt="failure view"
      />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button
        className="top-rated-failure-btn"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetailsData} = this.state
    const {bookDetails} = bookDetailsData
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <div className="book-details-card-con">
        <div className="white-card">
          <div className="book-details-con">
            <img className="book-img" src={coverPic} alt={title} />
            <div>
              <h1 className="title">{title}</h1>
              <p className="author-name">{authorName}</p>
              <div className="rating-con">
                <p className="avg-heading">Avg rating</p>
                <BsFillStarFill className="star-icon" />
                <p className="book-details-rating">{rating}</p>
              </div>
              <p className="status-heading">
                Status: <span className="book-detail-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div>
            <h1 className="about-heading">About Author</h1>
            <p className="about-para">{aboutAuthor}</p>
          </div>
          <div>
            <h1 className="about-heading">About Book</h1>
            <p className="about-para">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetailsApiStatus} = this.state

    switch (bookDetailsApiStatus) {
      case apiStatus.success:
        return this.renderBookDetailsSuccessView()
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.failure:
        return this.renderBookDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="book-details-bg-container">
          {this.renderBookDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default BookItemDetails
