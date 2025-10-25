import DeviceType from "../models/DeviceType.js";

export const addDeviceType = async (req , res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required.' });
    }

    try {
        const newDeviceType = new DeviceType({
            name,
            description
        });

        await newDeviceType.save();
        res.status(201).json(newDeviceType);
    } catch (error) {
        console.error('Error creating device type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllDeviceTypes = async (req , res) => {
    try {
        const deviceTypes = await DeviceType.find();
        res.status(200).json(deviceTypes);
    } catch (error) {
        console.error('Error fetching device types:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const updateDeviceType = async (req , res) => {
    const { deviceTypeId } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required.' });
    }

    try {
        const updatedDeviceType = await DeviceType.findByIdAndUpdate(
            deviceTypeId,
            { name, description },
            { new: true }
        );

        if (!updatedDeviceType) {
            return res.status(404).json({ message: 'Device type not found.' });
        }

        res.status(200).json(updatedDeviceType);
    } catch (error) {
        console.error('Error updating device type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteDeviceType = async (req , res) => {
    const { deviceTypeId } = req.params;

    try {
        const deletedDeviceType = await DeviceType.findByIdAndDelete(deviceTypeId);

        if (!deletedDeviceType) {
            return res.status(404).json({ message: 'Device type not found.' });
        }

        res.status(200).json({ message: 'Device type deleted successfully.' });
    } catch (error) {
        console.error('Error deleting device type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getDeviceTypeById = async (req , res) => {
    const { deviceTypeId } = req.params;

    try {
        const deviceType = await DeviceType.findById(deviceTypeId);

        if (!deviceType) {
            return res.status(404).json({ message: 'Device type not found.' });
        }

        res.status(200).json(deviceType);
    } catch (error) {
        console.error('Error fetching device type:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

