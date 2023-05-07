import React from "react";
import { Axios } from "axios";
import { useQuery, QueryCache } from "@tanstack/react-query";
import axios from "../api/axios";

export default function useVenues() {
  return useQuery({
    queryKey: ["venues"],
    queryFn: async () => {
      const { data } = await axios.get("/venues");
      return data;
    },
    keepPreviousData: true,
  });
}
