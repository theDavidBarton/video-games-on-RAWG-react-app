[![Actions Status](https://github.com/theDavidBarton/video-games-on-RAWG-react-app/workflows/CI/badge.svg)](https://github.com/theDavidBarton/video-games-on-RAWG-react-app/actions)

# Videogames on RAWG

## Reusing this project without forking

⚠️ As I see more-and-more are using my application as an inspiration for their projects which is cool. 😊 **I want to ask you** to (1) make sure that you comply with the [MIT](#license) license in case you are copy-pasting parts of it (means you are not forking, so the natural connection is cut between your work and the original source code) and also that (2) please alter the User-Agent (`{ 'User-Agent': 'video-games-on-RAWG-react-app (GitHub)' }`) in your server implementation so it points to your app, not mine (it is not nice to introduce yourself as me when you are calling [multiple APIs](#credits) that are implemented in the code) ☝️ ( (+3) if you'd give me credits as my project was an "inspiration" for yours that would be much appreciated) Thank you! 🙏

## a React.Js app with Express backend

![RAWG app](rawg_screenshot.jpg)

An experimental project with the **RAWG** api and **Archive.org's** search api.

## Local run

**Express backend:** `yarn`, `yarn start`

**React.Js frontend:** `cd client`, `yarn` & `yarn start`

## Simplified API docs

- `GET` **/api/trending** - used on the home page
- `GET` **/api/topRatedRecommended** - used e.g. in the header components' bg image
- `GET` **/api/videogame/{id}** - the content of a specific game
- `GET` **/api/videogameAutocomplete?q={query}**; `?q=` (mandatory) - used in the search input component's autocomplete
- `GET` **/api/searchArchive?title={query}&year={query}**; `?title=` (mandatory); `?year=` (mandatory) - searches in Archive.org's collection if an older game has an online playable version on their servers.
- `GET` **/api/searchOldgameshelf?title={query}**; `?title=` (mandatory) - searches in OldGameShelf.com's collection if a NES game has an online playable version on their page.
- `GET` **/api/searchSnesnow?title={query}**; `?title=` (mandatory) - searches in SnesNow.com's collection if a SNES game has an online playable version on their page.
- `GET` **/health?from={origin_url}** - `?from=` (optional) - used for health checks and to wake up idling Node.Js backend on free hosting sites

See in details: [server.js](./server.js).

# License

MIT License

Copyright (c) 2019-present David Barton

# Credits

## Used data

Powered by [RAWG.io](https://rawg.io/apidocs) video game data. Thank you guys!

Powered by [Archive.org](https://archive.org/help/aboutsearch.htm) video game links. This app links some titles to the biggest web archive of the internet. Thanks Archive.org!

Powered by [OldGameShelf.com](https://oldgameshelf.com/) video game links. This app links some titles to OldGameShelf.com which is a brilliant website to play all the retro games of the Nintendo NES system. Thanks OldGameShelf.com!

Powered by [SnesNow.com](https://snesnow.com/) video game links. This app links some titles to SnesNow.com which is a brilliant website to play all the retro games of the SNES system. Thanks SnesNow.com!

## Used font

'Arcade Classic' is under copyright (c) Jakob Fischer at www.pizzadude.dk, all rights reserved.
