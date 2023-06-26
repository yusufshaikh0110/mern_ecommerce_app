import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyle.css"
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/auth'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const location = useLocation()

    //Form Function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            // console.log(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <Layout title="Login - Ecommer App">
            <div className="form-container" style={{ minHeight: "90vh" }}>
                <form onSubmit={handleSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input type="email" value={email} className="form-control" id="exampleInputPassword1" placeholder='Enter Your E-mail' onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <input type="password" value={password} className="form-control" id="exampleInputEmail1" placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>
                    </div>
                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </form>
            </div>
        </Layout>
    )
}

export default Login
