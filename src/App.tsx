import { useEffect, useRef } from 'react';
import rawHtml from '../index.html?raw';

export default function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHtml, 'text/html');
    
    // Inject styles
    doc.querySelectorAll('style').forEach(style => {
      document.head.appendChild(style.cloneNode(true));
    });
    doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
      document.head.appendChild(link.cloneNode(true));
    });
    
    // Execute scripts
    if (ref.current) {
      ref.current.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        newScript.textContent = oldScript.textContent;
        document.body.appendChild(newScript);
      });
    }
  }, []);

  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHtml, 'text/html');
  const bodyContent = doc.body.innerHTML;

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
