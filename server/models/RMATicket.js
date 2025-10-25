import mongoose from "mongoose";

const RMATicketSchema = new mongoose.Schema({
  rmaNumber: {
    type: String,
    required: true,
    unique: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceSerialNumber: {
    type: String,
    required: true,
  },
  requestedOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: [
      "Requested",
      "Processing",
      "Replacement Shipped",
      "Replacement Received",
      "Return Shipped",
      "Return Delivered",
      "Rejected",
      "Completed",
    ],
    default: "Requested",
  },
  reason: {
    type: String,
    required: true,
  },
});

const RMATicket = mongoose.model("RMATicket", RMATicketSchema);
export default RMATicket;
