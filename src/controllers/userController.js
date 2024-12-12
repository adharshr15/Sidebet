const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createUser = async (username, email, name, password) => {
  const user = await prisma.user.create({
    data: {
      username,  // Make sure this is passed in
      email,
      name, 
      password,
    },
  });

  return user;
};


// READ
const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

// UPDATE
const updateUser = async (id, data) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });
  return user;
};

// DELETE
const deleteUser = async (id) => {
  await prisma.user.delete({
    where: { id },
  });
  return { message: 'User deleted' };
};

module.exports = { createUser, getUsers, updateUser, deleteUser };
