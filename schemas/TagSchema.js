import mongoose from 'mongoose'

const TagSchema = mongoose.Schema({
    tagId: {
        type: String,
        require: true
    },
    x: {
        type: Number,
        require: true
    },
    y: {
        type: Number,
        require: true
    },
    z: {
        type: Number,
        require: true
    },
    quality: {
        type: Number,
        require: true
    },
    floor: {
        type: Number,
        require: true
    },
    buildingId: {
        type: String,
        requrie: true
    }
})

const Tag = mongoose.model("tag", TagSchema)
export default Tag