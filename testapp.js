const express = require('express');
const app = express();
const { authenticate } = require('./middlewares/authMiddleware.js');

app.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: 'You are authorized!', userId: req.userId });
});

// Start server (use a test port for testing)
const PORT = 4000;
app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));