const {Basket, BasketDevice, Device} = require('../models/models')
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError')


class BasketController {
  async showCart(req, res) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);
        const basket = await Basket.findOne({
            where: { userId: id },
            include: [
                {
                    model: BasketDevice,
                    as: 'basket_device',
                    attributes: ['quantity'],
                    include: [
                        {
                            model: Device,
                            as: 'device',
                        }
                    ]
                }
            ]
        });
  
        const devicesWithQuantity = basket.basket_device.map(bd => ({
            ...bd.device.get(),
            quantity: bd.quantity
        }));
  
        return res.json(devicesWithQuantity);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
  };


  async addToCart(req, res) {
      const { deviceId, quantity } = req.body;
      const token = req.headers.authorization.split(' ')[1]
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      console.log(id)
      let basket = await Basket.findOne({ userId: id });

      BasketDevice.create({
        deviceId: deviceId,
        basketId: basket.id,
        quantity: quantity
      })
      
      

      res.json({ message: 'Product added to cart!' });
  };



  async removeFromCart(req, res) {
    const { productId } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    let cart = await Basket.findOne({ userId: id });

    const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json({ message: 'Product deleted from cart!' });
  };



  async updateCart(req, res) {
    const { productId, newQuantity } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const { id } = jwt.verify(token, 'secretKey');
    let cart = await Basket.findOne({ userId: id });
    const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
    cart.products[productIndex].quantity = newQuantity;

    await cart.save();
    res.json({ message: 'Quantity updated' })
  };
}





module.exports = new BasketController()