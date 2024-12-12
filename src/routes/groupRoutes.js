const express = require('express');
const { createGroup, getGroups, updateGroup, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.post('/', async (req, res) => {
    const group = await createGroup(
        req.body.name,
        req.body.creatorId
    );
    res.json(group);
});

router.get('/', async (req, res) => {
    const groups = await getGroups();
    res.json(groups);
});
  
router.put('/:id', async (req, res) => {
    const group = await updateGroup(
        parseInt(req.params.id), 
        req.body
    );  
    res.json(group);
});
  
router.delete('/:id', async (req, res) => {
    await deleteGroup(parseInt(req.params.id));
    res.json({ message: 'Group Deleted' });
});
  
module.exports = router;