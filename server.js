'use strict';

const express = require('express');
const cors = require('cors');
const request = require('request');
const compression = require('compression');
const oneyPlays = require('oneyplays-api');
const userAgent = { 'User-Agent': 'video-games-on-RAWG-react-app (GitHub)' };
const rawgApiKey = process.env.RAWG_API_KEY;

if (!rawgApiKey) {
  console.log('RAWG api key is NOT found among environment variables!');
  process.exit(1);
}

const optionsTrending = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games/lists/main',
  qs: {
    key: rawgApiKey,
    ordering: '-relevance',
    discover: true,
    page_size: 10
  }
};

const optionsTopRatedRecommended = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    key: rawgApiKey,
    ordering: '-added',
    page_size: 10
  }
};

const optionsVideogame = {
  method: 'GET',
  headers: userAgent,
  url: undefined,
  qs: {
    key: rawgApiKey
  }
};

const optionsVideogameAutocomplete = {
  method: 'GET',
  headers: userAgent,
  url: 'https://api.rawg.io/api/games',
  qs: {
    key: rawgApiKey,
    search: undefined
  }
};

const optionsSearchArchive = {
  method: 'GET',
  headers: userAgent,
  url: 'https://archive.org/advancedsearch.php',
  qs: {
    q: undefined,
    rows: '5',
    page: '1',
    output: 'json',
    'fl[]': 'identifier',
    'sort[]': 'downloads desc'
  }
};

const optionsSearchOldgameshelf = {
  method: 'GET',
  headers: userAgent,
  url: 'https://oldgameshelf.com/api/v1/games',
  qs: {
    _q: undefined,
    _limit: '1'
  }
};

const optionsSearchSnesnow = {
  method: 'GET',
  headers: userAgent,
  url: 'https://snesnow.com/media',
  qs: {
    _q: undefined,
    _limit: '1'
  }
};

let parsedResult;

const apiCall = async options => {
  // (I.) promise to return the parsedResult for processing
  const rawgRequest = () => {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
  };

  // (II.)
  try {
    parsedResult = await rawgRequest();
  } catch (e) {
    console.error(e);
  }
  return parsedResult;
};

