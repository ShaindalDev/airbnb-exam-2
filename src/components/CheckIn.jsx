import React, { useState} from 'react';

//datepicker
import DatePicker from 'react-datepicker';
//datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
//icons
import { BsCalendar } from 'react-icons/bs';

const CheckIn = () => {
  const [startDate, setStartDate] = useState(new Date);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
  };
  return (
    <div className='relative flex items-center justify-end h-full'>
      {/* icon */}
    <div className='absolute z-10 pr-8'>
      <div>
        <BsCalendar className='text-accent text-base' />
      </div>
    </div>
    <DatePicker className='w-full h-full' 
    selected={startDate} 
    onChange={onChange}
    // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
    selectsDisabledDaysInRange
     placeholderText='Check in'
    startDate={startDate}
    />
  </div>
  );
  
};

export default CheckIn;
