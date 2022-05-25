import React from 'react'

function Editor() {
  
  return (
    <div className='bg-zinc-800 p-4 h-screen flex flex-col min-w-max'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl text-zinc-400 m-4'>Code Playground</h1>
        <div className='w-auto self-center flex flex-col'>
          <button className='btn btn-primary mx-4'>Run</button>
        </div>

      </div>

      <div className='flex flex-row h-screen'>
        <div className='h-full w-8/12'>
          <textarea id='editor' className='p-2 bg-zinc-800 text-zinc-200 text-xl border-2 border-zinc-500 w-full rounded-md h-full'></textarea>
        </div>
        <div className='flex flex-col w-1/3'>
          <textarea className='text-xl bg-zinc-800 ml-2 mb-1 h-1/2 text-zinc-200 p-4 rounded-md border-2 border-zinc-500' placeholder='Input'></textarea>
          <textarea className='text-xl bg-zinc-800 ml-2 mt-1 h-1/2 text-zinc-200 p-4 rounded-md border-2 border-zinc-500' placeholder='Output'></textarea>
        </div>
      </div>
    </div>

  )
}

export default Editor