import React, { useEffect, useState } from 'react'
import useProject from '../../hooks/useProject'
import { Loader2 } from 'lucide-react';

const ListProjects = () => {

  const { getAllProjects } = useProject();
  const [projects,setProjects] = useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError] = useState("")

  const fetchProjectDetails = async () => {
    try {
      const response = await getAllProjects();

      if (response) {
        //console.log(response)
        setProjects(response);
        setError("");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
   fetchProjectDetails()
  },[])

  if(loading){
    return (<Loader2 className='animate-spin' />)
  }

  if(error){
    return(<div>
      <p>{error}</p>
    </div>)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {projects.map((project) => (
        <div key={project._id} className="bg-white border rounded-md p-4">
          <p className="text-xl font-semibold mb-2">{project.projectName}</p>
          <p className="text-slate-500 text-sm line-clamp-1">
            {project.projectDescription}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ListProjects