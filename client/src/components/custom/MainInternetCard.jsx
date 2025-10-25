import React, { useState } from "react";
import InternetDetails from "./InternetDetails";

const MainInternetCard = ({ connection }) => {
  const [connectionDetails, setConnectionDetails] = useState();

  const handleCloseDetails = () => {
    setConnectionDetails(null);
  };
  return (
    <div className="bg-white rounded-[15px] overflow-hidden border shadow-sm cursor-pointer group transition-all duration-200 ease-in-out hover:shadow-lg">
      <div className="bg-gray-800 text-white">
        <p className="text-xl font-bold text-center p-2">
          {connection.name || "Unnamed Connection"}
        </p>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-700 line-clamp-1 h-32">
          {connection.description || "No description available."}
        </p>
      </div>
      <div className="relative flex items-center gap-x-2 px-2 py-2 bg-slate-100  relative">
        <span className="bg-slate-200 text-slate-500 text-xs rounded-full px-2 py-1">
          {connection.bandwidth} Mbps
        </span>
        <span className="bg-slate-200 text-slate-500 text-xs rounded-full px-2 py-1">
          {connection.provider}
        </span>
        <div className="absolute bg-gray-800 p-2 bottom-0 left-0 w-full flex justify-center invisible group-hover:visible transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => setConnectionDetails(connection)}
            className=" bg-white text-slate-600 px-4 py-1 rounded-full "
          >
            Details
          </button>
        </div>
      </div>

      {connectionDetails && (
        <InternetDetails
          connection={connectionDetails}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MainInternetCard;
