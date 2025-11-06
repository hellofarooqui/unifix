import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import { Button } from "../../components/ui/button";
import {
  FilePenLine,
  FileText,
  FunnelPlus,
  Loader2,
  Plus,
  Rows3,
  Trash2,
} from "lucide-react";
import useDevices from "../../hooks/useDevices.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomTooltip from "../../components/custom/CustomToolTip";
import { useHeader } from "../../context/HeaderContext.jsx";

import HeadingBar from "../../components/custom/HeadingBar.jsx";
const storageLocation =
  "/home/farooqui/development/it-tools/server/uploads/devices";

const filters = [
  { name: "ALL", value: "" },
  { name: "ACTIVE", value: "ACTIVE" },
  { name: "ASSIGNED", value: "ASSIGNED" },
  { name: "MAINTENANCE", value: "MAINTENANCE" },
];

const Devices = () => {
  const { header, setHeader } = useHeader();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [perPage, setPerPage] = useState(10);
  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalDevices: 0,
    devicesPerPage: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const { getAllDevices, deleteDevice } = useDevices();

  useEffect(() => {
    setHeader({ ...header, title: "Devices" });
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getAllDevices(selectedFilter, pagination);
        if (response) {
          //console.log(response);
          setDevices(response);
          setPagination({ ...pagination, ...response.pagination });
          setLoading(false);
          setError("");
        } else {
          console.error("Error fetching devices");
          setError("Error fetching devices");
        }
      } catch (error) {
        console.error("Error fetching devices", error);
        setError("Error fetching devices");
      }
    };
    fetchDevices();
  }, [selectedFilter, pagination.currentPage, pagination.devicesPerPage]);

  const handleEditDevice = (device) => {
    console.log("edit device");
    //navigate({ pathname: `/devices/${device._id}/edit` , state: {data: device}})
    navigate(`/devices/${device._id}/edit`, { state: { data: device } });
  };

  const handleDeleteDevice = async (device) => {
    const deviceId = device._id;
    try {
      const response = await deleteDevice(deviceId);
      if (response) {
        console.log(response);
        setDevices(devices.filter((device) => device._id !== deviceId));
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
        <h2 className="font-bold text-2xl">
          <Loader2 className="animate-spin" />
        </h2>
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
    <div className="">
      {/* Add your device management components here */}

      <div className="p-4">
        <div className="w-full bg-white flex gap-x-4 justify-between items-center px-4 py-2 rounded-md shadow-sm">
          <div className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-1">
              <FunnelPlus size={16} />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border rounded-md overflow-hidden p-2 text-sm"
              >
                {filters.map((filter, index) => (
                  <option key={index} value={filter.value}>
                    {filter.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-x-1 w-64">
              <Rows3 size={16} />
              <select
                className="block appearance-none bg-white border border-gray-300  rounded-md shadow-sm text-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={pagination.devicesPerPage}
                onChange={(e) =>
                  setPagination({
                    ...pagination,
                    devicesPerPage: e.target.value,
                  })
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <p>Per page</p>
            </div>
          </div>
          <div className="flex justify-end gap-x-2">
            <Button variant="outline" onClick={() => navigate("import")}>
              Import Devices
            </Button>
            <Button onClick={() => navigate("new")}>
              <Plus />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 ">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 hover:bg-gray-700">
              <TableHead className="w-[10%] text-white pl-4">S.No</TableHead>
              <TableHead className="w-[10%] text-white">Device</TableHead>
              <TableHead className="w-[40%] text-white">Name</TableHead>
              <TableHead className="w-[15%] text-white">
                Serial Number
              </TableHead>
              <TableHead className="w-[10%] text-white">Status</TableHead>
              <TableHead className="w-[15%] text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.devices.map((device, index) => (
              <TableRow
                key={device._id}
                className="h-16 bg-gray-50 hover:bg-gray-100 border"
              >
                <TableCell className="text-gray-700 pl-6">
                  {(pagination.currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell className="text-gray-700">
                  {device.deviceType.name}
                </TableCell>
                <TableCell className="text-gray-700">
                  {device.deviceName}
                </TableCell>
                <TableCell className="text-gray-700 ">
                  {device.deviceSerialNumber}
                </TableCell>
                <TableCell className="text-gray-700 ">
                  {device.status}
                </TableCell>
                <TableCell className="text-gray-700">
                  <CustomTooltip content="Details">
                    <Button variant="outline" size="icon">
                      <Link
                        to={`/devices/${device._id}`}
                        state={{ data: device }}
                        key={device._id}
                      >
                        <FileText />
                      </Link>
                    </Button>
                  </CustomTooltip>
                  <CustomTooltip content="Edit">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditDevice(device)}
                    >
                      <FilePenLine />
                    </Button>
                  </CustomTooltip>
                  <CustomTooltip content="Delete">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteDevice(device)}
                    >
                      <Trash2 />
                    </Button>
                  </CustomTooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center gap-x-2 mt-4">
          <p>Pages</p>
          <div className="flex gap-x-2 ">
            {pagination.totalPages &&
              [...Array(pagination.totalPages)].map((__dirname, index) => (
                <p
                  onClick={() =>
                    setPagination({ ...pagination, currentPage: index + 1 })
                  }
                  key={index}
                  className={`p-1 px-[10px] border rounded-md cursor-pointer ${
                    pagination.currentPage == index + 1
                      ? "bg-slate-600 text-white"
                      : ""
                  } `}
                >
                  {index + 1}
                </p>
              ))}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devices;
