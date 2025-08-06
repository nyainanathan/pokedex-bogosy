import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const typeColors = {
  grass: 'bg-green-500',
  poison: 'bg-purple-500',
  fire: 'bg-red-500',
  flying: 'bg-blue-300',
  water: 'bg-blue-500',
  normal: 'bg-gray-400',
  bug: 'bg-lime-500',
  electric: 'bg-yellow-400',
  ground: 'bg-yellow-600',
  fairy: 'bg-pink-400',
  psychic: 'bg-pink-600',
  fighting: 'bg-red-700',
  rock: 'bg-yellow-800',
  ghost: 'bg-indigo-600',
  ice: 'bg-cyan-300',
  dragon: 'bg-indigo-800',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
}

const Card = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
  }, [name, url])

  if (loading) return <div>Loading...</div>
  if (!pokemon) return <div>Undefined</div>

  return (
    <div
      onClick={() => navigate(`/pokemon/${name}`)}
      className="cursor-pointer card-container p-5 rounded-xl border-2 border-transparent hover:border-yellow-400 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        
    >
      <img
        className="w-[150px] h-[150px] mx-auto"
        src={pokemon.sprites?.other?.['official-artwork']?.front_default}
        alt={name}
      />

      <div className="text-center font-semibold mt-4 text-md capitalize">
        #{pokemon.id} - {name}
      </div>

      <div className="flex justify-center gap-2 mt-2 flex-wrap">
        {pokemon.types.map((typeInfo) => {
          const type = typeInfo.type.name
          return (
            <span
              key={type}
              className={`text-xs px-3 py-1 rounded-full font-semibold uppercase text-white ${typeColors[type] || 'bg-gray-300'}`}
            >
              {type}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default Card
