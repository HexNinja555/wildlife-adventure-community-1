import React, { useState } from 'react';
import { useWQ } from '../store';
import { Icons, badgeIcon } from '../icons';
import { Btn, StatCard, Badge } from '../ui/common';
import { BADGES, LEADERBOARD, SEED_FEED, IMG } from '../data';

export const ProfilePage: React.FC = () => {
  const { params, user, navigate, toast } = useWQ();
  const username = params.username || user?.username || 'maya_wilds';
  const isMe = user?.username === username;
  const [tab, setTab] = useState<'photos' | 'badges' | 'activity'>('photos');
  const [following, setFollowing] = useState(false);
  const lbEntry = LEADERBOARD.find((l) => l.username === username);
  const photos = [IMG.heron, IMG.fox, IMG.monarch, IMG.cardinal, IMG.raccoon, IMG.turtle, IMG.deer, IMG.mallard, IMG.robin];
  const unlocked = BADGES.slice(0, isMe ? 4 : (lbEntry?.badges || 5));

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="h-28 bg-gradient-to-r from-emerald-500 to-teal-700" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white text-3xl font-black border-4 border-white shadow-md">{(user?.avatar) && isMe ? user.avatar : username[0].toUpperCase()}</div>
            {isMe ? (
              <Btn variant="outline" onClick={() => navigate('settings')}><Icons.Settings className="w-4 h-4" /> Edit profile</Btn>
            ) : (
              <Btn variant={following ? 'outline' : 'primary'} onClick={() => { setFollowing(!following); toast(following ? 'Unfollowed' : `Now following @${username}`); }}>{following ? 'Following' : 'Follow'}</Btn>
            )}
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-3">{isMe ? user?.name : username}</h1>
          <p className="text-slate-500">@{username}</p>
          {(isMe && user?.bio) ? <p className="text-sm text-slate-600 mt-2">{user.bio}</p> : <p className="text-sm text-slate-600 mt-2">Wildlife photographer & weekend naturalist exploring local parks one species at a time.</p>}
          {(isMe && user?.location) && <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Icons.MapPin className="w-3.5 h-3.5" /> {user.location}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
        <StatCard icon={<Icons.Binoculars className="w-5 h-5 text-emerald-600" />} accent="bg-emerald-50" label="Observations" value={lbEntry?.observations || 47} />
        <StatCard icon={<Icons.Leaf className="w-5 h-5 text-lime-600" />} accent="bg-lime-50" label="Species" value={31} />
        <StatCard icon={<Icons.Compass className="w-5 h-5 text-sky-600" />} accent="bg-sky-50" label="Challenges" value={5} />
        <StatCard icon={<Icons.Award className="w-5 h-5 text-amber-600" />} accent="bg-amber-50" label="Badges" value={unlocked.length} />
        <StatCard icon={<Icons.Trophy className="w-5 h-5 text-rose-600" />} accent="bg-rose-50" label="Points" value={(lbEntry?.points || user?.points || 1240).toLocaleString()} />
      </div>

      <div className="flex gap-2 mt-6 border-b border-slate-100">
        {(['photos', 'badges', 'activity'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-semibold capitalize border-b-2 -mb-px ${tab === t ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>{t}</button>
        ))}
      </div>

      {tab === 'photos' && (
        <div className="grid grid-cols-3 gap-2 mt-4">
          {photos.map((src, i) => (
            <button key={i} onClick={() => navigate('observation', { id: SEED_FEED[i % SEED_FEED.length].id })} className="aspect-square rounded-xl overflow-hidden group">
              <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </button>
          ))}
        </div>
      )}
      {tab === 'badges' && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mt-4">
          {BADGES.map((b, i) => {
            const has = i < unlocked.length;
            return (
              <div key={b.id} className={`text-center ${has ? '' : 'opacity-40'}`}>
                <div className={`w-16 h-16 mx-auto rounded-2xl grid place-items-center text-white shadow-md ${has ? 'bg-gradient-to-br from-amber-300 to-orange-500' : 'bg-slate-300'}`}>{has ? badgeIcon(b.icon, 'w-7 h-7') : <Icons.Lock className="w-6 h-6" />}</div>
                <p className="text-xs font-semibold text-slate-700 mt-2">{b.name}</p>
              </div>
            );
          })}
        </div>
      )}
      {tab === 'activity' && (
        <div className="space-y-3 mt-4">
          {SEED_FEED.slice(0, 5).map((a) => (
            <div key={a.id} className="flex items-center gap-3 bg-white rounded-xl border border-slate-100 p-3">
              <img src={a.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1"><p className="text-sm font-semibold text-slate-700">Identified {a.common}</p><p className="text-xs text-slate-400">{a.date} · {a.location}</p></div>
              <Badge color="bg-emerald-50 text-emerald-700">+{a.confidence} pts</Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const BadgesPage: React.FC = () => {
  const { navigate } = useWQ();
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-black text-slate-900">Badge Collection</h1>
      <p className="text-slate-500 mt-1">Earn badges by exploring, identifying, and contributing. 4 of {BADGES.length} unlocked.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {BADGES.map((b, i) => {
          const has = i < 4;
          const tierColor = b.tier === 'Platinum' ? 'from-sky-300 to-indigo-500' : b.tier === 'Gold' ? 'from-amber-300 to-orange-500' : b.tier === 'Silver' ? 'from-slate-300 to-slate-500' : 'from-orange-300 to-amber-700';
          return (
            <div key={b.id} className={`bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 ${has ? '' : 'opacity-60'}`}>
              <div className={`w-14 h-14 rounded-2xl grid place-items-center text-white shadow-md shrink-0 ${has ? `bg-gradient-to-br ${tierColor}` : 'bg-slate-300'}`}>{has ? badgeIcon(b.icon, 'w-7 h-7') : <Icons.Lock className="w-6 h-6" />}</div>
              <div className="flex-1"><div className="flex items-center gap-2"><p className="font-bold text-slate-800">{b.name}</p><Badge color="bg-slate-100 text-slate-500">{b.tier}</Badge></div><p className="text-xs text-slate-500 mt-0.5">{b.desc}</p></div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-center"><Btn onClick={() => navigate('upload')}>Earn your next badge</Btn></div>
    </div>
  );
};

export const LeaderboardPage: React.FC = () => {
  const { navigate } = useWQ();
  const [scope, setScope] = useState<'Global' | 'Weekly' | 'Challenge'>('Global');
  const data = scope === 'Weekly' ? [...LEADERBOARD].sort(() => 0.5).slice(0, 8) : LEADERBOARD;
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-black text-slate-900">Leaderboard</h1>
      <div className="flex gap-2 mt-4">
        {(['Global', 'Weekly', 'Challenge'] as const).map((s) => (
          <button key={s} onClick={() => setScope(s)} className={`px-4 py-2 rounded-full text-sm font-semibold ${scope === s ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>{s}</button>
        ))}
      </div>
      {/* podium */}
      <div className="flex items-end justify-center gap-3 mt-8">
        {[data[1], data[0], data[2]].map((e, idx) => {
          const place = idx === 1 ? 1 : idx === 0 ? 2 : 3;
          const h = place === 1 ? 'h-28' : place === 2 ? 'h-20' : 'h-16';
          return (
            <button key={e.username} onClick={() => navigate('profile', { username: e.username })} className="flex flex-col items-center">
              <span className={`rounded-full grid place-items-center text-white font-black mb-2 ${place === 1 ? 'w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 text-2xl' : 'w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-600'}`}>{e.avatar}</span>
              <span className="text-xs font-semibold text-slate-700">@{e.username}</span>
              <span className="text-xs text-emerald-600 font-bold">{e.points.toLocaleString()}</span>
              <div className={`${h} w-20 rounded-t-xl mt-2 grid place-items-start justify-center pt-2 text-white font-black text-lg ${place === 1 ? 'bg-amber-400' : place === 2 ? 'bg-slate-300' : 'bg-orange-400'}`}>{place}</div>
            </button>
          );
        })}
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 mt-6 divide-y divide-slate-50">
        {data.map((e, i) => (
          <button key={e.username} onClick={() => navigate('profile', { username: e.username })} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 text-left">
            <span className="w-6 font-bold text-slate-400 text-center">{i + 1}</span>
            <span className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white font-bold">{e.avatar}</span>
            <div className="flex-1"><p className="font-semibold text-slate-800">@{e.username}</p><p className="text-xs text-slate-400">{e.observations} observations · {e.badges} badges</p></div>
            <span className="font-bold text-emerald-600">{e.points.toLocaleString()}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
