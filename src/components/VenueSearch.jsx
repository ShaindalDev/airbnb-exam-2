import React, { useState } from 'react';

function SearchResults({ results }) {
  return (
    <div className="results">
      {results.map((result) => (
        <div key={result.id} className="result">
          {result.name}
        </div>
      ))}
    </div>
  );
}

export function VenueSearch({ venues }) {
  const [results, setResults] = useState(venues || []);

  const inputHandler = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredVenues = venues.filter((venue) =>
      venue.name.toLowerCase().includes(searchTerm)
    );
    setResults(filteredVenues);
  };

  return (
    <div className="search">
      <input type="search" onInput={inputHandler} />
      <SearchResults results={results} />
    </div>
  );
}