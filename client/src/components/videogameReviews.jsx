import React, { Fragment, useState } from 'react';
import Review from './videogameReview';

export default function Reviews({ data }) {
  const [reviewHeight, setReviewHeight] = useState('133px');

  const unnecessaryReviewReadmore = () => {
    let unnecessaryReviewReadmore;
    if (data.reviews[0]) {
      data.reviews.length <= 1 && data.reviews[0].text.length < 445
        ? (unnecessaryReviewReadmore = true)
        : (unnecessaryReviewReadmore = false);
    }
    return unnecessaryReviewReadmore;
  };

  const setReviewsHeightFn = () => {
    setReviewHeight('auto');
  };

  const setBackReviewsHeightFn = () => {
    setReviewHeight('133px');
  };

  return (
    <article id='reviews' className='col'>
      {data.reviews.length > 0 ? (
        <Fragment>
          <h4 className='row mt-3 px-3'>Reviews:</h4>
          <div id='longContent' className='long-content' style={{ height: reviewHeight }}>
            {data.reviews.map(reviewElement => (
              <Review key={reviewElement.id} data={reviewElement} />
            ))}
          </div>
          <div className='row justify-content-center'>
            {reviewHeight !== 'auto' ? (
              <Fragment>
                {!unnecessaryReviewReadmore() ? (
                  <Fragment>
                    <button className='btn btn-outline-dark text-center m-3' onClick={setReviewsHeightFn}>
                      read more
                    </button>{' '}
                  </Fragment>
                ) : null}
              </Fragment>
            ) : (
              <button className='btn btn-outline-dark text-center m-3' onClick={setBackReviewsHeightFn}>
                read less
              </button>
            )}
          </div>
        </Fragment>
      ) : null}
    </article>
  );
}
