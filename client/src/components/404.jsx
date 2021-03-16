import React, { Fragment } from 'react';

export default function Page404() {
  return (
    <Fragment>
      <main className='bg-dark text-warning'>
        <section className='container text-center'>
          <div className='row'>
            <h1 className='col display-2 py-5'>404 not found</h1>
          </div>
        </section>
      </main>
      <aside className='bg-white container text-center py-5'>
        <section className='col'>
          <span className='input-label-style py-5'>
            Back to{' '}
            <a className='text-secondary input-label-style' href='/'>
              home&#10132;
            </a>
          </span>
        </section>
      </aside>
    </Fragment>
  );
}