(() => {
  try {
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(compression());
    app.use(cors({ origin: ['https://trending-video-games-frontend.onrender.com', 'https://thedavidbarton.github.io'] }));

    // providing a constant endpoint for health checks
    app.get('/health', async (req, res) => {
      res.json({ status: 'OK' });
      console.log(`/health endpoint has been called ${JSON.stringify(req.query)}!`);
    });

    // providing a constant endpoint for trending videogames
    app.get('/api/trending', async (req, res) => {
      res.set('Cache-Control', 'no-cache');
      res.json(await apiCall(optionsTrending));
      console.log('/api/trending endpoint has been called!');
    });

    // providing a constant endpoint for a random top rated videogame
    app.get('/api/topRatedRecommended', async (req, res) => {
      const topRatedResponse = await apiCall(optionsTopRatedRecommended);
      const randomIndex = Math.floor(Math.random() * Math.floor(10)); // one page contains exactly 10 results
      const topRatedRandomVideogame = topRatedResponse.results[randomIndex];
      res.set('Cache-Control', 'no-cache');
      res.json(topRatedRandomVideogame);
      console.log('/api/topRatedRecommended endpoint has been called!');
    });

    // providing a dynamic endpoint to videogame detail pages
    app.get('/api/videogame/:rawgId', async (req, res) => {
      const id = req.params.rawgId.match(/\d+/);
      const getPrimaryDetails = async () => {
        optionsVideogame.url = `https://api.rawg.io/api/games/${id}`;
        return await apiCall(optionsVideogame);
      };
      const getScreenshots = async () => {
        optionsVideogame.url = `https://api.rawg.io/api/games/${id}/screenshots`;
        return await apiCall(optionsVideogame);
      };
      const getReviews = async () => {
        optionsVideogame.url = `https://api.rawg.io/api/games/${id}/reviews`;
        return await apiCall(optionsVideogame);
      };
      const getDevTeam = async () => {
        optionsVideogame.url = `https://api.rawg.io/api/games/${id}/development-team`;
        return await apiCall(optionsVideogame);
      };
      const getOneyplays = () => {
        let compatibilityOneyObj = [];
        const oneyObj = oneyPlays(id);
        if (oneyObj.length > 0) {
          compatibilityOneyObj = [
            {
              ...oneyObj[0],
              external_id: oneyObj[0].yt_id,
              thumbnails: { medium: { url: oneyObj[0].yt_thumbnail } }
            }
          ];
        }
        return compatibilityOneyObj;
      };

      const primary = await getPrimaryDetails();
      const secondary = await Promise.all([getScreenshots(), getReviews(), getDevTeam(), getOneyplays()]);
      const detailsCollected = {
        ...primary,
        screenshots: parseInt(primary.screenshots_count) > 0 ? secondary[0].results : [],
        reviews: parseInt(primary.reviews_count) > 0 ? secondary[1].results : [],
        devteam: parseInt(primary.creators_count) > 0 ? secondary[2].results : [],
        oneyplays: secondary[3]
      };

      res.set('Cache-Control', 'no-cache');
      res.json(detailsCollected);
      console.log(`/api/videogame/${id} endpoint has been called!`);
    });

    // _Archive.org link to older titles
    // e.g.: https://archive.org/advancedsearch.php?q=title:(prehistorik) AND collection:(softwarelibrary^10) AND year:(1993) AND mediatype:(software)&fl[]=identifier&fl[]=title&fl[]=year&sort[]=downloads desc&rows=5&page=1&output=json
    app.get('/api/searchArchive', async (req, res) => {
      try {
        const queryTitle = req.query.title;
        const queryYear = req.query.year;
        optionsSearchArchive.qs.q = `title:(${queryTitle}) AND collection:(softwarelibrary^10) AND year:(${queryYear}) AND mediatype:(software)`;
        res.set('Cache-Control', 'no-cache');
        res.json(await apiCall(optionsSearchArchive));
        console.log(`/api/searchArchive?title=${queryTitle}&year=${queryYear} endpoint has been called!`);
      } catch (e) {
        console.error(e);
      }
    });

    // _OldGameShelf link to NES titles
    // e.g.: https://oldgameshelf.com/api/v1/games?_q=super%20contra&_limit=1
    app.get('/api/searchOldgameshelf', async (req, res) => {
      try {
        const queryTitle = req.query.title;
        optionsSearchOldgameshelf.qs._q = queryTitle;
        res.set('Cache-Control', 'no-cache');
        res.json(await apiCall(optionsSearchOldgameshelf));
        console.log(`/api/searchOldgameshelf?title=${queryTitle} endpoint has been called!`);
      } catch (e) {
        console.error(e);
      }
    });

    // _SnesNow link to SNES titles
    // e.g.: https://snesnow.com/media?_limit=1&_q=contra
    app.get('/api/searchSnesnow', async (req, res) => {
      try {
        const queryTitle = req.query.title;
        optionsSearchSnesnow.qs._q = queryTitle;
        res.set('Cache-Control', 'no-cache');
        res.json(await apiCall(optionsSearchSnesnow));
        console.log(`/api/searchSnesnow?title=${queryTitle} endpoint has been called!`);
      } catch (e) {
        console.error(e);
      }
    });

    // providing a dynamic endpoint to videogame autocomplete
    app.get('/api/videogameAutocomplete', async (req, res) => {
      const query = req.query.q;
      optionsVideogameAutocomplete.qs.search = query;
      res.set('Cache-Control', 'no-cache');
      res.json(await apiCall(optionsVideogameAutocomplete));
      console.log(`/api/videogameAutocomplete?q=${query} endpoint has been called!`);
    });

    app.listen(port);

    console.log(`API is listening on ${port}`);
  } catch (e) {
    console.error(e);
  }
})();
