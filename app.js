const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
