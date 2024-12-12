const express = require('express');
const { createBet, getBets, updateBet, deleteBet } = require('../controllers/betController');
const { updateUser } = require('../controllers/userController');
const { updateGroup } = require('../controllers/groupController')
const router = express.Router();

router.post('/', async (req, res) => {
    const bet = await createBet(req.body);
    res.json(bet);
});

router.get('/', async (req, res) => {
    const bets = await getBets();
    res.json(bets);
});
  
router.put('/:id', async (req, res) => {
    const bet = await updateBet(
        parseInt(req.params.id), 
        req.body
    );
    res.json(bet);
});
  
router.delete('/:id', async (req, res) => {
    await deleteBet(parseInt(req.params.id));
    res.json({ message: 'Bet deleted' });
});

module.exports = router;