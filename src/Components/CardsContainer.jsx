import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import Card from "./Card";


const CardsContainer = () => {

    const [pokemonList, setPokemonList] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [researchedPokemon , setResearchedPokemon] = useState([]);
    const [isInfoShown, setIsInfoShown] = useState(false);

    useEffect(() => {
        const fetchAllPokemons = async () => {
            try{
                const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
                const parsedData = await data.json();
                setPokemonList(parsedData.results)
            } catch (err) {
                console.error(err);                
            }
        }
        fetchAllPokemons()
    } , [])

    useEffect(() => {
        const newPokemons = pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchParams.toLowerCase()));
        setResearchedPokemon(newPokemons.slice(0,150))
    } , [searchParams, pokemonList])

    
    return (
        <div className="h-fit w-screen flex flex-col items-center p-11" >
            <SearchBar onSearch={setSearchParams}/>
            <div className="flex flex-wrap w-3/4 gap-5 p-10 justify-around">
                {researchedPokemon.map((pokemon, index) => (
                    <Card name={pokemon.name} url={pokemon.url} key={index} />
                ))}
            </div>
        </div>
    )
}

export default CardsContainer