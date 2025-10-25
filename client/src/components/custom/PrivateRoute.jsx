import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContext';

//const isAuthenticated = () => !!localStorage.getItem('token');

const PrivateRoute = () => {
  const navigate = useNavigate()
  const { token, authError, authLoading, isAuthenticated } = useAuthContext()


  
  if(!token){
    console.log("No token")
    return <Navigate to="/login" />
  }

  if (authLoading) {
    //console.log("Auth Loading")
    return (<div className='w-screen h-screen flex justify-center items-center'>
      <Loader2 className='animate-spin' />
    </div>)
  }


  if (authError == "Invalid Token") {
    //console.log("Auth Error");
    toast("Session Expired, Please Login Again");
    navigate("/login");
  }


  if(isAuthenticated){
    return <Outlet/>
  }

  // else {
  //   console.log("Error in navigating")
  //   return user ? <Outlet /> : <Navigate to="/login" />;
  // }


};

export default PrivateRoute;
