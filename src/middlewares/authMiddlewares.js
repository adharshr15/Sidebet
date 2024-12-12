import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    // creates list out of token
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // verifies token using JWT_SECRET env variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized', error });
    }
}