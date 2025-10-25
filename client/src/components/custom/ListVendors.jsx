import React, { useEffect } from "react";
import useDevices from "../../hooks/useDevices";
import useVendor from "../../hooks/useVendor";
import { Loader2 } from "lucide-react";

const ListVendors = () => {
  const [vendors, setVendors] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const { getAllVendors } = useVendor();

  const fetchVendors = async () => {
    try {
      const response = await getAllVendors();
      if (response) {
        //console.log(response);
        setVendors(response);
        setLoading(false);
        setError("");
        // Handle the response data as needed
      } else {
        setLoading(false);
        setError("No vendors found");
        console.error("No vendors found");
      }
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) {
    return <Loader2 className="animate-spin" />;
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">Error: {error}</h2>
      </div>
    );
  }
  if (vendors.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">No vendors found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {vendors.map((vendor) => (
        <div  key={vendor._id} className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold">{vendor.name}</h3>
          <p className="text-sm text-gray-600">{vendor.description}</p>
         
        </div>
      ))}
    </div>
  );
};

export default ListVendors;
