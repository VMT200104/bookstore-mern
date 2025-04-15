import TryCatch from "../middleware/TryCatch.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const newOrder = TryCatch(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    // Update stock for each ordered item
    for (const item of orderItems) {
      const updatedProduct = await updateStock(item.product, item.quantity);
      console.log(`Stock updated for ${updatedProduct.name}: ${updatedProduct.stock}`);
    }

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export const getSingleOrder = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

export const myOrders = TryCatch(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

export const getAllOrders = TryCatch(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  
  if (!product) {
    throw new Error(`Product not found with id: ${id}`);
  }

  if (product.Stock < quantity) {
    throw new Error(`Not enough stock for product: ${product.name}`);
  }

  product.Stock = product.Stock - quantity;
  await product.save({ validateBeforeSave: false });

  console.log(`Updated stock for product ${id}: ${product.Stock}`);
  return product;
}

export const updateOrder = TryCatch(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found with this Id",
    });
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
      success: false,
      message: "You have already delivered this order",
    });
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
  });
});

export const deleteOrder = TryCatch(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found with this Id",
    });
  }

  res.status(200).json({
    success: true,
  });
});
