import React, { use, useEffect, useState } from "react";
import useVendor from "../../hooks/useVendor";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useHeader } from "../../context/HeaderContext";



const defaultVendor= {
  name: "",
  description: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  status: "ACTIVE",
  logo: "",
};

const NewVendor = () => {
  const [vendor, setVendor] = useState(defaultVendor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createVendor } = useVendor();
  const navigate = useNavigate();
  const { header, setHeader } = useHeader();

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setVendor({ ...vendor, [name]: value });
  // };

  const handleReset = () => {
    setVendor(defaultVendor); // Reset the form to default values
    navigate("/settings"); // Redirect to the vendors list
    setError(""); // Clear any error messages
    setLoading(false); // Reset loading state
    console.log("Form reset and redirected to settings");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createVendor(vendor);
      if (response) {
        console.log("Vendor created successfully:", response);
        setVendor(defaultVendor); // Reset the form
        navigate("/settings"); // Redirect to the vendors list
      } else {
        console.error("Error creating vendor");
        setError("Error creating vendor");
      }
    } catch (error) {
      console.error("Error creating vendor:", error);
      setError("Error creating vendor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeader({ ...header, title: "New Vendor" });
  }, []);

  if (loading) {
    return (
      <Loader2 className="animate-spin text-slate-700 w-8 h-8 mx-auto mt-20" />
    );
  }
  if (error) {
    setError("Something went wrong, please try again later.");
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="">
      <div className="p-8">
        <div className="bg-white p-6 border rounded-lg shadow-md w-[720px]">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="grid grid-cols-[200px_auto] gap-y-4"
          >
            <label htmlFor="name" className="font-semibold text-slate-700">
              Vendor Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter vendor name"
              required
              value={vendor.name}
              onChange={(e) => setVendor({ ...vendor, name: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            <label
              htmlFor="description"
              className="font-semibold text-slate-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              required
              value={vendor.description}
              onChange={(e) =>
                setVendor({ ...vendor, description: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 resize-none"
              rows={4}
            />
            <label
              htmlFor="contactEmail"
              className="font-semibold text-slate-700"
            >
              Contact Email
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              placeholder="Enter contact email"
              required
              value={vendor.contactEmail}
              onChange={(e) =>
                setVendor({ ...vendor, contactEmail: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            <label
              htmlFor="contactPhone"
              className="font-semibold text-slate-700"
            >
              Contact Phone
            </label>
            <input
              type="tel"
              id="contactPhone"
              name="contactPhone"
              placeholder="Enter contact phone"
              required
              value={vendor.contactPhone}
              onChange={(e) =>
                setVendor({ ...vendor, contactPhone: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            <label htmlFor="address" className="font-semibold text-slate-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter address"
              value={vendor.address}
              onChange={(e) =>
                setVendor({ ...vendor, address: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            <label htmlFor="status" className="font-semibold text-slate-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={vendor.status}
              onChange={(e) => setVendor({ ...vendor, status: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
            <label htmlFor="logo" className="font-semibold text-slate-700">
              Logo URL
            </label>
            <input
              type="text"
              id="logo"
              name="logo"
              placeholder="Enter logo URL"
              value={vendor.logo}
              onChange={(e) => setVendor({ ...vendor, logo: e.target.value })}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
            <div className="col-span-2 flex justify-end gap-x-4 mt-4">
              <button
                type="reset"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-slate-700 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewVendor;
