import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupportTicket",
      required: true,
      index: true, // Important for query performance
    },
    activityType: {
      type: String,
      required: true,
      enum: [
        "CREATED",
        "STATUS_CHANGED",
        "PRIORITY_CHANGED",
        "ASSIGNED",
        "UNASSIGNED",
        "COMMENT_ADDED",
        "ATTACHMENT_ADDED",
        "CLOSED",
        "REOPENED",
        "ESCALATED",
        "RESOLVED",
        "UPDATED",
      ],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    previousValue: mongoose.Schema.Types.Mixed, // For tracking old values
    newValue: mongoose.Schema.Types.Mixed, // For tracking new values
  },
  { timestamps: true }
);

    
const Activity = mongoose.model("Activity", activitySchema);
export default Activity;