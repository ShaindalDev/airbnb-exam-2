import React from "react";
import axios from "../api/axios";
import { useQuery, QueryCache } from "@tanstack/react-query";

export default function useVenues() {
  return useQuery("venues", () => axios.get("/venues").then((res) => res.data));
}
