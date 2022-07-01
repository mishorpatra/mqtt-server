import User from '../schemas/userSchema.js'
import nodemailer from 'nodemailer'
import generator from 'generate-password'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(12)

export const sendOtp = (req, res) => {
    try {
        const { email } = req.body
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: 'inclunav@outlook.com',
                pass: 'Mishor$Admin'
            }
        })

        const otp = generator.generate({
            length: 6,
            numbers: true,
            lowercase: false,
            uppercase: false
        })

        const hashedOtp = parseInt(otp)*4081

        const options = {
            from: 'inclunav@outlook.com',
            to: email,
            subject: 'OTP for Sign up',
            text: `your one time password is ${otp}.\n\nThis OTP will expire in 5 miniutes`
        }

        transporter.sendMail(options, (err, info) => {
            if(err) {
                console.log(err)
                res.status(201).json({message: 'Something went wrong! Please try again'})
                return
            }
            console.log(info.response) 
            res.status(200).json({message: 'Mail sent successfully', otp: hashedOtp})
        })
    } catch(error) {
        console.log('Error while sending the mail ', error)
        res.status(500).json({message: 'Something went wrong! Please try again'})
    }
}

export const addUser = async (req, res) => {
    try {
        const { email, name, password } = req.body
        var hashedPassword = bcrypt.hashSync(password, salt)
        const newUser = new User({
            email,
            name,
            password: hashedPassword
        })
        const existing_user = await User.findOne({email: email})
        if(existing_user) return await res.status(201).json({message: 'User already exists!'})
        await newUser.save()
        return await res.status(200).json({message: 'user saved successfully'})
    } catch(error) {
        console.log(error)
        return await res.status(500).json({error: error})
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({email: email})
        if(!user) return await res.status(201).json({message: 'Incorrect username or password'})
        else {
            if(!bcrypt.compare(password, user.password)) return await res.status(201).json({message: 'Incorrect username or password'})
            else return await res.status(200).json({message: 'Logged in successfully', user})
        }
    } catch(error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}