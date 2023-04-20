//react imports
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//yup form validation import
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

//components import
 import AuthContext from "../context/authContext";

//API imports
import axios from "../api/axios";

const REGISTER_URL = "/auth/register";

const RegisterForm = () => {
    const [submit, setSubmit] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username is required')
        .min(4, 'Username must be at least 4 characters'),
        email: yup.string().required('Email is required').email('Invalid email address'),
        password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const navigate = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  // Form submit handler
  async function onSubmit(data) {
    setSubmit(true);
    setLoginError(null);
    console.log(data);
    
    try {
        const response = await axios.post(REGISTER_URL, {
            name: data.username,
            email: data.email,
            password: data.password,
        },
             {
            headers: { 'Content-Type' : 'application/json'}
        });
        console.log("response", response.data);
        setAuth(response.data);
        navigate("/");
    } catch (error) {
        console.log("error", error);
        setLoginError(error.toString());
    } finally {
        setSubmit(false);
    }
  }
  return (
    <>
      <section className="py-24">
        <div className=" container mx-auto lg:px-0 bg-accent shadow-xl rounded">
          <div className="mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-sm mx-auto bg-white p-8 rounded shadow-md"
            >
                {loginError && (
                    <div className="bg-white py-4 px-8 text-red-500 mb-2 border-2 border-solid">Error: Values not valid</div>
                )}
                
              <div className="mb-4">
                <div className="input-wrapper flex flex-col">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 placeholder-slate-400 bg-slate-100 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text"
                    {...register("username")}
                    id="username"
                    placeholder="Your Name"
                  />
                  {errors && errors.username && (
                    <p className="text-xs italic text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className="input-wrapper flex flex-col">
                  <label
                    className="block text-gray-700 text-sm font-bold my-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
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
                    <div className="input-wrapper flex flex-col">
                      <label
                  className="block text-gray-700 text-sm font-bold my-2"
                  htmlFor="password"
                >
                  Password
                </label>
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
                <button className="focus-shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none">{submit ? "Registrating..." : "Register"}</button>
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
                >
                  Sign In here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </section>
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
