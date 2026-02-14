import React from 'react';
import { Send, Sparkles, Trash2, ChevronDown } from 'lucide-react';
import { PLATFORMS, TONES } from '../constants';
import { ContentRequest, Platform, Tone } from '../types';

interface InputFormProps {
  onSubmit: (data: ContentRequest) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = React.useState('');
  const [platform, setPlatform] = React.useState<Platform>(Platform.LinkedIn);
  const [audience, setAudience] = React.useState('');
  const [tone, setTone] = React.useState<Tone>(Tone.Professional);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic && audience) {
      onSubmit({ topic, platform, audience, tone });
    }
  };

  const handleClear = () => {
    setTopic('');
    setPlatform(Platform.LinkedIn);
    setAudience('');
    setTone(Tone.Professional);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-500/10 border border-white/50 p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:shadow-indigo-500/20">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
            <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Content Engine</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 ml-1">
            Topic
          </label>
          <input
            id="topic"
            type="text"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., The future of AI in healthcare"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="platform" className="block text-sm font-semibold text-slate-700 ml-1">
              Platform
            </label>
            <div className="relative">
              <select
                id="platform"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as Platform)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium appearance-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 cursor-pointer"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="tone" className="block text-sm font-semibold text-slate-700 ml-1">
              Tone
            </label>
            <div className="relative">
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium appearance-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 cursor-pointer"
              >
                {TONES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                 <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="audience" className="block text-sm font-semibold text-slate-700 ml-1">
            Target Audience
          </label>
          <input
            id="audience"
            type="text"
            required
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            placeholder="e.g., Small business owners"
            className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-5 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            title="Reset"
          >
            <Trash2 className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98] shadow-lg shadow-indigo-500/25 ${
              isLoading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-violet-500'
            }`}
          >
            {isLoading ? (
              'Processing...'
            ) : (
              <>
                Generate <Send className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};