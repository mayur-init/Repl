import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast'

function SideBar() {

    const reactNavigator = useNavigate();
    useEffect(() => {
     toast.success(`User has joined`);
    }, [])
    
    const leaveRoom = () => {
        toast.success('User has leaved the room');
        //redirect to login page
        reactNavigator('/room');
      };

    return (
        <div className='flex flex-col min-w-max h-full justify-between'>
            <h1 className='text-2xl text-zinc-400 m-4'>Code<span>Sync</span></h1>
            <div className='flex flex-col'>
                <button className='btn btn-primary self-center m-2'>Invite</button>
                <button onClick={leaveRoom} className='btn btn-danger self-center m-2'>Exit</button>
            </div>
        </div>
    )
}

export default SideBar