import React, { useState, useEffect } from "react";
//logo
import LogoDark from "../assets/img/logo-dark.svg";
import LogoWhite from "../assets/img/logo-white.svg";
import { Link } from "react-router-dom";
const Header = () => {
  const [header, setHeader] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
  });
  return (
    <header
      className={`${
        header ? "bg-white py-6 shadow-lg" : "bg-transparent py-8"
      } fixed z-50 w-full transition-all duration-500`}
    >
      <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
        {/* Logo */}
        <a href="/">
          {header ? (
            <img className="w-[160px]" src={LogoDark} />
          ) : (
            <img className="w-[160px]" src={LogoWhite} />
          )}
        </a>

        <nav className={`${header ? "text-primary" : "text-white"} flex gap-x-4 font-tertiary tracking-[3px] text-[15px] items-center uppercase lg:gap-x-8`}>
          <a href="/" className="hover:text-accent transition">
            Home
          </a>
          <a href="/profile" className="hover:text-accent transition">
            Profile
          </a>
          <a href="/login" className="hover:text-accent transition">
            LOGIN
          </a>
          {/* <Link to={'/contact'} className="hover:text-accent transition"></Link> */}
          <a href="/contact" className="hover:text-accent transition">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
