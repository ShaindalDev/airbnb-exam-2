import { useState, useEffect, useRef } from 'react';
import { BsSearch } from "react-icons/bs"
import { Link } from 'react-router-dom';

export const SearchBar = ({ data }) => {
  const [query, setQuery] = useState('');
  const [hasInput, setHasInput] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const searchResultsRef = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    const newData = value
      ? data.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredData(newData);
    setHasInput(value !== '');
  };

  const handleDocumentClick = (event) => {
    const isLink = event.target.tagName.toLowerCase() === 'a';
    const isOutsideResults =
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target);

    if (isLink || isOutsideResults) {
      setQuery('');
      setFilteredData([]);
      setHasInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

return (
    <>
    <label htmlFor='search'></label>
      <input
        type="text"
        placeholder="Search for a venue..."
        value={query}
        name='search'
        onChange={handleInputChange}
        className="w-full md:w-60 h-8 p-1 rounded-md outline outline-1"
      />
      <div
        className={`absolute pt-1 w-4/12 ${hasInput ? 'bg-topaz/90' : ''}`}
        ref={searchResultsRef}
      >
        <ul className="w-100 rounded-md px-3 py-2 mt-15  bg-white flex flex-col overflow-y-hidden  divide-y divide-gray-300">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="block odd:bg-topaz/90 even:bg-fawn/20 hover:bg-accent/40 px-1 py-3 w-full rounded-md"
            >
              <Link to={`/Room/${item.id}`} className="">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="">
          {query.length > 0 && filteredData.length === 0 && (
            <p className="text-red-800">No results found.</p>
          )}
        </div>
      </div>
    </>
  );


}





//testing out search functionality with tanstack query
// import { useState } from "react";
// import { BsSearch } from "react-icons/bs"
// import axios from "../../../api/axios";
// import { useQuery } from "@tanstack/react-query";
// import useDebounce from "../../../hooks/useDebounce";

// function SearchResults({isLoading, data}) 
// {
//     return (
//         <div className="w-100 rounded-md px-3 bg-white flex flex-col overflow-y-hidden mt-2 divide-y divide-gray-300">
//             {isLoading && <div className="text-white">Loading...</div>}
//             {data && data.map((item) => (
//                 <div key={item.name} className="text-black py-2">
//                     {item.name}
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default function SearchBar() {
//     const [search, setSearch] = useState('');

//     const debouncedSearchTerm = useDebounce(search, 200)
//     const {data, isLoading, error} = useQuery({
//         queryKey: ['sort', debouncedSearchTerm],
//         queryFn:
//          () => {
//             console.log('fetching')
//             if (debouncedSearchTerm) {
//                 return fetch(`https://api.noroff.dev/api/v1/holidaze/venues?sort=${debouncedSearchTerm}`).then(res => res.json())
//              }
//              return {venues: []}
//         }
//     })