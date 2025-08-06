const SearchBar = ({onSearch}) => {
    return(
        <input type="text" 
                placeholder="Enter a pokemon name ..." 
                onChange={(e) => onSearch(e.target.value)}
                style={{backgoundColor:'#1b263b',width:'25%' , padding:'2ch',border:'2px solid gold',borderRadius:'20px' , color:'white' }}
        />
    )
}

export default SearchBar;
