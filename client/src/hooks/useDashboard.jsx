const serverUrl = import.meta.env.VITE_SERVER_URL;

import axios from "axios";

const useDashboard = () => {
  const getActiveTickets = async () => {
    const status1 = "Open";
    const status2 = "In Progress";
    try {
      
      const response = await axios.get(
        `${serverUrl}/api/support`,
        {
          params: {
            status: ["Open", "In Progress"].join(","),
          },
        }
      );
      if (response) {
        //console.log("Active Tickets",response.data);
        return response.data;
      }
    } catch (error) {
      throw new Error();
    }
  };

  const getActiveRMA = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/rma/active`);
      if (response) {
        //console.log("Active RMA",response.data);
        return response.data;
      }
    } catch (error) {
      throw new Error();
    }
  };

  const getClosedTickets = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/support`,
        {
          params: {
            status: "Closed",
          },
        }
      );
      if (response) {
        ////console.log(response);
        return response.data;
      }
    } catch (error) {
      throw new Error();
    }
  }


  const getDeviceCount = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/devices/count`);
      //console.log("Device Count",response.data.deviceCount);
      return response.data;
    } catch (error) {
      throw new Error();
    }
  };

  return { getActiveTickets, getActiveRMA, getDeviceCount, getClosedTickets  };
};

export default useDashboard;
