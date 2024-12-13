const express = require('express')
const { signup, login } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const router = express.Router()

router.post('/signup', async (req, res) => {
    try {
    const user = await signup(req.body);

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
      const authData = req.body;
      const user = await login(authData);
      
      // Note: Move token creation and response to the route handler
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

module.exports = router;