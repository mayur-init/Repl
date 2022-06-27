import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';
import Dropdown from './Dropdown';
import axios from 'axios';
import { Buffer } from 'buffer';

function Editor({ socketRef, roomId, onCodeChange, onCodeRun }) {

  let editorRef = useRef(null);
  let langRef = useRef('C++');
  let [input, setInput] = useState(null);
  let [source, setSource] = useState('');
  let [output, setOutput] = useState('Output');
  const [isActive, setIsActive] = useState(true);
  let compiling = false;
  
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
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code
          })
          //console.log(code);
        }

      });

    }
    init();


    //cleaning function
    return () => {
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
      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code, lang, inputRef, outputRef }) => {
        //console.log(lang, inputRef, outputRef);
        if (code != null) {
          editorRef.current.setValue(code);
        }
        if (outputRef != null) {
          setOutput(outputRef)
        }
        if (lang != 'C++') {
          langRef.current = lang;
        }
        input = inputRef;
        setInput(inputRef);
        const inputConsole = document.getElementById('input');
        inputConsole.value = inputRef;
        //if(output !== null || output !== undefined){
        //setOutput(outputRef);
        //}
      })

      //listening to input_change
      socketRef.current.on('input_change', ({ input }) => {
        setInput(input);
        //console.log(input);
        const inputConsole = document.getElementById('input');
        inputConsole.value = input;
      })

      //listening for output_change
      socketRef.current.on('code_run', ({ output }) => {
        setOutput(output);
      })
    }

    //cleaning function
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
      socketRef.current.off(ACTIONS.SYNC_CODE);
      socketRef.current.off('input_change');
      socketRef.current.off('code_run');
    }
  }, [input, socketRef.current]);

  const ioClass = 'text-xl text-zinc-400 bg-zinc-800 md:ml-2 mt-1 md:h-[85vh] h-[25vh] p-4 rounded-md border-2 border-zinc-500'

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

  async function RunCode() {
    //make a axios call to the server
    //console.log(source_code);
    const data = {
      lang: langRef.current,
      source,
      input
    }
    const response = await axios({
      method: 'post',
      url: '/compile',
      data: JSON.parse(JSON.stringify(data, replacerFunc()))
    });

    //console.log(response);
    if (langRef.current === 'Python' || langRef.current === 'Javascript') {
      if (response.data.stderr !== null) {
        const outputRef = {
          stdout: Buffer.from(response.data.stderr, 'base64').toString(),
        }
        output = outputRef;
        setOutput(outputRef);
      }
      else {
        const outputRef = {
          lang: response.data.language.name,
          stdout: Buffer.from(response.data.stdout, 'base64').toString(),
          execution_time: `${response.data.time} ms`,
          memory: `${response.data.memory} kb`,
        }
        output = outputRef;
        setOutput(outputRef)
      }
    }
    else {
      if (response.data.compile_output) {
        const outputRef = {
          stdout: Buffer.from(response.data.compile_output, 'base64').toString(),
        }
        output = outputRef;
        setOutput(outputRef);
      } else {
        const outputRef = {
          lang: response.data.language.name,
          stdout: Buffer.from(response.data.stdout, 'base64').toString(),
          execution_time: `${response.data.time} ms`,
          memory: `${response.data.memory} kb`,
        }
        output = outputRef;
        setOutput(outputRef);
      }
    }
    //console.log(langRef.current, output);
    compiling = false;
    socketRef.current.emit('code_run', { roomId, output })
    onCodeRun(langRef.current, input, output);
  }


  return (
    <div className='bg-zinc-800 p-4 h-screen flex flex-col min-w-max'>
      <div className='flex flex-row justify-between'>
        <h1 className='text-2xl text-zinc-400 mt-2 mb-4 mx-4'>CodeSync</h1>
        <div className='self-center flex flex-row'>
          <Dropdown options={['C', 'C++','Java','Golang', 'Python', 'Javascript']} onOptionSelect={(option) => {
            langRef.current = option;
            //console.log(langRef.current);
            socketRef.current.emit('lang_change', {
              lang: option,
              roomId
            });
          }} socketRef={socketRef} lang={langRef.current} />
          <Link to={`/room/${roomId}/whiteboard`}><button className='btn btn-primary mx-4'>Whiteboard</button></Link>
          <button className='btn btn-primary mr-4' onClick={() =>{compiling = true; RunCode()}}>Run</button>
        </div>
      </div>

      <div>
      <div className='md:flex md:h-[90vh]'>
        <div className='md:h-[90vh] h-[60vh] md:w-8/12 w-full'>
          <textarea id='editor' className='p-2 bg-zinc-800 text-zinc-200 text-xl border-2 border-zinc-500 w-full'></textarea>
        </div>

        <div className='flex flex-col md:w-1/3 w-full'>
          <div>
            <button className='btn btn-primary md:ml-2 mr-1 mt-2' onClick={() =>{setIsActive(true)}}>Input</button>
            <button className='btn btn-primary' onClick={() =>{setIsActive(false)}}>Output</button>
          </div>
          {isActive?(<textarea className={ioClass} id='input' spellCheck='false' placeholder='Input' onChange={(e) => {
            input = e.target.value;
            socketRef.current.emit('input_change',{
              input,
              roomId
            })
            
            }}></textarea>):
           (<div className={ioClass}>
            <pre className='overflow-auto'>{compiling?'Compiling...':output.stdout}</pre>
            <br />
            {output.execution_time}
          </div>)}
        </div>
      </div>
      </div>

    </div>

  )
}

export default Editor