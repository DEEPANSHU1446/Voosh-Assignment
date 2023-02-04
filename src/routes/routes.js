const express = require('express');
const router = express.Router();


const userController = require("../controller/usercontroller")
const orderController = require("../controller/ordercontroller")
const middleWare = require("../middleware/auth")



router.post("/add-user",userController.createUser)
router.post("/login-user",userController.loginUser)
router.post("/add-order",middleWare.authentication,middleWare.authorization,orderController.createOrder)
router.get("/get-order",middleWare.authentication,middleWare.authorization,orderController.getOrder)




module.exports = router