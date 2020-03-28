import React, { Fragment, Component } from 'react'

class OldgameshelfOffer extends Component {
  render() {
    const oldgameshelfUrl = `https://oldgameshelf.com/${this.props.oldgameshelfIdentifier}.html`
    return (
      <Fragment>
        <a href={oldgameshelfUrl} target='_blank' rel='noopener noreferrer'>
          <div className='btn btn-outline-info m-2 p-2'>
            <small className='smaller-free'>FREE</small> <strong>OldGameShelf.com</strong>
          </div>
        </a>
      </Fragment>
    )
  }
}

export default OldgameshelfOffer
