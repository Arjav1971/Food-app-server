const express = require("express");
const Payments = require("../model/Payments");
const Cart = require("../model/Carts");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const paymentCtrl=require("../controllers/paymentController");
const verifyAdmin = require("../middleware/verifyAdmin");


router.post("/", verifyToken, paymentCtrl.addPayments);
router.get("/", verifyToken,verifyAdmin, paymentCtrl.getPayments);
router.get("/orders", verifyToken, paymentCtrl.getAllOrders);
router.patch('/status/:id',verifyToken,verifyAdmin,paymentCtrl.changeStatus)
router.delete('/:id',verifyToken,verifyAdmin,paymentCtrl.deleteOrder)

module.exports = router;
