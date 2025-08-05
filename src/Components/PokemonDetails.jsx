import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PokemonDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Pokemon not found</div>;

  const types = pokemon.types.map((type) => type.type.name);
  const abilities = pokemon.abilities.map((a) => a.ability.name);

  return (
    <div className="flex flex-col items-center p-10 bg-amber-50 min-h-screen">
      <button
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
        <img
          className="w-40 h-40 object-contain mx-auto mb-4"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <div className="space-y-2 text-lg">
          <p><span className="font-semibold">Height:</span> {pokemon.height / 10} m</p>
          <p><span className="font-semibold">Weight:</span> {pokemon.weight / 10} kg</p>
          <p>
            <span className="font-semibold">Types:</span>{' '}
            {types.map((type) => (
              <span
                key={type}
                className={`inline-block mx-1 px-2 py-1 rounded-full text-xs font-bold bg-opacity-20 bg-${type}-500 text-${type}-700`}
              >
                {type}
              </span>
            ))}
          </p>
          <p><span className="font-semibold">Abilities:</span> {abilities.join(', ')}</p>
          <p><span className="font-semibold">Base Experience:</span> {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;