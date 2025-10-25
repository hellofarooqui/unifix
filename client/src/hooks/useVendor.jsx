import React from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/vendor';


const useVendor = () => {

    const getAllVendors = async () => {
      try {
        const response = await axios.get(`${API_URL}/list`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch vendors");
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching vendors:", error);
        throw error;
      }
    };

    const getAllVendorsList = async () => {
        try {
            const response = await axios.get(`${API_URL}/list`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch vendors');
            }
            return response.data;   
        }
        catch (error) {
            console.error('Error fetching vendors:', error);
            throw error;
        }
    }
    const getVendorById = async (vendorId) => {
        try {
            const response = await axios.get(`${API_URL}/${vendorId}`);
            if (response.status !== 200) {
                throw new Error('Failed to fetch vendor');
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching vendor:', error);
            throw error;
        }
    }
    const createVendor = async (vendorData) => {
        try {
            const response = await axios.post(`${API_URL}/new`, vendorData);
            if (response.status !== 201) {
                throw new Error('Failed to create vendor');
            }
            return response.data;
        } catch (error) {
            console.error('Error creating vendor:', error);
            throw error;
        }
    }
    const updateVendor = async (vendorId, vendorData) => {
        try {
            const response = await axios.put(`${API_URL}/${vendorId}`, vendorData);
            if (response.status !== 200) {
                throw new Error('Failed to update vendor');
            }
            return response.data;
        } catch (error) {
            console.error('Error updating vendor:', error);
            throw error;
        }
    }
    const deleteVendor = async (vendorId) => {
        try {
            const response = await axios.delete(`${API_URL}/${vendorId}`);
            if (response.status !== 200) {
                throw new Error('Failed to delete vendor');
            }
            return response.data;
        } catch (error) {
            console.error('Error deleting vendor:', error);
            throw error;
        }
    }
  return { createVendor, getAllVendors,getAllVendorsList, getVendorById, updateVendor, deleteVendor }
}

export default useVendor