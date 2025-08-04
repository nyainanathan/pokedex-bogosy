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

  return (
    <div className="flex flex-col items-center p-10 bg-amber-50 min-h-screen">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
      <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>
      <img
        className="w-48 h-48 rounded-2xl mb-4"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <div className="text-lg">
        <p><strong>Height:</strong> {pokemon.height / 10} m</p>
        <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
        <p><strong>Types:</strong> {pokemon.types.map((type) => type.type.name).join(', ')}</p>
        <p><strong>Abilities:</strong> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
        <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
      </div>
    </div>
  );
};

export default PokemonDetails;