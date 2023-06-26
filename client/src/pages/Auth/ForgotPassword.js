import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyle.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {

    const [email, setEmail] = useState("")
    const [newPassword, setNewpassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

    //Form Function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
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
        <Layout title="Forgot Password - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" id="exampleInputemail1" placeholder='Enter Your E-mail' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={answer} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Favorite Sport' onChange={(e) => setAnswer(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={newPassword} className="form-control" id="exampleInputEmail1" placeholder='Enter Your New Password' onChange={(e) => setNewpassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword
