import React from 'react'
import Editor from '../components/Editor'
import SideBar from '../components/SideBar'

function Room() {
  return (
    <div>
      <div className='flex flex-row'>
        <div className='w-1/12 h-screen bg-zinc-900 p-4 min-w-max'><SideBar/></div>
        <div className='w-11/12'><Editor/></div>
      </div>

    </div>
  )
}

export default Room