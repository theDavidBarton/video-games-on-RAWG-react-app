import React, { useState, Fragment } from 'react';

export default function CookieBar() {
  const [isOpened, setIsOpened] = useState(true);

  const closeIt = () => {
    setIsOpened(false);
  };

  return (
    <Fragment>
      {isOpened ? (
        <section id='cookieBar' className='bg-dark text-light sticky-top py-2'>
          <div className='container'>
            This page doesn't store cookies, but RAWG does. Check out{' '}
            <a className='text-warning' href='https://rawg.io/privacy_policy'>
              their cookie policy
            </a>{' '}
            to opt out!
            <button onClick={closeIt} type='button' className='close text-light'>
              <span>&times;</span>
            </button>
          </div>
        </section>
      ) : null}
    </Fragment>
  );
}
