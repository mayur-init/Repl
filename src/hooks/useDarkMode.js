import React, {useEffect, useState} from 'react'

export default function useDarkMode() {

    // const [theme, setTheme] = useState(localStorage.theme?localStorage.theme:'dark');
    const[theme, setTheme] = useState('dark');
    const colorTheme = theme === 'dark'?'light':'dark';

    useEffect(() => {
        const root = window.document.documentElement;
        // root.classList.remove(colorTheme);
        if(theme === 'dark'){
            root.classList.add('dark');
        }
        localStorage.setItem('theme', theme);
    },[theme, colorTheme]);

    return [colorTheme, setTheme];
}