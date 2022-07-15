import React from 'react'
import Avatar from 'react-avatar'

function Client({userName}){
  return (
    <div className='client my-4'>
        <Avatar name={userName} size='30px' round='14px'/>
        <span className='text-zinc-400 ml-2'>{userName}</span>
    </div>
  )
}

export default Client