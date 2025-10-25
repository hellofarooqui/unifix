import DeviceType from "../models/DeviceType.js";

const formatData =  (req,res,next) => {
    console.log(req.body);

    const importedDevices = req.body

    if(importedDevices.lenght < 1){
        return res.status(403)
    }

    let updatedTypes = importedDevices.map(async (device)=> { 
        const type = await DeviceType.findOne({name:toString(device.deviceType)})  
        return {...device, deviceType: type._id}
    
    })

    if(updatedTypes){
        console.log("Types updated ",updatedTypes)
        req.body = updatedTypes
        next();
    }
    
   
}

export default formatData