import React, { useState, useEffect, Fragment } from 'react';
import SearchDropdownItem, { SearchDropdownItemNoResult } from './searchDropdownItem';

export default function Search() {
  const [data, setData] = useState(null);
  const [dataIsReady, setDataIsReady] = useState(false);
  const [dropdownIsopened, setDropdownIsopened] = useState(false);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    async function getRawgApi() {
      if (keyword !== '') {
        try {
          const response = await fetch(`/api/videogameAutocomplete?q=${keyword.toLowerCase()}`);
          const json = await response.json();
          setData(json);
          setDataIsReady(true);
        } catch (e) {
          console.error(e);
        }
      }
    }
    getRawgApi();
  }, [keyword]);

  const setKeywordInInput = event => {
    setKeyword(event.target.value);
    setDropdownIsopened(true);
  };

  const closeDropdown = () => {
    setDropdownIsopened(false);
    setKeyword('');
  };

  return (
    <Fragment>
      <div className='position-relative' style={{ zIndex: 1 }}>
        <input
          aria-label='powered by RAWG.io'
          id='searchform'
          className='form-control mt-2'
          type='text'
          placeholder='Type a video game title…'
          autoComplete='off'
          value={keyword}
          onChange={setKeywordInInput}
        />
        <label htmlFor='searchform' className='d-none d-md-block input-label-style'>
          powered by RAWG.io
        </label>
        {dataIsReady ? (
          <Fragment>
            {dropdownIsopened ? (
              <div className='bg-white w-auto text-dark position-absolute dropdown-position py-2 px-2'>
                <ul className='list-unstyled mb-0'>
                  {data.count >= 1 ? (
                    // only first eight search results displayed in the dropdown
                    data.results.slice(0, 8).map(result => <SearchDropdownItem key={result.id} result={result} />)
                  ) : (
                    <SearchDropdownItemNoResult />
                  )}
                </ul>
                <div id='dropdownOverlay' onClick={closeDropdown} className='overlay-style'></div>
              </div>
            ) : null}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
}
