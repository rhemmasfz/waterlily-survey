const db = require('../db/database');
const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (!user || user.length === 0) {
            res.status(401).json({message: 'Invalid email or password'});
        } else {
            const validPassword = await bcrypt.compare(password, user[0].password);
            if (!validPassword) {
                res.status(401).json({message: 'Invalid email or password'});
            } else {
                const token = jwt.sign({user_id: user[0].user_id}, 'secret', {expiresIn: '1h'});
                res.json({token});
            }
        }
    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
});

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser && existingUser.length > 0) {
            res.status(400).json({message: 'User already exists'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

        res.json({message: 'User Created', user_id: user.insertId});
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
});

module.exports = router;