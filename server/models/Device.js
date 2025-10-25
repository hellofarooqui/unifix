import mongoose, { Schema } from "mongoose";

// const assignedToSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//     enum : ['Project' , 'User']
//   }
// }, {discriminatorKey : 'type'})

// const AssignedTo = mongoose.model("AssignedTo",assignedToSchema)

const DeviceSchema = new mongoose.Schema(
  {
    deviceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeviceType",
      required: true,
    },
    deviceName: {
      type: String,
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    deviceSerialNumber: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    image: {
      type: String,
    },
    supportTickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SupportTicket",
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "ASSIGNED", "MAINTENANCE"],
      default: "ACTIVE",
    },
    assigneeType: {
      type: String,
      enum: ["user", "project"],
    },
    assignedTo: {
      type: {
        modelType: {
          type: String,
          enum: ["User", "Project"],
          required: true,
        },
        data: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    },
    addedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

DeviceSchema.index({ deviceName: 1, deviceSerialNumber: "1" });

const Device = mongoose.model("Device", DeviceSchema);
export default Device;
