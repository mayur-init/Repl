import React from 'react';
import { Link, useParams } from 'react-router-dom';

function WhiteBoard() {
  const { roomId } = useParams();
  return (
    <div className='overflow-hidden'>
      <iframe className='responsive-iframe w-full h-[106.4vh] fixed' src="https://miro.com/app/live-embed/uXjVOqR9F_Q=/?moveToViewport=-1076,-531,2150,1061" frameBorder="0" scrolling="no" allowFullScreen></iframe>
      <div className='bg-white fixed z-10 top-0 w-full h-[6vh]'>
        <Link to={`/room/${roomId}`}><button className='flex justify-end btn btn-primary m-2 z-10'>Editor</button></Link>
      </div>
    </div>
  )
}

export default WhiteBoard;