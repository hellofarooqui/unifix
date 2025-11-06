import csv from "csv-parser";
import fs from "fs";
import parseDate from "../utils/parseDate.js";
import CiscoAsset from "../models/CiscoAsset.js";

const fieldMap = {
  Site: "site",
  Health: "health",
  "PAK/Serial Number": "pakSerialNumber",
  "Contract Number": "contractNumber",
  "Product Number": "productNumber",
  "Product Label": "productLabel",
  "End of Support": "endOfSupport",
  "Product Description": "productDescription",
  "Product Type": "productType",
  "Instance Number": "instanceNumber",
  "Product Relationship": "productRelationship",
  "Parent Instance Number": "parentInstanceNumber",
  "Start Date": "startDate",
  "End Date": "endDate",
  "Contract Line Status": "contractLineStatus",
  "PO Number": "poNumber",
  "SO Number": "soNumber",
  "Maintenance PO Number": "maintenancePONumber",
  "Maintenance SO Number": "maintenanceSONumber",
  "Do Not Renew Reason Code": "doNotRenewReasonCode",
  "Warranty Type": "warrantyType",
  "Warranty End Date": "warrantyEndDate",
  "Product Ship Date": "productShipDate",
};

export const addMultipleCiscoAssets = async (req, res) => {
  try {
    const results = [];
    const filePath = req.file.path;
    let stoppedEarly = false;

    const readStream = fs.createReadStream(filePath);
    const parser = csv();

    readStream
      .pipe(parser)
      .on("data", (row) => {
        // if the row is empty (all values empty/whitespace), stop further processing
        const isEmptyRow = Object.values(row).every(
          (val) =>
            val === undefined || val === null || String(val).trim() === ""
        );

        if (isEmptyRow) {
          stoppedEarly = true;
          // stop streams
          try {
            parser.destroy();
          } catch (e) {}
          try {
            readStream.destroy();
          } catch (e) {}

          // insert whatever we have so far and respond
          (async () => {
            try {
              if (results.length) await CiscoAsset.insertMany(results);
              fs.unlinkSync(filePath);
              res.status(200).json({
                message: "CSV processing stopped at empty row",
                count: results.length,
              });
            } catch (err) {
              console.error(err);
              res.status(500).json({ error: "Database insert failed" });
            }
          })();

          return;
        }

        const record = {};

        for (const key in row) {
          const mappedKey = fieldMap[key.trim()];
          if (mappedKey) {
            let value = row[key].trim();
            if (
              mappedKey.includes("Date") ||
              mappedKey.includes("endOfSupport")
            ) {
              value = parseDate(value);
            }
            record[mappedKey] = value || "";
          }
        }
        results.push(record);
      })
      .on("end", async () => {
        if (stoppedEarly) return;
        try {
          await CiscoAsset.insertMany(results);
          fs.unlinkSync(filePath); // remove uploaded file
          res.status(200).json({
            message: "CSV processed successfully",
            count: results.length,
          });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Database insert failed" });
        }
      })
      .on("error", (err) => {
        if (stoppedEarly) return;
        console.error(err);
        res.status(500).json({ error: "File processing failed" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "File processing failed" });
  }
};
// ...existing code...

export const addSingleCiscoAsset = async (req, res) => {
  try {
    const assetData = req.body;
    
    // Convert date strings to Date objects
    for (const key in assetData) {
      if (key.includes('Date') || key.includes('endOfSupport')) {
        assetData[key] = parseDate(assetData[key]);
      }
    }

    const newAsset = new CiscoAsset(assetData);
    await newAsset.save();
    
    res.status(201).json({
      message: "Asset created successfully",
      asset: newAsset
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create asset" });
  }
};

export const getAllCiscoAssets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const total = await CiscoAsset.countDocuments({});
    const assets = await CiscoAsset.find({})
      .limit(limit)
      .skip(skipIndex)
      .sort({ _id: -1 });

    res.status(200).json({
      ok:true,
      assets,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
};

export const getCiscoAssetById = async (req, res) => {
  try {
    const asset = await CiscoAsset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: "Asset not found" });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch asset" });
  }
};

export const updateCiscoAsset = async (req, res) => {
  try {
    const updateData = req.body;
    
    // Convert date strings to Date objects
    for (const key in updateData) {
      if (key.includes('Date') || key.includes('endOfSupport')) {
        updateData[key] = parseDate(updateData[key]);
      }
    }

    const updatedAsset = await CiscoAsset.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.status(200).json({
      message: "Asset updated successfully",
      asset: updatedAsset
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update asset" });
  }
};

export const deleteCiscoAsset = async (req, res) => {
  try {
    const deletedAsset = await CiscoAsset.findByIdAndDelete(req.params.id);
    
    if (!deletedAsset) {
      return res.status(404).json({ error: "Asset not found" });
    }

    res.status(200).json({
      message: "Asset deleted successfully",
      asset: deletedAsset
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete asset" });
  }
};