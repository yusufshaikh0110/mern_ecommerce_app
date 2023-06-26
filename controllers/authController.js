const userModel = require('../models/userModel')
const orderModel = require('../models/orderModel')
const { hashPassword, comparePassword } = require('../helpers/authHelper')
const JWT = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        //validation
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }
        if (!answer) {
            return res.send({ message: "Answer is required" })
        }

        //Check User
        const existingUser = await userModel.findOne({ email: email })

        //Existing User
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register, Please Login'
            })
        }

        //Register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save()

        res.status(200).send({
            success: true,
            message: 'User Register Successfully',
            user
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

//POST Login
exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Email or Password',
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not Registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password',
                user
            })
        }
        //Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        res.status(200).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
};

//FOrgot Password
exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" })
        }
        //Check
        const user = await userModel.findOne({ email, answer })
        //Validation
        if (!user) {
            res.status(400).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        });
    }
}


//test controller
exports.testController = (req, res) => {
    try {
        res.send("protected Route");
    } catch (error) {
        res.send({ error });
    }
};

//update prfole
exports.updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//Orders
exports.getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting Orders',
            error
        })
    }
}

//All Orders
exports.getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: "-1" })
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting Orders',
            error
        })
    }
}

//order status
exports.orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while Updating Order',
            error
        })
    }
}