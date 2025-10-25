import { Card, CardDescription } from "./../ui/card"



const DeviceCard = ({ device }) => {
  return (
    <Card className="p-4 bg-white hover:bg-gray-100 transition-shadow duration-300 ease-in-out">
      <CardDescription>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{device.deviceName}</h2>
          <p className="text-sm text-gray-500">{device.deviceSerialNumber}</p>
        </div>
      </CardDescription>
    </Card>
  );
};

export default DeviceCard;
