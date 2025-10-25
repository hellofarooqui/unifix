import React from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'


const serverUrl = import.meta.env.VITE_SERVER_URL

const API_URL = `${serverUrl}/api/wan`

const useInternet = () => {

    const {token} = useAuthContext()

    const fetchInternetConnections = async () => {
        try {
            const response = await axios.get(API_URL)
            if (response.status !== 200) {
                throw new Error('Failed to fetch internet connections')
            }
            return response.data
        } catch (error) {
            console.error('Error fetching internet connections:', error)
            throw error
        }
    }

    const addNewInternet = async  (data) => {
        try{
            const response = await axios.post(`${API_URL}/new`, data , {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status !== 201){
                throw new Error("unable to add new internet")
            }
            return response.data
        }
        catch(error){
            //console.log("Error adding new internet connection:", error)
            throw error
        }
    }

    const fetchInternetConnectionById = async (internetId) => {
      try {
        const response = await axios.get(`${API_URL}/${internetId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch internet connection");
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching internet connection:", error);
        throw error;
      }
    };
    const updateInternetConnection = async (internetId, data) => {
        try {
            const response = await axios.put(`${API_URL}/update/${internetId}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                throw new Error('Failed to update internet connection')
            }
            return response.data
        } catch (error) {
            console.error('Error updating internet connection:', error)
            throw error
        }
    }
    const deleteInternetConnection = async (internetId) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${internetId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status !== 200) {
                throw new Error('Failed to delete internet connection')
            }
            return response.data
        } catch (error) {
            console.error('Error deleting internet connection:', error)
            throw error
        }
    }
  return {fetchInternetConnections , addNewInternet, fetchInternetConnectionById, updateInternetConnection, deleteInternetConnection}
}

export default useInternet