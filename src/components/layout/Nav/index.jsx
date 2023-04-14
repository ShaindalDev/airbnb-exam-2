import React from "react";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
            <h1 className="w-full text-3xl font-bold text-[#418383]">AirBnB</h1>
            <ul className="flex">
                <li className="p-4">Home</li>
                <li className="p-4">Venues</li>
                <li className="p-4">Register</li>
                <li className="p-4">Login</li>
                <li className="p-4">About</li>
            </ul>
        </div>
    )
}

export default Navbar