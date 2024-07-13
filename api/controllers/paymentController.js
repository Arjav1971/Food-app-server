const Payments = require("../model/Payments");
const Cart = require("../model/Carts");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Add payments
const addPayments = async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payments.create(payment);
    // delete cart after payment
    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });
    res.status(200).json({ paymentRequest, deleteCartRequest });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get payments of a particular user
const getPayments = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ mesaage: "Forbidden Access" });
    }
    const result = await Payments.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get all payments
const getAllOrders=async(req,res)=>{
  try {
    const orders=await Payments.find({})
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}
// change order status
const changeStatus = async (req, res) => {
  const paymentId = req.params.id;
  const { transactionId, email, price, quantity, status } = req.body;
  try {
    const updatedTransaction = await Payments.findByIdAndUpdate(
      paymentId,
      { status: "Completed" },
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) {
      res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  const paymentId = req.params.id;
  try {
    const deletedOrder = await Payments.findByIdAndDelete(paymentId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order doesn't exists!" });
    }
    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPayments,
  addPayments,
  changeStatus,
  deleteOrder,
  getAllOrders
};
