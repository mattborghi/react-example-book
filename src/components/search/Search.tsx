import { useEffect, useRef } from 'react';

export function Search({ value, onChange, isFocused }) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isFocused]);

    return (
        <input ref={inputRef} className="input" type="text" value={value} onChange={onChange} placeholder="Filter titles" />
    )
}