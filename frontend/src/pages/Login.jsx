import React, { useState } from 'react'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { authActions } from '../store/auth'
import { useDispatch } from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

axios.defaults.withCredentials = true;
const Login = () => {
    const [showp, setShowp] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    function handleonchange(e) {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handlesubmit(e) {
        e.preventDefault()
        await postdata()
    }
    // ^ post the login api 
    const postdata = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/sign-in", data);
            console.log(res.data)
            dispatch(authActions.login())
            dispatch(authActions.changerole(res.data.role))

            localStorage.setItem("id", res.data.id)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("role", res.data.role)

            navigate('/profile')
        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <section>
            <div className='container mx-auto p-5 mt-3'>

                <div className='w-full max-w-md bg-white mx-auto p-4 border-2 border-red-800'>
                    <div className='w-20   h-20 mx-auto'>

                    </div>
                    <form action="" onSubmit={handlesubmit} className='flex flex-col gap-5'>
                        <div className='grid  '>
                            <label htmlFor="email">Email:</label>
                            <div className='bg-slate-200 p-2'>
                                <input type="email"
                                    name='email'
                                    placeholder='example@gmail.com'
                                    onChange={handleonchange}
                                    value={data.email}
                                    className='w-full outline-none h-full bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label htmlFor="password">Password:</label>
                            <div className='bg-slate-200 p-2 flex items-center '>
                                <input type={showp ? "password" : "text"}
                                    name='password'
                                    placeholder='************'
                                    onChange={handleonchange}
                                    value={data.password}
                                    className='w-full outline-none h-full  bg-transparent' />
                                <div className='cursor-pointer' onClick={() => setShowp(!showp)}>
                                    <span> {
                                        showp ? < FaRegEyeSlash /> : <FaRegEye />
                                    }
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='hover:underline w-fit ml-auto block mt-2  hover:text-red-500'> forgot password</Link>
                        </div>
                        <button className='w-full max-w-[150px] rounded-md bg-red-600 text-white py-2 block mx-auto mt-5 hover:bg-red-700 hover:scale-110 hover:transition-all' >Login</button>
                    </form>
                    <p className='  py-5'>Don't have an account ?<Link to={'/sign-up'} className='hover:underline text-lg ms-3 hover:text-red-500'>Sign-Up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login