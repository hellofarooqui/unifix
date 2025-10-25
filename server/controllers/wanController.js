import WAN from "../models/WAN.js";
import express from "express";

export const getAllWanConnections = async (req, res) => {
  try {
    const wans = await WAN.find();
    res.status(200).json(wans);
  } catch (error) {
    console.error("Error fetching WANs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getWanById = async (req, res) => {
  const { wanId } = req.params;
  try {
    const wan = await WAN.findById(wanId);
    if (!wan) {
      return res.status(404).json({ message: "WAN connection not found" });
    }
    res.status(200).json(wan);
  } catch (error) {
    console.error("Error fetching WAN by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const createWanConnection = async (req, res) => {
  try {
    const newWAN = new WAN(req.body);
    await newWAN.save();
    res.status(201).json(newWAN);
  } catch (error) {
    console.error("Error creating WAN connection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateWanConnection = async (req, res) => {
  const { wanId } = req.params;
  try {
    const updatedWAN = await WAN.findByIdAndUpdate(wanId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedWAN) {
      return res.status(404).json({ message: "WAN connection not found" });
    }
    res.status(200).json(updatedWAN);
  } catch (error) {
    console.error("Error updating WAN connection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteWanConnection = async (req, res) => {
  const { wanId } = req.params;
  try {
    const deletedWAN = await WAN.findByIdAndDelete(wanId);
    if (!deletedWAN) {
      return res.status(404).json({ message: "WAN connection not found" });
    }
    res.status(200).json({ message: "WAN connection deleted successfully" });
  } catch (error) {
    console.error("Error deleting WAN connection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getWanStatus = async (req, res) => {
  try {
    // Logic to get WAN status
    const status = "active"; // Placeholder for actual status logic
    res.status(200).json({ status });
  } catch (error) {
    console.error("Error fetching WAN status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateWanSettings = async (req, res) => {
  try {
    // Logic to update WAN settings
    const updatedSettings = req.body; // Placeholder for actual settings update logic
    res
      .status(200)
      .json({ message: "WAN settings updated successfully", updatedSettings });
  } catch (error) {
    console.error("Error updating WAN settings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
