import React, { useEffect, useState } from "react";

// import DatePicker from 'react-date-picker';

const BookingCalender = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <>
      {/* <DatePicker */}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      />
      {/* <DatePicker */}
      value={endDate}
      onChange={(date) => setEndDate(date)}
      />
    </>
  );
};

export default BookingCalender;
