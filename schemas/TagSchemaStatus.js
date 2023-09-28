import mongoose from 'mongoose'

const TagStatusSchema = mongoose.Schema({
    tagId: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    }
  })

  const TagStatus = mongoose.model("tagStatus", TagStatusSchema)
  export default TagStatus