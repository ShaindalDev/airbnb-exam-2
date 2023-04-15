import React from "react";
import {
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
} from "react-icons/fa";

const Footer = () => {
    return (
        <div className="max-w-[1240px] mx-auto py-16 px-4 grid lg:grid lg:grid-cols-3 gap-8 text-gray-300">
            <div>
                <h1 className="w-full text-3xl font-bold text-[#00df9a]">AirBnB</h1>
                <p className="py-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. A rem nulla ipsam libero illum perspiciatis animi voluptates repellendus?</p>
                <div className="flex justify-between md:w-[75%] my-6">
                    <FaFacebookSquare size={30} />
                    <FaInstagram size={30} />
                    <FaGithubSquare size={30} />
                    
                </div>
            </div>
            <div className="lg:col-span-2 flex justify-between mt-6">
                <div>
                    <h6 className="font-medium text-gray-400">Sol</h6>
                    <ul>
                        <li className="py-2 text-sm">placeholder</li>
                        <li className="py-2 text-sm">placeholder</li>
                        <li className="py-2 text-sm">placeholder</li>
                        <li className="py-2 text-sm">placeholder</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;