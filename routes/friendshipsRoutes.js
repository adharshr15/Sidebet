const express = require('express');
const { authenticate } = require('../middlewares/authenticateMiddleware.js');
const { authorizeFriendshipCreator } = require('../middlewares/authorizeMiddleware.js');
const { createFriendship, getFriendships, updateFriendship, deleteFriendship } = require('../controllers/friendshipsController.js');
const router = express.Router();


router.post('/', authenticate, async (req, res) => {
    const friendship = await createFriendship(req.userId, req.body);
    res.json(friendship);
});

router.get('/', authenticate, async (req, res) => {
    const friendships = await getFriendships(req.userId);
    res.json(friendships);
});
  
router.put('/:id', authenticate, authorizeFriendshipCreator, async (req, res) => {
    const friendship = await updateFriendship(
        parseInt(req.params.id), 
        req.body
    );
    res.json(friendship);
});
  
router.delete('/:id', authenticate, authorizeFriendshipCreator, async (req, res) => {
    await deleteFriendship(parseInt(req.params.id));
    res.json({ message: 'Friendship deleted' });
});

module.exports = router;