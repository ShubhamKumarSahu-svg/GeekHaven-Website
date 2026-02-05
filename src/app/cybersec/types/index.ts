export interface Command {
  command: string;
  outputs: string[];
}

export interface Theme {
  name: string;
  black: string;
  red: string;
  green: string;
  yellow: string;
  blue: string;
  purple: string;
  cyan: string;
  white: string;
  brightBlack: string;
  brightRed: string;
  brightGreen: string;
  brightYellow: string;
  brightBlue: string;
  brightPurple: string;
  brightCyan: string;
  brightWhite: string;
  foreground: string;
  background: string;
  cursorColor: string;
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface Member {
  id: string;
  name: string;
  role: string;
  wing: string;
  email: string;
  github?: string;
  linkedin?: string;
  image: string;
  bio: string;
}
