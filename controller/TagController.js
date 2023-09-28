import Tag from "../schemas/TagSchema.js";


export const handleTags = async (tagData) => {
    try {
        const { tagId } = tagData
        let response = await Tag.findOne({ tagId })
        if(!response) {
            let newTag = new Tag(tagData)
            await newTag.save()
        }
        else {
            await Tag.updateOne({ tagId }, tagData)
        }
    } catch(error) {
        console.log('Error while getting the data ', error)
    }
}