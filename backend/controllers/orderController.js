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

      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: "malikabdullahmalik14@gmail.com",
        subject: "New Order Received",
        text: `A new order has been placed!\nOrder ID: ${createdOrder._id}\nTotal Amount: $${totalPrice}\nCustomer Email: ${customerEmail}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Customer email error:", error.message);
        } else {
          console.log("Customer email sent");
        }
      });

      transporter.sendMail(adminMailOptions, (error, info) => {
        if (error) {
          console.log("Admin email error:", error.message);
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

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.status = req.body.status || order.status;
    if (req.body.status === "Delivered") {
        order.isDelivered = true;
    }
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

module.exports = { addOrderItems, getUserOrders, getOrders, updateOrderStatus };
