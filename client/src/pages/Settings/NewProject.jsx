import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { useHeader } from "../../context/HeaderContext";
import useProject from "../../hooks/useProject";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const defaultProject = {
  projectName: "",
  projectDescription: "",
  location: "",
};

const NewProject = () => {

    const {header,setHeader} = useHeader()
    const [project,setProject] = useState(defaultProject)
    const { addNewProject } = useProject();
    const navigate = useNavigate()

    const handleReset = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await addNewProject(project)
            if(!response){
                toast("There is some error")
                return
            }

            toast("Project Added Successfully")
            navigate(-1)
        }
        catch(error){
            toast("There is some error");
            return;
        }
    }

    useEffect(()=>{
        setHeader({...header, title:"New Project"})
    },[])


  return (
    <div className="p-6">
      <div className="bg-white rounded-md p-6 shadow-sm border overflow-hidden">
        <form onSubmit={handleSubmit} onReset={handleReset} className="grid grid-cols-[150px_auto] gap-x-4 gap-y-4">
          <label>Name</label>
          <input
            className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            id="projectName"
            placeholder="Project Name"
            onChange={(e) =>
              setProject({ ...project, projectName: e.target.value })
            }
          />

          <label>Description</label>
          <input
            className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            id="projectDescription"
            placeholder="Project Description"
            onChange={(e) =>
              setProject({ ...project, projectDescription: e.target.value })
            }
          />

          <label>Location</label>
          <input
            className="flex-1 border border-slate-300 rounded-sm px-2 py-1"
            id="location"
            placeholder="Project Location"
            onChange={(e) =>
              setProject({ ...project, location: e.target.value })
            }
          />
          <div className="col-span-2 flex justify-end gap-x-2">
            <Button type="reset" variant="outline">Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
