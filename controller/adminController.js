import Device from "../schemas/deviceSchema.js"

export const saveDevice = async (req, res) => {
    try {
        const { device_code } = req.body
        const newDevice = new Device({
            device_code,
            available: true
        })
        await newDevice.save()
        return res.status(200).json({ message: 'Device saved successfully' })
    } catch(error) {
        console.log('Error while saving the data ', error)
        res.status(500).json({message: error})
    }
}

export const getDevices = async (req, res) => {
    try {
        const devices = await Device.find({})
       // console.log(devices)
        return await res.status(200).json(devices)
    } catch (error) {
        console.log('Error while getting all the devices ', error)
        res.status(500).json({message: error})
    }
}