import React, { Component, Fragment } from 'react'
import Store from './videogameStore'
import ArchiveOffer from './videogameArchiveOffer'

class Stores extends Component {
  render() {
    const data = this.props.data
    return (
      <section id='stores' className='col-md-3'>
        {data.stores.length > 0 || this.props.archiveOfferAvailable ? (
          <Fragment>
            <header className='row mt-3 px-3'>
              <h4>Stores:</h4>
            </header>
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
      </section>
    )
  }
}

export default Stores
