import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";

const CardsContainer = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [researchedPokemon, setResearchedPokemon] = useState([]);
    const [displayCount, setDisplayCount] = useState(9);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try {
                const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
                const parsedData = await data.json();
                setPokemonList(parsedData.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllPokemons();
    }, []);

    useEffect(() => {
        const filteredPokemons = pokemonList.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchParams.toLowerCase())
        );
        setResearchedPokemon(filteredPokemons);
        setDisplayCount(9); 
    }, [searchParams, pokemonList]);

    const handleNext = () => {
        setDisplayCount((prev) => prev + 9);
    };

    const pokemonsToDisplay = researchedPokemon.slice(0, displayCount);

    return (
        <div className="min-h-screen w-full flex flex-col items-center p-8 bg-[#0b1c34]">
            <SearchBar onSearch={setSearchParams} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10 w-full max-w-6xl px-4 mx-auto">
                {pokemonsToDisplay.map((pokemon, index) => (
                    <Card name={pokemon.name} url={pokemon.url} key={index} />
                ))}
            </div>

            {displayCount < researchedPokemon.length && (
                <button
                    onClick={handleNext}
                    className="mt-10 px-6 py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-500 transition"
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default CardsContainer;
