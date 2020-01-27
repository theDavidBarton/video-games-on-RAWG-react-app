import React, { Component, Fragment } from 'react'
import Store from './videogameStore'
import ArchiveOffer from './videogameArchiveOffer'
import Review from './videogameReview'

class StoresAndReviews extends Component {
  state = {
    reviewHeight: '133px'
  }
  unnecessaryReviewReadmore = () => {
    let unnecessaryReviewReadmore
    if (this.props.data.reviews[0]) {
      this.props.data.reviews.length <= 1 && this.props.data.reviews[0].text.length < 445
        ? (unnecessaryReviewReadmore = true)
        : (unnecessaryReviewReadmore = false)
    }
    return unnecessaryReviewReadmore
  }

  setReviewsHeight = () => {
    this.setState({ reviewHeight: 'auto' })
  }

  setBackReviewsHeight = () => {
    this.setState({ reviewHeight: '133px' })
  }

  render() {
    const data = this.props.data
    return (
      <section id='storesAndReviews' className='row'>
        <div className='col-md-3'>
          {data.stores.length > 0 || this.props.archiveOfferAvailable ? (
            <Fragment>
              <div className='row mt-3 px-3'>
                <h4>Stores:</h4>
              </div>
              <div className='row mb-2'>
                <Fragment>
                  {data.stores.length > 0
                    ? data.stores.map(storeElement => <Store key={storeElement.id} data={storeElement} />)
                    : null}
                </Fragment>
                {this.props.archiveOfferAvailable ? (
                  <ArchiveOffer archiveIdentifier={this.props.archiveIdentifier} />
                ) : null}
              </div>
            </Fragment>
          ) : null}
        </div>
        <article id='reviews' className='col'>
          {data.reviews.length > 0 ? (
            <Fragment>
              <h4 className='row mt-3 px-3'>Reviews:</h4>
              <div id='longContent' className='long-content' style={{ height: this.state.reviewHeight }}>
                {data.reviews.map(reviewElement => (
                  <Review key={reviewElement.id} data={reviewElement} />
                ))}
              </div>
              <div className='row justify-content-center'>
                {this.state.reviewHeight !== 'auto' ? (
                  <Fragment>
                    {!this.unnecessaryReviewReadmore() ? (
                      <Fragment>
                        <button className='btn btn-outline-dark text-center m-3' onClick={this.setReviewsHeight}>
                          read more
                        </button>{' '}
                      </Fragment>
                    ) : null}
                  </Fragment>
                ) : (
                  <button className='btn btn-outline-dark text-center m-3' onClick={this.setBackReviewsHeight}>
                    read less
                  </button>
                )}
              </div>
            </Fragment>
          ) : null}
        </article>
      </section>
    )
  }
}

export default StoresAndReviews
