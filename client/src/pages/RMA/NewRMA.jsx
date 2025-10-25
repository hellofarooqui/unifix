import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useRMA from "../../hooks/useRMA";
import { Button } from "../../components/ui/button";
import { useHeader } from "../../context/HeaderContext";

// rmaNumber
// deviceName
// deviceSerialNumber
// status
// reason


const defaultRMA = {
  rmaNumber: "",
  deviceName: "",
  deviceSerialNumber: "",
  status: "New",
  reason: "",
};

const NewRMA = () => {
  const [rma, setRMA] = React.useState(defaultRMA);
  const { createRMA } = useRMA();
  const navigate = useNavigate();
  const {header,setHeader} = useHeader()

  const handleRmaFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createRMA(rma);
      console.log(response);
      if (response) {
        setRMA(defaultRMA);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating RMA:", error);
    }
  };

  useEffect(()=>{
    setHeader({...header,title:"New RMA"})
  },[])

  return (
    <div>
      

<div className="p-8">
      <div className="bg-white px-4 py-8 rounded-lg shadow-md w-[720px]">
        <form onSubmit={handleRmaFormSubmit} className="flex flex-col gap-y-4">
          <div className="flex w-full gap-x-4 items-center">
            <label className="font-semibold text-slate-700" htmlFor="rmaNumber">
              RMA Number
            </label>
            <input
              type="text"
              id="rmaNumber"
              name="rmaNumber"
              placeholder="Enter RMA number"
              required
              value={rma.rmaNumber}
              onChange={(e) => setRMA({ ...rma, rmaNumber: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex w-full gap-x-4 items-center">
            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceName"
            >
              Device Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              placeholder="Enter device name"
              required
              value={rma.deviceName}
              onChange={(e) => setRMA({ ...rma, deviceName: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex w-full gap-x-4 items-center">
            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceSerialNumber"
            >
              Device Serial Number
            </label>
            <input
              type="text"
              id="deviceSerialNumber"
              name="deviceSerialNumber"
              placeholder="Enter device serial number"
              required
              value={rma.deviceSerialNumber}
              onChange={(e) =>
                setRMA({ ...rma, deviceSerialNumber: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </div>
          <div className="flex w-full gap-x-4 items-start">
            <label className="font-semibold text-slate-700" htmlFor="reason">
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              placeholder="Enter reason for RMA"
              required
              value={rma.reason}
              onChange={(e) => setRMA({ ...rma, reason: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none h-32"
            ></textarea>
          </div>
          <Button type="submit" className=" self-end px-8">
            Save
          </Button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default NewRMA;
