'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    application?: {
      destructor?: () => void;
    };
  }
}

function teardownFolioApp() {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.application && typeof window.application.destructor === 'function') {
    try {
      window.application.destructor();
    } catch {
      // Ignore teardown errors from third-party scene internals.
    }
  }

  window.application = undefined;
}

export default function FolioGameDevClient({
  bundleJs,
  bundleCss,
}: {
  bundleJs: string;
  bundleCss: string;
}) {
  useEffect(() => {
    teardownFolioApp();

    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${bundleJs}?v=${Date.now()}`;
    script.async = true;
    script.dataset.gamedevRuntime = 'true';
    document.body.appendChild(script);

    return () => {
      teardownFolioApp();
      script.remove();
    };
  }, [bundleJs]);

  return (
    <>
      <link rel="stylesheet" href={bundleCss} />

      <canvas className="canvas js-canvas" />

      <div className="threejs-journey is-hover-none js-threejs-journey">
        <div className="message js-message">
          <div className="boy">
            <div className="variant is-hi">
              <div className="body" />
              <div className="arm js-boy-arm" />
            </div>
            <div className="variant is-yay" />
            <div className="variant is-shrugging" />
          </div>
          <div className="bubble">
            <div className="text">Hey! You found the Geekhaven GameDev garage.</div>
            <div className="tip" />
          </div>
        </div>

        <div className="message js-message">
          <div className="bubble">
            <div className="text">
              Want to explore how we build games, tools, and interactive worlds?
            </div>
            <div className="tip" />
          </div>
        </div>

        <div className="message js-message is-answers">
          <a href="#" className="answer is-no js-no">
            <span className="background" />
            <span className="hover" />
            <span className="label">Not right now</span>
          </a>
          <a
            href="https://geekhaven.iiita.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="answer is-yes js-yes"
          >
            <span className="background" />
            <span className="hover" />
            <span className="label">Yes, show me!</span>
          </a>
        </div>

        <div className="message js-message">
          <div className="bubble">
            <div className="text">Awesome. Have fun and try not to break our car!</div>
            <div className="tip" />
          </div>
        </div>
      </div>
    </>
  );
}
