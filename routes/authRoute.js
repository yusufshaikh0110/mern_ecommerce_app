const express = require('express')
const { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } = require('../controllers/authController')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')


//router object
const router = express.Router()

//routing
//Register || Method POST
router.post('/register', registerController)

//Login || POST
router.post('/login', loginController)

//Forgot Password
router.post('/forgot-password', forgotPasswordController)

//test dummy
router.get('/test', requireSignIn, isAdmin, testController)

//protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

//protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrdersController)

//All orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//order  status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

module.exports = router