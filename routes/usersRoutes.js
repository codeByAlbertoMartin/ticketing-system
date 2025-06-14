import 'dotenv/config';
import espress from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = espress.Router();

//POST /api/users/signup
router.post('/signup', async (req, res) => {
    let user;
    user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({ message: 'User already exists' });
    }
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role 
    });
    try {
        await user.save();
        
        const token = jwt.sign(
            {
                _id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );
        
        res
            .status(201)
            .header("Authorization", token)
            .send({
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
       
    } catch (error) {
        res.status(500).send("Something went wrong." + error.message);
    }
})

//POST /api/users/login
router.post('/login', async (req, res) => {
    let user
    user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.header("Authorization", token).send(token);
})

export default router;