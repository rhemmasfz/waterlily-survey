const db = require('../db/database');
const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/:email', async function(req, res, next) {

    try {
        const user = await db.query('SELECT * from users WHERE email = ?', [req.params.email || '']);

        if (!user || user.length === 0) {
            res.status(404).json({message: 'User not found'});
        } else {
            res.json({user_id: user[0], email: user[0].email, password: user[0].password});
        }
    } catch (error) {
        res.status(500).json({message: 'Error retrieving user', error: error.message});
    }
});

module.exports = router;
