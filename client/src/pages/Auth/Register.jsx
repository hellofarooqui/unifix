import { useState } from "react";
import { Button } from "../../components/ui/button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import {toast} from 'sonner'


const defaultUser = {
  name:"",
  email: "",
  password: "",
};

const Register = () => {
  const [user, setUser] = useState(defaultUser);
  const { registerUser } = useAuth();
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await registerUser(user);
      if (response) {
        // toast("Registration is completed", {
        //   description: "You can now login.",
        //   action: {
        //     label: "Login",
        //     onClick: () => navigate("/login"),
        //   },
        // });
        window.alert("Registration completed")
      }
    } catch (error) {
        // toast("Registration failed", {
        //     description: error.message,
        //     action: "Retry",
        //     onClick : () => window.location.reload(true)
        // })
        window.alert("There is some error")
    }
  };
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-gray-100">
      <div className=" border-2 border-gray-200 shadow-md rounded-[18px] overflow-hidden bg-white flex  ">
        <div className="bg-gray-800 w-[400px] h-[500px] flex justify-center items-center">
          <h1 className="text-4xl font-bold text-center text-white">
            IT TOOLS
          </h1>
        </div>
        <div className="p-8 px-12 w-[400px] h-[400px]">
          <h2 className="text-2xl font-semibold mt-8 text-gray-800">Signup</h2>
          <form
            onSubmit={handleRegistrationSubmit}
            className="flex flex-col gap-y-2 mt-4"
          >
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email">Full Name</label>
              <input
                onChange={handleInputChange}
                name="name"
                className="p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                type="text"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                name="email"
                className="p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                type="text"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleInputChange}
                name="password"
                className="p-2 border-2 border-gray-300 hover:bg-gray-100 rounded-md"
                type="password"
                id="password"
              />
            </div>
            <p className="mt-4 text-sm text-gray-600 hover:text-gray-700">
              Already have an account?{" "}
              <a
                href="/login"
                className="rounded-full bg-gray-100 hover:bg-gray-200 px-2"
              >
                Login here
              </a>
            </p>
            <Button type="submit" className="mt-4">
              Signup
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
