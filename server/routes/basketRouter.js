const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware')


router.get('/', authMiddleware, basketController.showCart);
router.post('/add', authMiddleware, basketController.addToCart);
router.delete('/delete', authMiddleware, basketController.removeFromCart)
router.patch('/update', authMiddleware, basketController.updateCart)


module.exports = router