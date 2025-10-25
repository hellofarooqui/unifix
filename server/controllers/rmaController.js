
import RMATicket from "../models/RMATicket.js"; // Assuming you have a model for RMA tickets



export const createRMATicket = async (req, res) => {
  try {
    const { rmaNumber, deviceName, deviceSerialNumber, reason } = req.body;

    if (!rmaNumber || !deviceName || !deviceSerialNumber || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTicket = new RMATicket({
      rmaNumber,
      deviceName,
      deviceSerialNumber,
      reason,
    });

    await newTicket.save();
    res.status(201).json({ message: "RMA ticket created successfully", newTicket });
  } catch (error) {
    console.error("Error creating RMA ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getAllRMATickets = async (req, res) => {
  try {
    const tickets = await RMATicket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching RMA tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getActiveRMAs = async (req,res) => {
  try {
    const tickets = await RMATicket.find({status : {$nin : ["Rejected","Completed"]}});
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching RMA tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getRMAbyNumber = async (req, res) => {
  try {
    const { rmanumber } = req.params;
    const ticket = await RMATicket.findOne({ rmaNumber: rmanumber });

    if (!ticket) {
      return res.status(404).json({ error: "RMA ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching RMA ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const updateRMAStatus = async (req, res) => {
  try {
    const { rmanumber } = req.params;
    const { status } = req.body;

    if (!rmanumber || !status) {
      return res.status(400).json({ error: "RMA number and status are required" });
    }

    const updatedTicket = await RMATicket.findOneAndUpdate(
      { rmaNumber: rmanumber },
      { status },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "RMA ticket not found" });
    }

    res.status(200).json({ message: "RMA ticket status updated successfully", updatedTicket });
  } catch (error) {
    console.error("Error updating RMA ticket status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const editRMATicket = async (req, res) => {
  try {
    const { rmanumber } = req.params;

    if (!rmanumber) {
      return res.status(400).json({ error: "Ticket not found" });
    }

    const updatedTicket = await RMATicket.findOneAndUpdate({rmaNumber:rmanumber}, req.body, { new: true });

    if (!updatedTicket) {
      return res.status(404).json({ error: "RMA ticket not found" });
    }

    res.status(200).json({ message: "RMA ticket updated successfully", updatedTicket });
  } catch (error) {
    console.error("Error updating RMA ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteRMATicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await RMATicket.findByIdAndDelete(id);

    if (!deletedTicket) {
      return res.status(404).json({ error: "RMA ticket not found" });
    }

    res.status(200).json({ message: "RMA ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting RMA ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// const getRMATicketById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const ticket = await RMATicket.findById(id);

//     if (!ticket) {
//       return res.status(404).json({ error: "RMA ticket not found" });
//     }

//     res.status(200).json(ticket);
//   } catch (error) {
//     console.error("Error fetching RMA ticket:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
