//react imports
import React, { useState, useEffect, useRef } from "react";
import { BsCheck, BsInfoCircle } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

//API imports
import axios from "axios";

const USER_REGEX = /^[\w]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/auth/register";

const RegisterForm = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //security against hacks if wanted
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Registration was a success</h1>
          <p>
            <Link
              to={`/signIn`}
              className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
            ></Link>
          </p>
        </section>
      ) : (
        <section class="py-24">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className=" container mx-auto lg:px-0 bg-accent shadow-xl rounded">
            <div className="mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form className="w-full max-w-sm mx-auto bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username:
                <FontAwesomeIcon
                  icon={BsCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={FaTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>
              <input
              className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                placeholder="Your Name"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={BsInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password:
                <FontAwesomeIcon
                  icon={BsCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={FaTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
              className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                placeholder="Password"
              />
              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={BsInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>

              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_pwd">
                Confirm Password:
                <FontAwesomeIcon
                  icon={BsCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={FaTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
              className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                placeholder="******"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={BsInfoCircle} />
                Must match the first password input field.
              </p>

              <button
                disabled={!validName || !validPwd || !validMatch ? true : false}
              >
                Sign Up
              </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-300">
              Already registered?
              <br />
              <span className="line">
                {/*put router link here*/}
                <Link
                  to={`/signIn`}
                  className="font-semibold leading-6 text-white hover:text-slate-300"
                >Sign In here</Link>
              </span>
            </p>            
          </div>
          </div>
        
        </section>
      )}
    </>
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

{
  /* <section class="py-24">
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
              /> */
}
