import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    logo: {
      type: String,
      // URL or path to the vendor's logo image
    },
  },
  { timestamps: true }
);
const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;