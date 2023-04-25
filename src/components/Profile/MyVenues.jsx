import React, {useContext} from 'react';
//context
import { UserVenueContext } from '../../context/UserVenueContext';
//components
import Venue from '../Room';
//Loader
import {SpinnerDotted} from 'spinners-react';


const Venues = () => {

 const { venues, loading } = useContext(UserVenueContext);

//  console.log(venues);
  return <section id="myVenues" className='py-24'>
    {/* overlay */}
    {loading && (
      <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
        <SpinnerDotted color='white' />
      </div>
    )}
    <div className='container mx-auto lg:px-0'>
      <div className='text-center'>
        <div className='font-tertiarty uppercase text-[15px] tracking-[6px]'>Your venues</div>
        <h2 className='font-primary text-[45px] mb-4'>Apartments & Cabins</h2>
      </div>
    {/* grid */}
    <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
      {venues.map(venue => {
        return <Venue venue={venue} key={venue.id} />;
        })}
    </div>
    </div>
  </section>;
};

export default Venues;