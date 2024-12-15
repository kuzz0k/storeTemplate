const {Basket} = require('../models/models')
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError')




exports.showCart = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const cart = await Basket.findOne({ userId: id }).populate('products.productId');
    res.json(cart);
};



exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(id)
    let cart = await Basket.findOne({ userId: id });
    //проверка наличия товара в корзине
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    
    if(productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  
    await cart.save();
    res.json({ message: 'Product added to cart!' });
};



exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    let cart = await Basket.findOne({ userId: id });

    const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json({ message: 'Product deleted from cart!' });
};



exports.updateCart = async (req, res) => {
  const { productId, newQuantity } = req.body;
  const token = req.header('Authorization').replace('Bearer ', '');
  const { id } = jwt.verify(token, 'secretKey');
  let cart = await Basket.findOne({ userId: id });
  const productIndex = cart.products.findIndex(p => p._id.toString() === productId);
  cart.products[productIndex].quantity = newQuantity;

  await cart.save();
  res.json({ message: 'Quantity updated' })
};
