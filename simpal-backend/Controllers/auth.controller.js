const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require ('dotenv').config();
const Users = require('../Models/user.model');

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const  existingUser = await Users.findOne({where: {email} });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already  registered' });
        }

        const newUser = await Users.create ({ name, email, password, role });
        res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

const login = async (req, res) =>{
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ id: user.id, name: user.name, role: user.role}, SECRET_KEY,{ expiresIn: '1d' });
        await user.update({last_login: new Date()});

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};

module.exports = { register, login };