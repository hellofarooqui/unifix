import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCisco from "@/hooks/useCisco";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FunnelPlus,
  Loader2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuColumns3 } from "react-icons/lu";
import { TbFilterPlus } from "react-icons/tb";
import formatDate from "@/utils/formatDate";

const AllAssets = () => {
  const navigate = useNavigate();
  const { getAllAssets } = useCisco();
  const [allAssets, setAllAssets] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const showColumnsSelectionRef = useRef(null);
  const showFilterSelectionRef = useRef(null);

  const [showColumnSelection, setShowcolumnSelection] = useState(false);
  const [showFilterSelection, setShowFilterSelection] = useState(false);

  //   "PAK/Serial Number": "pakSerialNumber",
  // "Contract Number": "contractNumber",
  // "Product Number": "productNumber",
  // "Product Label": "productLabel",
  // "End of Support": "endOfSupport",
  // "Product Description": "productDescription",
  // "Product Type": "productType",
  // "Instance Number": "instanceNumber",
  // "Product Relationship": "productRelationship",
  // "Parent Instance Number": "parentInstanceNumber",
  // "Start Date": "startDate",
  // "End Date": "endDate",
  // "Contract Line Status": "contractLineStatus",
  // "PO Number": "poNumber",
  // "SO Number": "soNumber",
  // "Maintenance PO Number": "maintenancePONumber",
  // "Maintenance SO Number": "maintenanceSONumber",
  // "Do Not Renew Reason Code": "doNotRenewReasonCode",
  // "Warranty Type": "warrantyType",
  // "Warranty End Date": "warrantyEndDate",
  // "Product Ship Date": "productShipDate",

  const availableFilters = [
    { label: "Site", name: "site" },
    { label: "PAK/Serial Number", name: "pakSerialNumber" },
    { label: "Contract Number", name: "contractNumber" },
    { label: "Product Number", name: "productNumber" },
    { label: "Product Label", name: "productLabel" },
    { label: "End of Support", name: "endOfSupport" },
    { label: "Product Description", name: "productDescription" },
    { label: "Product Type", name: "productType" },
    { label: "Instance Number", name: "instanceNumber" },
    { label: "Product Relationship", name: "productRelationship" },
    { label: "Parent Instance Number", name: "parentInstanceNumber" },
    { label: "Start Date", name: "startDate" },
    { label: "End Date", name: "endDate" },
    { label: "Contract Line Status", name: "contractLineStatus" },
    { label: "PO Number", name: "poNumber" },
    { label: "SO Number", name: "soNumber" },
    { label: "Maintenance PO Number", name: "maintenancePONumber" },
    { label: "Maintenance SO Number", name: "maintenanceSONumber" },
    { label: "Do Not Renew Reason Code", name: "doNotRenewReasonCode" },
    { label: "Warranty Type", name: "warrantyType" },
    { label: "Warranty End Date", name: "warrantyEndDate" },
    { label: "Product Ship Date", name: "productShipDate" },
  ];

  const [filters, setFilters] = useState([{ field: "", value: "" }]);

  const [showColumns, setShowColumns] = useState({
    Site: true,
    Health: false,
    "PAK/Serial Number": true,
    "Contract Number": true,
    "Product Number": false,
    "Product Label": false,
    "End of Support": true,
    "Product Description": false,
    "Product Type": false,
    "Instance Number": true,
    "Product Relationship": true,
    "Parent Instance Number": true,
    "Start Date": true,
    "End Date": true,
    "Contract Line Status": false,
    "PO Number": false,
    "SO Number": false,
    "Maintenance PO Number": false,
    "Maintenance SO Number": false,
    "Do Not Renew Reason Code": false,
    "Warranty Type": false,
    "Warranty End Date": false,
    "Product Ship Date": false,
  });

  const fetchAllAssets = async () => {
    try {
      const response = await getAllAssets({
        page: currentPage,
        limit: itemsPerPage,
      });
      if (response.data.ok) {
        console.log(response);
        setAllAssets(response.data.assets);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
        setHasNextPage(response.data.hasNextPage);
        setHasPrevPage(response.data.hasPrevPage);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAssets();
  }, [currentPage, itemsPerPage, filters]);

  const handleAddFilter = () => {
    setFilters([...filters, { field: "", value: "" }]);
  };

  const handleFilterChange = (index, field, value) => {
    const newFilters = [...filters];
    newFilters[index] = { field, value };
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchAllAssets();
    setShowFilterSelection(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (showColumnsSelectionRef.current &&
          !showColumnsSelectionRef.current.contains(event.target)) ||
        (showFilterSelectionRef.current &&
          !showFilterSelectionRef.current.contains(event.target))
      ) {
        setShowcolumnSelection(false);
        setShowFilterSelection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddNew = () => {
    navigate("/cisco-assets/new");
  };

  if (loading) {
    return (
      <div className="w-full h-32 flex justify-center items-center bg-white border rounded-md">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-32 flex justify-center items-center bg-white border rounded-md">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 mt-4">
      <div className="flex w-full justify-between items-center">
        <h2 className="font-semibold text-slate-600 text-lg">All Assets</h2>
        <Button
          onClick={handleAddNew}
          variant="outline"
          className="hover:shadow-sm hover:scale-105"
        >
          Add New
        </Button>
      </div>
      <div className="bg-white p-4 rounded-md border border-slate-200 relative">
        <div className="flex justify-between mb-2">
          <div className="px-2 py-1 border rounded-md border-slate-400">
            <input placeholder="Search" />
          </div>
          <div className="flex gap-x-2 ">
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(e.target.value)}
              className="border p-1 px-2 rounded-sm border-slate-200 shadow-sm"
            >
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <button
              onClick={() => setShowFilterSelection(true)}
              className="border p-1 px-2 rounded-sm border-slate-200 shadow-sm"
            >
              <TbFilterPlus className="text-slate-600" />
            </button>
            <button
              onClick={() => setShowcolumnSelection(true)}
              className="border p-1 px-2 rounded-sm border-slate-200 shadow-sm"
            >
              <LuColumns3 className="text-slate-600" />
            </button>
          </div>
        </div>

        {showFilterSelection && (
          <div
            ref={showFilterSelectionRef}
            className="absolute top-14 right-4 bg-slate-100 shadow-md z-10 p-4 border border-slate-200 text-sm rounded-md"
          >
            <div className="bg-white p-4 rounded-md border border-slate-200">
              <h3 className="font-semibold mb-2">Filters</h3>
              {filters.map((filter, index) => (
                <div key={index} className="flex gap-x-2 mb-2">
                  <select
                    value={filter.field}
                    onChange={(e) =>
                      handleFilterChange(index, e.target.value, filter.value)
                    }
                    className="px-2 py-1 border rounded-md border-slate-400 bg-white"
                  >
                    <option value="">Select Filter</option>
                    {availableFilters.map((availableFilter) => (
                      <option
                        key={availableFilter.name}
                        value={availableFilter.name}
                      >
                        {availableFilter.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={filter.value}
                    onChange={(e) =>
                      handleFilterChange(index, filter.field, e.target.value)
                    }
                    className="px-2 py-1 border rounded-md border-slate-400 bg-white"
                    placeholder="Filter Value"
                  />
                </div>
              ))}
              <Button
                onClick={handleAddFilter}
                variant="outline"
                className="mb-2"
              >
                Add Filter
              </Button>
              <Button onClick={handleApplyFilters} variant="primary">
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {showColumnSelection && (
          <div
            ref={showColumnsSelectionRef}
            className="absolute top-14 right-4 bg-white z-10 p-4 border text-sm rounded-md"
          >
            <ul className="flex flex-col gap-y-2 h-[300px] overflow-y-scroll">
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Site"]}
                  name="Site"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      Site: e.target.checked ? true : false,
                    })
                  }
                />
                Site
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["PAK/Serial Number"]}
                  name="PAK/Serial Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "PAK/Serial Number": e.target.checked ? true : false,
                    })
                  }
                />
                PAK/Serial Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Contract Number"]}
                  name="Contract Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Contract Number": e.target.checked ? true : false,
                    })
                  }
                />
                Contract Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Number"]}
                  name="Product Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Number": e.target.checked ? true : false,
                    })
                  }
                />
                Product Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Label"]}
                  name="Product Label"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Label": e.target.checked ? true : false,
                    })
                  }
                />
                Product Label
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["End of Support"]}
                  name="End of Support"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "End of Support": e.target.checked ? true : false,
                    })
                  }
                />
                End of Support
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Description"]}
                  name="Product Description"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Description": e.target.checked ? true : false,
                    })
                  }
                />
                Product Description
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Type"]}
                  name="Product Type"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Type": e.target.checked ? true : false,
                    })
                  }
                />
                Product Type
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Instance Number"]}
                  name="Instance Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Instance Number": e.target.checked ? true : false,
                    })
                  }
                />
                Instance Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Relationship"]}
                  name="Product Relationship"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Relationship": e.target.checked ? true : false,
                    })
                  }
                />
                Product Relationship
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Parent Instance Number"]}
                  name="Parent Instance Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Parent Instance Number": e.target.checked ? true : false,
                    })
                  }
                />
                Parent Instance Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Start Date"]}
                  name="Start Date"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Start Date": e.target.checked ? true : false,
                    })
                  }
                />
                Start Date
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["End Date"]}
                  name="End Date"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "End Date": e.target.checked ? true : false,
                    })
                  }
                />
                End Date
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Contract Line Status"]}
                  name="Contract Line Status"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Contract Line Status": e.target.checked ? true : false,
                    })
                  }
                />
                Contract Line Status
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["PO Number"]}
                  name="PO Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "PO Number": e.target.checked ? true : false,
                    })
                  }
                />
                PO Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["SO Number"]}
                  name="SO Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "SO Number": e.target.checked ? true : false,
                    })
                  }
                />
                SO Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Maintenance PO Number"]}
                  name="Maintenance PO Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Maintenance PO Number": e.target.checked ? true : false,
                    })
                  }
                />
                Maintenance PO Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Maintenance SO Number"]}
                  name="Maintenance SO Number"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Maintenance SO Number": e.target.checked ? true : false,
                    })
                  }
                />
                Maintenance SO Number
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["do_not_renew_reason_code"]}
                  name="do_not_renew_reason_code"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Do Not Renew Reason Code": e.target.checked
                        ? true
                        : false,
                    })
                  }
                />
                Do Not Renew Reason Code
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Warranty Type"]}
                  name="Warranty Type"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Warranty Type": e.target.checked ? true : false,
                    })
                  }
                />
                Warranty Type
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Warranty End Date"]}
                  name="Warranty End Date"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Warranty End Date": e.target.checked ? true : false,
                    })
                  }
                />
                Warranty End Date
              </li>
              <li className="flex items-center gap-x-2">
                {" "}
                <input
                  type="checkbox"
                  checked={showColumns["Product Ship Date"]}
                  name="Product Ship Date"
                  value="selected"
                  onChange={(e) =>
                    setShowColumns({
                      ...showColumns,
                      "Product Ship Date": e.target.checked ? true : false,
                    })
                  }
                />
                Product Ship Date
              </li>
            </ul>
          </div>
        )}
        <Table>
          <TableHeader className="bg-gray-700 ">
            <TableRow>
              {showColumns["Site"] && (
                <TableHead className="pl-4 text-white">Site</TableHead>
              )}
              {showColumns["Health"] && (
                <TableHead className="text-white">Health</TableHead>
              )}
              {showColumns["PAK/Serial Number"] && (
                <TableHead className="text-white">PAK/Serial Number</TableHead>
              )}
              {showColumns["Contract Number"] && (
                <TableHead className="text-white">Contract Number</TableHead>
              )}
              {showColumns["Product Number"] && (
                <TableHead className="text-white">Product Number</TableHead>
              )}
              {showColumns["Product Label"] && (
                <TableHead className="text-white">Product Label</TableHead>
              )}
              {showColumns["End of Support"] && (
                <TableHead className="text-white">End of Support</TableHead>
              )}
              {showColumns["Product Description"] && (
                <TableHead className="text-white">
                  Product Description
                </TableHead>
              )}
              {showColumns["Product Type"] && (
                <TableHead className="text-white">Product Type</TableHead>
              )}
              {showColumns["Instance Number"] && (
                <TableHead className="text-white">Instance Number</TableHead>
              )}
              {showColumns["Product Relationship"] && (
                <TableHead className="text-white">
                  Product Relationship
                </TableHead>
              )}
              {showColumns["Parent Instance Number"] && (
                <TableHead className="text-white">
                  Parent Instance Number
                </TableHead>
              )}
              {showColumns["Start Date"] && (
                <TableHead className="text-white">Start Date</TableHead>
              )}
              {showColumns["End Date"] && (
                <TableHead className="text-white">End Date</TableHead>
              )}
              {showColumns["Contract Line Status"] && (
                <TableHead className="text-white">
                  Contract Line Status
                </TableHead>
              )}
              {showColumns["PO Number"] && (
                <TableHead className="text-white">PO Number</TableHead>
              )}
              {showColumns["SO Number"] && (
                <TableHead className="text-white">SO Number</TableHead>
              )}
              {showColumns["Maintenance PO Number"] && (
                <TableHead className="text-white">
                  Maintenance PO Number
                </TableHead>
              )}
              {showColumns["Maintenance SO Number"] && (
                <TableHead className="text-white">
                  Maintenance SO Number
                </TableHead>
              )}
              {showColumns["Do Not Renew Reason Code"] && (
                <TableHead className="text-white">
                  Do Not Renew Reason Code
                </TableHead>
              )}
              {showColumns["Warranty Type"] && (
                <TableHead className="text-white">Warranty Type</TableHead>
              )}
              {showColumns["Warranty End Date"] && (
                <TableHead className="text-white">Warranty End Date</TableHead>
              )}
              {showColumns["Product Ship Date"] && (
                <TableHead className="text-white">Product Ship Date</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allAssets.map((asset) => (
              <TableRow>
                {showColumns["Site"] && <TableCell>{asset.site}</TableCell>}
                {showColumns["Health"] && <TableCell>{asset.health}</TableCell>}
                {showColumns["PAK/Serial Number"] && (
                  <TableCell>{asset.pakSerialNumber}</TableCell>
                )}
                {showColumns["Contract Number"] && (
                  <TableCell>{asset.contractNumber}</TableCell>
                )}
                {showColumns["Product Number"] && (
                  <TableCell>{asset.productNumber}</TableCell>
                )}
                {showColumns["Product Label"] && (
                  <TableCell>{asset.productLabel}</TableCell>
                )}
                {showColumns["End of Support"] && (
                  <TableCell>{formatDate(asset.endOfSupport)}</TableCell>
                )}
                {showColumns["Product Description"] && (
                  <TableCell>{asset.productDescription}</TableCell>
                )}
                {showColumns["Product Type"] && (
                  <TableCell>{asset.productType}</TableCell>
                )}
                {showColumns["Instance Number"] && (
                  <TableCell>{asset.instanceNumber}</TableCell>
                )}
                {showColumns["Product Relationship"] && (
                  <TableCell>{asset.productRelationship}</TableCell>
                )}
                {showColumns["Parent Instance Number"] && (
                  <TableCell>{asset.parentInstanceNumber}</TableCell>
                )}
                {showColumns["Start Date"] && (
                  <TableCell>{formatDate(asset.startDate)}</TableCell>
                )}
                {showColumns["End Date"] && (
                  <TableCell>{formatDate(asset.endDate)}</TableCell>
                )}
                {showColumns["Contract Line Status"] && (
                  <TableCell>{asset.contractLineStatus}</TableCell>
                )}
                {showColumns["PO Number"] && (
                  <TableCell>{asset.poNumber}</TableCell>
                )}
                {showColumns["SO Number"] && (
                  <TableCell>{asset.soNumber}</TableCell>
                )}
                {showColumns["Maintenance PO Number"] && (
                  <TableCell>{asset.maintenancePONumber}</TableCell>
                )}
                {showColumns["Maintenance SO Number"] && (
                  <TableCell>{asset.maintenanceSONumber}</TableCell>
                )}
                {showColumns["Do Not Renew Reason Code"] && (
                  <TableCell>{asset.doNotRenewReasonCode}</TableCell>
                )}
                {showColumns["Warranty Type"] && (
                  <TableCell>{asset.warrantyType}</TableCell>
                )}
                {showColumns["Warranty End Date"] && (
                  <TableCell>{asset.warrantyEndDate}</TableCell>
                )}
                {showColumns["Product Ship Date"] && (
                  <TableCell>{asset.productShipDate}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-6 items-center px-4 border-t pt-4 text-sm">
          <div className="flex items-center gap-x-1">
            <p className="mr-2">Page</p>
            <button
              disabled={!hasPrevPage}
              onClick={() => setCurrentPage(1)}
              className={`p-1 border rounded-md ${
                !hasPrevPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronsLeft />
            </button>
            <button
              disabled={!hasPrevPage}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`p-1 border rounded-md ${
                !hasPrevPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <ChevronLeft />
            </button>

            {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Always show first page
              if (page >= 1 && page < 3 ) {
                return (
                  <button
                    key={page}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }

              // Show dots after page 5
              if (page === 4 ) {
                return (
                  <span key="dots" className="px-2">
                    ...
                  </span>
                );
              }

              // Show last page
              if (page > totalPages-3 && page <= totalPages) {
                return (
                  <button
                    key={page}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }

              // Show pages 2-5
              if (page <= 3) {
                return (
                  <button
                    key={page}
                    className={`px-3 py-1 border rounded-md ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }

              return null;
            })} */}

            <p className="p-1 px-4 border rounded-md"> {currentPage}</p>

            <button
              disabled={!hasNextPage}
              className={`p-1 border rounded-md ${
                !hasNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight />
            </button>
            <button
              disabled={!hasNextPage}
              className={`p-1 border rounded-md ${
                !hasNextPage ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage(totalPages)}
            >
              <ChevronsRight />
            </button>
            <p>of {totalPages} pages</p>
          </div>

          {totalItems && (
            <div>
              <p className="text-sm">
                Total{" "}
                <span className="font-semibold ml-2 p-1 px-4 border-2 rounded-md text-slate-600">
                  {totalItems}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAssets;
