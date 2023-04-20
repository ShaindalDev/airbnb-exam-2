import axios from "axios";

export default axios.create({
    baseURL: 'https://api.noroff.dev/api/v1/holidaze'
});