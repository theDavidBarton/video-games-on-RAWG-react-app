import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import VideogameWrapper from './videogameWrapper'
import Page404 from './404'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomepageWrapper} />
            <Route path='/videogame/:id' component={VideogameWrapper} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
