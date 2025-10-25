import { useState } from "react";
import { Button } from "../../components/ui/button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from './../../context/AuthContext'

import toast, { Toaster } from 'react-hot-toast';


const defaultUser = {
  email: "",
  password: "",
};


const Login = () => {
      const [user, setUser] = useState(defaultUser);
      const {signIn} = useAuth()
  const { loginUser } = useAuthContext();
  const navigate = useNavigate()

  
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await signIn(user);
      if (response) {
        // toast("Registration is completed", {
        //   description: "You can now login.",
        //   action: {
        //     label: "Login",
        //     onClick: () => navigate("/login"),
        //   },
        // });
        //window.alert("Login Successful")
        console.log(response.data.token)
        loginUser(response.data.token)
        toast("Login Successful",{
          style:{
            color: "green",
          }
        })
        setUser(defaultUser)
        navigate("/")
      }
    } catch (error) {
        // toast("Registration failed", {
        //     description: error.message,
        //     action: "Retry",
        //     onClick : () => window.location.reload(true)
        // })
        toast("There is some error")
    }
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className=" border-2 border-gray-200 shadow-md rounded-[18px] overflow-hidden bg-white flex  ">
        <div className="bg-gray-800 w-[400px] h-[400px] flex justify-center items-center">
            <h1 className="text-4xl font-bold text-center text-white">IT TOOLS</h1>
        </div>
        <div className="p-8 px-12 w-[400px] h-[400px]">
        <h2 className="text-2xl font-semibold mt-8 text-gray-800">Login</h2>
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-y-2 mt-4">
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Email</label>
            <input onChange={handleInputChange} className="p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md" type="text" name="email" />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="password">Password</label>
            <input onChange={handleInputChange} className="p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md" type="password" name="password"  />
          </div>
          <p className="mt-4 text-sm text-gray-600 hover:text-gray-700" >
            Don't have an account? <a href="/register" className="rounded-full bg-gray-100 hover:bg-gray-200 px-2">Regsiter here</a>
          </p>
          <Button className="mt-4">Login</Button>
        </form>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
