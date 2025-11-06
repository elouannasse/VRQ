import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeBlock({ code, language = 'javascript' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const customStyle = {
    background: '#0a1929',
    borderRadius: '0',
    padding: '1.5rem',
    margin: '0',
    fontSize: '0.9rem',
    fontFamily: "'Fira Code', 'Consolas', monospace",
    lineHeight: '1.5',
    maxHeight: '500px',
    overflow: 'auto',
  };

  const modernTheme = {
    ...oneDark,
    'comment': { color: '#7C8B9A', fontStyle: 'italic' },
    'punctuation': { color: '#A0A8B5' },
    'property': { color: '#38BDF8', fontWeight: '600' },
    'tag': { color: '#5EEAD4', fontWeight: '600' },
    'boolean': { color: '#FB923C', fontWeight: 'bold' },
    'number': { color: '#C084FC', fontWeight: '600' },
    'constant': { color: '#FB923C', fontWeight: 'bold' },
    'selector': { color: '#34D399', fontWeight: '600' },
    'attr-name': { color: '#60A5FA', fontWeight: '500' },
    'string': { color: '#10B981', fontWeight: '600' },
    'builtin': { color: '#FBBF24', fontWeight: '600' },
    'variable': { color: '#34D399', fontWeight: '600' },
    'operator': { color: '#FF6B9D', fontWeight: '500' },
    'keyword': { color: '#FF6B9D', fontWeight: 'bold' },
    'function': { color: '#FFD60A', fontWeight: 'bold' },
    'class-name': { color: '#C77DFF', fontWeight: 'bold' },
    'parameter': { color: '#FBBF24', fontWeight: '500' },
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-header">
        <div className="code-dots">
          <div className="dot red"></div>
          <div className="dot yellow"></div>
          <div className="dot green"></div>
        </div>
        <span className="code-language">{language}</span>
        <button onClick={handleCopy} className="copy-btn">
          {copied ? '✓ Copié!' : 'Copier'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={modernTheme}
        customStyle={customStyle}
        wrapLines={true}
        showLineNumbers={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
