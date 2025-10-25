import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL
const apiUrl = `${serverUrl}/api/rma`



const useRMA = () => {

    const createRMA = async (data) => {
        //console.log(data)
        try {
            const response = await axios.post(`${apiUrl}/new`, data)
            if(response.status !== 201) {
                throw new Error('Failed to create RMA')
            }
            return response.data
        } catch (error) {
            console.error('Error creating RMA:', error)
            throw error
        }
    } 

    const getAllRMAs = async () => {
        try {
            const response = await axios.get(apiUrl)
            if(response.status !== 200) {
                throw new Error('Failed to fetch RMAs')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching RMAs:', error)
            throw error
        }
    }

    const getRMADetails = async (rmanumber) => {
        try {
            const response = await axios.get(`${apiUrl}/${rmanumber}`)
            if(response.status !== 200) {
                throw new Error('Failed to fetch RMA details')
            }   
            return response.data
        } catch (error) {
            console.error('Error fetching RMA details:', error)
            throw error
        }
    }
    const editRMA = async (rmanumber , data) => {
        try {
            const response = await axios.put(`${apiUrl}/edit/${rmanumber}`, data)
            if(response.status !== 200) {
                throw new Error('Failed to update RMA')
            }
            return response.data
        } catch (error) {
            console.error('Error updating RMA:', error)
            throw error
        }
    }   

    const updateRMAStatus = async (rmaNumber, status) => {
        try {
            const response = await axios.put(`${apiUrl}/updateStatus/${rmaNumber}`, { status })
            if(response.status !== 200) {
                throw new Error('Failed to update RMA status')
            }
            return response.data
        } catch (error) {
            console.error('Error updating RMA status:', error)
            throw error
        }
    }
    const deleteRMA = async (rmaId) => {
        try {
            const response = await axios.delete(`${apiUrl}/delete/${rmaId}`)
            if(response.status !== 200) {
                throw new Error('Failed to delete RMA')
            }
            //console.log(response.data)
            return response.data
        } catch (error) {
            console.error('Error deleting RMA:', error)
            throw error
        }
    }   
    
    
  return {
    createRMA,
    getAllRMAs,
    getRMADetails,
    updateRMAStatus,
    editRMA,
    deleteRMA
  }
}

export default useRMA