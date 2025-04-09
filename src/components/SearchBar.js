import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div id="location">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <input type="submit" value="Search" onClick={handleSearch} />
    </div>
  );
}

export default SearchBar;
