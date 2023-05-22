import { useState, useEffect } from "react";
import { headers } from "../api/headers";

/**
 * Function to call a api to receive data
 *
 *
 * @Info The base structure of this call is made by the creator mentioned down below. Adjustments have been done to the original code.
 *
 * @Creator Martin Kruger
 */

export default function useApi(endpoint, method, body) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const url = "https://api.noroff.dev/api/v1/holidaze";

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        // const accessToken = localStorage.getItem("accessToken");
        // const fetchOptions = {
        //   headers: {
        //     "Content-type": "application/json",
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // };

        const response = await fetch(url + endpoint, {
          method: method,
          headers: headers("application/json"),
          body: JSON.stringify(body),
        });

        const json = await response.json();
        setData(json);
        setResponse(response);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    }

    getData();
  }, [url, endpoint, body, method]);

  return { data, response, isLoading, isError };
}

// const useApi = (endpoint, method, body) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const url = "https://api.noroff.dev/api/v1/holidaze";

//   useEffect(() => {
//     async function getData() {
//       try {
//         setIsLoading(true);
//         setIsError(false);
//         const fetchedData = await fetch(url + endpoint, {
//           method: method,
//           headers: headers("application/json"),
//           body: JSON.stringify(body),
//         });
//         const json = await fetchedData.json();
//         setData(json);
//       } catch (error) {
//         console.log(error);
//         setIsError(true);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     getData();
//   }, [url, endpoint, method, body]);
//   return { data, isLoading, isError };
// };

// export default useApi;
