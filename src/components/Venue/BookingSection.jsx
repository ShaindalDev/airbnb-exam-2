import React, { useState } from "react";
import CheckIn from "../CheckIn";
import CheckOut from "../CheckOut";
import AdultsDropdown from "../AdultsDropdown";
import KidsDropdown from "../KidsDropdown";
import { FaCheck, FaPray } from "react-icons/fa";

import axios from "../../api/axios";

const BOOKING_URL = "/bookings"

const BookingSection = ({ venueId }) => {
  
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  })

  const [submit, setSubmit] = useState(false);
  const [isError, setIsError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("ApiToken");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }))
  };

          //form submit handler
  async function onSubmit(event)  {
    event.preventDefault();
    setSubmit(true);
    setIsError(false);
    setSuccessMessage("");
    console.log(event);

    const bookingData = {
      ...formData,
      venueId: venueId,
    };

    console.log("Booking data", bookingData);

    try {
      const token = localStorage.getItem("ApiToken");
      const response = await axios.post(
        BOOKING_URL,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingData),
        }
      );
      if (response.ok) {
        setSuccessMessage("Booking was successfull");
        setFormData({
          dateFrom: "",
          dateTo: "",
          guests: 1,
        });
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        setIsError(true);
      }
      console.log("response", response.data);
    } catch (error) {
      console.error("error", error);
      setIsError(error.toString());
    } finally {
      setSubmit(false);
    }
  }

    
  return (
    <>
      <div className="w-full h-full lg:w-[40%]">
        <form onSubmit={onSubmit}>
          <div className="py-8 px-6 bg-accent/20 mb-12">
            <div className="flex flex-col space-y-4 mb-4">
              <h3>Your Reservation</h3>
              <div className="h-[60px]">
                <CheckIn onChange={handleChange} value={formData.dateFrom} />
              </div>
              <div className="h-[60px]">
                <CheckOut onChange={handleChange} value={formData.dateTo} />
              </div>
              <div className="h-[60px]">
                <AdultsDropdown 
                onChange={handleChange} value={Number.isInteger(formData.guests) ? formData.guests : ""} />
              </div>
              <div className="h-[60px]">
                <KidsDropdown 
                onChange={handleChange} value={Number.isInteger(formData.guests) ? formData.guests : ""}/>
              </div>
            </div>
            <button onSubmit={onSubmit} className="btn btn-lg w-full btn-primary">
              book now
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
