import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import { createUser } from '../controllers/userController';

// SIGNUP
const signup = async (username, email, name, password) => {

    // hashes password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 11);
    
    // uses userController's createUser function to create new user on signup
    const user = await createUser(username, email, name, hashedPassword);

    // generate jwt for this new user
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return (token, user)
}

// LOGIN
const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { throw new Error('Failed to login') };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) { throw new Error('Invalid Credentials')};

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return (token, user)
}
