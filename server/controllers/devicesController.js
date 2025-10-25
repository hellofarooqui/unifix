import Device from "../models/Device.js";
import DeviceType from "../models/DeviceType.js";
import Project from "../models/Projects.js";
import User from "../models/User.js";
import Vendor from "../models/Vendor.js";

export const getDeviceCount = async (req, res) => {
  const deviceCount = await Device.estimatedDocumentCount();
  console.log("Execute for count");
  return res.status(200).json({ deviceCount });
};

export const getAllDevices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const q = req.query.q || "";

    console.log("SearchParams", q);
    console.log("Page:", page, "Limit:", limit, "Skip:", skip);

    // Build query object
    let query = {};
    if (q) {
      query.status = q;
    }

    // Get total count based on the query
    const totalDevices = await Device.countDocuments(query);
    console.log("Total devices found:", totalDevices);

    // Get devices with the same query
    const devices = await Device.find(query)
      .populate(["deviceType"])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate pagination info
    const totalPages = Math.ceil(totalDevices / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    console.log("Returning devices:", devices.length);

    return res.status(200).json({
      devices,
      pagination: {
        currentPage: page,
        totalPages,
        totalDevices,
        devicesPerPage: limit,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDeviceById = async (req, res) => {
  try {
    console.log("Being called");
    const { deviceId } = req.params;
    const device = await Device.findById(deviceId).populate([
      "deviceType",
      "supportTickets",
    ]);

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    if(device.assignedTo){
      if (device.assignedTo?.modelType == "User") {
        const user = await User.findById(device.assignedTo.data);
        device.assignedTo.data = user;
      } else {
        const project = await Project.findById(device.assignedTo.data);
        device.assignedTo.data = project;
      }
    }

   

    const projects = await Project.find().select({ projectName: 1 });
    const users = await User.find().select({ fullName: 1 });

    const deviceStatusEnums = Device.schema.path("status").enumValues;
    const response = { ...device, deviceStatusEnums };
    return res
      .status(200)
      .json({
        data: device,
        deviceStatusEnums: deviceStatusEnums,
        projects,
        users,
      });
  } catch (error) {
    console.log("Get Device By ID");
    console.error("Error fetching device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createDevice = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { deviceType, deviceName, deviceSerialNumber, vendor, notes, image } =
      req.body;
    const newDevice = new Device({
      deviceType,
      deviceName,
      deviceSerialNumber,
      notes,
      image,
      vendor,
    });
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const importDevices = async (req, res) => {
  console.log("Type of req body", typeof req.body);
  try {
    const data = req.body;
    data.forEach(async (device) => {
      console.log("Device", device);
      const deviceType = await DeviceType.findOne({ name: device.deviceType });
      if (!deviceType) {
        return res.status(404);
      }

      const foundVendor = await Vendor.findOne({ name: device.vendor });
      if (!foundVendor) {
        return res.status(404);
      }
      const deviceAdded = new Device({
        ...device,
        deviceType: deviceType._id,
        vendor: foundVendor._id,
        deviceSerialNumber: device.deviceSerialnumber,
      });
      await deviceAdded.save();
      return res.status(201).json({ success: true });
    });
  } catch (error) {
    console.log(error);
    return res.status(404);
  }
};
export const updateDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const {
      deviceName,
      deviceSerialNumber,
      notes,
      image,
      status,
      assigneeType,
      assignedTo,
    } = req.body;
    console.log("Req Body", req.body);

    let updatedAssignedTo;

    if (assigneeType == "user") {
      updatedAssignedTo = { data: assignedTo, modelType: "User" };
    } else updatedAssignedTo = { data: assignedTo, modelType: "Project" };
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      {
        deviceName,
        deviceSerialNumber,
        notes,
        image,
        status,
        assignedTo: updatedAssignedTo,
      },
      { new: true }
    );
    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const deletedDevice = await Device.findByIdAndDelete(deviceId);
    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const searchDevices = async (req, res) => {
  try {
    const { query } = req.query;
    console.log("Search query:", query);
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }
    const devices = await Device.find({
      $or: [
        { deviceName: { $regex: query, $options: "i" } },
        { deviceSerialNumber: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error searching devices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
