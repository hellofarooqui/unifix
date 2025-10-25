import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      unqiue: true,
    },
    projectDescription: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold", "Cancelled"],
      default: "Active",
    },
    devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


const Project = mongoose.model("Project",projectSchema)

export default Project