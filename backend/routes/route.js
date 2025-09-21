const express = require("express");
const router = express.Router();
const {addSweet, getAllSweets, searchSweets, updateSweet, removeSweet} = require('../controllers/sweets')
const {purchaseSweet, restockSweet} = require('../controllers/inventory')
const {signup, login} = require('../controllers/user')
const authMiddleware = require("../middleware/auth");
const adminOnly = require("../middleware/admin");

router.post('/auth/register', signup);
router.post('/auth/login', login);

router.post('/sweets', authMiddleware, adminOnly, addSweet);
router.get('/sweets/search', authMiddleware, searchSweets)
router.put('/sweets/:id', authMiddleware, adminOnly, updateSweet);
router.delete('/sweets/:id',authMiddleware, adminOnly, removeSweet);

router.post('/sweets/:id/purchase', authMiddleware, purchaseSweet);
router.post('/restock', authMiddleware, adminOnly, restockSweet);

module.exports = router;