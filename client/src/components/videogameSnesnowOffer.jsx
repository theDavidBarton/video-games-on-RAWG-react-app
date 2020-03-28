import React, { Fragment, Component } from 'react'

class SnesnowOffer extends Component {
  render() {
    const snesnowUrl = `https://snesnow.com/play/${this.props.snesnowIdentifier}.html`
    return (
      <Fragment>
        <a href={snesnowUrl} target='_blank' rel='noopener noreferrer'>
          <div className='btn btn-outline-info m-2 p-2'>
            <small className='smaller-free'>FREE</small> <strong>SnesNow.com</strong>
          </div>
        </a>
      </Fragment>
    )
  }
}

export default SnesnowOffer
