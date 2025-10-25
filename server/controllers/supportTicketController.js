import SupportTicket from "../models/SupportTicket.js";
import Comment from "../models/Comment.js";
import Device from "../models/Device.js";

export const getAllSupportTicketsList = async (req, res) => {
  try {
    const tickets = await SupportTicket.find(
      {},
      {
        ticket_number: 1,
        title: 1,
        description: 1,
        status: 1,
        createdAt: 1,
        vendor_details: 1,
      }
    ).populate({
      path: "vendor_details",
      select: "name",
    });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllSupportTickets = async (req, res) => {
  try {
    if (req.query && req.query.status) {
      //console.log("Req query", req.query);
      let statusArray = req.query.status.split(",");
      console.log("Status Array", statusArray);
      const ticketsCount = await SupportTicket.countDocuments({
        status: { $in: statusArray },
      });
      if (ticketsCount) {
        console.log("Tickets Count", ticketsCount);
        return res.json(ticketsCount);
      }
      console.log("No tickets found with the given status");
      return res.status(201).json(0)
    }
    const tickets = await SupportTicket.find();
    return res.json(tickets);
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSupportTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.ticketId).populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email", // Adjust fields as needed
      },
    });
    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSupportTicketByNumber = async (req, res) => {
  try {
    const { ticketNumber } = req.params;
    console.log("Ticket Number", ticketNumber);

    const ticket = await SupportTicket.findOne({
      ticket_number: ticketNumber,
    })
      .populate(["vendor_details"])
      .populate([
        {
          path: "comments",
          populate: {
            path: "user",
            select: "name email", // Adjust fields as needed
          },
        },
        { path: "device", populate: { path: "deviceType" } },
      ]);

    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Error fetching comments for support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSupportTicket = async (req, res) => {
  try {
    console.log("Req Body", req.body);
    const { ticket_number, title, description } = req.body;
    if (!ticket_number || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const device_details = await Device.findById(req.body.device).populate([
      "vendor",
    ]);
    console.log("Device Details", device_details);
    const vendor_details = device_details.vendor._id;
    if (!vendor_details) {
      return res.status(400).json({ error: "Device not found" });
    }

    const newTicket = new SupportTicket({
      ...req.body,
      vendor_details,
    });

    // const newTicket = new SupportTicket({
    //   title,
    //   description,
    //   ticket_number // Example ticket number generation
    // });

    const ticketCreated = await newTicket.save();
    if (ticketCreated) {
      const updatedDeviceWithTicket = await Device.findByIdAndUpdate(req.body.device, {$push : {supportTickets : ticketCreated._id}}, {
        new: true,
      });
      return res.status(201).json(ticketCreated);
    }
  } catch (error) {
    console.error("Error creating support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const deletedTicket = await SupportTicket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json({ message: "Support ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCommentsByTicketId = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await SupportTicket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json(ticket.comments);
  } catch (error) {
    console.error("Error fetching comments for support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addCommentToSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { user, comment } = req.body;

    // if (!user || !comment) {
    //     return res.status(400).json({ error: "User and comment are required" });
    // }

    if (!comment) {
      return res.status(400).json({ error: "User and comment are required" });
    }

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    const newComment = new Comment({ user, comment });
    await newComment.save();

    ticket.comments.push(newComment._id);
    await ticket.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment to support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCommentFromSupportTicket = async (req, res) => {
  try {
    const { ticketId, commentId } = req.params;
    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    ticket.comments.pull(commentId);
    await ticket.save();
    await comment.remove();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment from support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCommentInSupportTicket = async (req, res) => {
  try {
    const { ticketId, commentId } = req.params;
    const { user, comment } = req.body;

    if (!user || !comment) {
      return res.status(400).json({ error: "User and comment are required" });
    }

    const ticket = await SupportTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    existingComment.user = user;
    existingComment.comment = comment;
    await existingComment.save();

    res.json(existingComment);
  } catch (error) {
    console.error("Error updating comment in support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
