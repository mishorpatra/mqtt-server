import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Router from './routes/router.js'



const app = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', Router)
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ', process.env.PORT)
})

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}).then(
    console.log('Database is connected')
).catch(error => {
    console.log(error)
})



