'use client';

import { designCoordinators, designMembers } from '../data/society';
import AnimatedTitle from './AnimatedTitle';
import { BentoTilt } from './Features';

const MemberCard = ({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image: string;
}) => (
  <div className="relative size-full overflow-hidden rounded-md bg-black border border-white/20 group">
    <img
      src={image}
      alt={name}
      className="absolute left-0 top-0 size-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-80"
    />

    {/* Text Overlay */}
    <div className="relative z-10 flex size-full flex-col justify-end p-5 text-blue-50 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="bento-title !text-3xl uppercase">{name}</h3>
      <p className="mt-2 max-w-64 font-circular-web text-xs md:text-sm text-blue-50/70">
        {role}
      </p>
    </div>
  </div>
);

const Team = () => {
  return (
    <section id="team" className="bg-black py-32 px-5 md:px-10">
      <div className="container mx-auto">
        <p className="font-circular-web text-lg text-blue-50 mb-10">
          The Creative Minds
        </p>

        <AnimatedTitle
          title="mee<b>t</b> the <br /> vi<b>s</b>ionaries"
          containerClass="!text-blue-50 mb-20"
        />

        <div className="mb-16">
          <h2 className="font-general text-sm uppercase text-blue-50 mb-5 tracking-widest">
            Coordinators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 h-[50vh]">
            {designCoordinators.map((member) => (
              <BentoTilt
                key={member.id}
                className="bento-tilt_1 row-span-1 md:col-span-1"
              >
                <MemberCard
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              </BentoTilt>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-general text-sm uppercase text-blue-50 mb-5 tracking-widest">
            Core Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 h-auto md:h-[40vh]">
            {designMembers.map((member) => (
              <BentoTilt key={member.id} className="bento-tilt_2">
                <MemberCard
                  name={member.name}
                  role={member.role}
                  image={member.image}
                />
              </BentoTilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
