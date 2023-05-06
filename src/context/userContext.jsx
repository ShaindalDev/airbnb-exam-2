import React, { createContext, useEffect, useState } from "react";

//Api imports
import axios from "../api/axios";

//Test API with json-server import 
//uncomment the line below and comment out the import above to use testAPI
// import axios from "../api/axiosTest";

//create context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setLoading(true);
    const getUser = async () => {
      try {
        // eslint-disable-next-line no-restricted-globals
        const response = await axios.get(`/profiles/${name}`);
        setUser(response.data);
        console.log(response.data)
      } catch (err) {
        setError(err);
        if (err.response) {
          //not in the 200 response range
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        } else {
          //no response or 404 error
          console.log(`Error: ${err.message}`)
        }
      }
    }
    
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error}}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//Data that i want to get from the get request is 
// name, avatar, accesstoken, venueManger