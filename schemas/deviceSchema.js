import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    device_code: {
        type: String,
        require: true
    },
    available: {
        type: Boolean,
        require: true
    }
})

const Device = mongoose.model('device', deviceSchema)
export default Device