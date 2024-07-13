const express = require("express");
const router = express.Router();
const cartCtrl=require("../controllers/cartController")
const verifyToken=require('../middleware/verifyToken')






router.get("/",verifyToken,cartCtrl.getCartsByEmail);
router.post("/",cartCtrl.addToCart);
router.delete("/:id",cartCtrl.deleteCart);
router.put("/:id",cartCtrl.updateCart);
router.get("/:id",cartCtrl.getSingleCart);







module.exports = router;