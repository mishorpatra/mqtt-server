import mqtt from 'mqtt'


export const sendLocation = async (req, res) => {
    try {
        const { id } = req.params
        //console.log(id) //0579 or 177b
        const client  = mqtt.connect(`mqtt://${process.env.BROKER_ADDRESS.toString()}:${process.env.BROKER_PORT}`)
        client.on('connect', function () {
            client.subscribe(`dwm/node/${id}/uplink/location`, function (err) {
              if (err) {
                console.log(err)
              }
            })
          })
         // console.log('here')
          client.on('message', function (topic, message) {
            // message is Buffer
            // console.log(JSON.parse(message))
             res.status(200).json(JSON.parse(message))
             //console.log(JSON.parse(message))
             client.end()
            
          })

    } catch (error) {
        console.log('Error while getting the location ', error)
        return await res.status(500).json({message: error})
    }
}