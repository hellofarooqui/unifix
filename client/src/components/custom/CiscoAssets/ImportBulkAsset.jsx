import useCisco from '@/hooks/useCisco';
import React, { use, useState } from 'react'
import { LuImport } from "react-icons/lu";

const ImportBulkAsset = () => {
     const [file, setFile] = useState(null);
     const fileInputRef = React.useRef(null);
     const [loading, setLoading] = useState(false);
     const [response, setResponse] = useState(null);
     const [error, setError] = useState(null);
     const { addMultipleAssets } = useCisco();

     const handleFileChange = (e) => {
       const selectedFile = e.target.files[0];

       if (selectedFile && selectedFile.type === "text/csv") {
         setFile(selectedFile);
         console.log("File selected",selectedFile)
         setError(null);
         setResponse(null);
       } else {
         setFile(null);
         setError("Please select a valid CSV file");
       }
     };

     const handleFileSelectionClick = () => {
       fileInputRef.current.click();
     }

     const handleUpload = async () => {
       if (!file) {
         setError("Please select a file first");
         console.log("File not selected")
         return;
       }

       setLoading(true);
       setError(null);
       setResponse(null);

       const formData = new FormData();
       formData.append("csvFile", file);

       try {
        console.log("Form Data",formData["csvFile"]);
         const res = await addMultipleAssets(formData);

         setResponse(res.data);
         setFile(null);
         // Reset file input
         document.getElementById("csvFileInput").value = "";
       } catch (err) {
        console.log("Error no valid file")
         setError(err.response?.data?.error || "Error uploading file");
       } finally {
         setLoading(false);
       }
     };
  return (
    <div className="absolute top-0 left-0 min-w-screen min-h-screen bg-slate-800/50 flex justify-center items-center">
      <div className="p-6 bg-white rounded-md w-[800px]">
        <h2 className="font-semibold text-slate-700 text-lg mb-4">
          Import Bulk Cisco Assets
        </h2>
        <div className="flex flex-col items-center gap-y-2 bg-slate-200 p-4 rounded-md border-2 border-dashed border-slate-400">
          <label className="flex flex-col items-center gap-y-2 cursor-pointer ">
            <button onClick={handleFileSelectionClick} type="button">
              <LuImport className="text-slate-400 mb-4" size={92} />
            </button>
            <input
              id="csvFileInput"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
          </label>

          {file && (
            <p>
              Selected file: <strong>{file.name}</strong>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-emerald-500 text-white p-2 rounded-md"
          >
            {loading ? "Uploading..." : "Upload and Process"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportBulkAsset
