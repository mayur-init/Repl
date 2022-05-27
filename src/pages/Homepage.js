import React from 'react'
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className='bg-zinc-900 h-screen min-w-max'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl text-zinc-300 p-4'>Code<span className='text-zinc-500'>Sync</span></h1>
        <Link to='/room'><button className='btn btn-primary m-4'>Rooms</button></Link>
      </div>
      <div className='grid place-content-center h-full'>
        <p className='text-2xl text-zinc-600 justify-center px-4 mx-4'>Currently homepage is not avalible, It will be avalible soon.</p>
      </div>
    </div>
  )
}

export default Homepage