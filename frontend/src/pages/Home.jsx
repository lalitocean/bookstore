import React from 'react'
import Hero from '../components/Home/Hero'
import RecentlyAdded from '../components/Home/RecentlyAdded'

const Home = () => {
    return (

        <>
            <div className='px-10 py-8 bg-green-700' >
                <Hero />
                <RecentlyAdded />
            </div>
        </>
    )
}

export default Home