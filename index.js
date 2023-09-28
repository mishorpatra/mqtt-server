
import mqtt from 'mqtt'
import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import Connection from './database/db.js';
import { handleTags } from './controller/TagController.js';
import TagStatus from './schemas/TagSchemaStatus.js';




const app = express()
app.use(cors())
dotenv.config()

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})



Connection().then(() => {
  const mqttClient = mqtt.connect('mqtt://10.194.180.3:1883');


  mqttClient.on('connect', async () => {
    try {
      let response = await TagStatus.find({})
      response.map(tag => {
        mqttClient.subscribe(`dwm/node/${tag.tagId}/uplink/location`);
      })
      const changeStream = TagStatus.watch()
      changeStream.on('change', async (change) => {
        TagStatus.find().then((data) => {
        data.map(tag => {
          mqttClient.subscribe(`dwm/node/${tag.tagId}/uplink/location`);
        })
      })
    })

    } catch(error) {
      console.log("Error while getting all tags", error)
    }
  });
  
  mqttClient.on('message', async (topic, message) => {
    const data = message.toString();
    const res = JSON.parse(data);
    // let tagData = {...res.position, tagId: topic.split("/")[2]}
    let tagData = {
      x: res.position.x*3.2804,
      y: res.position.y*3.2804,
      z: res.position.z*3.2804,
      quality: res.position.quality,
      tagId: topic.split("/")[2],
      floor: process.env.FLOOR,
      buildingId: process.env.BUILDING_ID
    }

   

    if(tagData.quality > 20) await handleTags(tagData)


  });

})


