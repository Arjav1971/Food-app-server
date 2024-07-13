const express = require("express");
const router = express.Router();
const menuCtrl=require("../controllers/menuController")




router.get("/",menuCtrl.getAllMenuItems);
router.post("/",menuCtrl.postMenuItem);
router.delete("/:id",menuCtrl.deleteMenuItem);
router.get("/:id",menuCtrl.singleMenuItem);
router.patch("/:id",menuCtrl.updateMenuItem);




module.exports = router;
