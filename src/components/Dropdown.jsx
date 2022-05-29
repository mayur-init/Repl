import React, { useState } from 'react'
import classNames from 'classnames';

function Dropdown({ options, onOptionSelect}) {

    const [isActive, setActive] = useState(false);
    const buttonClasses = 'text-xl text-zinc-400 hover:text-zinc-500 px-4';
    let [lang, setLang] = useState('C++');
    return (
        <div>
            <button onClick={() => setActive(!isActive)} className={buttonClasses}>{lang}</button>
            <div className={classNames("bg-zinc-600 p-2 m-8 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg", {
                block: isActive,
                hidden: !isActive
            })}>
            {options.map((option) => <div className={classNames('text-zinc-300 hover:bg-zinc-700 rounded-md p-2')} key={option} onClick={(e) => {onOptionSelect(option); setLang(option); setActive(!isActive)}}>{option}</div>)}
        </div>
        </div >
    )
}

export default Dropdown