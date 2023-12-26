import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    topRatedApiStatus: apiStatus.initial,
    topRatedBooks: [],
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({topRatedApiStatus: apiStatus.inProgress})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const booksList = fetchedData.books
      console.log(booksList)
      const updatedBook = booksList.map(each => ({
        id: each.id,
        authorName: each.author_name,
        coverPic: each.cover_pic,
        title: each.title,
      }))
      this.setState({
        topRatedApiStatus: apiStatus.success,
        topRatedBooks: updatedBook,
      })
    } else {
      this.setState({topRatedApiStatus: apiStatus.failure})
    }
  }

  onClickRetry = () => {
    this.getTopRatedBooks()
  }

  onClickFindBooks = () => {
    const {history} = this.props
    history.push('shelf')
  }

  renderSliderSuccessView = () => {
    const {topRatedBooks} = this.state

    return (
      <Slider {...settings}>
        {topRatedBooks.map(each => {
          const {id, title, coverPic, authorName} = each
          const onClickTopRatedBook = () => {
            const {history} = this.props
            history.push(`/books/${id}`)
          }

          return (
            <div className="top-rated-book-item-con" key={id}>
              <div>
                <button
                  onClick={onClickTopRatedBook}
                  className="top-rated-card-btn"
                  type="button"
                >
                  <div className="top-rated-img">
                    <img
                      className="top-rated-book"
                      src={coverPic}
                      alt={title}
                    />
                  </div>
                  <h1 className="book-name">{title}</h1>
                  <p className="book-author">{authorName}</p>
                </button>
              </div>
            </div>
          )
        })}
      </Slider>
    )
  }

  loaderView = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color="#0284c7" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="top-rated-failure-view">
      <img src="" className="failure-img" alt="failure view" />
      <p className="failure-heading">Something went wrong. Please try again</p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Try Again
      </button>
    </div>
  )

  renderSlider = () => {
    const {topRatedApiStatus} = this.state
    switch (topRatedApiStatus) {
      case apiStatus.success:
        return this.renderSliderSuccessView()
      case apiStatus.inProgress:
        return this.loaderView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header home />
        <div className="home-page-bg-con">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>
          <p className="home-para">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past. and we will give you surprisingly insightful
            recommendation.
          </p>
          <button
            className="responsive-btn-sm btn"
            type="button"
            onClick={this.onClickFindBooks}
          >
            Find Books
          </button>
          <div className="top-rated-con">
            <div className="heading-con">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <button
                className="responsive-btn-lg btn"
                type="button"
                onClick={this.onClickFindBooks}
              >
                Find Book
              </button>
            </div>
            <div className="slick-main">
              <div className="slick-con">{this.renderSlider()}</div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
export default Home
