import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Profile/Sidebar'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

const Profile = () => {
    const [profile, setProfile] = useState()
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                console.log("calling in profile.jsx")
                const res = await axios.get("http://localhost:8080/api/v1/user-details", { headers })
                console.log(res.data)
                setProfile(res.data)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchdata()
    }, [])
    // * fetch user details


    return (
        <>

            <div className='bg-yellow-300 px-12 py-8 flex flex-col md:flex-row h-screen w-full gap-4'>
                {!profile && (<div className='w-full h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>)}
                {profile && (<>
                    <div className='w-full md:w-1/6'> <Sidebar data={profile} /></div>
                    <div className='w-full md:w-5/6'><Outlet /></div>
                </>)

                }

            </div>

        </>
    )
}

export default Profile