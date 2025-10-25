import Vendor from "../models/Vendor.js"

export const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendors", error: error.message });
    }
}

export const getVendorsList = async (req, res) => {
    try {
        const vendors = await Vendor.find().select([ "name"]);
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vendor list", error: error.message });
    }
}

export const addVendor = async (req, res) => {
    try {
        
        const newVendor = new Vendor(req.body);
        console.log(req.body)
        await newVendor.save();
        res.status(201).json(newVendor);
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({ message: "Error adding vendor", error: error.message });
    }
}

export const updateVendor = async (req, res) => {

}

export const deleteVendor = async (req, res) => {

}

