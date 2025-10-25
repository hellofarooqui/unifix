import {
  AlertCircle,
  CheckCircle,
  Download,
  FileText,
  Import,
  Upload,
} from "lucide-react";
import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import useDevices from "../../hooks/useDevices";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ImportDevices = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  const expectedColumns = [
    "deviceName",
    "deviceType",
    "deviceSerialnumber",
    "vendor",
  ];

  const { addBulkDevices } = useDevices();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setFileName(file.name);
    setDevices([]);

    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (fileExtension === "csv") {
      handleCSV(file);
    } else if (["xlsx", "xls"].includes(fileExtension)) {
      handleExcel(file);
    } else {
      setError("Please upload a CSV or Excel file (.csv, .xlsx, .xls)");
      setLoading(false);
    }
  };

  const handleCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      delimitersToGuess: [",", "\t", "|", ";"],
      complete: (results) => {
        console.log(
          "Result Data",
          results.data,
          "Results Meta Fields",
          results.meta.fields
        );
        processData(results.data, results.meta.fields);
      },
      error: (error) => {
        setError(`CSV parsing error: ${error.message}`);
        setLoading(false);
      },
    });
  };

  const handleExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length === 0) {
          setError("Excel file is empty");
          setLoading(false);
          return;
        }

        const headers = jsonData[0].map((h) => String(h).trim());
        const rows = jsonData.slice(1).map((row) => {
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = row[index] || "";
          });
          return obj;
        });

        processData(rows, headers);
      } catch (error) {
        setError(`Excel parsing error: ${error.message}`);
        setLoading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  const processData = (data, headers) => {
    if (!data || data.length === 0) {
      setError("No data found in file");
      setLoading(false);
      return;
    }

    // Clean headers by trimming whitespace
    const cleanHeaders = headers.map((h) => String(h).trim());

    // Check if all expected columns are present
    const missingColumns = expectedColumns.filter(
      (col) =>
        !cleanHeaders.some(
          (header) => header.toLowerCase() === col.toLowerCase()
        )
    );

    if (missingColumns.length > 0) {
      setError(`Missing required columns: ${missingColumns.join(", ")}`);
      setLoading(false);
      return;
    }

    // Map data to expected format with case-insensitive matching
    const mappedData = data
      .map((row, index) => {
        const device = {};

        expectedColumns.forEach((expectedCol) => {
          const matchedHeader = cleanHeaders.find(
            (header) => header.toLowerCase() === expectedCol.toLowerCase()
          );

          if (matchedHeader) {
            device[expectedCol] = String(row[matchedHeader] || "").trim();
          }
        });

        return {
          id: index + 1,
          ...device,
        };
      })
      .filter((device) =>
        // Filter out rows where all required fields are empty
        expectedColumns.some((col) => device[col] && device[col].length > 0)
      );

    if (mappedData.length === 0) {
      setError("No valid device records found");
      setLoading(false);
      return;
    }

    setDevices(mappedData);

    setLoading(false);
  };

  const downloadJSON = () => {
    const jsonString = JSON.stringify(devices, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "devices.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(devices, null, 2));
  };

  const handleCancel = () => {
    setDevices([]);
  };

  const handleUploadDevices = async () => {
    try {
      const response = await addBulkDevices(devices);

      if (response.success) {
        toast("Successfully imported");
        navigate(-1);
      }
    } catch (error) {
      toast("Error in importing devices");
      return;
    }
  };

  return (
    <div>
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-slate-800 text-2xl">Import Devices</h2>
      </div>

      <div className="max-w-6xl mx-auto mt-4 p-6 bg-white">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-lg font-medium text-gray-900">
                Upload your file
              </span>
              <p className="text-gray-500 mt-2">
                CSV, XLSX, or XLS files supported
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Required columns: deviceName, deviceType, deviceSerialnumber,
                vendor
              </p>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Processing {fileName}...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Success State */}
        {devices.length > 0 && !loading && (
          <div className="space-y-6">
            {/* Success Message */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700">
                Successfully imported {devices.length} device
                {devices.length !== 1 ? "s" : ""} from {fileName}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={downloadJSON}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </button>
            </div>

            {/* Device Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Imported Devices
                </h3>
              </div>
              <div className="overflow-x-auto max-h-96">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Device Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Serial Number
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Vendor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {devices.map((device) => (
                      <tr key={device.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {device.deviceName}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {device.deviceType}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 font-mono">
                          {device.deviceSerialnumber}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {device.vendor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-end gap-x-4">
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleUploadDevices}>Upload</Button>
            </div>

            {/* JSON Preview
            <div className="bg-gray-50 border border-gray-200 rounded-lg">
              <div className="px-4 py-3 bg-gray-100 border-b flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  JSON Output Preview
                </h3>
                <span className="text-sm text-gray-500">
                  {devices.length} records
                </span>
              </div>
              <div className="p-4">
                <pre className="text-sm text-gray-800 bg-white p-4 rounded border max-h-64 overflow-auto">
                  {JSON.stringify(devices.slice(0, 3), null, 2)}
                  {devices.length > 3 &&
                    "\n... and " + (devices.length - 3) + " more records"}
                </pre>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportDevices;
