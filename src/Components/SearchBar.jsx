const SearchBar = ({onSearch}) => {
    return(
        <input type="text" 
                placeholder="Enter a pokemon name ..." 
                onChange={ (e) => onSearch(e.target.value)}
                className="w-1/3 border-2 rounded-2xl p-2 text-center"
        />
    )
}

export default SearchBar;