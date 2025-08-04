import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"

const CardsContainer = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [researchedPokemon , setResearchedPokemon] = useState([]);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try{
                const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
                const parsedData = await data.json();
                //console.log(parsedData.results); just for debugging purpose ^^
                setPokemonList(parsedData.results)
            } catch (err) {
                console.error(err);                
            }
        }
        fetchAllPokemons()
    } , [])

    useEffect(() => {
        const newPokemons = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchParams.toLowerCase()));
        setResearchedPokemon(newPokemons)
    } , [searchParams, pokemonList])

    return (
        <div className="bg-amber-200 h-screen w-screen flex flex-col items-center p-11" >
            <SearchBar onSearch={setSearchParams}/>
            {researchedPokemon.map((pokemon, index) => (
                <li key={index}>{pokemon.name} : {pokemon.url}</li>
))}
        </div>
    )
}

export default CardsContainer