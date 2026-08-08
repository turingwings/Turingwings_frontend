import { useEffect, useState } from 'react';

/** Types out `text` character by character — used sparingly (e.g. hero eyebrow) so it doesn't feel gimmicky. */
export default function TypingAnimation({ text, speed = 28, className = '' }) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    setShown('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{shown}</span>;
}
