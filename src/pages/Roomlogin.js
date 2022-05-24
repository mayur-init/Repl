import React from 'react'


function Roomlogin() {
  return (
    <div className='bg-gray-800 h-screen grid place-items-center min-w-max p-4'>

      <div className='container bg-gray-700 w-1/4 p-7 flex flex-col rounded-xl min-w-max'>
        <h1 className='text-2xl text-white mb-6'>Code<span className='text-green-500 px-1'>Sync</span></h1>
       
        <h4 className='text-white py-2'>Paste your room Id</h4>
        <input type='text' placeholder='roomId' className='px-3 py-1 mb-6 rounded-md'></input>

        <input type='text' placeholder='username' className='px-3 py-1 mb-6 rounded-md'></input>

        <button className='btn btn-primary'>submit</button>

        <span className='text-white py-1 text-sm self-end'>
          if you haven't an invite then create&nbsp;
          <button className='text-green-500 hover:text-green-600 pt-2'>new room</button>
          
        </span>
      </div>
    </div>
  )
}

export default Roomlogin