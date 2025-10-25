import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema({
  ticket_number: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device",
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  vendor_details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  activites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Activity",
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;
