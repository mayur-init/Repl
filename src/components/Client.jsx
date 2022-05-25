import React from 'react'
import Avatar from 'react-avatar'

function Client({userName}){
  return (
    <div className='client mb-4 ml-6'>
        <Avatar name={userName} size='30px' round='14px'/>
        <span className='text-slate-400 ml-2'>{userName}</span>
    </div>
  )
}

export default Client