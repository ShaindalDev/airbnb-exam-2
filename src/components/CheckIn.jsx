import React, {useEffect, useState} from 'react';
import { getDatesBetween } from "../js/getDatesBetween"
import useVenues from '../hooks/useVenues';
//datepicker
import DatePicker from 'react-datepicker';
//datepicker css
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker.css';
//icons
import { BsCalendar } from 'react-icons/bs';
import { useQuery } from '@tanstack/react-query';

const CheckIn = ({ data }) => {
  const [blockedValue, setBlockedValue] = useState([]);
  const [inputValue, setInputValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // useEffect(() => {
  //   const allBlockedDates = data.flatMap((e) => getDatesBetween(new Date(e.dateFrom), new Date(e.dateTo)));
  //   setBlockedValue(allBlockedDates);
  // }, [data]);

  return (
    <div className='relative flex items-center justify-end h-full'>
      {/* icon */}
    <div className='absolute z-10 pr-8'>
      <div>
        <BsCalendar className='text-accent text-base' />
      </div>
    </div>
    <DatePicker className='w-full h-full' 
    name='dateFrom'
    id=''
    placeholderText='Check In'
    moveRangeOnFirstSelection={false}
    ranges={inputValue}
    disabledDates={blockedValue}
    editableDateInputs={true}
    />
  </div>
  );
  
};

export default CheckIn;
