import AllAssets from "@/components/custom/CiscoAssets/AllAssets";
import RecentChanges from "@/components/custom/CiscoAssets/RecentChanges";
import { useHeader } from "@/context/HeaderContext";
import React, { useEffect } from "react";

const CiscoAssetsHome = () => {
  const { header, setHeader } = useHeader();

  useEffect(() => {
    setHeader({ ...header, title: "Cisco Assets" });
  }, []);
  return (
    <div className="p-4 flex flex-col gap-y-4">
      <RecentChanges />
      <AllAssets />
    </div>
  );
};

export default CiscoAssetsHome;
