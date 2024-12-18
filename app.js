const express = require('express');
const app = express();
const { authenticate } = require('./middlewares/authenticateMiddleware.js');
const { authorizeBetCreator, authorizeGroupCreator } = require('./middlewares/authorizeMiddleware.js');
app.use(express.json());


// PUBLIC ROUTES
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const groupRoutes = require('./routes/groupRoutes');
app.use('/groups', groupRoutes);

const betRoutes = require('./routes/betRoutes');
app.use('/bets', betRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const friendshipsRoutes = require('./routes/friendshipsRoutes');
app.use('/friendships', friendshipsRoutes);

// TEST ROUTES
app.get('/protected', authenticate, (req, res) => {
    console.log('Route hit');
    res.status(200).json({ message: 'You are authorized!', userId: req.userId });
});

app.post('/test-authorization', authenticate, authorizeGroupCreator, (req, res) => {
    console.log('Route hit');
    res.status(200).json({ message: 'Action allowed', userId: req.userId });
});


app.listen(3000, () => console.log('Server running on port 3000'));
