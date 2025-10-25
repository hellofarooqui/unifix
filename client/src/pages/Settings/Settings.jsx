import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import useDevices from "../../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import ListDeviceTypes from "../../components/custom/ListDeviceTypes";
import ListVendors from "../../components/custom/ListVendors";
import { useHeader } from "../../context/HeaderContext";
import ListProjects from "../../components/custom/ListProjects";

const Settings = () => {
  const navigate = useNavigate()

  const {header,setHeader} = useHeader()

  useEffect(()=>{
    setHeader({...header, title:"Settings"})
  },[])

  return (
    <div className="">
      <div className="bg-white m-4 rounded-[15px] shadow-md border overflow-hidden">
        <div className="flex justify-between items-center mb-4 bg-slate-700 p-2 px-4">
          <h2 className="text-xl font-bold text-white">Projects</h2>
          <Button
            className="bg-slate-100 text-slate-700"
            onClick={() => navigate("projects/new")}
          >
            Add New
          </Button>
        </div>
        <ListProjects />
      </div>

      <div className="bg-white m-4 rounded-[15px] shadow-md border overflow-hidden">
        <div className="flex justify-between items-center mb-4 bg-slate-700 p-2 px-4">
          <h2 className="text-xl font-bold text-white">Device Types</h2>
          <Button
            className="bg-slate-100 text-slate-700"
            onClick={() => navigate("device-type/new")}
          >
            Add New
          </Button>
        </div>
        <ListDeviceTypes />
      </div>

      <div className="bg-white m-4 mt-8 rounded-[15px] shadow-md border overflow-hidden">
        <div className="flex justify-between items-center mb-4 bg-slate-700 p-2 px-4">
          <h2 className="text-xl font-bold text-white">Vendors</h2>
          <Button
            className="bg-slate-100 text-slate-700"
            onClick={() => navigate("vendors/new")}
          >
            Add New
          </Button>
        </div>
        <ListVendors />
      </div>
    </div>
  );
};

export default Settings;
