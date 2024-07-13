const express = require("express");
const router = express.Router();
const userCtrl=require("../controllers/userController")
const verifyToken=require('../middleware/verifyToken')
const verifyAdmin=require('../middleware/verifyAdmin')
router.get('/',verifyToken,verifyAdmin,userCtrl.getAllUsers)
router.post('/',userCtrl.createUser)
router.delete('/:id',verifyToken,verifyAdmin,userCtrl.deleteUser)
router.get('/admin/:email',verifyToken,userCtrl.getAdmin)
router.patch('/admin/:id',verifyToken,verifyAdmin,userCtrl.makeAdmin)




module.exports = router;
