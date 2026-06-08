import React from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';
import { Btn, StatCard } from '../ui/common';
import { ChallengeCard } from '../ui/cards';
import { CHALLENGES, LEADERBOARD, BADGES } from '../data';
import { badgeIcon } from '../icons';

const Dashboard: React.FC = () => {
  const { user, navigate, joinedChallenges } = useWQ();
  const active = CHALLENGES.filter((c) => joinedChallenges.includes(c.id));
  const recommended = CHALLENGES.filter((c) => !joinedChallenges.includes(c.id)).slice(0, 3);
  const points = user?.points || 1240;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-emerald-600 font-medium text-sm">Welcome back,</p>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">{user?.name || 'Explorer'} <span className="inline-block">👋</span></h1>
          <p className="text-slate-500 text-sm mt-1">Ready to discover something wild today?</p>
        </div>
        <Btn onClick={() => navigate('upload')} variant="amber" className="!py-3"><Icons.Camera className="w-5 h-5" /> Upload a photo</Btn>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-7">
        <StatCard icon={<Icons.Binoculars className="w-5 h-5 text-emerald-600" />} accent="bg-emerald-50" label="Observations" value={47} />
        <StatCard icon={<Icons.Trophy className="w-5 h-5 text-amber-600" />} accent="bg-amber-50" label="Points earned" value={points.toLocaleString()} />
        <StatCard icon={<Icons.Award className="w-5 h-5 text-sky-600" />} accent="bg-sky-50" label="Badges unlocked" value={4} />
        <StatCard icon={<Icons.Leaf className="w-5 h-5 text-rose-600" />} accent="bg-rose-50" label="Species discovered" value={31} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active challenges */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Icons.Compass className="w-5 h-5 text-emerald-600" /> Active Challenges</h2>
              <button onClick={() => navigate('challenges')} className="text-sm text-emerald-600 font-semibold">View all</button>
            </div>
            {active.length ? (
              <div className="grid sm:grid-cols-2 gap-4">{active.map((c) => <ChallengeCard key={c.id} c={c} />)}</div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                <Icons.Compass className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <p className="font-semibold text-slate-700">No active challenges yet</p>
                <p className="text-sm text-slate-500 mt-1">Join a scavenger hunt to start earning points.</p>
                <Btn onClick={() => navigate('challenges')} className="mt-4">Browse challenges</Btn>
              </div>
            )}
          </section>

          {/* Recommended */}
          <section>
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.Sparkles className="w-5 h-5 text-amber-500" /> Recommended for you</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{recommended.map((c) => <ChallengeCard key={c.id} c={c} />)}</div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Leaderboard snapshot */}
          <section className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-800 flex items-center gap-2"><Icons.Trophy className="w-5 h-5 text-amber-500" /> Top Explorers</h2>
              <button onClick={() => navigate('leaderboard')} className="text-xs text-emerald-600 font-semibold">Full board</button>
            </div>
            <div className="space-y-2.5">
              {LEADERBOARD.slice(0, 5).map((e) => (
                <button key={e.rank} onClick={() => navigate('profile', { username: e.username })} className="w-full flex items-center gap-3 text-left">
                  <span className={`w-6 text-center font-bold text-sm ${e.rank === 1 ? 'text-amber-500' : e.rank === 2 ? 'text-slate-400' : e.rank === 3 ? 'text-orange-600' : 'text-slate-300'}`}>{e.rank}</span>
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white text-xs font-bold">{e.avatar}</span>
                  <span className="flex-1 text-sm font-medium text-slate-700 truncate">@{e.username}</span>
                  <span className="text-sm font-bold text-emerald-600">{e.points.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Recent badges */}
          <section className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Icons.Award className="w-5 h-5 text-sky-500" /> Recent Badges</h2>
            <div className="grid grid-cols-4 gap-3">
              {BADGES.slice(0, 4).map((b) => (
                <button key={b.id} onClick={() => navigate('badges')} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 grid place-items-center text-white shadow-md">{badgeIcon(b.icon, 'w-6 h-6')}</div>
                  <span className="text-[10px] text-slate-500 text-center leading-tight">{b.name}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
