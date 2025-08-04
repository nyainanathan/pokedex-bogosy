import './App.css'
import CardsContainer from './Components/CardsContainer'
import PokemonDetails from './Components/PokemonDetails'

import { Routes, Route } from 'react-router-dom'

function App() {
  return(
  
      <Routes>
        <Route path="/" element={<CardsContainer />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
  
  )
}

export default App