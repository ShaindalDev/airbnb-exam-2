/* eslint-disable no-restricted-globals */
//react imports
import React, { useEffect } from "react";
// API functions
import useApi from "../hooks/useApi";
import { profiles } from "../api/constants";
//Componentes
import HeroSlider from "../components/HeroSlider";
import ProfileNavigation from "../components/ProfileNavigation";
import Rooms from "../components/Rooms";
import CreateNewVenue from "../components/Profile/CreateVenue";
import MyVenues from "../components/Profile/MyVenues";
import ProfileCard from "../components/Profile/ProfileCard";

const Profile = () => {
  useEffect(() => {
    document.title = "Holidayze | Profile";
  }, []);
  const getLocalData = localStorage.getItem("userProfile");
  const parsedLocalData = JSON.parse(getLocalData);
  // const userName = parsedLocalData.name;

  const url = profiles + `/${name}?_bookings=true&_venues=true`;
  const method = "get";

  const { data, isLoading, IsError } = useApi(url, method);

  console.log("profile", data)

  const profileData = {
    name: data.name,
    avatar: data.avatar,
    venueManager: data.venueManager,
  };

  if (!profileData) {
    return;
  }
  if (isLoading) return <h1>Loading...</h1>;

  if (IsError) console.log(IsError);

  return (
    <>
      <HeroSlider />
      {/* mini nav */}
      <div className="container mx-auto relative">
        <div className="bg-white mt-4 p-4 lg:shadow-xl lg:absolute  lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12">
          <ProfileNavigation />
        </div>
      </div>
      {/* Profile Content */}
      <section className="mt-14">
        {/* User info */}
          <ProfileCard  />
      </section>
      {/* <MyVenues data={data.venues} /> */}
      <Rooms />
      
        <CreateNewVenue />
      
      
    </>
  );
};

export default Profile;
