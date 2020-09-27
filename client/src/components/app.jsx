import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
const Videogame = lazy(() => import('./videogame'))
const Page404 = lazy(() => import('./404'))
const CookieBar = lazy(() => import('./cookieBar'))
const Header = lazy(() => import('./header'))
const Footer = lazy(() => import('./footer'))
const Homepage = lazy(() => import('./homepage'))

export default function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div className='bg-dark'></div>}>
        <CookieBar />
      </Suspense>
      <Suspense fallback={<div className='bg-dark'></div>}>
        <Header />
      </Suspense>
      <BrowserRouter>
        <Suspense fallback={<div className='bg-dark'>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route path='/videogame/:id' component={Videogame} />
            <Route component={Page404} />
          </Switch>
        </Suspense>
      </BrowserRouter>
      <Suspense fallback={<div className='bg-dark'></div>}>
        <Footer />
      </Suspense>
    </div>
  )
}
