import { useEffect, useRef } from 'react';
import './Search.css';

export function Search({ value, onChange, isFocused }) {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input ref={inputRef} className="Search" type="text" value={value} onChange={onChange} placeholder="Filter titles" />
    )
}