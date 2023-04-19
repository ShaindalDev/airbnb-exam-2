
import React, { useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
import SignInForm from "../components/SignIn";
const SignIn = () => {
 useEffect(() => {
  document.title = "Holidayze | Login";
 }, []);
  return (
    <>
      <HeroSlider />

      <SignInForm />
    </>
  );
};

export default SignIn;
