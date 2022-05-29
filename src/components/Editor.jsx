import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';
import Dropdown from './Dropdown';

function Editor({ socketRef, roomId , onCodeChange}) {

  let editorRef = useRef(null);
  let inputRef = useRef('');


  useEffect(() => {
    async function init() {
      editorRef.current = CodeMirror.fromTextArea(document.getElementById('editor'), {
        mode: { name: 'javascript', json: true },
        theme: 'material-darker',
        lint: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineNumbers: true,
      });

      //listening for editor code change event
      editorRef.current.on('changes', (instance, changes) => {

        //console.log(changes[0].origin); //origin cut or input or paste or setValue
        //editorRef.current.setValue(`console.log('Hello world`)); //dynamic input 

        const origin = changes[0].origin;
        const code = instance.getValue();
        //console.log(code);

        //emiting code-change
        //console.log('emiting code...');
        //console.log(origin);
        //passing props to parent component
        onCodeChange(code);

        if (origin !== 'setValue') {
          socketRef.current.emit(ACTIONS.CODE_CHANGE,{
            roomId,
            code
          })
          //console.log(code);
        } 

      });

    }
    init();
    

    //cleaning function
    return () =>{
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    }
  }, []);

  useEffect(() => {

    if (socketRef.current) {
      //listening for code-change
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        //console.log(code);
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      }) 

      //listening for sync-code
      socketRef.current.on(ACTIONS.SYNC_CODE, ({code}) =>{
        if(code != null){
          editorRef.current.setValue(code);
        }
      })

    }

    //cleaning function
    return () =>{
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      socketRef.current.off(ACTIONS.SYNC_CODE);
    }
  }, [socketRef.current]);

  const ioClass = 'text-xl text-zinc-400 bg-zinc-800 ml-2 mt-1 h-1/2 p-4 rounded-md border-2 border-zinc-500'


 async function RunCode(){
   //make a axios call to the server
   
 }
  

  return (
    <div className='bg-zinc-800 p-4 h-screen flex flex-col min-w-max'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl text-zinc-400 m-4'>Code Playground</h1>
        <div className='self-center flex flex-row'>
          <Dropdown options={['C++', 'Java', 'Python']} onOptionSelect={(option) =>{
             socketRef.current.emit('lang_change',{
               lang: option,
               roomId
             });
            }} />
          <button className='btn btn-primary mx-4' onClick={RunCode}>Run</button>
        </div>
      </div>

      <div className='flex flex-row h-screen'>
        <div className='h-full w-8/12'>
          <textarea id='editor' className='p-2 bg-zinc-800 text-zinc-200 text-xl border-2 border-zinc-500 w-full rounded-md h-full'></textarea>
        </div>
        <div className='flex flex-col w-1/3'>
          <textarea className={ioClass} spellCheck='false' placeholder='Input'onChange={(e) => {inputRef.current = e.target.value}}></textarea>
          <div className={ioClass} onChange={(e) => {outputRef = e.target.value}}><p className='text-xl text-zinc-400'>Output</p></div>
        </div>
      </div>
    </div>

  )
}

export default Editor