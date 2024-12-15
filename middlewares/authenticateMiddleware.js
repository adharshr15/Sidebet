const jwt = require('jsonwebtoken')

// checks if a valid jwt token is in header
// allows request to proceed to route if valid
// sends unauthorized error if not

const authenticate = (req, res, next) => {
    // creates list out of header to find token
    console.log('Authenticate middleware hit');

    const token = req.headers.authorization?.split(' ')[1];
    console.log(token)
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // verifies token using JWT_SECRET env variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("req.userId: " + req.userId)
        console.log("decoded.userId" + decoded.userId)
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error });
    }
}

module.exports = { authenticate }