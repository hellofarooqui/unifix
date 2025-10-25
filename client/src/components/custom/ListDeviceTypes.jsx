import { useEffect, useState } from "react";
import useDevices from "../../hooks/useDevices";
import { Info, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";

const ListDeviceTypes = () => {
  const { getAllDeviceTypes } = useDevices();
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [showDeviceTypeDetails, setShowDeviceTypeDetails] = useState(false);
  const [deviceTypeDetailsCard, setDeviceTypeDetailsCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeviceDetailsButton = (deviceType) => {
    setShowDeviceTypeDetails(!showDeviceTypeDetails);
    setDeviceTypeDetailsCard(deviceType);
  };

  const fetchDeviceTypes = async () => {
    try {
      // Fetch device types from the API
      const response = await getAllDeviceTypes();
      if (response) {
        //console.log("Device Types:", response);
        setDeviceTypes(response);
      } else {
        console.error("Error fetching device types");
      }
    } catch (error) {
      console.error("Error fetching device types", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeviceTypes();
  }, []);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {deviceTypes.map((type) => (
        <div
        key={type._id}
          className="flex justify-between items-center  gap-x-2 bg-white p-4 rounded-[12px] shadow-sm hover:shadow-lg hover:scale-101 border group transition-all ease-in-out duration-300"
          id={type._id}
        >
          <div className="flex flex-col justify-start gap-y-1">
            <p className="text-xl font-semibold">{type.name}</p>
            <p className="text-sm line-clamp-1 text-gray-500">
              {type.description}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => handleDeviceDetailsButton(type)}
            className="hidden group-hover:block font-bold transition-all ease-in-out duration-300"
          >
            <Info />
          </Button>
        </div>
      ))}
      {showDeviceTypeDetails && (
        <div className="absolute w-screen h-screen bg-gray-800/50 top-0 left-0 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-[400px] flex flex-col gap-y-2">
            <p className="text-2xl font-bold">{deviceTypeDetailsCard.name}</p>
            <p className="text-gray-700">{deviceTypeDetailsCard.description}</p>
            <Button
              onClick={() => setShowDeviceTypeDetails(false)}
              className="text-lg  bg-slate-700 font-bold mt-4"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListDeviceTypes;
