import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import useDevices from "../../hooks/useDevices";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHeader } from "../../context/HeaderContext";



const defaultNewDevice= {
  name: "",
  description: "",
};

const NewDeviceType = () => {
  const {header,setHeader} = useHeader()
  const navigate = useNavigate();
  const [newDeviceType, setNewDeviceType] =
    useState<NewDeviceType>(defaultNewDevice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addNewDeviceType } = useDevices();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await addNewDeviceType(newDeviceType);
      if (response) {
        console.log(response);
        toast("Successfully added device type");

        setTimeout(() => {
          setNewDeviceType(defaultNewDevice);
          navigate(-1);
        }, 1000);
      }
    } catch (error) {
      setError(error.message);
      toast("Error in adding device type");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHeader({...header,title:"New Device Type"})
  }, []);

  return (
    <div>
      
      <div className="p-6">
        <div className="bg-white rounded-md shadow-sm p-8 w-full max-w-[800px]">
          <form
            onSubmit={handleFormSubmit}
            className="grid grid-cols-[150px_auto] gap-y-6 gap-x-4 items-center"
          >
            <label htmlFor="name" className="text-end font-semibold">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={newDeviceType.name}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
              onChange={(e) =>
                setNewDeviceType({ ...newDeviceType, name: e.target.value })
              }
            />
            <label htmlFor="description" className="text-end font-semibold">
              Description
            </label>
            <input
              id="description"
              name="description"
              value={newDeviceType.description}
              className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
              onChange={(e) =>
                setNewDeviceType({
                  ...newDeviceType,
                  description: e.target.value,
                })
              }
            />
            <div className="col-span-2 flex justify-end gap-x-4 mt-4">
              <Button variant="outline">Cancel</Button>
              <Button>{loading ? <Loader2 /> : "Save"}</Button>
            </div>
          </form>
          {error && <p>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default NewDeviceType;
