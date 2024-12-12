const express = require('express');
const app = express();
import { authenticate } from './src/middlewares/authMiddleware.js';

app.use(express.json());


// PUBLIC ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/groups', groupRoutes);

const betRoutes = require('./routes/betRoutes');
app.use('/bets', betRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes)


// PROTECTED ROUTES
app.get('/protected', authenticate, (req, res) => {
    res.status(200).json({ message: 'You are authorized!', userId: req.userId });
});


app.listen(3000, () => console.log('Server running on port 3000'));
