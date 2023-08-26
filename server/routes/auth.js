import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).send("newUser has been created");
    } catch (error) {
        res.status(500).json(error);
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!user || !isPassword) {
            return res.status(500).json("User or password is incorrect!");
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, { httpOnly:true }).status(200).json({...otherDetails});
        // The HTTP-ONly cookie nature is that it will be only accessible by the server application. Client apps like javascript-based apps can't access the HTTP-Only cookie
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;
