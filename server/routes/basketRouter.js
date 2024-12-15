const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware')


//передает корзину для userId
router.get('/', authMiddleware, basketController.showCart);

//добавить в корзину
router.post('/add', authMiddleware, basketController.addToCart);

//удаляет товар из корзины
router.delete('/delete', authMiddleware, basketController.removeFromCart)

//изменяет quantity у товара
router.patch('/update', authMiddleware, basketController.updateCart)


module.exports = router