import React, { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";



import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import useRMA from "../../hooks/useRMA";
import RMACard from "../../components/custom/RMACard";
import { useHeader } from "../../context/HeaderContext";

const RMA = () => {
  const {header,setHeader} = useHeader()
  const navigate = useNavigate();
  const [allRMA, setAllRMA] = React.useState([]);
  const [filteredRMA, setFilteredRMA] = useState([]);
  const [filter, setFilter] = useState("Open");
  const { getAllRMAs } = useRMA();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // useEffect(() => {
  //   if (filter == "Completed" || filter == "Rejected") {
  //     const filtered = allRMA.filter((rma) => rma.status == filter);
  //     setFilteredRMA(filtered);
  //   }
  //   setFilteredRMA(
  //     allRMA.filter(
  //       (rma) => rma.status != "Completed" || rma.status != "Rejected"
  //     )
  //   );
  // }, [filter]);

  useEffect(()=>{
    setHeader({...header, title: "RMA"})
  },[])

  useEffect(() => {
    const fetchRMA = async () => {
      const response = await getAllRMAs();
      if (response) {
        //console.log(response)
        const filteredRMA = response.filter(
          (rma) => (rma.status != "Completed" && rma.status != "Rejected")
        );
        //const filtered = allRMA.filter(rma => rma.status == filter)
        setAllRMA(response);
        setFilteredRMA(filteredRMA);
        setLoading(false);
        setError(null);
      } else null;
    };
    fetchRMA();
  }, []);

  const handleChangeFilter = (newFilter) => {
    setFilter(newFilter);
    if (newFilter == "Completed" || newFilter == "Rejected") {
      setFilteredRMA(allRMA.filter((rma) => rma.status == newFilter));
    } else {
      setFilteredRMA(
        allRMA.filter(
          (rma) => rma.status != "Completed" && rma.status != "Rejected"
        )
      );
    }
    //setFilteredTickets(tickets.filter(ticket => ticket.status == newFilter))
    //setFilteredRMA(allRMA.filter((rma) => rma.status == newFilter));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold text-2xl">
          <Loader2 className="animate-spin text-4xl" />
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
      

      <div className="p-8">
        <div className="flex bg-white rounded-md overflow-hidden shadow-md p-4 w-full justify-between items-center">
          <div className="flex  bg-gray-100 rounded-sm overflow-hidden p-1">
            <button
              onClick={() => handleChangeFilter("Open")}
              className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${
                filter == "Open" ? "bg-white text-gray-700 font-semibold" : ""
              }`}
            >
              Open
            </button>
            <button
              onClick={() => handleChangeFilter("Rejected")}
              className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${
                filter == "Rejected"
                  ? "bg-white text-gray-700 font-semibold"
                  : ""
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => handleChangeFilter("Completed")}
              className={`rounded-sm px-4 py-1 text-gray-600 cursor-pointer ${
                filter == "Completed"
                  ? "bg-white text-gray-700 font-semibold"
                  : ""
              }`}
            >
              Completed
            </button>
          </div>
          <div>
            <Button onClick={() => navigate("new")}>Create New</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredRMA &&
            filteredRMA.map((rma) => <RMACard key={rma._id} rma={rma} />)}
        </div>
      </div>
    </div>
  );
};

export default RMA;
