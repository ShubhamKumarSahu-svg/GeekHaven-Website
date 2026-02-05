'use client';

import { Command } from '@/app/cybersec/types';
import { motion } from 'framer-motion';

interface HistoryDisplayProps {
  history: Command[];
  isLoading: boolean;
}

export default function HistoryDisplay({
  history,
  isLoading,
}: HistoryDisplayProps) {
  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Command Prompt Line */}
          <div className="flex items-center gap-2 text-gruvbox-green select-none">
            <span className="text-gruvbox-blue font-bold">guest@cybersec</span>
            <span className="text-gruvbox-fg">:</span>
            <span className="text-gruvbox-purple">~</span>
            <span className="text-gruvbox-fg">$</span>
            <span className="text-gruvbox-fg">{entry.command}</span>
          </div>

          {/* Output content */}
          <div className="mt-1 pl-0 text-gruvbox-fg whitespace-pre-wrap break-words">
            {entry.outputs.map((output, i) => {
              // FIX: Check for IMAGE: prefix
              if (output.startsWith('IMAGE:')) {
                const src = output.replace('IMAGE:', '').trim();
                return (
                  <div key={i} className="my-4">
                    <img
                      src={src}
                      alt="User Profile"
                      className="w-32 h-32 md:w-48 md:h-48 object-cover border-4 border-gruvbox-fg/50"
                    />
                  </div>
                );
              }
              // Standard text output
              return (
                <div key={i} className="leading-none min-h-[1.2em]">
                  {output}
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 text-gruvbox-yellow select-none animate-pulse">
          <span>[*] Processing...</span>
        </div>
      )}
    </div>
  );
}
