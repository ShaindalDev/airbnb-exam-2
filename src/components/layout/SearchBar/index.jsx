import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../../../utils/constants";


export default function SearchBar() {
    const [data, setData] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const { pathname } = useLocation();

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(API_URL);
                const json = await response.json();

                setData(json);
            }catch (error) {
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
            const filteredSuggestions = data.filter((venue) =>
            venue.title.toLowerCase().includes(query)
            );
            setSuggestions(filteredSuggestions);
        }

        if (query.length === 0) {
            setSuggestions([]);
        }
    };
    return (
        <SearchBar>
        <div className="min-h-screen bg-gray-50 py-6 flex flex-col items-center justify-center relative overflow-hidden sm:py:12">
            <input type="search"
            placeholder="Search venues here"
            name="search"
            value={userInput}
            onChange={handleChange} 
            className="py-3 px-4 w-1/2 rounded shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100"/>
        </div>
        <ul>
            {suggestions.map((item) => {
                return (
                    <li key={item.id} id={item.id}>
                        <Link to={`/Venues/${item.id}`}>{item.title}</Link>
                    </li>
                )
            })}
        </ul>
        </SearchBar>
    )
}