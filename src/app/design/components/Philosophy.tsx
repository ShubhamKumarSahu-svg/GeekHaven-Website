'use client';

import gsap from 'gsap';
import { useRef } from 'react';
import AnimatedTitle from './AnimatedTitle';

const Philosophy = () => {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: 'power1.inOut',
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: 'power1.inOut',
      });
    }
  };

  return (
    <div id="philosophy" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-blue-50 opacity-50">
          Our Core Values
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="The Ph<b>i</b>losophy <br /> of Visual <b>I</b>mpact"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/design/img/entrance.webp"
                  alt="philosophy"
                  className="object-contain"
                />
              </div>
            </div>

            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="mt-[-100px] md:mt-[-50px] relative z-10 w-full px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto border-t border-white/10 pt-16">
            {/* Value 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <h3 className="bento-title !text-4xl text-blue-50 group-hover:text-violet-300 transition-colors duration-300">
                Ide<b>a</b>te.
              </h3>
              <p className="mt-4 font-circular-web text-sm text-blue-50/60 leading-relaxed">
                Before the first pixel is placed, we question everything. We
                brainstorm, wireframe, and deconstruct problems to find the core
                truth of the design.
              </p>
            </div>

            {/* Value 2 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <h3 className="bento-title !text-4xl text-blue-50 group-hover:text-violet-300 transition-colors duration-300">
                Cre<b>a</b>te.
              </h3>
              <p className="mt-4 font-circular-web text-sm text-blue-50/60 leading-relaxed">
                This is where alchemy happens. We blend 3D motion, typography,
                and color theory to craft visual languages that don't just look
                good—they feel right.
              </p>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left group">
              <h3 className="bento-title !text-4xl text-blue-50 group-hover:text-violet-300 transition-colors duration-300">
                Iter<b>a</b>te.
              </h3>
              <p className="mt-4 font-circular-web text-sm text-blue-50/60 leading-relaxed">
                Perfection is a process. We test, break, and rebuild. Design is
                never truly finished; it only evolves to become its sharpest
                version.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Philosophy;
