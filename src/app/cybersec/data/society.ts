import { Member } from '@/app/cybersec/types';

export const coordinators: Member[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    role: 'CyberSec Head',
    wing: 'CyberSec',
    email: 'rahul@geekhaven.com',
    github: 'rahulkumar',
    linkedin: 'rahul-kumar',
    image: '/team/rahul.jpg',
    bio: 'Penetration testing specialist with expertise in web application security and network exploitation. Led multiple CTF teams to victory.',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'CyberSec Vice Head',
    wing: 'CyberSec',
    email: 'priya@geekhaven.com',
    github: 'priyasharma',
    linkedin: 'priya-sharma',
    image: '/team/priya.jpg',
    bio: 'Security researcher specializing in reverse engineering and malware analysis. Active contributor to security disclosure programs.',
  },
  {
    id: '3',
    name: 'Amit Patel',
    role: 'CTF Coordinator',
    wing: 'CyberSec',
    email: 'amit@geekhaven.com',
    github: 'amitpatel',
    linkedin: 'amit-patel',
    image: '/team/amit.jpg',
    bio: 'Capture The Flag enthusiast and cryptography expert. Organizes workshops on binary exploitation and web security.',
  },
];

export const members: Member[] = [
  {
    id: '4',
    name: 'Rohan Verma',
    role: 'Senior Member',
    wing: 'CyberSec',
    email: 'rohan@geekhaven.com',
    github: 'rohanverma',
    linkedin: 'rohan-verma',
    image: '/team/rohan.jpg',
    bio: 'Bug bounty hunter with multiple CVEs. Focuses on API security and authentication bypass techniques.',
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    role: 'Senior Member',
    wing: 'CyberSec',
    email: 'sneha@geekhaven.com',
    github: 'snehareddy',
    linkedin: 'sneha-reddy',
    image: '/team/sneha.jpg',
    bio: 'Network security specialist with expertise in firewall configuration and intrusion detection systems.',
  },
  {
    id: '6',
    name: 'Arjun Singh',
    role: 'Senior Member',
    wing: 'CyberSec',
    email: 'arjun@geekhaven.com',
    github: 'arjunsingh',
    linkedin: 'arjun-singh',
    image: '/team/arjun.jpg',
    bio: 'Digital forensics enthusiast. Works on incident response and forensic analysis of compromised systems.',
  },
  {
    id: '7',
    name: 'Kavya Iyer',
    role: 'Member',
    wing: 'CyberSec',
    email: 'kavya@geekhaven.com',
    github: 'kavyaiyer',
    linkedin: 'kavya-iyer',
    image: '/team/kavya.jpg',
    bio: 'Security automation developer. Creates custom tools for vulnerability scanning and exploit development.',
  },
  {
    id: '8',
    name: 'Vikram Joshi',
    role: 'Member',
    wing: 'CyberSec',
    email: 'vikram@geekhaven.com',
    github: 'vikramjoshi',
    linkedin: 'vikram-joshi',
    image: '/team/vikram.jpg',
    bio: 'Cloud security researcher focusing on AWS and Azure security misconfigurations and container security.',
  },
  {
    id: '9',
    name: 'Diya Kapoor',
    role: 'Member',
    wing: 'CyberSec',
    email: 'diya@geekhaven.com',
    github: 'diyakapoor',
    linkedin: 'diya-kapoor',
    image: '/team/diya.jpg',
    bio: 'Mobile application security tester. Specializes in Android and iOS reverse engineering and exploitation.',
  },
  {
    id: '10',
    name: 'Aditya Mehta',
    role: 'Member',
    wing: 'CyberSec',
    email: 'aditya@geekhaven.com',
    github: 'adityamehta',
    linkedin: 'aditya-mehta',
    image: '/team/aditya.jpg',
    bio: 'Wireless security researcher. Explores vulnerabilities in WiFi protocols and IoT device security.',
  },
];

export const cybersecInfo = {
  name: 'CyberSec Division',
  description: `The CyberSec Division at GeekHaven is dedicated to exploring the depths of
cybersecurity, ethical hacking, and digital defense. We cultivate a community of
security researchers, penetration testers, and CTF enthusiasts who are passionate
about understanding and securing digital systems.

Our members engage in:
• Capture The Flag competitions and security challenges
• Vulnerability research and responsible disclosure
• Development of security tools and automation scripts
• Workshops on penetration testing, cryptography, and forensics
• Bug bounty programs and security audits`,

  lead: 'Rahul Kumar',

  technologies: [
    'Python',
    'Kali Linux',
    'Metasploit Framework',
    'Burp Suite',
    'Wireshark',
    'Nmap',
    'Ghidra / IDA Pro',
    'John the Ripper',
    'Hashcat',
    'Aircrack-ng',
    'SQLMap',
    'OWASP ZAP',
  ],

  projects: [
    'CTF Platform - Custom challenge hosting system',
    'Security Audit Tool - Automated vulnerability scanner',
    'Network Monitoring Dashboard - Real-time intrusion detection',
    'Password Manager - Encrypted credential storage',
    'Phishing Detection System - ML-based phishing analyzer',
    'Forensics Toolkit - Digital evidence collection suite',
  ],

  achievements: [
    '🏆 Winners - National Cybersecurity CTF 2024',
    '🥈 2nd Place - HackTheBox University CTF',
    '🔒 10+ CVEs discovered and responsibly disclosed',
    '🎓 Conducted 50+ security workshops',
    '💰 $25,000+ earned through bug bounties',
  ],
};
