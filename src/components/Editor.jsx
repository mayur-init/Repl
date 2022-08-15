import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/keymap/sublime';
import 'codemirror/addon/edit/closebrackets';
import { ACTIONS } from '../Actions';
import Dropdown from './Dropdown';
import SideBar from './SideBar'
import axios from 'axios';
import { Buffer } from 'buffer';
import { RoomContext } from '../Contexts/RoomContext';
import { HiOutlineCode, HiMenuAlt4, HiX, HiCube } from 'react-icons/hi';
import { AiOutlineCaretRight } from 'react-icons/ai';
import DarkModeButton from './DarkModeButton';
import useDarkMode from '../hooks/useDarkMode';


function Editor() {

  const { socketRef, roomId, codeRef, inputRef, outputRef, langRef, location } = useContext(RoomContext);
  let editorRef = useRef(null);
  let [input, setInput] = useState(null);
  let [source, setSource] = useState('');
  let [output, setOutput] = useState('Output');
  let [isCompiling, setCompiling] = useState(false);

  const [colorTheme, setTheme] = useDarkMode();


  useEffect(() =>{
    editorRef.current = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: { name: 'javascript', json: true },
      keyMap: 'sublime',
      theme: 'material-darker',
      lint: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });
  },[colorTheme])

  useEffect(() => {
    async function init() {

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
        //on code run
        codeRef.current = code;

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
        if (outputRef !== null) {
          setOutput(outputRef)
        }
        if (lang !== 'C++') {
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
        setInput(input);
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
    //console.log(source_code
    setCompiling(!isCompiling);
    let url = process.env.REACT_APP_BACKEND_URL+'compile';

    const data = {
      lang: langRef.current,
      source,
      input
    }
    const response = await axios({
      method: 'post',
      url: url,
      data: JSON.parse(JSON.stringify(data, replacerFunc()))
    });
    isCompiling = !isCompiling;
    setCompiling(!isCompiling);
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
    socketRef.current.emit('code_run', { roomId, output })
    //on code change
    inputRef.current = input,
    outputRef.current = output;
  }


  return (
    <div className='h-screen w-screen overflow-y-hidden'>
      <div className='bg-gray-300 dark:bg-zinc-700 h-full md:w-screen w-[100%] flex flex-col min-w-max'>
        <div className='flex flex-row bg-gray-100 dark:bg-zinc-900 mb-2 p-1 shadow-xl justify-between'>
          <h1 className='flex text-xl text-zinc-400 mt-2 mb-2 mx-4'>CodeSync<HiOutlineCode size={25} className='mx-2 my-1' />@{location.state.userName}</h1>
          <div className='self-center flex flex-row'>
            {/* <DarkModeButton /> */}
            <Dropdown options={['C', 'C++', 'Java', 'Golang', 'Python', 'Javascript']} onOptionSelect={(option) => {
              langRef.current = option;
              //console.log(langRef.current);
              socketRef.current.emit('lang_change', {
                lang: option,
                roomId
              });
            }} socketRef={socketRef} lang={langRef.current} editorRef={editorRef} codeRef={codeRef}/>
            {!isCompiling?(<button className='flex bg-green-500 hover:bg-green-600 btn btn-primary mr-4 text-zinc-700 dark:text-zinc-700 pl-4 pt-1' onClick={RunCode}>Run<AiOutlineCaretRight size={15} className='my-[5px]' /></button>):
            (<button className='flex bg-gray-500 hover:bg-gray-600 btn btn-primary mr-4 text-zinc-700 dark:text-zinc-700 pl-4 pt-1'><HiCube size={25} className='mb-1 ml-1 mr-2' /></button>)}
          </div>
        </div>

        <div className='flex'>
            <SideBar/>
          <div className='md:flex md:h-[92vh] w-full h-screen'>
            <div className='md:h-[91.7vh] h-[47.8vh] mb-1 md:w-8/12 w-[98.8%] text-xl overflow-hidden shadow-xl'>
              <textarea id='editor' className='p-4 bg-zinc-800 text-zinc-200 text-xl border-2 border-zinc-500 w-full'></textarea>
            </div>

            <div className='flex flex-col md:w-1/3 w-full'>
              <textarea className='text-xl text-zinc-400 bg-gray-100 dark:bg-zinc-900 md:ml-1 md:h-[26.1vh] h-[18vh] p-3 mr-1 rounded-md' id='input' spellCheck='false' placeholder='Input' onChange={(e) => {
                input = e.target.value;
                socketRef.current.emit('input_change', {
                  input,
                  roomId
                })
              }}>
              </textarea>
              <div className='text-xl text-zinc-400 bg-gray-100 dark:bg-zinc-900 md:ml-1 md:h-[65vh] h-[24vh] p-3 mr-1 mt-1 rounded-md'>
                <pre className='overflow-auto'>{isCompiling ? 'Compiling...' : output.stdout}</pre>
                <br />
                <h3 className='text-green-500'>{output === null?(output.execution_time + '\n' + output.memory):null}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Editor