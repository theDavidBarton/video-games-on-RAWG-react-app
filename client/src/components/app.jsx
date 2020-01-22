import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import HomepageWrapper from './homepageWrapper'
import VideogameWrapper from './videogameWrapper'
import Page404 from './404'
import CookieBar from './cookieBar'
import Header from './header'
import Footer from './footer'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <CookieBar />
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomepageWrapper} />
            <Route path='/videogame/:id' component={VideogameWrapper} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
}

export default App
