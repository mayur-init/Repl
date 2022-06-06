import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';
import Dropdown from './Dropdown';
import axios from 'axios';
import {Buffer} from 'buffer';

function Editor({ socketRef, roomId , onCodeChange}) {

  let editorRef = useRef(null);
  let [input, setInput] = useState(null);
  let [lang, setLang] = useState('C++');
  let [source, setSource] = useState('');
  let [output, setOutput] = useState('Output');

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
        setSource(code);
        //console.log(source_code);
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

      //listening to input_change
      socketRef.current.on('input_change', ({input}) =>{
        setInput(input);
        //console.log(input);
        const inputConsole = document.getElementById('input');
        inputConsole.value = input;
      })
    }

    //cleaning function
    return () =>{
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      socketRef.current.off(ACTIONS.SYNC_CODE);
      socketRef.current.off('input_change')
    }
  }, [socketRef.current]);

  const ioClass = 'text-xl text-zinc-400 bg-zinc-800 ml-2 mt-1 h-1/2 p-4 rounded-md border-2 border-zinc-500'

  const replacerFunc = () => {
    const visited = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
      }
      return value;
    };
  };

async function RunCode(){
   //make a axios call to the server
   //console.log(source_code);
   const data = {
     lang,
     source,
     input
   }
   const response = await axios({
     method: 'post',
     url: '/compile',
     data: JSON.parse(JSON.stringify(data, replacerFunc() ))
   });

   //console.log(response);
   if(response.data.compile_output){
     const outputRef ={
      stdout: Buffer.from(response.data.compile_output, 'base64').toString(),
     }
     setOutput(outputRef);
   }else{
    const outputRef = {
      stdout: Buffer.from(response.data.stdout, 'base64').toString(),
      execution_time: `${response.data.time} ms`, 
    }
    setOutput(outputRef);
   }
   //console.log(outputConsole.value);
 }
  

  return (
    <div className='bg-zinc-800 p-4 h-screen flex flex-col min-w-max'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl text-zinc-400 m-4'>Code Playground</h1>
        <div className='self-center flex flex-row'>
          <Dropdown options={['C++', 'Java', 'Python']} onOptionSelect={(option) =>{
            setLang(option);
             socketRef.current.emit('lang_change',{
               lang: option,
               roomId
             });
            }} socketRef={socketRef}/>
          <button className='btn btn-primary mx-4' onClick={RunCode}>Run</button>
        </div>
      </div>

      <div className='flex flex-row h-screen'>
        <div className='h-full w-8/12'>
          <textarea id='editor' className='p-2 bg-zinc-800 text-zinc-200 text-xl border-2 border-zinc-500 w-full rounded-md h-full'></textarea>
        </div>
        <div className='flex flex-col w-1/3'>
          <textarea className={ioClass} id='input' spellCheck='false' placeholder='Input' onChange={(e) => {
            input = e.target.value;
            socketRef.current.emit('input_change',{
              input,
              roomId
            })
            }}></textarea>
          <div className={ioClass}>
            <pre className='overflow-auto'>{output.stdout}</pre>
            <br />
            {output.execution_time}
            </div>
        </div>
      </div>
    </div>

  )
}

export default Editor