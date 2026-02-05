'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// Updated 'command' for Team to 'team'
const quickCommands = [
  { label: 'Help', command: 'help', icon: '[?]', color: 'bg-gruvbox-blue' },
  { label: 'About', command: 'about', icon: '[i]', color: 'bg-gruvbox-green' },
  { label: 'Team', command: 'team', icon: '[T]', color: 'bg-gruvbox-yellow' },
  { label: 'Clear', command: 'clear', icon: '[X]', color: 'bg-gruvbox-red' },
];

export default function FloatingButtons({
  onCommandClick,
}: {
  onCommandClick: (cmd: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      <div className="flex flex-col-reverse items-end gap-3">
        <AnimatePresence>
          {isExpanded &&
            quickCommands.map((cmd, i) => (
              <motion.button
                key={cmd.command}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => {
                  onCommandClick(cmd.command);
                  setIsExpanded(false);
                }}
                className={`${cmd.color} text-gruvbox-bg px-4 py-2 border-2 border-gruvbox-fg shadow-xl hover:brightness-110 flex items-center gap-3 font-bold`}
              >
                <span className="text-lg">{cmd.icon}</span>
                <span className="uppercase tracking-widest text-sm">
                  {cmd.label}
                </span>
              </motion.button>
            ))}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-gruvbox-orange text-gruvbox-bg w-14 h-14 border-2 border-gruvbox-fg shadow-xl flex items-center justify-center text-xl font-bold"
        >
          {isExpanded ? '[X]' : '[+]'}
        </motion.button>
      </div>
    </div>
  );
}
