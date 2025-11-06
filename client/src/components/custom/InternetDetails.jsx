import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const InternetDetails = ({ connection, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bg-gray-900/50 z-20 top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className=" bg-slate-100 text-sm w-[600px] border-2 border-slate-500 shadow-md rounded-[15px] p-8 flex flex-col gap-y-4 text-gray-600   ">
        {connection.name && (
          <div className="text-xl font-semibold text-slate-100 bg-slate-800 p-2 rounded-md">
            <p>{connection.name || "-NA-"}</p>
          </div>
        )}

        {connection.description && (
          <div className="col-span-3">
            <p className="font-semibold">Description</p>
            <p>{connection.description || "-NA-"}</p>
          </div>
        )}

        <div className="border my-2"></div>
        <div className="flex gap-x-10  items-center ">
          <div className="">
            <p className="font-semibold">IP Address</p>
            <p>{connection.ipAddress || "-NA-"}</p>
          </div>

          <div>
            <p className="font-semibold">Subnet Mask</p>
            <p>{connection.subnetMask || "-NA-"}</p>
          </div>

          <div>
            <p className="font-semibold">Gateway</p>
            <p>{connection.gateway || "-NA-"}</p>
          </div>
        </div>

        <div className="border my-2"></div>

        <div className="flex gap-x-10  items-center mt-2">
          <div>
            <p className="font-semibold">Account Number</p>
            <p>{connection.accountNumber || "-NA-"}</p>
          </div>

          {connection.accountName && (
            <div className="col-span-2">
              <p className="font-semibold">Account Name</p>
              <p>{connection.accountName || "-NA-"}</p>
            </div>
          )}
        </div>

        {connection.bandwidth && (
          <div>
            <p className="font-semibold">Bandwidth</p>
            <p>{connection.bandwidth || "-NA-"} Mbps</p>
          </div>
        )}
        <div className="flex gap-x-10  items-center ">
          <div>
            <p className="font-semibold">Connection Type</p>
            <p>{connection.connectionType || "-NA-"}</p>
          </div>

          {connection.provider && (
            <div className="col-span-3">
              <p className="font-semibold">Provider</p>
              <p>{connection.provider || "-NA-"}</p>
            </div>
          )}
        </div>

        <div className="border my-2"></div>

        <div className="flex gap-x-10  items-center ">
          <div>
            <p className="font-semibold">Username</p>
            <p>{connection.accountUsername || "-NA-"}</p>
          </div>

          <div className="col-span-2">
            <p className="font-semibold">Password</p>
            <p>{connection.accountPassword || "-NA-"}</p>
          </div>
        </div>

        <div className="border my-2"></div>

        <div className="flex gap-x-10  items-center">
          <div>
            <p className="font-semibold">Support Contact</p>
            <p>{connection.supportContact || "-NA-"}</p>
          </div>

          <div>
            <p className="font-semibold">Support Phone</p>
            <p>{connection.supportPhone || "-NA-"}</p>
          </div>
        </div>
        {connection.supportEmail && (
          <div>
            <p className="font-semibold">Support Email</p>
            <p>{connection.supportEmail || "-NA-"}</p>
          </div>
        )}

        <div className="col-span-3 flex justify-center gap-x-4">
          <Button
            variant="outline"
            className=" mt-4 px-8"
            onClick={() => navigate("edit/" + connection._id)}
          >
            Edit
          </Button>
          <Button className=" mt-4 px-8 bg-slate-800" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InternetDetails;
