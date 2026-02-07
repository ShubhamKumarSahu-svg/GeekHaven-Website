import dynamic from 'next/dynamic';
import { Exo_2, Sora } from 'next/font/google';

const AIMLWingClient = dynamic(() => import('./AIMLWingClient'), {
  ssr: false,
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function AIMLPage() {
  return (
    <AIMLWingClient
      headingClassName={exo2.className}
      bodyClassName={sora.className}
    />
  );
}
