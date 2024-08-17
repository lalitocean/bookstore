import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ data }) => {
    return (
        <>
            <div className='bg-pink-400  p-4 rounded flex flex-col items-center justify-between h-[100%]'>
                <div>  <img src={data.avtar} alt="" />
                    <p>{data.username}</p>
                    <p>{data.email}</p></div>
                <div className='w-full mt-4 hidden bg-zinc-300 lg:block h-[1px]'></div>
                <div className='bg-green-200 p-4  flex flex-col gap-3 items-center justify-center'>

                    <Link className='text-2xl font-semibold bg-green-400 p-4' to="/profile" >Favourite</Link>
                    <Link className='text-2xl font-semibold bg-green-400 p-4' to="/profile/orderHistory">order History</Link>
                    <Link className='text-2xl font-semibold bg-green-400 p-4' to="/profile/settings" >Settings</Link>

                </div>
                <button>Logout</button>
            </div>

        </>
    )
}

export default Sidebar