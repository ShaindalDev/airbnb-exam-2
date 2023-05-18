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

export default function useApi(url, method) {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);

        const accessToken = localStorage.getItem("accessToken");
        const fetchOptions = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await fetch(url, fetchOptions);

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
  }, [url, method]);

  return { data, response, isLoading, isError };
}
