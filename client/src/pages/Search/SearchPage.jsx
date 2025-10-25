import { Loader2, Search } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import ListTickets from "../SupportTicket/ListTickets";
import { useHeader } from "../../context/HeaderContext";



const defaultSearchResult = {
  devices: [],
  tickets: [],
};

const SearchPage = () => {
  const {header,setHeader} = useHeader()
  const [searchParams] = useSearchParams();
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState("")
  const [searchresult, setSearchResult] = useState(defaultSearchResult);
  const searchTerm = searchParams.get("term");
  const [searchValue, setSearchValue] = useState(searchTerm || "");
  const [searchInputField, setSearchInputField] = useState(searchTerm);
  const { getSearchResults } = useSearch();
  //console.log(searchParams.get('term')); // This will log the search term from the URL

  // const handleSearch = (e)=>{
  //   e.preventDefault();
  //   const searchQuery = e.target.search.value.trim();
  //   if (searchQuery) {
  //     try{
  //       const response = await getSearchResults(searchQuery);
  //       console.log("Search Results:", response);
  //       setSearchResult(response);
  //     }

  // }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInputField) {
      alert("Please enter a search term");
      return;
    }
    setSearchValue(searchInputField);
  };

  useEffect(()=>{
    setHeader({...header,title:"Search Results"})
  },[])
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchValue) {
        setSearchResult(defaultSearchResult);
        setLoading(false)
      }
      if (searchValue) {
        try {
          const results = await getSearchResults(searchValue);
          console.log("Search Results:", results);
          setSearchResult(results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
        finally{
          setLoading(false)
        }
      }
    };
    fetchSearchResults();
  }, [searchValue]);

  if(loading){
    return (<div><Loader2 className="animate-spin" /></div>)
  }
  return (
    <div>
      
      <div className="w-full p-8 border-b-2 flex justify-center items-center">
        <form
          onSubmit={handleSearch}
          className="w-[80%] flex border-2 border-gray-300 rounded-full  p-4 "
        >
          <input
            type="text"
            name="search"
            placeholder="Search device, ticket..."
            defaultValue={searchInputField || ""}
            className="flex-1 placeholder-gray-400 focus:outline-none"
            onChange={(e) => setSearchInputField(e.target.value)}
          />
          <button className="text-gray-600" type="submit">
            <Search />
          </button>
        </form>
      </div>

      {searchresult.devices.length > 0 && (
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-2">Devices</h2>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-800 hover:bg-gray-700">
                <TableHead className="text-white">Device</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Serial Number</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchresult.devices.map((device, index) => (
                <TableRow className="bg-white hover:bg-gray-100" key={index}>
                  <TableCell>{device.deviceType.name}</TableCell>
                  <TableCell>{device.deviceName}</TableCell>
                  <TableCell>{device.deviceSerialNumber}</TableCell>
                  <TableCell>
                    <Link
                      className="bg-slate-200 border rounded-md px-2"
                      to={`/devices/${device._id}`}
                    >
                      Details
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {searchresult.tickets.length > 0 && (
            <div>
              {searchresult.tickets.map((ticket) => (
                <div>{ticket.title}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
