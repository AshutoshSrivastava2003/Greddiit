import React, { useState } from 'react';

export const SearchBar=({ data, setSearchResults }) =>{
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    const results = data.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <form onSubmit={handleSearch}>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
}

