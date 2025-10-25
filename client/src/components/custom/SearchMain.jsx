import { Search } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const SearchMain = () => {

    const navigate = useNavigate()

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      const searchQuery = e.target.search.value.trim();
      if (searchQuery) {
        navigate(`/search?term=${encodeURIComponent(searchQuery)}`);
        e.target.search.value = ""; // Clear the search input after submission
      } else {
        alert("Please enter a search term");
      }
    };

  return (
    <div className="rounded-md border flex items-center p-2 bg-gray-100 has-[input:focus]:bg-gray-200  group">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          className="placeholder-gray-400 focus:outline-none"
          name="search"
          placeholder="Search device, ticket..."
        />
        <button type="submit">
          <Search className="text-gray-400 group-hover:text-gray-700 h-6 w-6" />
        </button>
      </form>
    </div>
  );
}

export default SearchMain