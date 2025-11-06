import express from "express";
import {
  addMultipleCiscoAssets,
  addSingleCiscoAsset,
  deleteCiscoAsset,
  getAllCiscoAssets,
  getCiscoAssetById,
  updateCiscoAsset,
} from "../controllers/ciscoController.js";
import uploadCiscoAssets from "../middleware/uploadCiscoAssets.js";

const router = express.Router();

router.post(
  "/assets-multiple",
  uploadCiscoAssets.single("csvFile"),
  (req, res, next) => {
    next();
    console.log("File uploaded:", req.file);
  },
  addMultipleCiscoAssets
);
router.post("/assets-single", addSingleCiscoAsset);
router.get("/assets", getAllCiscoAssets);
router.get("/assets/:id", getCiscoAssetById);
router.put("/assets/:id", updateCiscoAsset);
router.delete("/assets/:id", deleteCiscoAsset);

export default router;
