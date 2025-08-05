import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ name, url }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (!pokemon) return <div>Undefined</div>;

  return (
    <div
      onClick={() => navigate(`/pokemon/${name}`)}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 flex flex-col items-center transform hover:scale-105 transition duration-300 w-40"
    >
      <img
        className="w-20 h-20 object-contain mb-2"
        src={pokemon.sprites.front_default}
        alt={name}
      />
      <div className="text-lg font-semibold capitalize">{name}</div>
    </div>
  );
};

export default Card;