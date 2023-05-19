import React, { Fragment, useContext, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

// Icons
import {
  ChevronDownIcon,
  PencilSquareIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
// Axios

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
//Hente all profil data i axios request i denne filen her.
const ProfileCard = ({ name, avatar, venueManager }) => {
  const localUserData = localStorage.getItem("UserProfile");
  const userData = JSON.parse(localUserData);

  const [displayForm, setShowForm] = useState(false);

  const showForm = () => {
    setShowForm(!displayForm);
  };

 

  useEffect(() => {});
  if (!name) {
    console.error(name);
    return <h1>There is no data available</h1>;
  }


  return (
    <>
      <section className='flex flex-col justify-center antialiased text-gray-600 p-4'>
        <div className='h-full'>
          <div className='max-w-lg mx-auto bg-white shadow-lg rounded-sm border border-gray-200'>
            <div className='flex flex-col h-full'>
              <div className='flex-grow p-5'>
                <div className='flex justify-between items-start'>
                  <header>
                    <div className='flex mb-2'>
                      <a
                        className='relative inline-flex items-start mr-5'
                        href='#0'
                      >
                        <div
                          className='absolute top-0 right-0 -mr-2 bg-white rounded-full shadow'
                          aria-hidden='true'
                        ></div>
                        <img
                          className='rounded-full'
                          src='https://images.unsplash.com/photo-1612414161401-6f897f88ec06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBpY29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                          width='64'
                          height='64'
                          alt='User 01'
                        />
                      </a>
                      <div className='mt-1 pr-1'>
                        <a
                          className='inline-flex text-gray-800 hover:text-gray-900'
                          href='#0'
                        >
                          <h2 className='text-xl leading-snug justify-center font-semibold'>
                            {name}
                          </h2>
                        </a>
                        <div className='flex items-center'>
                          <span className='text-sm font-medium text-gray-400 -mt-0.5 mr-1'></span>{" "}
                          <span>{venueManager ? "Manager" : "Customer"}</span>
                        </div>
                      </div>
                    </div>
                  </header>
                  {/* dotted menu*/}
                  <Menu as='div' className='relative inline-block text-left'>
                    <div>
                      <Menu.Button className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>
                        Settings
                        <ChevronDownIcon
                          className='-mr-1 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "group flex items-center px-4 py-2 text-sm"
                                )}
                              >
                                <PencilSquareIcon onClick={showForm}
                                  className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                                {displayForm && (
                                  <form>
                                    <input type="url" placeholder="URL link to profile image"></input>
                                  </form>
                                )}
                                Change Avatar
                              </a>
                            )}
                          </Menu.Item>
                        </div>

                        <div className='py-1'>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "group flex items-center px-4 py-2 text-sm"
                                )}
                              >
                                <ArrowLeftOnRectangleIcon
                                  className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                  aria-hidden='true'
                                />
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                {/* profile Card content*/}
                <div className='mt-2'>
                  <div className='text-sm'>
                    Here you will see an overview of your venues, your bookings
                    and you can change profile picture.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileCard;

//Data that i want to get from the get request is
// name, avatar, accesstoken, venueManger
