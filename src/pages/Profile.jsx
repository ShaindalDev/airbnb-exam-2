//react imports
import React, { useEffect } from "react";
//icons 
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
          <ProfileCard />
      </section>
      {/* <MyVenues /> */}
      <Rooms />
      
        <CreateNewVenue />
      
      
    </>
  );
};

export default Profile;
