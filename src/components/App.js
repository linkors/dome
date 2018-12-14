import React from 'react'
import { Route } from 'react-router-dom'
import Home from './Home'
import Search from '../containers/Search'
import SearchDetail from '../containers/SearchDetail'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/search/:query" component={Search} />
      <Route exact path="/detail/:id" component={SearchDetail} />
    </main>
  </div>
)

export default App
