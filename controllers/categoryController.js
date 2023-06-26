const categoryModel = require("../models/categoryModel")
const slugify = require('slugify')

exports.createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exist"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name) }).save()
        res.status(201).send({
            success: true,
            message: "New Category Created",
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Create Category",
            error
        });
    }
};

//Update Category
exports.updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while updating category",
            error
        });
    }
}

//GetAll Category
exports.categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Category List",
            category
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting all category",
            error
        });

    }
}

// Single Get Category
exports.singleCategoryController = async (req, res) => {
    try {
        // const { slug } = req.params
        const category = await categoryModel.findOne({ slug: req.params.slug })
        res.status(200).send({
            success: true,
            message: 'Get Single Category SUccessfully',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while getting single get category",
            error
        });
    }
}

//Delete Category
exports.deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category Deleted Successfully',
            category
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        });
    }
}