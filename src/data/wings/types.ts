export type WingMember = {
  id: string;
  name: string;
  role: string;
  wing: string;
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
  bio?: string;
  tags?: string[];
};

export type WingProject = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  status: 'Live' | 'In Progress' | 'Prototype';
  link?: string;
};

export type WingInfo = {
  name: string;
  tagline: string;
  mission: string;
  tools: string[];
  coordinators: WingMember[];
  members: WingMember[];
  projects: WingProject[];
};
