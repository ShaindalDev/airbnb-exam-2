import React, { useState } from "react";
import CheckIn from "../CheckIn";
import CheckOut from "../CheckOut";
import AdultsDropdown from "../AdultsDropdown";
import KidsDropdown from "../KidsDropdown";
import { FaCheck, FaPray } from "react-icons/fa";

const BookingSection = ({ price }) => {
  const token = localStorage.getItem("ApiToken");

  var authHeaders = new Headers();
  authHeaders.append("Content-type", "application/json");

  authHeaders.append("Authorization", "Bearer " + token);

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

    }
  return (
    <>
      <div className="w-full h-full lg:w-[40%]">
        <form onSubmit={handleSubmit}>
          <div className="py-8 px-6 bg-accent/20 mb-12">
            <div className="flex flex-col space-y-4 mb-4">
              <h3>Your Reservation</h3>
              <div className="h-[60px]">
                <CheckIn />
              </div>
              <div className="h-[60px]">
                <CheckOut />
              </div>
              <div className="h-[60px]">
                <AdultsDropdown />
              </div>
              <div className="h-[60px]">
                <KidsDropdown />
              </div>
            </div>
            <button onSubmit={handleSubmit} className="btn btn-lg w-full btn-primary">
              book now for ${price}
            </button>
          </div>
        </form>
        {/* rules '*/}
        <div>
          <h3 className="h3">Venue Rules</h3>
          <ul className="flex flex-col gap-y-4">
            <li className="flex items-center gap-x-4">
              <FaCheck className="text-accent" />
              Check-in: 3.00 PM - 9-00 PM
            </li>
            <li className="flex items-center gap-x-4">
              <FaCheck className="text-accent" />
              Check-out: 11.00 AM
            </li>
            <li className="flex items-center gap-x-4">
              <FaCheck className="text-accent" />
              No Smoking
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BookingSection;
