import React from 'react'
import './App.css'
import NavBar from './components/nav.component'
import Grid from './components/grid.component'
import { Route } from 'react-router-dom'
import PokemonStats from './components/pokemonStats.component'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path='/' component={Grid} />
      <Route path='/:pokemonid' component={PokemonStats} />
    </div>
  )
}

export default App
