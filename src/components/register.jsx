//react imports
import React, { useRef, useState, useEffect, useRef } from "react";
import { BsCheck, BsInfoCircle } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

//API imports
import axios from "axios";

const USER_REGX = /^[\w]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/auth/register';


const RegisterForm = () => {
    const useRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //security against hacks if wanted
        const v1 = USER_REGX.test(user);
        
    }
  return (
    <section class="py-24">

    </section>

  );
};

export default RegisterForm;

// Body needs to be like
// {
//     "name": "C8myetCRx07GDHBMJlDP",
//     "email": "user@example.com",
//     "avatar": "string",
//     "venueManager": false,
//     "password": "stringst"
//   }


{/* <section class="py-24">
      <div className="container mx-auto lg:px-0 bg-accent shadow-xl rounded">
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
          <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
              /> */}