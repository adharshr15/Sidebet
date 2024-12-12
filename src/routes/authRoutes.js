const express = require('express')
const { signup } = require('../controllers/authController')
const router = express.Router()

router.post('/signup', async (req, res) => {
    const auth = await signup(req.body);
    res.json(auth);
});

router.post('login', async (req, res) => {
    const auth = await login(req.body);
    res.json(auth);
})

module.exports = router;