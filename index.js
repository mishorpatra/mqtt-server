import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Router from './routes/router.js'
import neo4j from 'neo4j-driver'



const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
process.setMaxListeners(100)

//app.use('/', Router)
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ', process.env.PORT)
})


const driver = neo4j.driver(process.env.neo4j_URI, neo4j.auth.basic(process.env.USERNAME, process.env.PASSWORD))
const session = driver.session()

try {
    const result = await session.run(
      'MATCH (a:InclunavUser {email: "sudip108paul@gmail.com"}) RETURN a',
      { name: personName }
    )
  
    const singleRecord = result.records[0]
    const node = singleRecord.get(0)
  
    console.log(node.properties.name)
  } finally {
    await session.close()
  }
  





