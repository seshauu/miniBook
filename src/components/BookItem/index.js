import {withRouter} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'

import './index.css'

const BookItem = props => {
  const onClickBookItem = () => {
    const {bookDetails} = props
    const {id} = bookDetails
    console.log(id)
    const {history} = props
    history.push(`/books/${id}`)
  }

  const {bookDetails} = props
  const {title, readStatus, rating, authorName, coverPic} = bookDetails

  return (
    <li className="book-itm-list-item">
      <div className="book-item-btn-con">
        <button
          className="book-item-btn"
          onClick={onClickBookItem}
          type="button"
        >
          <img className="book-item-cover-pic" src={coverPic} alt={title} />
        </button>
        <div className="item-details-card-con">
          <h1 className="book-item-title">{title}</h1>
          <p className="author-name">{authorName}</p>
          <div className="avg-rating-con">
            <p className="avg-rating">Avg Rating</p>
            <BsFillStarFill className="star-icon" />
            <p className="item-rating">{rating}</p>
          </div>
          <p className="status-heading">
            Status: <span className="item-status">{readStatus}</span>
          </p>
        </div>
      </div>
    </li>
  )
}
export default withRouter(BookItem)
