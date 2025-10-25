import React, { useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";


import { Loader2 } from "lucide-react";
import useRMA from "../../hooks/useRMA";
import { Button } from "../../components/ui/button";

const RMAStatusOptions = [
  "Requested",
  "Processing",
  "Replacement Shipped",
  "Replacement Received",
  "Return Shipped",
  "Return Delivered",
  "Rejected",
  "Completed",
];

const RMADetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rma = location.state.rma;
  const params = useParams();
  const rmanumber = params.rmanumber;

  const [rmaDetails, setRmaDetails] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const [newStatus, setNewStatus] = React.useState("");
  const [nextStatus, setNextStatus] = React.useState([]);

  const [statusLoading, setStatusLoading] = React.useState(false);
  const [statusChanged, setStatusChanged] = React.useState(false);
  //const [rmaStatus, setRmaStatus] = React.useState(rma.status);

  const { getRMADetails, deleteRMA, updateRMAStatus } = useRMA();

  useEffect(() => {
    const fetchRMA = async () => {
      try {
        const response = await getRMADetails(rmanumber);
        if (response) {
          setRmaDetails(response);
          setLoading(false);
        } else {
          console.error("Error fetching RMA");
          setError("Error fetching RMA");
        }
      } catch (error) {
        console.error("Error fetching RMA", error);
        setError("Error fetching RMA");
      }
    };
    fetchRMA();
  }, []);

  useEffect(() => {
    if (rmaDetails) {
      console.log("RMA Details", rmaDetails);
      const nextStatusIndex =
        RMAStatusOptions.findIndex((status) => status === rmaDetails.status) +
        1;
      console.log(
        "nextStatusIndex",
        nextStatusIndex,
        "Next Status",
        RMAStatusOptions[nextStatusIndex]
      );

      const nextStatus =
        rmaDetails.status === "Return Delivered"
          ? Array.of(
              RMAStatusOptions[nextStatusIndex],
              RMAStatusOptions[nextStatusIndex + 1]
            )
          : Array.of(RMAStatusOptions[nextStatusIndex]);
      setNextStatus(nextStatus);
    }
  }, [rmaDetails]);

  const handleStatusChange = (e) => {
    e.preventDefault();
    setStatusChanged(true);
    setNewStatus(e.target.value);
    //setRmaStatus(e.target.value);
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    setStatusLoading(true);
    //setLoading(true);

    try {
      const response = updateRMAStatus(rmaDetails.rmaNumber, newStatus);
      if (response) {
        //setLoading(false);
        console.log("New Status", newStatus);
        setError(null);
        setStatusChanged(false);
        //console.log(rmaDetails)
        setRmaDetails({ ...rmaDetails, status: newStatus });
        setNewStatus("");
      } else {
        console.error("Error updating RMA status");
        setError("Error updating RMA status");
      }
    } catch (error) {
      console.error("Error updating RMA status", error);
      setError("Error updating RMA status");
    } finally {
      setStatusLoading(false);
    }
    // Call the updateRMAStatus function from useRMA
    // Pass the rmaNumber and the new status
    // const response = await updateRMAStatus(rma.rmaNumber, rmaStatus);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteRMA(rmaDetails._id);
      if (response) {
        setLoading(false);
        setError(null);

        window.history.back();
      } else {
        console.error("Error deleting RMA");
        setError("Error deleting RMA");
      }
    } catch (error) {
      console.error("Error deleting RMA", error);
      setError("Error deleting RMA");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    setTimeout(() => {
      window.history.back();
    }, 3000);
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Error: {error}</h2>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-2xl">{rmaDetails.rmaNumber}</h2>
        {!statusChanged && (
          <div className="flex gap-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(`edit`)}
              className="px-8"
            >
              Edit
            </Button>
            <Button onClick={handleDelete} className="px-8">
              Delete
            </Button>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="flex flex-col gap-y-4 border border-slate-200 bg-white px-4 py-8 rounded-lg shadow-md w-[720px]">
          <div className="flex w-full gap-x-4 items-center">
            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceName"
            >
              Device Name :
            </label>
            <p className="text-slate-600">{rmaDetails.deviceName}</p>
          </div>
          <div className="flex w-full gap-x-4 items-center">
            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceSerialNumber"
            >
              Device Serial Number :
            </label>
            <p className="text-slate-600">{rma.deviceSerialNumber}</p>
          </div>
          <div className="flex w-full gap-x-4 items-center">
            <label className="font-semibold text-slate-700" htmlFor="status">
              Status :
            </label>
            {/* <p
              className={`text-slate-100 ${
                rma.status === "New"
                  ? "bg-indigo-500"
                  : rma.status === "Pending"
                  ? "bg-yellow-500"
                  : rma.status === "Approved"
                  ? "bg-green-500"
                  : "bg-red-500"
              } px-2 py-1 rounded-md`}
            >
              {rma.status}
            </p> */}
            <form>
              <select
                disabled={
                  rmaDetails.status === "Completed" ||
                  rmaDetails.status === "Rejected"
                }
                value={statusChanged ? newStatus : rmaDetails.status}
                onChange={handleStatusChange}
                className={`flex-1 border border-slate-300 rounded-sm px-2 py-1 ${
                  rmaDetails.status === "Completed" ||
                  rmaDetails.status === "Rejected"
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <option value={rmaDetails.status}>{rmaDetails.status}</option>
                {nextStatus.map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className="flex w-full gap-x-4 items-center">
            <label className="font-semibold text-slate-700" htmlFor="reason">
              Reason :
            </label>
            <p className="text-slate-600">{rmaDetails.reason}</p>
          </div>
        </div>
        {statusChanged && (
          <div className="flex gap-x-4 mt-4">
            <Button
              disabled={statusLoading}
              onClick={() => setStatusChanged(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>
              {" "}
              {statusLoading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RMADetails;
