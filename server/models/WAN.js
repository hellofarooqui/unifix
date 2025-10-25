import mongoose from "mongoose";

const wanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
     required: true,
      unique: true,
    },
    description: {
      type: String,
     // required: true,
      trim: true,
    },
    ipAddress: {
      type: String,
     // required: true,
      //unique: true,
      sparse: true
    },
    subnetMask: {
      type: String,
     // required: true,
    },
    gateway: {
      type: String,
     // required: true,
    },
    accountNumber: {
      type: String,
     // required: true,
      unique: true,
    },
    accountName: {
      type: String,
     // required: true,
    },
    provider: {
      type: String,
     // required: true,
    },
    bandwidth: {
      type: Number,
     // required: true,
      min: 0, // Bandwidth should be a non-negative number
    },
    connectionType: {
      type: String,
      enum: ["fiber", "dsl", "cable", "satellite", "wireless"],
     // required: true,
    },
    accountUsername: {
      type: String,
    },
    accountPassword: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    supportContact: {
      type: String,
     // required: true,
    },
    supportEmail: {
      type: String,
     // required: true,
      match: /.+\@.+\..+/,
    },
    supportPhone: {
      type: String,
     // required: true,
      
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const WAN = mongoose.model('WAN', wanSchema);
export default WAN;