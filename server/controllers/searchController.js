import Device from "../models/Device.js";
import SupportTicket from '../models/SupportTicket.js'

export const getSearchResults = async (req, res) => {
    try {
        const { term } = req.query;

        // Validate the query
        if (!term || typeof term !== "string") {
          return res.status(400).json({ error: "Invalid search query" });
        }

        // Perform the search logic here
        // This is a placeholder for actual search logic
        // You would typically query your database or data source here
        const results = {}; // Replace with actual search results
     
        const devices = await Device.find({
          $or: [
            { deviceName: { $regex: term, $options: "i" } }, // Case-insensitive search in name
            { deviceSerialNumber: { $regex: term, $options: "i" } },
            
          ],
        }).populate({
            path: 'deviceType',
            select: 'name',
        });

        // Example of how you might structure the results
        // results.push({ id: 1, name: 'Example Result', description: 'This is an example.' });

        const tickets = await SupportTicket.find({
          $or: [
            { ticket_number: { $regex : term, $options: "i"} },
            { title : { $regex : term , $options: "i"}}
          ]
        })

        res.status(200).json({ devices, tickets });
    } catch (error) {
        console.error('Error in getSearchResults:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}