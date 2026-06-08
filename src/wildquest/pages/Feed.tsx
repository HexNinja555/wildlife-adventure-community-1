import React, { useState } from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';
import { Btn, EmptyState, Skeleton, ConfidenceBadge } from '../ui/common';
import { FeedPostCard } from '../ui/cards';

export const FeedPage: React.FC = () => {
  const { feed, navigate } = useWQ();
  const [filter, setFilter] = useState('All');
  const cats = ['All', 'Bird', 'Mammal', 'Insect', 'Reptile'];
  const list = filter === 'All' ? feed : feed.filter((p) => p.category === filter);
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900">Community Feed</h1>
        <Btn onClick={() => navigate('upload')} variant="amber"><Icons.Camera className="w-4 h-4" /> Share</Btn>
      </div>
      <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
        {cats.map((c) => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${filter === c ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>{c}</button>
        ))}
      </div>
      {list.length ? (
        <div className="space-y-5 mt-5">{list.map((p) => <FeedPostCard key={p.id} p={p} />)}</div>
      ) : (
        <EmptyState icon={<Icons.Users className="w-8 h-8" />} title="No observations yet" sub="Be the first to share a discovery in this category." action={<Btn onClick={() => navigate('upload')}>Upload a photo</Btn>} />
      )}
    </div>
  );
};

export const ObservationDetail: React.FC = () => {
  const { params, feed, navigate, likePost, likedPosts, user, toast } = useWQ();
  const p = feed.find((x) => x.id === params.id) || feed[0];
  const [comments, setComments] = useState<{ username: string; body: string }[]>(p?.comments || []);
  const [text, setText] = useState('');
  const liked = likedPosts.includes(p?.id);
  if (!p) return <div className="p-10 text-center text-slate-500">Observation not found.</div>;

  const addComment = () => {
    if (!user) { toast('Sign in to comment', 'info'); navigate('login'); return; }
    if (!text.trim()) return;
    setComments((c) => [...c, { username: user.username, body: text.trim() }]);
    setText(''); toast('Comment posted');
  };

  const related = feed.filter((x) => x.id !== p.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <button onClick={() => navigate('feed')} className="text-sm text-emerald-600 font-semibold mb-4">← Back to feed</button>
      <div className="grid md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <img src={p.image} alt={p.common} className="w-full rounded-2xl object-cover shadow-md" />
          <div className="mt-4 bg-white rounded-2xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1"><Icons.MapPin className="w-3.5 h-3.5" /> Location</p>
            <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-100 to-sky-100 grid place-items-center text-emerald-600 text-sm">
              <span className="flex items-center gap-1.5"><Icons.MapPin className="w-4 h-4" /> {p.location}</span>
            </div>
            <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-2 mt-3 flex items-start gap-1.5"><Icons.Shield className="w-3.5 h-3.5 shrink-0 mt-0.5" /> Exact coordinates are generalized to protect this species.</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div><h1 className="text-xl font-black text-slate-900">{p.common}</h1><p className="italic text-slate-400 text-sm">{p.sci}</p></div>
              <ConfidenceBadge value={p.confidence} />
            </div>
            <button onClick={() => navigate('profile', { username: p.username })} className="flex items-center gap-2 mt-3">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center text-white text-xs font-bold">{p.avatar}</span>
              <span className="text-sm font-medium text-slate-700">@{p.username}</span><span className="text-xs text-slate-400">· {p.date}</span>
            </button>
            {p.caption && <p className="text-sm text-slate-600 mt-3">{p.caption}</p>}
            <div className="flex gap-4 mt-4 pt-3 border-t border-slate-50">
              <button onClick={() => { if (!user) { toast('Sign in to like', 'info'); return; } likePost(p.id); }} className={`flex items-center gap-1.5 text-sm font-medium ${liked ? 'text-rose-500' : 'text-slate-500'}`}><Icons.Heart className={`w-5 h-5 ${liked ? 'fill-rose-500' : ''}`} /> {p.likes}</button>
              <button onClick={() => toast('Saved')} className="flex items-center gap-1.5 text-sm text-slate-500"><Icons.Bookmark className="w-5 h-5" /></button>
              <button onClick={() => toast('Link copied')} className="flex items-center gap-1.5 text-sm text-slate-500"><Icons.Share2 className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Comments */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Icons.MessageCircle className="w-4 h-4" /> Comments ({comments.length})</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {comments.length === 0 && <p className="text-sm text-slate-400">No comments yet. Start the conversation!</p>}
              {comments.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white text-xs font-bold shrink-0">{c.username[0].toUpperCase()}</span>
                  <div className="bg-slate-50 rounded-xl px-3 py-2 flex-1"><p className="text-xs font-semibold text-slate-700">@{c.username}</p><p className="text-sm text-slate-600">{c.body}</p></div>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addComment()} placeholder="Add a comment…" className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400" />
              <Btn onClick={addComment} className="!px-4">Post</Btn>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-bold text-slate-800 mb-3">Related observations</h3>
        <div className="grid grid-cols-3 gap-3">
          {related.map((r) => (
            <button key={r.id} onClick={() => navigate('observation', { id: r.id })} className="group rounded-xl overflow-hidden aspect-square relative">
              <img src={r.image} alt={r.common} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-1.5 left-2 text-white text-xs font-semibold">{r.common}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-start gap-2 text-xs text-slate-400 bg-emerald-50/60 rounded-xl p-3">
        <Icons.Leaf className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />
        <span>Ethical reminder: keep a respectful distance, never use bait or calls to lure wildlife, and leave no trace.</span>
      </div>
    </div>
  );
};
