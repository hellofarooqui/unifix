import React from "react";
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: `${serverUrl}/api/cisco`,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiFormdata = axios.create({
  baseURL: `${serverUrl}/api/cisco`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const useCisco = () => {
  const addMultipleAssets = async (assets) => {
    console.log("Assets",assets);
    return api.post(
      "/assets-multiple",
       assets ,
      {
        headers:{
            "Content-Type":"multipart/form-data"
        }
      }
    );
  };

  const addSingleAsset = async (asset) => {};

  const getAllAssets = async ({ page, limit }) =>
    api.get("/assets",{
      params: {
        page: page,
        limit: limit,
      },
    });

  const getAssetById = async (id) => {};

  const updateAsset = async (id, updatedData) => {};

  const deleteAsset = async (id) => {};
  return {
    addMultipleAssets,
    addSingleAsset,
    getAllAssets,
    getAssetById,
    updateAsset,
    deleteAsset,
  };
};

export default useCisco;
