const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search for a Pokémon..."
      onChange={(e) => onSearch(e.target.value)}
      className="w-full max-w-md border-2 border-gray-300 rounded-full p-3 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default SearchBar;