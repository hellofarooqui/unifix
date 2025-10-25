import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import useInternet from "../../hooks/useInternet";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const defaultNewInternet = {
  name: null,
  description: null,
  ipAddress: null,
  subnetMask: null,
  gateway: null,
  accountNumber: null,
  accountName: null,
  provider: null,
  bandwidth: 0,
  connectionType: null,
  accountUsername: null,
  accountPassword: null,
  supportContact: null,
  supportEmail: null,
  supportPhone: null,
};

const UpdateInternet= () => {
  const params = useParams()
  const { internetId } = params;

  const [newInternet, setNewInternet] = useState(defaultNewInternet);
  const { fetchInternetConnectionById, updateInternetConnection,deleteInternetConnection } = useInternet();
  const navigate = useNavigate()

  useEffect(() => {
    const loadInternetConnection = async () => {
      try {
        console.log("internetId", internetId);
        const data = await fetchInternetConnectionById(internetId);
        setNewInternet(data);
      } catch (error) {
        console.error("Failed to load internet connection:", error);
        toast.error("Failed to load internet connection");
      }
    };
    loadInternetConnection();
  }, [

  ]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const data = await updateInternetConnection( internetId,newInternet)
            if(data){
                toast("Successfully Updated")
                navigate("/internet")
            }
        }
        catch(error){
            toast(error)
        }

    }

    const handleReset = (e) => {

    }

    const handleDelete = async () => {
      if (window.confirm("Are you sure you want to delete this internet connection?")) {
        try {
          const deleted = await deleteInternetConnection(internetId);
          if (deleted) {
            toast.success("Internet connection deleted successfully");
            navigate("/internet");
          }
        } catch (error) {
          console.error("Failed to delete internet connection:", error);
          toast.error("Failed to delete internet connection");
        }
      }
    };


  
  return (
    <div>
      <div className="w-full bg-white flex justify-between items-center p-4 shadow-sm">
        <h2 className="font-bold text-xl">Updating {(newInternet.name)}</h2>
        <Button onClick={handleDelete}><Trash2/> Delete</Button>
      </div>

      <div className="p-8">
        <div className="w-[800px] bg-white p-6 rounded-[10px] shadow-sm">
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className="grid grid-cols-[150px_auto] items-center gap-x-4 gap-y-4 text-slate-400"
          >
            <label className="text-sm text-end font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newInternet.name || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, name: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800 "
              
            />

            <label className="text-sm  text-end  font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={newInternet.description || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, description: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800 resize-none"
              rows={3}
            />

            <label className="text-sm text-end font-medium text-gray-700">
              {" "}
              IP Address
            </label>
            <input
              type="text"
              value={newInternet.ipAddress || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, ipAddress: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />

            <label className="text-sm text-end font-medium text-gray-700">
              Subnet Mask
            </label>
            <input
              type="text"
              value={newInternet.subnetMask || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, subnetMask: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Gateway
            </label>
            <input
              type="text"
              value={newInternet.gateway || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, gateway: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              value={newInternet.accountNumber || ""}
              onChange={(e) =>
                setNewInternet({
                  ...newInternet,
                  accountNumber: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Account Name
            </label>
            <input
              type="text"
              value={newInternet.accountName || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, accountName: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Provider
            </label>
            <input
              type="text"
              value={newInternet.provider || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, provider: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Bandwidth
            </label>
            <input
              type="text"
              value={newInternet.bandwidth || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, bandwidth: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Connection Type
            </label>
            <input
              type="text"
              value={newInternet.connectionType || ""}
              onChange={(e) =>
                setNewInternet({
                  ...newInternet,
                  connectionType: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Account Username
            </label>
            <input
              type="text"
              value={newInternet.accountUsername || ""}
              onChange={(e) =>
                setNewInternet({
                  ...newInternet,
                  accountUsername: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />
            <label className="text-sm text-end font-medium text-gray-700">
              Account Password
            </label>
            <input
              type="text"
              value={newInternet.accountPassword || ""}
              onChange={(e) =>
                setNewInternet({
                  ...newInternet,
                  accountPassword: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />

            <label className="text-sm text-end font-medium text-gray-700">
              Support Contact
            </label>
            <input
              type="text"
              value={newInternet.supportContact || ""}
              onChange={(e) =>
                setNewInternet({
                  ...newInternet,
                  supportContact: e.target.value,
                })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />

            <label className="text-sm text-end font-medium text-gray-700">
              Support Email
            </label>
            <input
              type="text"
              value={newInternet.supportEmail || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, supportEmail: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />

            <label className="text-sm text-end font-medium text-gray-700">
              Support Phone
            </label>
            <input
              type="text"
              value={newInternet.supportPhone || ""}
              onChange={(e) =>
                setNewInternet({ ...newInternet, supportPhone: e.target.value })
              }
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1 focus:text-slate-800"
            />

            {/* Add more fields as needed */}
            <div className="col-span-2 flex gap-x-4 justify-end">
              <Button onClick={()=>navigate(-1)} variant="outline" type="reset" className="">
                Cancel
              </Button>
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateInternet;
