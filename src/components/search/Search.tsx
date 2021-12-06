import { useEffect, useRef } from "react";

type SearchProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
};

export function Search({ value, onChange, isFocused } : SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      ref={inputRef}
      className="input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Filter titles"
    />
  );
}
