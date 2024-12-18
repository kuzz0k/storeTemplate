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
    try {
        const { deviceId, quantity } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const basket = await Basket.findOne({ where: { userId: id } });

        const basketDevice = await BasketDevice.findOne({
            where: { 
                deviceId: deviceId, 
                basketId: basket.id 
            }
        });

        if (basketDevice) {
            basketDevice.quantity += quantity;
            await basketDevice.save();
        } else {
            await BasketDevice.create({
                deviceId: deviceId,
                basketId: basket.id,
                quantity: quantity
            });
        }

        res.json({ message: 'Product added to cart!' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
  };



  async removeFromCart(req, res) {
    try {
        const { deviceId } = req.body;
        const token = req.headers.authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const basket = await Basket.findOne({ where: { userId: id } });

        const deleted = await BasketDevice.destroy({
            where: {
                basketId: basket.id,
                deviceId: deviceId
            }
        });

        if (deleted) {
            res.json({ message: 'Product deleted from cart!' });
        } else {
            res.status(404).json({ message: 'Product not found in cart!' });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }




  async updateCart(req, res) {
    try {
      const { deviceId, newQuantity } = req.body;
      const token = req.headers.authorization.split(' ')[1];
      const { id } = jwt.verify(token, process.env.SECRET_KEY);

      const basket = await Basket.findOne({ where: { userId: id } });

      const basketDevice = await BasketDevice.findOne({
          where: {
              basketId: basket.id,
              deviceId: deviceId
          }
      });

      basketDevice.quantity = newQuantity
      await basketDevice.save()

      return res.json('Количество обновлено')

    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Ошибка сервера' });
    }
  };
}





module.exports = new BasketController()