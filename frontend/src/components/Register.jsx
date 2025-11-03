import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = ({setUser}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
   
    async function handelSubmit(e){
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/users/register',{
                username, email,password
            })
            localStorage.setItem("token",data.token)
            setUser(data)
            navigate('/')

        } catch (error) {
            setError(error.response?.data?.message || 'Server Error')
        }
    }

  return (
    <div className='container mx-auto max-w-md bg-white mt-10 p-6 rounded-lg shadow-md text-black'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Register</h2>
        {error && (
            <p className='text-center mb-4 text-red-500'>{error}</p>
        )}
        <form onSubmit={handelSubmit} className='space-y-4'>
            <div>
                <input
                type="username"
                placeholder='Username'
                value={username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                className='text-black text-2xl w-full border  rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <input
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                className='text-black text-2xl w-full border  rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <div>
                <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                className='text-black text-2xl w-full border  rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400'
                required
                />
            </div>
            <button className='border w-full bg-blue-500 text-white text-xl hover:bg-blue-700 active:scale-95 rounded p-1'>Signup</button>
        </form>
        <p className='text-center mt-2 text-lg'>Already have an account?<Link to='/login' className='text-blue-300 hover:underline'>Login</Link> </p>
    </div>
  )
}

export default Register