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
    try{
        await user.save();
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.header("Authorization").send({ 
            token, 
            user: { 
                name: user.name, 
                email: user.email, 
                role: user.role 
            } 
        });
        
    }catch(error) {
        return res.status(500).json({ message: 'Server error' });
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
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.header("Authorization", token).send(token);
})