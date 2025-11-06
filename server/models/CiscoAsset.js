import mongoose from "mongoose";

const ciscoAssetSchema = new mongoose.Schema(
  {
    site: String,
    health: String,
    pakSerialNumber: String,
    contractNumber: String,
    productNumber: String,
    productLabel: String,
    endOfSupport: Date,
    productDescription: String,
    productType: String,
    instanceNumber: String,
    productRelationship: String,
    parentInstanceNumber: String,
    startDate: Date,
    endDate: Date,
    contractLineStatus: String,
    poNumber: String,
    soNumber: String,
    maintenancePONumber: String,
    maintenanceSONumber: String,
    doNotRenewReasonCode: String,
    warrantyType: String,
    warrantyEndDate: Date,
    productShipDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model("CiscoAsset", ciscoAssetSchema);
