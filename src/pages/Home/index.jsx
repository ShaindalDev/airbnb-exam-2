import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants";
import Plan from "../../components/Plan";


export default function HomePage() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        document.title = "AirBnB | Home";

        async function fetchVenues() {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();

                setVenues(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchVenues();
    }, []);
    return(
        <>
        
        </>
    )
}