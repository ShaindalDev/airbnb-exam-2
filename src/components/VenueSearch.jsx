// React import
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
// Axios Import
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function VenueSearch() {
    const [data, setData] = useState([]);

    const [userInput, setUserInput] = useState("");
  
    const [suggestions, setSuggestions] = useState([]);
  
    const { pathname } = useLocation();
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get('venues');
          const json = await response.json();
  
          setData(json);
        } catch (error) {
          console.log(error);
        }
      }
  
      fetchData();
      
      setSuggestions([]);
      setUserInput("");
    }, [pathname]);
  
    function handleChange(event) {
      const query = event.target.value.toLowerCase();
      setUserInput(query);
  
      
      if (query.length > 2) {
        const filteredSuggestions = data.filter((product) =>
          product.title.toLowerCase().includes(query)
        );
        setSuggestions(filteredSuggestions);
      }
  
      if (query.length === 0) {
        setSuggestions([]);
      }
    }
  
    return (
      <div className="flex flex-col justify-center relative">
        <div className="input-wrapper">
          <label htmlFor="search-bar"></label>
          <span className="material-symbols-rounded">search</span>
          <input
            type="text"
            placeholder="Search"
            name="search"
            value={userInput}
            onChange={handleChange}
            
          />
        </div>
        <ul className="absolute">
          {suggestions.map((item) => {
            return (
              <li key={item.id} id={item.id}>
                <Link to={`/Product/${item.id}`}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

