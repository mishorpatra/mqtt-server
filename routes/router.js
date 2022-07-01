import express from 'express'
import { sendLocation } from '../controller/locationController.js'
import { addUser, sendOtp, loginUser } from '../controller/userController.js'
import { saveDevice, getDevices } from '../controller/adminController.js'

const Router = express.Router()

Router.get('/locate/:id', sendLocation)
Router.post('/user/send-otp', sendOtp)
Router.post('/user/save-user', addUser)
Router.post('/user/login', loginUser)

Router.post('/admin/save-device', saveDevice)
Router.get('/admin/all-devices', getDevices)

export default Router