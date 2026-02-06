import { Member } from '@/app/cybersec/types';

export const designCoordinators: Member[] = [
  {
    id: 'd1',
    name: 'Aditya Raj',
    role: 'Design Head',
    wing: 'Design',
    email: 'aditya@geekhaven.com',
    github: 'adityaraj',
    linkedin: 'aditya-raj',
    // Using dummy photo as requested
    image: 'https://placehold.co/400',
    bio: 'Visionary designer with a passion for 3D aesthetics and motion graphics. Leading the charge to redefine the visual identity of GeekHaven.',
  },
  {
    id: 'd2',
    name: 'Sneha Gupta',
    role: 'Design Head',
    wing: 'Design',
    email: 'sneha@geekhaven.com',
    github: 'snehagupta',
    linkedin: 'sneha-gupta',
    image: 'https://placehold.co/400',
    bio: 'UI/UX specialist focused on creating intuitive and immersive user experiences. Expert in design systems and prototyping.',
  },
];

export const designMembers: Member[] = [
  {
    id: 'd3',
    name: 'Rohan',
    role: 'Senior Designer',
    wing: 'Design',
    email: 'rohan@geekhaven.com',
    github: 'rohan',
    linkedin: 'rohan-des',
    image: 'https://placehold.co/400',
    bio: 'Master of typography and branding. Ensures every pixel aligns with our core identity.',
  },
  {
    id: 'd4',
    name: 'Priya',
    role: '3D Artist',
    wing: 'Design',
    email: 'priya@geekhaven.com',
    github: 'priya3d',
    linkedin: 'priya-art',
    image: 'https://placehold.co/400',
    bio: 'Blender wizard creating surreal environments and assets for our game development projects.',
  },
  {
    id: 'd5',
    name: 'Amit',
    role: 'UI/UX Lead',
    wing: 'Design',
    email: 'amit@geekhaven.com',
    github: 'amitui',
    linkedin: 'amit-ux',
    image: 'https://placehold.co/400',
    bio: 'Focuses on accessibility and interaction design. Building the next generation of web interfaces.',
  },
  {
    id: 'd6',
    name: 'Kavya',
    role: 'Illustrator',
    wing: 'Design',
    email: 'kavya@geekhaven.com',
    github: 'kavyaart',
    linkedin: 'kavya-draws',
    image: 'https://placehold.co/400',
    bio: 'Digital artist bringing concepts to life through vibrant illustrations and character design.',
  },
];

export const designInfo = {
  name: 'Design Wing',
  description: `The Design Wing at GeekHaven is the "Creative Layer" of our society.
  We unite creative minds from diverse domains—UI/UX, 3D Modeling, Motion Graphics, and Branding—into a unified Visual Economy.

  Our mission is to visualize the future. We don't just design interfaces; we craft experiences.
  From the "Game of Design" to real-world applications, we shape the fate of every product
  amidst infinite creative opportunities.`,

  lead: 'Aditya Raj',

  technologies: [
    'Figma',
    'Adobe XD',
    'Blender',
    'Spline',
    'Three.js',
    'React Three Fiber',
    'GSAP',
    'Adobe After Effects',
    'Adobe Illustrator',
    'Adobe Photoshop',
    'Cinema 4D',
    'Rive',
  ],

  projects: [
    'Radiant - A cross-platform metagame app interface design',
    'Zigma - An anime and gaming-inspired NFT collection',
    'Nexus - Gamified social hub UI/UX',
    'Azul - AI Agent visual identity and interface',
    'GeekHaven Brand Refresh - Complete visual identity overhaul',
    'Event Horizons - Motion graphics package for college fest',
  ],

  achievements: [
    '🏆 Best UI/UX Design - HackTheNorth 2024',
    '🎨 Featured on Behance Interaction Gallery',
    '✨ 1st Place - Adobe Creative Jam 2025',
    '🚀 Designed assets for 50+ college events',
    '🖌️ Conducted "Design of Things" workshop series',
  ],
};
