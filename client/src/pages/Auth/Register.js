import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyle.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

    //Form Function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer });
            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/login");
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            // console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text" value={name} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" id="exampleInputPassword1" placeholder='Enter Your E-mail' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={phone} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone No.' onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={address} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} className="form-control" id="exampleInputEmail1" placeholder='What is Your Favorite Sport?' onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>
            </div>
        </Layout>
    )
}

export default Register
