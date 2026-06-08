import React, { useState } from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';
import { Btn } from '../ui/common';
import { IMG, CHALLENGES } from '../data';

const features = [
  { icon: Icons.Sparkles, title: 'AI Species Identification', desc: 'Snap a photo and our self-hosted vision model names the species in seconds — with confidence scores and alternatives.', color: 'from-emerald-400 to-teal-600' },
  { icon: Icons.Compass, title: 'Photo Scavenger Hunts', desc: 'Join themed challenges like Backyard Birds and Pollinator Patrol. Track targets, earn points, level up.', color: 'from-amber-400 to-orange-500' },
  { icon: Icons.Users, title: 'Community Wildlife Feed', desc: 'Share discoveries, like and comment, follow naturalists, and explore a beautiful nature-focused feed.', color: 'from-sky-400 to-blue-600' },
  { icon: Icons.Trophy, title: 'Badges & Leaderboards', desc: 'Unlock collectible badges and climb global, weekly and challenge-specific leaderboards.', color: 'from-rose-400 to-pink-600' },
  { icon: Icons.Shield, title: 'Private & Self-Hosted AI', desc: 'Run identification on your own infrastructure. Sensitive species locations are auto-generalized.', color: 'from-violet-500 to-purple-700' },
  { icon: Icons.Leaf, title: 'Ethical by Design', desc: 'Built-in reminders to keep wildlife safe and undisturbed, with responsible photography guidelines.', color: 'from-lime-400 to-green-600' },
];

const Landing: React.FC = () => {
  const { navigate, toast } = useWQ();
  const [email, setEmail] = useState('');

  const subscribe = async () => {
    if (!email.includes('@')) { toast('Enter a valid email', 'error'); return; }
    try {
      await fetch('https://famous.ai/api/crm/6a2650d20fb250ab0e344b36/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer-signup', tags: ['newsletter', 'wildquest'] }),
      });
    } catch (e) {}
    toast('You\'re on the trail! Check your inbox.'); setEmail('');
  };

  return (
    <div className="bg-[#faf8f3]">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img src={IMG.hero} alt="Wildlife" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2417]/95 via-[#0f2417]/70 to-emerald-900/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-emerald-100 text-sm mb-6">
            <Icons.Sparkles className="w-4 h-4 text-amber-300" /> AI-powered wildlife identification
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] max-w-3xl tracking-tight">
            Turn Wildlife Photography Into an <span className="bg-gradient-to-r from-amber-300 to-emerald-300 bg-clip-text text-transparent">Adventure</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-50/80 mt-6 max-w-2xl">
            Identify species with AI, complete photo scavenger hunts, earn badges, and share your discoveries with a global community of naturalists.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Btn onClick={() => navigate('signup')} className="!px-7 !py-3.5 !text-base !bg-emerald-500 hover:!bg-emerald-400 shadow-xl shadow-emerald-900/30">
              <Icons.Camera className="w-5 h-5" /> Start Exploring
            </Btn>
            <Btn onClick={() => navigate('challenges')} variant="outline" className="!px-7 !py-3.5 !text-base !border-white/40 !text-white hover:!bg-white/10">
              <Icons.Compass className="w-5 h-5" /> View Challenges
            </Btn>
          </div>
          <div className="flex flex-wrap gap-6 mt-12 text-white/90">
            {[['200+', 'Species in database'], ['8', 'Active hunts'], ['12k+', 'Observations shared'], ['100%', 'Self-hostable AI']].map(([n, l]) => (
              <div key={l}><p className="text-2xl md:text-3xl font-black">{n}</p><p className="text-xs text-emerald-100/60">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Everything you need</p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">A complete nature exploration platform</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} grid place-items-center mb-4 shadow-md`}><f.icon className="w-6 h-6 text-white" /></div>
              <h3 className="font-bold text-slate-800 text-lg">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge showcase */}
      <section className="bg-[#0f2417] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-amber-300 font-semibold text-sm uppercase tracking-wider">Scavenger hunts</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Pick your next quest</h2>
            </div>
            <Btn onClick={() => navigate('challenges')} variant="outline" className="!border-emerald-400/50 !text-emerald-200 hover:!bg-emerald-900/40">Browse all <Icons.ChevronRight className="w-4 h-4" /></Btn>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {CHALLENGES.slice(0, 4).map((c) => (
              <button key={c.id} onClick={() => navigate('challenges')} className="group relative rounded-2xl overflow-hidden h-52 text-left">
                <img src={c.image} alt={c.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-70`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{c.title}</h3>
                  <p className="text-xs text-white/80">{c.targets} species · {c.points} pts</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-3xl p-10 md:p-14 text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-black">Ready to start your WildQuest?</h2>
          <p className="text-emerald-50/90 mt-3 max-w-lg mx-auto">Join thousands of naturalists turning everyday walks into wildlife adventures.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-7">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="flex-1 px-4 py-3 rounded-xl text-slate-800 outline-none" />
            <Btn onClick={subscribe} variant="amber" className="!py-3 whitespace-nowrap">Get early access</Btn>
          </div>
          <Btn onClick={() => navigate('signup')} className="mt-5 !bg-white !text-emerald-700 hover:!bg-emerald-50">Create free account</Btn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1a0f] text-emerald-100/60 pt-14 pb-28 md:pb-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center"><Icons.Binoculars className="w-5 h-5 text-white" /></div>
              <span className="text-lg font-bold text-white">WildQuest</span>
            </div>
            <p className="text-sm max-w-xs">Wildlife photography scavenger hunts with private, self-hosted AI species identification.</p>
          </div>
          {[
            ['Explore', [['Challenges', 'challenges'], ['Community Feed', 'feed'], ['Leaderboard', 'leaderboard'], ['Badges', 'badges']]],
            ['Account', [['Sign Up', 'signup'], ['Log In', 'login'], ['Settings', 'settings'], ['Dashboard', 'dashboard']]],
            ['Resources', [['Community Guidelines', 'guidelines'], ['Upload Photo', 'upload'], ['Admin', 'admin']]],
          ].map(([title, links]: any) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-3 text-sm">{title}</h4>
              <ul className="space-y-2 text-sm">
                {links.map(([l, v]: any) => <li key={l}><button onClick={() => navigate(v)} className="hover:text-emerald-300">{l}</button></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-emerald-900/40 text-xs flex flex-wrap justify-between gap-2">
          <span>© 2026 WildQuest. Explore responsibly.</span>
          <span className="flex items-center gap-1"><Icons.Leaf className="w-3.5 h-3.5" /> Never disturb wildlife for a photo.</span>
        </div>
      </footer>
    </div>
  );
};
export default Landing;
