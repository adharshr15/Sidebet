const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// CREATE
const createGroup = async (name, creatorId) => {
    const group = await prisma.group.create({
      data: {
        name,
        creatorId
      },
    });
  
    return group;
};

// READ
const getGroups = async () => {
    const groups = await prisma.group.findMany();
    return groups;
};
  
// UPDATE
const updateGroup = async (id, data) => {
    const group = await prisma.group.update({
        where: { id },
        data,
    });

    return group;
};
  
// DELETE
const deleteGroup = async (id) => {
    await prisma.group.delete({
        where: { id },
    });

    return { message: 'Group Deleted' };
};

module.exports = { createGroup, getGroups, updateGroup, deleteGroup };