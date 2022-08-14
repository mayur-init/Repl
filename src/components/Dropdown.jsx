import React, { useEffect, useState } from 'react'
import classNames from 'classnames';
import {HiOutlineChevronDown} from 'react-icons/hi';

function Dropdown({ options, onOptionSelect, socketRef, lang, editorRef, codeRef}) {

    const [isActive, setActive] = useState(false);
    const buttonClasses = 'text-xl text-zinc-400 hover:text-zinc-500 px-6';
    let [language, setLanguage] = useState('C++');

    useEffect(() =>{

        if(language === 'Java' && editorRef != null && codeRef.current != null){
            const note = '/* Main method must be declared within a class Main */';
            editorRef.current.setValue(note + '\n' + codeRef.current);
        }else{
            if(editorRef.current != null && codeRef.current != null){
                editorRef.current.setValue(codeRef.current);
            }
        }

        if(socketRef.current){
            socketRef.current.on('lang_change', ({lang}) =>{
                setLanguage(lang);
            })
        }

        return () =>{
            socketRef.current.off('lang_change');
        }
    },[socketRef.current, language]);

    useEffect(() =>{
        setLanguage(lang);
    },[lang])
    return (
        <div>
            <button onClick={() => setActive(!isActive)} className={`${buttonClasses} m-1 flex`}>{`${language}`}<HiOutlineChevronDown size={20} className='my-1'/></button>
            <div className={classNames("bg-zinc-800 p-2 m-8 origin-top-right absolute right-0 mt-3 w-56 rounded-md shadow-2xl z-10", {
                block: isActive,
                hidden: !isActive
            })}>
            {options.map((option) => <div className={classNames('text-zinc-300 hover:bg-zinc-700 rounded-md p-2')} key={option} onClick={(e) => {onOptionSelect(option); setLanguage(option); setActive(!isActive)}}>{option}</div>)}
        </div>
        </div>
    )
}

export default Dropdown