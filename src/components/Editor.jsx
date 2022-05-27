import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';

function Editor({ socketRef, roomId }) {

  let editorRef = useRef(null);

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

      //listening for editor text change event
      editorRef.current.on('changes', (instance, changes) => {

        //console.log(changes[0].origin); //origin cut or input or paste or setValue
        //editorRef.current.setValue(`console.log('Hello world`)); //dynamic input 

        const origin = changes[0].origin;
        const code = instance.getValue();
        //console.log(code);

        //emiting code-change
        //console.log('emiting code...');
        //console.log(origin);
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
    }

  }, [socketRef.current]);

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