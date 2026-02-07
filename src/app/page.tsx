import Link from 'next/link';

type WingLink = {
  name: string;
  path: string;
  color: string;
  icon: string;
};

export default function Home() {
  const wings: WingLink[] = [
    {
      name: 'CyberSec Wing',
      path: '/cybersec',
      color: 'border-green-500 text-green-400',
      icon: '🔒',
    },
    {
      name: 'Design Wing',
      path: '/design',
      color: 'border-pink-500 text-pink-400',
      icon: '🎨',
    },
    {
      name: 'GameDev Wing',
      path: '/gamedev',
      color: 'border-orange-500 text-orange-400',
      icon: '🎮',
    },
    {
      name: 'AI/ML Wing',
      path: '/aiml',
      color: 'border-cyan-500 text-cyan-400',
      icon: '🧠',
    },
    {
      name: 'WebD Wing',
      path: '#',
      color: 'border-blue-500 text-blue-400',
      icon: '🌐',
    },
    {
      name: 'CC Wing',
      path: '#',
      color: 'border-red-500 text-red-400',
      icon: '💻',
    },
    {
      name: 'App Development',
      path: '#',
      color: 'border-yellow-500 text-yellow-400',
      icon: '📱',
    },
    {
      name: 'FOSS Wing',
      path: '#',
      color: 'border-emerald-500 text-emerald-400',
      icon: '🐧',
    },
    {
      name: 'Blockchain Wing',
      path: '#',
      color: 'border-violet-500 text-violet-400',
      icon: '⛓️',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#e2e8f0] font-mono p-8 flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full space-y-12">
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight hover:text-cyan-300 transition-colors cursor-default">
            GEEKHAVEN
          </h1>
          <p className="text-lg md:text-2xl text-slate-400">
            Technical Society of IIIT Allahabad
          </p>
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-slate-500">
            9 Wings | Interactive Showcases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {wings.map((wing) => {
            const isLive = wing.path !== '#';
            return (
              <Link
                key={wing.name}
                href={wing.path}
                className={`
                  group relative p-6 border-2 ${wing.color} rounded-lg
                  transition-all duration-300
                  flex flex-col items-center justify-center gap-3 text-center
                  min-h-44
                  ${isLive ? 'hover:-translate-y-1 shadow-lg hover:shadow-cyan-900/25' : 'opacity-50 cursor-not-allowed'}
                `}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {wing.icon}
                </span>
                <span className="text-xl font-bold tracking-wide uppercase">
                  {wing.name}
                </span>

                <div className="absolute top-4 right-4 flex h-3 w-3">
                  {isLive && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-emerald-500' : 'bg-slate-600'}`}
                  ></span>
                </div>

                {!isLive && (
                  <span className="text-[10px] opacity-70 absolute bottom-3 uppercase tracking-[0.2em]">
                    [ Offline ]
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="text-center text-xs md:text-sm opacity-60 mt-12 hover:opacity-100 transition-opacity">
          &copy; {new Date().getFullYear()} GeekHaven IIITA.
          <br />
          <span className="text-xs uppercase tracking-[0.15em]">Select a wing to begin.</span>
        </div>
      </div>
    </div>
  );
}
