const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser } = require('./userController');

// SIGNUP
const signup = async (authData) => {
    const {
        username,
        email,
        password
    } = authData;
    
    // hashes password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 11);
    
    // uses userController's createUser function to create new user on signup
    const user = await createUser(username, email, hashedPassword);

    // generate jwt for this new user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return user
}

// LOGIN
const login = async (authData) => {
    const {
        email,
        password
    } = authData

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { throw new Error('Failed to login') };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { throw new Error('Invalid Credentials')};

    return user
}

module.exports = { signup, login }