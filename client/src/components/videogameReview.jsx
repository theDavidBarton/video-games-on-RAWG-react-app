import React, { Fragment, Component } from 'react'
import dompurify from 'dompurify'

class Review extends Component {
  render() {
    const reviewElement = this.props.data
    return (
      <Fragment>
        <div>{'★'.repeat(reviewElement.rating) + '☆'.repeat(5 - reviewElement.rating)}</div>
        <p dangerouslySetInnerHTML={{ __html: dompurify.sanitize(reviewElement.text) }}></p>
        <strong>by {reviewElement.user ? reviewElement.user.username : reviewElement.external_author} </strong>
        <small>{reviewElement.created ? reviewElement.created.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) : 'n/a'}</small>
        <hr />
      </Fragment>
    )
  }
}

export default Review
