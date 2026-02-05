import {
  coordinators,
  cybersecInfo,
  members,
} from '@/app/cybersec/data/society';
import { themes } from '@/app/cybersec/data/themes';
import { todoManager } from './todo';

const formatCoordinators = () => {
  let output = 'LEADERSHIP TEAM 2024-25\n=======================\n\n';
  coordinators.forEach((coord, index) => {
    output += `[${index + 1}] ${coord.name}\n`;
    output += `    Role: ${coord.role}\n`;
    output += `    Email: ${coord.email}\n`;
    output += `    --------------------------------\n`;
  });
  output += '\nUse "info-coordinators [name]" to see profile photo.\n';
  return output;
};

const formatMembers = () => {
  let output = `Active Members: ${members.length}\n==================\n\n`;
  members.forEach((member, index) => {
    output += `[${index + 1}] ${member.name.padEnd(20)} - ${member.role}\n`;
  });
  output += '\nUse "info-members [name]" to view profile.\n';
  return output;
};

const hostname =
  typeof window !== 'undefined' ? window.location.hostname : 'localhost';

export const commands: Record<
  string,
  (args: string[]) => Promise<string> | string
> = {
  // Updated Theme Command
  theme: (args: string[]) => {
    const usage = `Usage: theme [ls | set <name>]`;

    if (args.length === 0) return usage;

    switch (args[0]) {
      case 'ls': {
        let result = 'AVAILABLE THEMES:\n=================\n\n';
        themes.forEach((t, index) => {
          result += `  ${index + 1}. ${t.name}\n`;
        });
        result += '\nExample: theme set synthwave';
        return result;
      }

      case 'set': {
        if (args.length < 2) return 'Error: Please specify a theme name.';

        const search = args[1].toLowerCase();
        const t = themes.find((theme) =>
          theme.name.toLowerCase().includes(search)
        );

        if (!t) {
          return `Theme '${args[1]}' not found. Try 'theme ls'.`;
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('colorscheme', JSON.stringify(t));
          window.location.reload();
        }

        return `Theme set to ${t.name}. Reloading...`;
      }

      default:
        return usage;
    }
  },

  help: () => {
    return `CYBERSEC DIVISION - TERMINAL COMMANDS
=====================================
[ CYBERSEC ]
  > about
  > team
  > info-coordinators
  > info-members

[ SYSTEM ]
  > help
  > clear
  > exit
  > whoami
  > neofetch

[ TOOLS ]
  > todo
  > weather
  > curl
  > ping

[ CUSTOM ]
  > theme
  > banner

[ FUN ]
  > matrix
  > hack
  > sudo

Tip: Type "clear" to clean the terminal.`;
  },

  team: () => formatCoordinators() + '\n\n' + formatMembers(),

  'info-coordinators': (args: string[]) => {
    if (args.length === 0) return formatCoordinators();
    const searchTerm = args.join(' ').toLowerCase();
    const coordinator = coordinators.find((c) =>
      c.name.toLowerCase().includes(searchTerm)
    );
    if (!coordinator) return `Coordinator not found.`;

    let output = `IMAGE:${coordinator.image}\n`;
    output += `\nName : ${coordinator.name}\n`;
    output += `Role : ${coordinator.role}\n`;
    output += `Email: ${coordinator.email}\n`;
    output += `Bio  : ${coordinator.bio}\n`;
    return output;
  },

  'info-members': (args: string[]) => {
    if (args.length === 0) return formatMembers();
    const searchTerm = args.join(' ').toLowerCase();
    const member = members.find((m) =>
      m.name.toLowerCase().includes(searchTerm)
    );
    if (!member) return `Member not found.`;

    let output = `IMAGE:${member.image}\n`;
    output += `\nName : ${member.name}\n`;
    output += `Role : ${member.role}\n`;
    output += `Email: ${member.email}\n`;
    return output;
  },

  hostname: () => hostname,
  whoami: () => 'guest@cybersec',
  date: () => new Date().toLocaleString(),
  clear: () => '',
  sudo: () => {
    if (typeof window !== 'undefined') {
      window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    }
    return 'Admin access required. Redirecting...';
  },
  banner: () => `
  /$$$$$$            /$$                          /$$$$$$
 /$$__  $$          | $$                         /$$__  $$
| $$  \\__/ /$$   /$$| $$$$$$$   /$$$$$$   /$$$$$$| $$  \\__/  /$$$$$$   /$$$$$$$
| $$      | $$  | $$| $$__  $$ /$$__  $$ /$$__  $$|  $$$$$$  /$$__  $$ /$$_____/
| $$      | $$  | $$| $$  \\ $$| $$$$$$$$| $$  \\__/ \\____  $$| $$$$$$$$| $$
| $$    $$| $$  | $$| $$  | $$| $$_____/| $$       /$$  \\ $$| $$_____/| $$
|  $$$$$$/|  $$$$$$$| $$$$$$$/|  $$$$$$$| $$      |  $$$$$$/|  $$$$$$$|  $$$$$$$
 \\______/  \\____  $$|_______/  \\_______/|__/       \\______/  \\_______/ \\_______/
           /$$  | $$
          |  $$$$$$/
           \\______/

Welcome to CyberSec Division Terminal v2.0
==========================================

[!] Institute: IIIT Allahabad
[!] Location:  Allahabad, India
[!] Website:   geekhaven.iiita.ac.in
[!] GitHub:    github.com/geekhaven/cybersec

Mission: To foster a community of security researchers, ethical hackers,
and CTF enthusiasts dedicated to securing the digital world.

Type 'help' to see available commands.
Type 'team' to meet our coordinators and members.
`,
  about: () => `
CYBERSEC DIVISION - GEEKHAVEN IIITA
===================================

${cybersecInfo.description}
Lead: ${cybersecInfo.lead}
`,
  'info-cybersec': () =>
    `Lead: ${cybersecInfo.lead}\nAbout: ${cybersecInfo.description}`,
  achievements: () =>
    cybersecInfo.achievements
      .map((a) => `* ${a.replace(/[\u{1F300}-\u{1F9FF}]/gu, '')}`)
      .join('\n'),
  neofetch: () => `
    .--------.
    | /\\ /\\  |   guest@cybersec
    | \\ v /  |   --------------
    |  |_|   |   OS: GeekHaven OS
    '--------'   Shell: Web Terminal
`,
  todo: (args: string[]) => {
    const usage = `Usage: todo [add|ls|done|rm|clear] [args]`;
    if (args.length === 0) return usage;
    const [cmd, ...rest] = args;
    switch (cmd) {
      case 'add':
        return todoManager.add(rest.join(' '));
      case 'ls':
        return todoManager.list(rest[0] as any);
      case 'done':
        return todoManager.complete(parseInt(rest[0]));
      case 'rm':
        return todoManager.remove(parseInt(rest[0]));
      case 'clear':
        return todoManager.clear(rest[0] === 'completed');
      default:
        return usage;
    }
  },
  echo: (args) => args.join(' '),
  matrix: () => 'The Matrix has you...',
  hack: () => '[*] Simulating breach... Success.',
  scan: () => '[*] Scanning network... Found: Localhost.',
  curl: () => 'Fetching data...',
  ping: () => 'Pong! (1ms)',
  weather: async () => 'Weather unavailable.',
  exit: () => 'Close tab to exit.',
  repo: () => {
    if (typeof window !== 'undefined') window.open('https://github.com');
    return 'Opening...';
  },
  discord: () => {
    if (typeof window !== 'undefined') window.open('https://discord.gg');
    return 'Opening...';
  },
  email: () => {
    if (typeof window !== 'undefined')
      window.open('mailto:geekhaven@iiita.ac.in');
    return 'Opening...';
  },
  encrypt: () => 'Encrypted.',
  hash: () => 'Hashed.',
};
