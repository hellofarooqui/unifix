import React, { use, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import useSupportTicket from "../../hooks/useSupportTicket";
import { useNavigate } from "react-router-dom";
import useDevices from "../../hooks/useDevices";
import { useHeader } from "../../context/HeaderContext";



const defaultTicket = {
  ticket_number: "",
  title: "",
  description: "",
};
const NewSupportTicket = () => {
  const {header,setHeader} = useHeader()
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(defaultTicket);
  const [selectedDevice,setSelectedDevice] = useState("");
  const [deviceSearchQuery,setDeviceSearchQuery] = useState("");
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [loading, setLoading] = React.useState(true);

  const { createSupportTicket } = useSupportTicket();
  const { searchDevices } = useDevices()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicket({ ...ticket, [name]: value });
  };

  const handleDeviceInputChange = (e) => {
    //setTicket({...ticket, device: e.target.value });
    setSelectedDevice(e.target.value);
    setDeviceSearchQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSupportTicket(ticket);
      console.log("Ticket created successfully:", response);
      setTicket(defaultTicket); // Reset the form
      navigate("/support");
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedDevice = (device) => {
    setSelectedDevice(device.deviceName+" Serial:"+ device.deviceSerialNumber);
    setTicket({ ...ticket, device: device._id });
    setDeviceSearchQuery(""); // Clear the search query after selection
    setFilteredDevices([]); // Clear the filtered devices list
  
  }

  useEffect(()=>{
    setHeader({...header,title:"New Support Ticket"})
  },[])

  
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        // Simulate an API call to fetch devices based on the search query
        const response = await searchDevices(deviceSearchQuery);
        if (!response) {
          throw new Error("Network response was not ok");
        }
    
        //console.log("Fetched devices:", response);  
        setFilteredDevices(response);
      } catch (error) {
        console.error("Error fetching devices:", error);
        setFilteredDevices([]); // Clear the list on error
      }
    };

    if (deviceSearchQuery) {
      fetchDevices();
    } else {
      setFilteredDevices([]); // Clear the list if the search query is empty
    }
  },[deviceSearchQuery])

  return (
    <div className="">
      
      <div className="p-8">
        <div className=" bg-white p-8 rounded-md shadow">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="ticket_number">Ticket Number</label>
              <input
                type="text"
                id="ticket_number"
                value={ticket.ticket_number}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                name="ticket_number"
              />
            </div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={ticket.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                name="title"
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={ticket.description}
                onChange={handleInputChange}
                name="description"
                placeholder="Enter description here..."
                className="resize-none w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="title">Device</label>
              <input
                type="text"
                id="device"
                value={selectedDevice}
                onChange={handleDeviceInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                name="device"
              />
              {deviceSearchQuery && (
                <div>
                  <ul className="border rounded-md">
                    {filteredDevices.map((device) => (
                      <li key={device._id} className="p-2 cursor-pointer hover:bg-slate-100" onClick={() => handleSelectedDevice(device)}>
                        {device.deviceName} Serial: {device.deviceSerialNumber}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button type="submit" className="self-end">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSupportTicket;
