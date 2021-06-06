const {Router} = require('express');
const bcrypt = require('bcryptjs');
const validator = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const regEmail = require('../email/registration');
const config = require('config');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'managsystem07@gmail.com',
      pass: 'managementsystem07',
    },
});

const router = Router();
const {check, validationResult} = validator;

router.post(
    '/register', 
    [
        check('userName', 'Name cannot contain special characters').isAlphanumeric('pl-PL'),
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password is too short. At least 6 characters').isLength({min: 6})
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            });
        }

        const { userName, email, password } = req.body;
        const candidate = await User.findOne({ email });
        const sameName = await User.findOne({ userName });

        if (sameName) {
            return res.status(400).json({
                message: 'This name already exists, please use a different one',
            });
        }

        if (candidate) {
            return res.status(400).json({
                message: 'This user already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            userName,
            email,
            password: hashedPassword
        });

        await user.save();
        await transporter.sendMail(regEmail(email), (err, info) => {
            if (err) return console.log(err);
            console.log('Email sent: ', info);
        });
        res.status(201).json({
            message: 'User created successfully, confirmation came to your email',
        });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

router.post(
    '/login',
    [
        check('email', 'Enter correct email').isEmail(),
        check('password', 'Enter password').exists()
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during login'
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: `User isn't found`,
            });
        }
            
        const samePassword = await bcrypt.compare(password, user.password);
            
        if (!samePassword) {
            return res.status(400).json({
                message: 'Incorrect password, try again',
            });
        }

        const token = jwt.sign({ userId: user.id }, config.get('JWT_SECRET'), { expiresIn: '1h'});
        res.json({ token, userId: user.id });
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong, try again',
        });
    }
});

module.exports = router;