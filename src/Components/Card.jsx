import { useState, useEffect } from 'react'

const Card = ({name, url}) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
              const response = await fetch(url)
              const data = await response.json()
              setPokemon(data)
              setLoading(false)
            } catch (error) {
                console.error('Error fetching Pokemon:', error)
                setLoading(false)
            }
        }

    fetchPokemon()
    } , [name, url]);

    if (loading) return <div>Loading...</div>
    if (!pokemon) return <div>Undefined</div>

    const openInfo = () => {
      
    }

    return (
    <div onClick={openInfo} className='pokemon-cards w-1/7 p-1 flex flex-col justify-center items-center  bg-amber-50 h-1/4 rounded-2xl gap-1'>
      <img className='pokemon-img h-full rounded-2xl' src={pokemon.sprites.front_default}/>
      <div className="pokemon-name text-2xl">{name}</div>
    </div>
  )
}

export default Card;