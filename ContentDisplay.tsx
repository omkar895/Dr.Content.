import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Sparkles } from 'lucide-react';

interface ContentDisplayProps {
  content: string;
}

export const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-200/50 border border-white/60 overflow-hidden animate-fade-in-up transition-all duration-500">
      <div className="bg-gradient-to-r from-slate-50 to-white px-8 py-5 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Strategy Blueprint</h2>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border ${
            copied 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300 hover:shadow-sm'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      
      <div className="p-8 md:p-10 prose prose-slate prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 mb-6" {...props} />,
            h2: ({node, ...props}) => (
                <div className="mt-10 mb-4 pb-2 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-indigo-900 flex items-center gap-2" {...props} />
                </div>
            ),
            h3: ({node, ...props}) => <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-slate-600 leading-8 mb-4 font-normal" {...props} />,
            ul: ({node, ...props}) => <ul className="list-none space-y-3 my-6 pl-0" {...props} />,
            li: ({node, ...props}) => (
                <li className="flex items-start gap-3 text-slate-600 pl-0">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="flex-1">{props.children}</span>
                </li>
            ),
            strong: ({node, ...props}) => <strong className="font-bold text-slate-900" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 py-1 my-6 italic text-slate-700 bg-slate-50 rounded-r-lg" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};