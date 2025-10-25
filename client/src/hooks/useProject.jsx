import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
const API_URL = `${serverUrl}/api/projects`;

const useProject = () => {
  const addNewProject = async (projectData) => {
    //console.log("Project Data" , projectData)
    const response = await axios.post(API_URL, projectData);
    return response.data;
  };

  const getAllProjects = async () => {
    const response = await axios.get(API_URL);

    if(response){
      //console.log("Projects",response.data)
      return response.data;
    }
    
  };

  const getProjectDetails = async (projectId) => {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
  };

  const updateProjectDetials = async (projectId, updateData) => {
    const response = await axios.put(`${API_URL}/${projectId}`, updateData);
    return response.data;
  };

  const deleteProject = async (projectId) => {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data;
  };

  return {
    addNewProject,
    getAllProjects,
    getProjectDetails,
    updateProjectDetials,
    deleteProject,
  };
};

export default useProject;
