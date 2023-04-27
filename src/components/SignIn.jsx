import React, { useState, useEffect, useContext } from "react";
import useAuth from '../hooks/useAuth';
import { set, useForm } from "react-hook-form";

//components import
import AuthContext from "../context/authContext";
//Router imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//yup form validation import
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//API imports
import axios from "../api/axios";
const LOGIN_URL = '/auth/login';

const SignInForm = () => {
    const [submit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const validationSchema = yup.object().shape({
        email: yup.string().required('Email is required to sign in')
        .email('Invalid email address'),
        password: yup.string().required('Password is required to sign in').min(8, 'minimum 8 characters'),
    })

    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext)

    // Form submit handler
    async function onSubmit(data) {
        setSubmit(true);
        setLoginError(null);
        console.log(data);

        try {
            const response = await axios.post(LOGIN_URL, {
                email:data.email,
                password: data.password,
            },
            {
                headers: {
                    Authorization: 'Bearer',
                }
            });
            console.log("response", response.data);
            setAuth(response.data);
            navigate("/profile");
        } catch (error) {
            console.log("error", error);
            setLoginError(error.toString());
        } finally {
            setSubmit(false);
        }

    }

  return (
    <>
    <section className="mb-25 z-50 -top-12">
    <div className="container mx-auto lg:px-0 bg-white shadow-2xl">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-primary-bold leading-9 tracking-[1.5px] text-black">
          
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6">
            {loginError && (
                <div className="bg-red-300 py-4 px-8 text-white mb-2 border-2 border-solid">Error: Check email and/or password</div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
              <input
                    className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                    type="email"
                    {...register('email')}
                    autoComplete="off"
                    id="email"
                    placeholder="Your Email"
                  />
                  {errors && errors.email && <p className="text-xs italic text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-700"
                >
                  Password
                </label>
                <div className="text-sm">
                </div>
              </div>
              <div className="mt-2">
              <input
                  className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                  type="password"
                  {...register('password')}
                  id="password"
                  placeholder="Password"
                />
                {errors && errors.email && (
                <p className="text-xs italic text-red-500">{errors.password.message}</p>)} 
              </div>
            </div>

            <div className="input-wrapper">
                <button className="focus-shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none">{submit ? "Loging in..." : "Login"}</button>
              </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-300">
            Not a member?{" "}
            <Link to={'/register'} className="font-semibold leading-6 text-blue-500 hover:text-blue-800">
               Signup for a new account 
            </Link>
          </p>
        </div>
      </div>
  </div>
  </section>
  </>
  );

};
export default SignInForm;
