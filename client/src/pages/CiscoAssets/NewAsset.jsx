import ImportBulkAsset from "@/components/custom/CiscoAssets/ImportBulkAsset";
import { Button } from "@/components/ui/button";
import { Import } from "lucide-react";
import React, { use, useState } from "react";
import { LuImport } from "react-icons/lu";

const defaultAsset = {
  site: "",
  health: "",
  pakSerialNumber: "",
  contractNumber: "",
  productNumber: "",
  productLabel: "",
  endOfSupport: Date.now(),
  productDescription: "",
  productType: "",
  instanceNumber: "",
  productRelationship: "",
  parentInstanceNumber: "",
  startDate: Date.now(),
  endDate: Date.now(),
  contractLineStatus: "",
  poNumber: "",
  soNumber: "",
  maintenancePONumber: "",
  maintenanceSONumber: "",
  doNotRenewReasonCode: "",
  warrantyType: "",
  warrantyEndDate: Date.now(),
  productShipDate: Date.now(),
};

const NewAsset = () => {
  const [asset, newAsset] = useState(defaultAsset);
  const [showImportModal, setShowImportModal] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
  };

  const handleCancel = () => {};

  const handleAddDeviceSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-6">
      {showImportModal && (
        <ImportBulkAsset setShowImportModal={setShowImportModal} />
      )}
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold">New Asset</p>
        <div>
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-white font-semibold px-6 py-2 rounded-md border flex  items-center gap-x-2"
          >
            <LuImport />
            Import
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md">
        <form
          onSubmit={handleAddDeviceSubmit}
          onReset={handleCancel}
          className="grid grid-cols-1 sm:grid-cols-4 gap-y-4 gap-x-6"
        >
          <label htmlFor="deviceType">
            Site
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Health
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Serial Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Contract Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Product number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Product Label
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            End of Support
            <input
              type="date"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.endOfSupport}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Product Description
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Product Type
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Instance Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Product Relationship
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Parent Instance Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Start Date
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            End Date
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Contract Line Status
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            PO Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            SO Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Maintenance PO Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Maintenance SO Number
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>

          <label htmlFor="deviceType">
            Do Not Renew Reason Code
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Warranty Type
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Warranty End Date
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <label htmlFor="deviceType">
            Product Ship Date
            <input
              type="text"
              id="site"
              name="site"
              placeholder="Enter device name"
              required
              value={asset.site}
              onChange={(e) => setDevice({ ...asset, site: e.target.value })}
              className="block mt-1 flex-1 border border-slate-300 rounded-sm px-2 py-1"
            />
          </label>
          <div></div>
          <div className="flex col-span-4 gap-x-4 items-center justify-end mt-4">
            <Button variant="outline" type="reset" className=" self-end px-8">
              Cancel
            </Button>
            <Button type="submit" className=" self-end px-8">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAsset;
