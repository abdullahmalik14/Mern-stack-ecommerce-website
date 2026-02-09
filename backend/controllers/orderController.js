const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    customerEmail,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user ? req.user._id : null, // handle guest checkout if needed, or enforce auth
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      customerEmail,
    });

    const createdOrder = await order.save();

    // Send Email (Async, non-blocking)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: "Order Confirmation",
        text: `Thank you for your order! Your Order ID is: ${createdOrder._id}. Total Amount: $${totalPrice}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email error:", error.message);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (emailErr) {
      console.log("Email setup error:", emailErr.message);
    }

    res.status(201).json(createdOrder);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

module.exports = { addOrderItems, getUserOrders };
