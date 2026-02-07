import fs from 'node:fs';
import path from 'node:path';
import FolioGameDevClient from './FolioGameDevClient';

function resolveFolioBundles() {
  const assetsDir = path.join(process.cwd(), 'public', 'assets');
  let bundleJs = '/assets/index.js';
  let bundleCss = '/assets/index.css';

  try {
    const files = fs.readdirSync(assetsDir);
    const js = files.find((file) => /^index-.*\.js$/.test(file));
    const css = files.find((file) => /^index-.*\.css$/.test(file));

    if (js) {
      bundleJs = `/assets/${js}`;
    }
    if (css) {
      bundleCss = `/assets/${css}`;
    }
  } catch {
    // Keep fallback paths for local dev if assets are missing.
  }

  return { bundleJs, bundleCss };
}

export default function GameDevPage() {
  const { bundleJs, bundleCss } = resolveFolioBundles();

  return <FolioGameDevClient bundleJs={bundleJs} bundleCss={bundleCss} />;
}
