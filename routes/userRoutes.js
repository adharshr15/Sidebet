const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = await createUser(req.body.username, req.body.email, req.body.password);
  res.json(user);
});

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.put('/:id', async (req, res) => {
  const user = await updateUser(parseInt(req.params.id), req.body);
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await deleteUser(parseInt(req.params.id));
  res.json({ message: 'User deleted' });
});

module.exports = router;
