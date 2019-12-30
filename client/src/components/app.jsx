import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import VideogameDetailsWrapper from './videogameDetailsWrapper'
import Page404 from './404'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={HomepageWrapper} />
          <Route path='/videogame/:id' component={VideogameDetailsWrapper} />
          <Route component={Page404} />
        </Switch>
      </div>
    )
  }
}

export default App
