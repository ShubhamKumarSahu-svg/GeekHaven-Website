'use client';

import { KeyboardEvent, RefObject } from 'react';

interface CommandInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
  disabled?: boolean;
}

export default function CommandInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
  disabled = false,
}: CommandInputProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gruvbox-blue whitespace-nowrap font-bold select-none">
        guest@cybersec
      </span>
      <span className="text-gruvbox-fg select-none">:</span>
      <span className="text-gruvbox-purple select-none">~</span>
      <span className="text-gruvbox-fg select-none">$</span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={disabled}
        className="flex-1 bg-transparent outline-none text-gruvbox-fg caret-gruvbox-green disabled:opacity-50"
        autoFocus
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
}
