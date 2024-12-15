const express = require('express');
const { authenticate } = require('../middlewares/authenticateMiddleware');
const { authorizeGroupCreator } = require('../middlewares/authorizeMiddleware')
const { createGroup, getGroups, updateGroup, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const group = await createGroup(req.userId, req.body.name);
    res.json(group);
});

router.get('/', authenticate, async (req, res) => {
    const groups = await getGroups(req.userId);
    res.json(groups);
});
  
router.put('/:id', authenticate, authorizeGroupCreator, async (req, res) => {
    const group = await updateGroup(
        parseInt(req.params.id), 
        req.body
    );  
    res.json(group);
});
  
router.delete('/:id', authenticate, authorizeGroupCreator, async (req, res) => {
    await deleteGroup(parseInt(req.params.id));
    res.json({ message: 'Group Deleted' });
});
  
module.exports = router;