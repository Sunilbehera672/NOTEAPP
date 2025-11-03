import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import axios from 'axios'

const App = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        async function fetchUser(){
            try {
                const token = localStorage.getItem("token")

                if(!token )return;

                const {data} = await axios.get('/api/users/me',{
                    headers:{Authorization: `Bearer ${token}`}
                })
                setUser(data)

            } catch (error) {
                localStorage.removeItem('token')
                console.log(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    },[])

    if(isLoading){
        return (
            <div className='bg-gray-950 min-h-screen flex items-center justify-center'>
                <div className='text-2xl text-white'>
                    Loading.....
                </div>
            </div>
        )
    }
  return (
    <div className='min-h-screen bg-gray-600 text-white'>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
            <Route path="/login" element={user ? <Navigate to='/'/> : <Login setUser={setUser}/>} />
            <Route path="/register" element={user ? <Navigate to='/'/> : <Register setUser={setUser}/>} />
            <Route path="/" element={user ? <Home /> : <Navigate to='/login'/>  } />
        </Routes>
    </div>
  )
}

export default App