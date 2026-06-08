import React from 'react';
import { Challenge } from '../data';
import { Icons } from '../icons';
import { Badge, ConfidenceBadge } from './common';
import { useWQ } from '../store';

export const ChallengeCard: React.FC<{ c: Challenge }> = ({ c }) => {
  const { navigate, joinedChallenges } = useWQ();
  const joined = joinedChallenges.includes(c.id);
  const progress = joined ? Math.min(95, 20 + (c.id.length * 7) % 70) : 0;
  const diffColor = c.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : c.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700';
  return (
    <button onClick={() => navigate('challenge', { id: c.id })} className="text-left group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="relative h-36 overflow-hidden">
        <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute inset-0 bg-gradient-to-t ${c.color} opacity-60`} />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge color={diffColor}>{c.difficulty}</Badge>
          <Badge color="bg-white/90 text-slate-700">{c.category}</Badge>
        </div>
        {joined && <span className="absolute top-3 right-3 bg-white/90 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full">Joined</span>}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{c.title}</h3>
        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Icons.Target className="w-3.5 h-3.5" /> {c.targets} species</span>
          <span className="flex items-center gap-1"><Icons.Trophy className="w-3.5 h-3.5 text-amber-500" /> {c.points} pts</span>
          <span className="flex items-center gap-1"><Icons.Users className="w-3.5 h-3.5" /> {c.participants.toLocaleString()}</span>
        </div>
        {joined && (
          <div className="mt-3">
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
            <p className="text-[11px] text-slate-400 mt-1">{progress}% complete</p>
          </div>
        )}
      </div>
    </button>
  );
};

export const FeedPostCard: React.FC<{ p: any }> = ({ p }) => {
  const { navigate, likePost, likedPosts, user, toast } = useWQ();
  const liked = likedPosts.includes(p.id);
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 p-3">
        <button onClick={() => navigate('profile', { username: p.username })} className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white font-bold text-sm">{p.avatar}</button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">@{p.username}</p>
          <p className="text-xs text-slate-400 flex items-center gap-1"><Icons.MapPin className="w-3 h-3" /> {p.location} · {p.date}</p>
        </div>
        {p.challenge && <Badge color="bg-emerald-50 text-emerald-700"><Icons.Compass className="w-3 h-3" /> {p.challenge}</Badge>}
      </div>
      <button onClick={() => navigate('observation', { id: p.id })} className="block w-full">
        <img src={p.image} alt={p.common} className="w-full aspect-square md:aspect-[4/3] object-cover" />
      </button>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-800">{p.common}</h3>
            <p className="text-xs italic text-slate-400">{p.sci}</p>
          </div>
          <ConfidenceBadge value={p.confidence} />
        </div>
        {p.caption && <p className="text-sm text-slate-600 mt-2">{p.caption}</p>}
        <div className="flex items-center gap-5 mt-3 pt-3 border-t border-slate-50">
          <button onClick={() => { if (!user) { toast('Sign in to like', 'info'); return; } likePost(p.id); }} className={`flex items-center gap-1.5 text-sm font-medium ${liked ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}>
            <Icons.Heart className={`w-5 h-5 ${liked ? 'fill-rose-500' : ''}`} /> {p.likes}
          </button>
          <button onClick={() => navigate('observation', { id: p.id })} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-emerald-600">
            <Icons.MessageCircle className="w-5 h-5" /> {p.comments?.length || 0}
          </button>
          <button onClick={() => toast('Saved to your collection')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-amber-600 ml-auto"><Icons.Bookmark className="w-5 h-5" /></button>
          <button onClick={() => toast('Share link copied!')} className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600"><Icons.Share2 className="w-5 h-5" /></button>
        </div>
      </div>
    </article>
  );
};
