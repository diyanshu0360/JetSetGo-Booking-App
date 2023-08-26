import express from 'express';
import User from '../models/User.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// UPDATE
router.put('/:id', verifyUser, async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, {new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
})

// DELETE
router.delete('/:id', verifyUser, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel Deleted successfully!");
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET
router.get('/:id', verifyUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET ALL
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
})

export default router;
