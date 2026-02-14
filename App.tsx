import React, { useState } from 'react';
import { Rocket, ShieldAlert } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { ContentDisplay } from './components/ContentDisplay';
import { Spinner } from './components/Spinner';
import { generateContent } from './services/geminiService';
import { ContentRequest, GenerationState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleGenerate = async (request: ContentRequest) => {
    setState({ isLoading: true, error: null, result: null });
    try {
      const result = await generateContent(request);
      setState({ isLoading: false, error: null, result });
    } catch (error: any) {
      setState({
        isLoading: false,
        error: error.message || 'An unexpected error occurred.',
        result: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FE] text-slate-900 pb-20 relative overflow-x-hidden">
      {/* Ambient Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-pink-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* Glass Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/50 supports-[backdrop-filter]:bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl shadow-lg shadow-indigo-500/30 flex items-center justify-center transform transition-transform group-hover:scale-105 group-hover:rotate-3">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">
              Dr.Content
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI-Powered Growth
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight animate-fade-in-up animation-delay-100">
            Create content that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">scales your brand</span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed animate-fade-in-up animation-delay-200">
            Generate engagement-ready content strategies for LinkedIn, Twitter, and more in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 z-10">
            <InputForm onSubmit={handleGenerate} isLoading={state.isLoading} />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7 xl:col-span-8 min-h-[500px]">
            {state.error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/60 rounded-2xl p-6 flex items-start gap-4 text-red-700 animate-fade-in shadow-sm">
                <div className="p-2 bg-red-100 rounded-full">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Generation Failed</h3>
                  <p className="text-red-600/90 mt-1 leading-relaxed">{state.error}</p>
                </div>
              </div>
            )}

            {state.isLoading && (
              <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-100/50 border border-white/60 p-16 flex justify-center">
                <Spinner />
              </div>
            )}

            {!state.isLoading && !state.result && !state.error && (
              <div className="bg-white/60 backdrop-blur-md rounded-2xl border-2 border-dashed border-slate-200/60 p-16 text-center h-full flex flex-col items-center justify-center group hover:border-indigo-300/50 transition-colors">
                <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <Rocket className="w-10 h-10 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to Takeoff?</h3>
                <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Configure your strategy on the left and watch the AI magic happen right here.
                </p>
              </div>
            )}

            {state.result && (
              <ContentDisplay content={state.result} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;