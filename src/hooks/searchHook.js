import { getVenue } from "../api/constants";
import { SearchBar } from "../components/layout/SearchBar/SearchBar";
import useApi from "./useApi";

export const VenueSearch = () => {
  const { data, isLoading, isError } = useApi(getVenue);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {isError}</div>;
  }

  return <SearchBar data={data} />;
};
