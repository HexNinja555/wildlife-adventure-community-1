import React, { useState } from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';
import { Btn, Badge } from '../ui/common';
import { ChallengeCard } from '../ui/cards';
import { CHALLENGES } from '../data';
import { badgeIcon } from '../icons';

export const ChallengesPage: React.FC = () => {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...Array.from(new Set(CHALLENGES.map((c) => c.category)))];
  const list = cat === 'All' ? CHALLENGES : CHALLENGES.filter((c) => c.category === cat);
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-6 md:p-10 text-white">
        <Badge color="bg-white/15 text-white">Scavenger Hunts</Badge>
        <h1 className="text-2xl md:text-4xl font-black mt-3">Choose your next quest</h1>
        <p className="text-emerald-50/80 mt-2 max-w-xl">Complete photo challenges, hit your species targets, and unlock exclusive badges.</p>
      </div>
      <div className="flex gap-2 overflow-x-auto mt-6 pb-1">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${cat === c ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'}`}>{c}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {list.map((c) => <ChallengeCard key={c.id} c={c} />)}
      </div>
    </div>
  );
};

export const ChallengeDetail: React.FC = () => {
  const { params, navigate, joinChallenge, joinedChallenges } = useWQ();
  const c = CHALLENGES.find((x) => x.id === params.id);
  if (!c) return <div className="p-10 text-center text-slate-500">Challenge not found.</div>;
  const joined = joinedChallenges.includes(c.id);
  const progress = joined ? Math.min(95, 20 + (c.id.length * 7) % 70) : 0;
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <button onClick={() => navigate('challenges')} className="text-sm text-emerald-600 font-semibold mb-4">← All challenges</button>
      <div className="relative rounded-3xl overflow-hidden h-56 md:h-72">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="flex gap-2 mb-2"><Badge color="bg-white/90 text-slate-700">{c.category}</Badge><Badge color="bg-white/90 text-slate-700">{c.difficulty}</Badge></div>
          <h1 className="text-3xl md:text-4xl font-black">{c.title}</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <p className="text-slate-600">{c.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[[<Icons.Target className="w-4 h-4" />, `${c.targets}`, 'Species targets'], [<Icons.Trophy className="w-4 h-4 text-amber-500" />, `${c.points}`, 'Points'], [<Icons.Users className="w-4 h-4" />, c.participants.toLocaleString(), 'Participants'], [<Icons.Calendar className="w-4 h-4" />, c.end, 'Ends']].map(([ic, v, l]: any, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 p-3 text-center">
                <div className="flex justify-center text-emerald-600">{ic}</div>
                <p className="text-lg font-bold text-slate-800 mt-1">{v}</p>
                <p className="text-[11px] text-slate-400">{l}</p>
              </div>
            ))}
          </div>

          {joined && (
            <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-2"><span className="font-semibold text-slate-700">Your progress</span><span className="text-sm font-bold text-emerald-600">{progress}%</span></div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{ width: `${progress}%` }} /></div>
              <p className="text-xs text-slate-400 mt-2">{Math.round(progress / 100 * c.targets)} of {c.targets} species identified</p>
            </div>
          )}

          <h3 className="font-bold text-slate-800 mt-6 mb-3">Species targets (sample)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Robin', 'Cardinal', 'Heron', 'Mallard', 'Sparrow', 'Wren'].slice(0, Math.min(6, c.targets)).map((s, i) => (
              <div key={s} className={`flex items-center gap-2 rounded-xl p-2.5 text-sm ${joined && i < progress / 100 * c.targets ? 'bg-emerald-50 text-emerald-700' : 'bg-white border border-slate-100 text-slate-500'}`}>
                {joined && i < progress / 100 * c.targets ? <Icons.CheckCircle2 className="w-4 h-4" /> : <Icons.Target className="w-4 h-4" />} {s}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 grid place-items-center text-white shadow-md mb-2">{badgeIcon('trophy', 'w-8 h-8')}</div>
            <p className="text-xs text-slate-400">Completion badge</p>
            <p className="font-bold text-slate-800">{c.badge}</p>
          </div>
          {joined ? (
            <Btn onClick={() => navigate('upload')} variant="amber" className="w-full !py-3"><Icons.Camera className="w-5 h-5" /> Submit observation</Btn>
          ) : (
            <Btn onClick={() => joinChallenge(c.id)} className="w-full !py-3"><Icons.Compass className="w-5 h-5" /> Join challenge</Btn>
          )}
        </div>
      </div>
    </div>
  );
};
