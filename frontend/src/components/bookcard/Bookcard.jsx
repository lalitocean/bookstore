import React from 'react'
import { Link } from "react-router-dom"
import Favourite from '../Profile/Favourite'
import axios from 'axios'

const Bookcard = ({ dataprops, favourite }) => {
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: dataprops._id
    }
    const handleremovebook = async () => {
        const res = await axios.put("http://localhost:8080/api/v1/rem-from-fav", {}, { headers })
        alert(res.data.message)
    }

    return (
        <>

            <div className=' bg-blue-300 p-4 rounded flex flex-col  gap-1'>
                <div> <Link to={`/view-book-details/${dataprops._id}`} >
                    <div className='bg-pink-200 flex justify-center items-center rounded'>
                        <img src={dataprops.url} alt="/" className='h-[25vh]' /></div>
                    <h2 className='text-xl font-semibold'>Title:- {dataprops.title}</h2>
                    <p className='font-semibold'>By {dataprops.author} </p>
                    <p className='text-xl font-semibold'> {dataprops.price} </p>
                </Link></div>
                {
                    favourite && (
                        <button className='bg-yellow-100 text-black p-2' onClick={handleremovebook} >
                            Remove
                        </button>
                    )
                }
            </div>


        </>
    )
}

export default Bookcard