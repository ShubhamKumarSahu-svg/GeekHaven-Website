import Link from 'next/link';

export default function Home() {
  const wings = [
    {
      name: 'CyberSec',
      path: '/cybersec',
      color: 'border-green-500 text-green-500',
      icon: '🔒',
    },
    {
      name: 'WebD',
      path: '#',
      color: 'border-blue-500 text-blue-500',
      icon: '🌐',
    },
    {
      name: 'AppD',
      path: '#',
      color: 'border-yellow-500 text-yellow-500',
      icon: '📱',
    },
    {
      name: 'Competitive Coding',
      path: '#',
      color: 'border-red-500 text-red-500',
      icon: '💻',
    },
    {
      name: 'Design',
      path: '#',
      color: 'border-purple-500 text-purple-500',
      icon: '🎨',
    },
    {
      name: 'AI/ML',
      path: '#',
      color: 'border-orange-500 text-orange-500',
      icon: '🤖',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1d2021] text-[#ebdbb2] font-mono p-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter hover:text-green-500 transition-colors cursor-default">
            GEEKHAVEN
          </h1>
          <p className="text-xl md:text-2xl text-gray-500">
            Technical Society of IIIT Allahabad
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wings.map((wing) => (
            <Link
              key={wing.name}
              href={wing.path}
              className={`
                group relative p-8 border-2 ${wing.color} rounded-sm
                hover:bg-opacity-5 hover:bg-white transition-all duration-300
                flex flex-col items-center justify-center gap-4 text-center
                h-48 cursor-pointer
                ${wing.path === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 shadow-lg hover:shadow-green-900/20'}
              `}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                {wing.icon}
              </span>
              <span className="text-2xl font-bold tracking-widest uppercase">
                {wing.name}
              </span>

              {/* Status Indicator */}
              <div className="absolute top-4 right-4 flex h-3 w-3">
                {wing.path !== '#' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${wing.path !== '#' ? 'bg-green-500' : 'bg-gray-600'}`}
                ></span>
              </div>

              {wing.path === '#' && (
                <span className="text-xs opacity-50 absolute bottom-3 uppercase tracking-widest">
                  [ Offline ]
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm opacity-30 mt-16 hover:opacity-100 transition-opacity">
          &copy; {new Date().getFullYear()} GeekHaven IIITA. <br />
          <span className="text-xs">Select a terminal to begin.</span>
        </div>
      </div>
    </div>
  );
}
