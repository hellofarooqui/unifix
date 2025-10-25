import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useDevices from "../../hooks/useDevices";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "../../components/ui/table";
import { useHeader } from "../../context/HeaderContext";


const DeviceDetails = () => {
  const { header, setHeader } = useHeader();
  const params = useParams();
  const deviceId = params.deviceId;

  const [device, setDevice] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { getDeviceDetails, deleteDevice } = useDevices();

  useEffect(() => {
    setHeader({ ...header, title: "Device Details" });
  }, []);
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await getDeviceDetails(deviceId);
        if (response) {
          //console.log("Response data", response.data);
          setDevice(response.data);
          setLoading(false);
          setError("");
        } else {
          console.error("Error fetching device details");
          setError("Error fetching device details");
        }
      } catch (error) {
        console.error("Error fetching device details", error);
        setError("Error fetching device details");
      }
    };
    fetchDevice();
  }, [deviceId]);

  const handleDeviceDelete = async (device) => {
    const deviceId = device._id;
    try {
      const response = await deleteDevice(deviceId);
      if (response) {
        console.log(response);
        navigate(-1);
        setLoading(false);
        setError("");
      } else {
        console.error("Error deleting device");
        setError("Error deleting device");
      }
    } catch (error) {
      console.error("Error deleting device", error);
      setError("Error deleting device");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Loading...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Error: {error}</h2>
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm rounded-md">
        <h2 className="font-semibold text-xl">{device.deviceName}</h2>
        <div className="flex gap-x-2">
          <Button variant="outline" onClick={() => navigate("edit")}>
            Edit
          </Button>
          <Button onClick={() => handleDeviceDelete(device)}>Delete</Button>
        </div>
      </div>
      <div className="">
        <div className=" ">
          <div className="flex items-start gap-x-8 text-gray-600  mt-4 ">
            <div className="flex flex-1 flex-col gap-y-8 border-r pr-8 h-full overflow-y-auto">
              <div className="bg-white border shadow-md rounded-lg overflow-hidden">
                <h2 className="font-bold py-2 pl-4 bg-white border-b">Notes</h2>
                <div className="p-6 ">
                  <p className="text-gray-600">
                    {device.notes ? device.notes : "No notes"}
                  </p>
                </div>
              </div>

              {device.assignedTo && (
                <div className="bg-white border shadow-md rounded-lg overflow-hidden">
                  <h2 className="font-bold py-2 pl-4 bg-white border-b">
                    Assigned To
                  </h2>
                  <div className="p-6 ">
                    {device.assignedTo && (
                      <p className="font-semibold">
                        {device.assignedTo.modelType}
                      </p>
                    )}
                    {device.assignedTo && device.assignedTo.modelType == "User"
                      ? device.assignedTo.data.name
                      : device.assignedTo.data.projectName}
                  </div>
                </div>
              )}

              <div className="bg-white border shadow-md rounded-lg overflow-hidden">
                <h2 className="font-bold py-2 pl-4 bg-white border-b">
                  Support Tickets
                </h2>
                <div className="p-6 ">
                  {device.supportTickets.length > 0 ? (
                    <div className="flex flex-col gap-y-4">
                      {device.supportTickets.map((ticket) => (
                        <div className="flex flex-col">
                          <Link to={`/support/${ticket.ticket_number}`}>
                            <p className="text-slate-400 underline font-semibold">
                              {ticket.ticket_number}
                            </p>
                          </Link>
                          <p className="text-slate-500 line-clamp-1">
                            {ticket.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No Ticket Found"
                  )}
                </div>
              </div>
            </div>
            <div className="w-[350px] bg-white border shadow-md rounded-lg overflow-hidden">
              <h4 className="font-bold p-2 pl-4 bg-slate-100">Device</h4>
              <div className="flex flex-col ">
                <div className="w-full h-36 object-contain flex justify-center items-start border p-4">
                  {device.image && (
                    <img
                      className="w-full h-full object-contain"
                      src={`http://localhost:3000${device.image}`}
                      alt={`${device.deviceName} Image`}
                    />
                  )}
                </div>
                <div>
                  <Table className="border w-full">
                    <TableBody className="overflow-hidden">
                      <TableRow className="">
                        <TableCell className="font-bold pl-8">Name</TableCell>
                        <TableCell className="text-sm">
                          {device.deviceName}
                        </TableCell>
                      </TableRow>
                      <TableRow className="">
                        <TableCell className="font-bold pl-8">Type</TableCell>
                        <TableCell className="text-sm">
                          {device.deviceType.name}
                        </TableCell>
                      </TableRow>
                      <TableRow className="">
                        <TableCell className="font-bold pl-8">
                          Serial Number
                        </TableCell>
                        <TableCell className="text-sm">
                          {device.deviceSerialNumber}
                        </TableCell>
                      </TableRow>
                      <TableRow className="">
                        <TableCell className="font-bold pl-8">Status</TableCell>
                        <TableCell className="text-sm">
                          {device.status}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
