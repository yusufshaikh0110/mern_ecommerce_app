const express = require('express')
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware')
const { createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController } = require('../controllers/categoryController')

const router = express.Router()

//routes
//Create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController);

//Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//GetAll Category
router.get('/get-category', categoryController)

//Single get category
router.get('/single-category/:slug', singleCategoryController)

//Delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

module.exports = router