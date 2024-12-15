const express = require('express');
const { authenticate } = require('../middlewares/authenticateMiddleware.js');
const { authorizeBetCreator } = require('../middlewares/authorizeMiddleware.js');
const { createBet, getBets, updateBet, deleteBet } = require('../controllers/betController');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const bet = await createBet(req.userId, req.body);
    res.json(bet);
});

router.get('/', authenticate, async (req, res) => {
    const bets = await getBets(req.userId);
    res.json(bets);
});
  
router.put('/:id', authenticate, authorizeBetCreator, async (req, res) => {
    const bet = await updateBet(
        parseInt(req.params.id), 
        req.body
    );
    res.json(bet);
});
  
router.delete('/:id', authenticate, authorizeBetCreator, async (req, res) => {
    await deleteBet(parseInt(req.params.id));
    res.json({ message: 'Bet deleted' });
});

module.exports = router;