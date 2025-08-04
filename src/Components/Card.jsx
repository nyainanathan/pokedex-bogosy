import { useState, useEffect } from 'react'

const Card = props => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + props.id)
                const data = await response.json()
                setPokemon(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching Pokemon:', error)
                setLoading(false)
            }
        }

    fetchPokemon()
    }, [props.id]);

    if (loading) return <div>Loading...</div>
    if (!pokemon) return <div>Undefined</div>

    const nbr_id = `N° ${props.id}`

    return (
    <div className="pokemon-card">
      <img 
        className="pokemon-image"
        src={pokemon.sprites.front_default}
    />
      <div className="info">{nbr_id}</div>
      <div className="info-name">{pokemon.name}</div>
      
      <div className="pokemon-types">
        {pokemon.types.map((typeInfo) => (
          <span>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Card;