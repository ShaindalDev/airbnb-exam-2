//react imports
import React, { Fragment, useContext, useEffect, useState } from "react";
// API functions
import useApi from "../hooks/useApi";
import * as yup from "yup";
//Componentes

import ProfileNavigation from "../components/ProfileNavigation";
import MyVenues from "../components/Profile/MyVenues";
import VenueProvider, { VenueContext } from "../context/VenueContext";
import EditMyVenue from "../components/Profile/EditMyVenue";
import HeroSlider from "../components/HeroSlider";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import VenueDescription from "../components/Venue/VenueDescription";
import VenueMainMedia from "../components/Venue/VenueMainMedia";
import VenueFacilities from "../components/Venue/Facilities";
import VenueMediaGallery from "../components/Venue/VenueMediaGallery";
import BookingSection from "../components/Venue/BookingSection";

import { venues } from "../api/constants";
import Alerts from "../components/Alerts";


const EditVenue = () => {
    useEffect(() => {
        document.title = "Holidaze | Edit Venue";
      }, []);
    
      let { id } = useParams();
      const [alert, setAlert] = useState(false);
      const [formValues, setFormValues] = useState();
      const [alertContent, setAlertContent] = useState("");
      

      const navigate = useNavigate();
      const endpoint = venues + `/${id}?_owner=true&_bookings=true`;
      const method = "get";

      const { data, isLoading, isError } = useApi(endpoint, method);

      if (isLoading) return <h1>Loading...</h1>;

      if (isError) console.error(isError);

      // Destructur venue data
      const { name, description, meta } = data;

      if (!meta) {
        return null;
      }

      const formSubmit = (values, submitProps) => {
        console.log("Form data", values);

        const { name, description, media, price, maxGuests, wifi, parking, breakfast, pets, address, city, zip, country, continent, lat, lng }= values;

        if (!media) {
            return null;
        }

        const body = {
            name: name,
            description: description,
            media: [...media],
            price: price,
            maxGuests: maxGuests,
            rating: 0,
            meta: {
             wifi: wifi,
             parking: parking,
             breakfast: breakfast,
             pets: pets,
            },
            location: {
             address: address,
             city: city,
             zip: zip,
             country: country,
             continent: continent,
             lat: lat,
             lng: lng, 
            }
        }

        const Url = `https://api.noroff.dev/api/v1/holidaze/venues/${id}`;
        const token = localStorage.getItem("ApiToken");
        fetch(Url, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "put",
            body: JSON.stringify(body),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("failed to submit form");
            }
            return response.json();
        })
        .then((data) => {
            // Handle successfull API respons
            console.log(data);
            setAlertContent("Venue is updated");
            setAlert(true);
            setTimeout(() => {
                navigate(`/venues/${data.id}`);
            }, 2000);
        })
        .catch((error) => {
            // Error Handling
            console.error(error);
        });

        console.log(body);

        setFormValues(values);
      };
      
      const initalValues = {
        name: data.name,
  description: data.description,
  media: data.media,
  price: data.price,
  maxGuests: data.maxGuests,
  wifi: data.meta.wifi,
  parking: data.meta.parking,
  breakfast: data.meta.breakfast,
  pets: data.meta.pets,
  address: data.location.address,
  city: data.location.city,
  zip: data.location.zip,
  country: data.location.country,
  continent: data.location.continent,
  lat: data.location.lat,
  lng: data.location.lng,
      };

      const checkoutSchema = yup.object().shape({});

    
      return (
        <section>
            {alert ? (
                <Alerts>{alertContent}</Alerts>
            ) : (
<EditMyVenue  onSubmit={formSubmit} initalValues={initalValues || formValues} validationSchema={checkoutSchema}/>
            )
            
            }
          
        </section>
      );
    };
    

export default EditVenue;