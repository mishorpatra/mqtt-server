import express from 'express'
import { sendLocation } from '../controller/locationController.js'

const Router = express.Router()

Router.get('/locate/:id', sendLocation)

export default Router