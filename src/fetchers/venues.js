import axios from "../api/axios";

export const fetchVenues = async () => {
    console.log("Fetching venues");
    const response = await axios.get("https://api.noroff.dev/api/v1/holidaze/venues");
    const venues = response.data;

    console.log("venues: ", venues);
    return venues;

};
