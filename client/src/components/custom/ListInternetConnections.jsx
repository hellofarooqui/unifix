import React from "react";
//import InternetType from "../../pages/Internet/NewInternet";
import Internet from "../../pages/Internet/Internet";
import MainInternetCard from "./MainInternetCard";
import { Link } from "react-router-dom";

const ListInternetConnections = ({
  connections,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2>All Internet Connections</h2>
        <Link
          to="new"
          className="bg-gwhite  hover:bg-gray-100 border px-4 py-2 text-sm rounded-md  text-gray-800"
        >
          Add New
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {connections.map((connection) => (
          <MainInternetCard key={connection._id} connection={connection} />
        ))}
      </div>
    </div>
  );
};

export default ListInternetConnections;
