import React, { Fragment } from 'react';
import Store from './videogameStore';
import ArchiveOffer from './videogameArchiveOffer';
import OldgameshelfOffer from './videogameOldgameshelfOffer';
import SnesnowOffer from './videogameSnesnowOffer';

export default function Stores({
  data,
  archiveIdentifier,
  archiveOfferAvailable,
  oldgameshelfIdentifier,
  oldgameshelfOfferAvailable,
  snesnowIdentifier,
  snesnowOfferAvailable
}) {
  return (
    <section id='stores' className='col-md-3'>
      {data.stores.length > 0 || archiveOfferAvailable || oldgameshelfOfferAvailable || snesnowOfferAvailable ? (
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
            <Fragment>{archiveOfferAvailable ? <ArchiveOffer archiveIdentifier={archiveIdentifier} /> : null}</Fragment>
            <Fragment>
              {oldgameshelfOfferAvailable ? <OldgameshelfOffer oldgameshelfIdentifier={oldgameshelfIdentifier} /> : null}
            </Fragment>
            <Fragment>{snesnowOfferAvailable ? <SnesnowOffer snesnowIdentifier={snesnowIdentifier} /> : null}</Fragment>
          </div>
        </Fragment>
      ) : null}
    </section>
  );
}
