import React, { use, useEffect, useRef, useState } from "react";
import useDashboard from "../hooks/useDashboard";
import {
  Loader2,
  LogOut,
  RadioReceiver,
  ReceiptText,
  Search,
  ServerCrash,
  Settings,
  Ticket,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../context/HeaderContext";


let defaultDashboard= {
  activeTickets: 0,
  activeRMA: 0,
  deviceCount: 0,
};

const Dashboard = () => {
  const { header, setHeader } = useHeader();

  const navigate = useNavigate();
  
  const [dashboard, setDashboard] = useState(defaultDashboard);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getActiveTickets, getActiveRMA, getDeviceCount } = useDashboard();
  //const {logoutUser} = useAuth()


  useEffect(() => {
    setHeader({ ...header, title: "Dashboard" });
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeTicketsCount = await getActiveTickets();
        if (activeTicketsCount) {
          //console.log("Active Tickets Count:", activeTicketsCount);
          ////console.log("Active Tickets length", tickets.length);
          ////console.log("Is Array", Array.isArray(tickets));

          setDashboard((prev) => ({
            ...prev,
            activeTickets: activeTicketsCount,
          }));
        }
        const rmas = await getActiveRMA();
        if (rmas) {
          ////console.log(rmas);
          setDashboard((prev) => ({ ...prev, activeRMA: rmas.length }));
        }
        const devices = await getDeviceCount();
        if (devices) {
          setDashboard((prev) => ({
            ...prev,
            deviceCount: devices.deviceCount,
          }));
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        ////console.log("Active Tickets Length", dashboard.activeTickets);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value.trim();
    if (searchQuery) {
      navigate(`/search?term=${encodeURIComponent(searchQuery)}`);
      e.target.search.value = ""; // Clear the search input after submission
    } else {
      alert("Please enter a search term");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      
      <div className="p-8 grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4">
        <div onClick={()=>navigate("/support")} className="relative bg-white border-slate-200 border-1 p-6 flex items-center justify-between gap-y-2 rounded-2xl shadow-sm cursor-pointer">
          <div className="flex flex-col">
            <p className="text-slate-600 text-lg font-bold">Active Tickets</p>
            <Ticket className="w-12 h-12 opacity-30" />
          </div>

          <p className="text-emerald-800 text-slate-600 text-5xl font-bold">
            {dashboard.activeTickets}
          </p>
        </div>
        <div onClick={()=>navigate("/rma")} className="relative bg-white border-slate-200 border-1 p-6 flex items-center justify-between gap-y-2 rounded-2xl shadow-sm cursor-pointer">
          <div>
            <p className="text-slate-600 text-lg font-bold">Active RMA</p>
            <ServerCrash className="w-12 h-12 opacity-30" />
          </div>

          <p className="text-emerald-800 text-slate-600 text-5xl font-bold">
            {dashboard.activeRMA}
          </p>
        </div>
        <div onClick={()=>navigate("/devices")} className="relative bg-white border-slate-200 border-1 p-6 flex items-center justify-between gap-y-2 rounded-2xl shadow-sm cursor-pointer">
          <div>
            <p className="text-slate-600 text-lg font-bold">Devices</p>
            <RadioReceiver  className="w-12 h-12 opacity-30" />
          </div>

          <p className="text-emerald-800 text-slate-600 text-5xl font-bold">
            {dashboard.deviceCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
