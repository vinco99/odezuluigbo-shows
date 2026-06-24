import Link from "next/link";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";

const session = await auth()

export default function Home() {
  return (
    <main className="bg-slate-900 text-slate-100 font-sans antialiased selection:bg-purple-500 selection:text-white">

      <Navbar session={session} />
      
      {/*HERO SECTION*/}
      <header className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/*Background Ambient Accents*/}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/*Hero Content Box*/}
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-6 tracking-wide uppercase">
            🎭 Live Experiences & Entertainment
          </span>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            <span className="block bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent font-black drop-shadow-sm">
              Odezuluigbo Shows
            </span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Step into a world of vibrant cultural performances, premium media broadcasts, and unforgettable showcases tailored just for you.
          </p>
          
          {/*Hero CTAs*/}
          <div className="mt-10 sm:flex sm:justify-center gap-4">

            <div className="rounded-xl shadow">
              <Link 
                href="#dashboard" 
                className="w-full flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-slate-950 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-300 hover:to-pink-400 transition-all duration-200 md:text-lg transform hover:-translate-y-0.5 font-bold shadow-lg shadow-purple-500/20"
              >
                Vote Now
              </Link>
            </div>
            <div className="mt-3 sm:mt-0">
              <Link
                href="#learn-more"
                className="w-full flex items-center justify-center px-8 py-3.5 border border-slate-700 hover:border-slate-500 text-base font-medium rounded-xl text-white bg-slate-800/40 hover:bg-slate-800 transition-all duration-200 md:text-lg backdrop-blur-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/*Subtle Scroll Down Indicator*/}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-500 animate-bounce hidden sm:block">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </header>
    </main>
  );
}
