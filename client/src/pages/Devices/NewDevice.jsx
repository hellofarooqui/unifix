import React, { useEffect, useState } from "react";

import { Form, useNavigate } from "react-router-dom";

import { Loader2 } from "lucide-react";
import useDevices from "../../hooks/useDevices";
import { Button } from "../../components/ui/button";
import useVendor from "../../hooks/useVendor";
import { useHeader } from "../../context/HeaderContext";

const defaultDevice = {
  deviceType: "",
  vendor:"",
  deviceName: "",
  deviceSerialNumber: "",
  notes: "",
  image: "",
  addedOn: new Date().toISOString(),
};

const NewDevice = () => {
  const [device, setDevice] = React.useState(defaultDevice);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deviceTypes, setDeviceTypes] = useState(null);
  const [allVendors,setAllVendors] = useState([]);
  const [imagePreview, setImagePreview] = React.useState("");

  const { addDevice, getAllDeviceTypes } = useDevices();
  const { getAllVendorsList } = useVendor();
  const navigate = useNavigate();

  const {header,setHeader} = useHeader()

  useEffect(()=>{
    setHeader({...header,title:"New Device"})
  },[])

  const fetchDeviceTypes = async () => {
    try {
      const types = await getAllDeviceTypes();
      if (types) {
        setDeviceTypes(types);
      }
      const vendors = await getAllVendorsList();
      if (vendors) {
        setAllVendors(vendors);
      }
      setError("");
    } catch (error) {
      setError("Error in fetching device types");
    } finally {
      setLoading(false);
    }
  };

  // const handleDeviceFormSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await addDevice(device);
  //     console.log(response);
  //     if (response) {
  //       setDevice(defaultDevice);
  //       navigate(-1);
  //     }
  //   } catch (error) {
  //     console.error("Error creating device:", error);
  //   }
  // };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDevice({ ...device, deviceImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setDevice(defaultDevice);
    setImagePreview("");
    navigate(-1);
  };

  const handleAddDeviceSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      for (const key in device) {
        submitData.append(key, device[key]);
      }
      const response = await addDevice(submitData);
      console.log(response);
      if (response) {
        setDevice(defaultDevice);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creating device:", error);
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
    <div>
      <div className="p-8">
        <div className="bg-white px-6 py-6 rounded-lg shadow-md w-[720px]">
          <form
            onSubmit={handleAddDeviceSubmit}
            onReset={handleCancel}
            className="grid grid-cols-[150px_auto] gap-y-4 gap-x-6"
          >
            <label htmlFor="deviceType">Type</label>
            <select
              id="deviceType"
              name="deviceType"
              onChange={(e) =>
                setDevice({ ...device, deviceType: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-2"
            >
              <option className="text-gray-600">Select Device Type</option>
              {deviceTypes &&
                deviceTypes.map((type) => (
                  <option value={type._id}>{type.name}</option>
                ))}
            </select>
            <label htmlFor="vendor">Vendor</label>
            <select
              id="vendor"
              name="vendor"
              onChange={(e) =>
                setDevice({ ...device, vendor: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-2"
            >
              <option className="text-gray-600">Select Vendor</option>
              {allVendors &&
                allVendors.map((vendor) => (
                  <option value={vendor._id}>{vendor.name}</option>
                ))}
            </select>

            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceName"
            >
              Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              placeholder="Enter device name"
              required
              value={device.deviceName}
              onChange={(e) =>
                setDevice({ ...device, deviceName: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />

            <label
              className="font-semibold text-slate-700"
              htmlFor="deviceSerialNumber"
            >
              Serial Number
            </label>
            <input
              type="text"
              id="deviceSerialNumber"
              name="deviceSerialNumber"
              placeholder="Enter device serial number"
              required
              value={device.deviceSerialNumber}
              onChange={(e) =>
                setDevice({ ...device, deviceSerialNumber: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />

            <label className="font-semibold text-slate-700" htmlFor="notes">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Enter notes"
              value={device.notes}
              onChange={(e) => setDevice({ ...device, notes: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none"
              rows={4}
            />

            <label className="font-semibold text-slate-700" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="deviceImage"
              accept="image/*"
              onChange={handleFileInputChange}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-16 border rounded-md p-2 object-contain"
              />
            )}
            <div></div>
            <div className="flex w-full gap-x-4 items-center justify-end mt-4">
              <Button variant="outline" type="reset" className=" self-end px-8">
                Cancel
              </Button>
              <Button type="submit" className=" self-end px-8">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewDevice;
