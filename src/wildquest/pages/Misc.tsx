import React, { useState } from 'react';
import { useWQ } from '../store';
import { supabase } from '@/lib/supabase';
import { Icons } from '../icons';
import { Btn } from '../ui/common';
import { SEED_FEED, CHALLENGES } from '../data';


export const SettingsPage: React.FC = () => {
  const { user, navigate, toast } = useWQ();
  const [generalize, setGeneralize] = useState(true);
  const [notify, setNotify] = useState(true);
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '', location: user?.location || '' });
  if (!user) { return <div className="max-w-md mx-auto p-10 text-center"><p className="text-slate-500 mb-4">Sign in to manage settings.</p><Btn onClick={() => navigate('login')}>Sign in</Btn></div>; }
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-black text-slate-900">Settings</h1>
      <section className="bg-white rounded-2xl border border-slate-100 p-5 mt-6">
        <h2 className="font-bold text-slate-800 mb-4">Profile</h2>
        <div className="space-y-3">
          <div><label className="text-sm font-medium text-slate-700">Display name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400" /></div>
          <div><label className="text-sm font-medium text-slate-700">Location</label><input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400" /></div>
          <div><label className="text-sm font-medium text-slate-700">Bio</label><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={2} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-emerald-400" /></div>
        </div>
        <Btn className="mt-4" onClick={() => toast('Profile updated!')}>Save changes</Btn>
      </section>
      <section className="bg-white rounded-2xl border border-slate-100 p-5 mt-5">
        <h2 className="font-bold text-slate-800 mb-3">Privacy & Ethics</h2>
        <Toggle label="Generalize observation locations" desc="Protect sensitive species by hiding exact coordinates" on={generalize} set={setGeneralize} />
        <Toggle label="Activity notifications" desc="Get notified about likes, comments and challenge progress" on={notify} set={setNotify} />
      </section>
      <Btn variant="outline" className="mt-5" onClick={() => navigate('guidelines')}><Icons.Leaf className="w-4 h-4" /> Read community guidelines</Btn>
    </div>
  );
};

const Toggle: React.FC<{ label: string; desc: string; on: boolean; set: (v: boolean) => void }> = ({ label, desc, on, set }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
    <div><p className="text-sm font-medium text-slate-700">{label}</p><p className="text-xs text-slate-400">{desc}</p></div>
    <button onClick={() => set(!on)} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${on ? 'bg-emerald-500' : 'bg-slate-300'}`}><span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${on ? 'left-5.5 translate-x-0' : 'left-0.5'}`} style={{ left: on ? '22px' : '2px' }} /></button>
  </div>
);

export const GuidelinesPage: React.FC = () => {
  const { navigate } = useWQ();
  const rules = [
    ['Never disturb wildlife', 'Do not bait, chase, touch, or use calls to lure animals. A great photo is never worth stressing an animal.'],
    ['Keep a respectful distance', 'Use a long lens instead of approaching. If an animal changes behavior because of you, you are too close.'],
    ['Protect sensitive locations', 'Locations of rare and threatened species are auto-generalized. Never share exact spots publicly.'],
    ['Leave no trace', 'Stay on trails, pack out everything, and avoid trampling habitat to get a shot.'],
    ['Be honest about IDs', 'If you are unsure, mark it as uncertain. Accurate data helps real conservation efforts.'],
    ['Be kind in the community', 'Offer constructive ID feedback. No harassment, spam, or misleading content.'],
  ];
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <button onClick={() => navigate('landing')} className="text-sm text-emerald-600 font-semibold mb-4">← Back</button>
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 p-8 text-white">
        <Icons.Leaf className="w-10 h-10 mb-3" />
        <h1 className="text-3xl font-black">Community Guidelines</h1>
        <p className="text-emerald-50/80 mt-2">Responsible wildlife photography keeps nature wild for everyone.</p>
      </div>
      <div className="space-y-3 mt-6">
        {rules.map(([t, d], i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center font-bold shrink-0">{i + 1}</span>
            <div><h3 className="font-bold text-slate-800">{t}</h3><p className="text-sm text-slate-500 mt-1">{d}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const { toast } = useWQ();
  const [tab, setTab] = useState<'flagged' | 'challenges' | 'species' | 'model'>('flagged');
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <div className="flex items-center gap-2"><Icons.Shield className="w-6 h-6 text-emerald-600" /><h1 className="text-2xl md:text-3xl font-black text-slate-900">Admin & Moderation</h1></div>
      <div className="grid grid-cols-3 gap-3 mt-6">
        {[['Flagged posts', '3'], ['Active challenges', String(CHALLENGES.length)], ['Species records', '212']].map(([l, v]) => (
          <div key={l} className="bg-white rounded-2xl border border-slate-100 p-4"><p className="text-2xl font-black text-slate-800">{v}</p><p className="text-xs text-slate-400">{l}</p></div>
        ))}
      </div>
      <div className="flex gap-2 mt-6 border-b border-slate-100 overflow-x-auto">
        {(['flagged', 'challenges', 'species', 'model'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2.5 text-sm font-semibold capitalize whitespace-nowrap border-b-2 -mb-px ${tab === t ? 'border-emerald-600 text-emerald-700' : 'border-transparent text-slate-400'}`}>{t === 'model' ? 'Vision Model' : t}</button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {tab === 'flagged' && SEED_FEED.slice(0, 3).map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
            <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1"><p className="font-semibold text-slate-800">{p.common}</p><p className="text-xs text-slate-400">@{p.username} · flagged for review</p></div>
            <Btn variant="ghost" onClick={() => toast('Post approved')}>Approve</Btn>
            <Btn variant="outline" className="!border-rose-300 !text-rose-600" onClick={() => toast('Post removed', 'info')}>Remove</Btn>
          </div>
        ))}
        {tab === 'challenges' && CHALLENGES.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-4">
            <img src={c.image} alt="" className="w-14 h-14 rounded-xl object-cover" />
            <div className="flex-1"><p className="font-semibold text-slate-800">{c.title}</p><p className="text-xs text-slate-400">{c.participants} participants · {c.difficulty}</p></div>
            <Btn variant="outline" onClick={() => toast('Edit challenge (admin)')}>Edit</Btn>
          </div>
        ))}
        {tab === 'species' && ['Red-tailed Hawk', 'Monarch Butterfly', 'Great Blue Heron', 'Red Fox', 'Painted Turtle'].map((s) => (
          <div key={s} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3">
            <Icons.Leaf className="w-5 h-5 text-emerald-500" /><span className="flex-1 font-medium text-slate-700">{s}</span>
            <Btn variant="ghost" onClick={() => toast('Species record opened')}>Manage</Btn>
          </div>
        ))}
        {tab === 'model' && <ModelConfigPanel />}
      </div>
    </div>
  );
};

const ModelConfigPanel: React.FC = () => {
  const { toast } = useWQ();
  const [status, setStatus] = useState<'idle' | 'testing' | 'mock' | 'live'>('idle');
  const [last, setLast] = useState<any>(null);

  const runTest = async () => {
    setStatus('testing');
    try {
      const { data } = await supabase.functions.invoke('ai-identify', { body: { imageUrl: 'https://d64gsuwffb70l.cloudfront.net/6a2650d20fb250ab0e344b36_1780896189022_10de3dea.png', seed: 'admin-test' } });
      setLast(data);
      setStatus(data?.provider === 'self-hosted' ? 'live' : 'mock');
      toast(data?.provider === 'self-hosted' ? 'Self-hosted model is live!' : 'Running on mock provider', 'info');
    } catch (e) {
      setStatus('idle'); toast('Test failed', 'error');
    }
  };

  const envVars: [string, string, string][] = [
    ['AI_PROVIDER_URL', 'required', 'Self-hosted model endpoint, e.g. https://gpu-box:8000/identify'],
    ['AI_PROVIDER_KEY', 'optional', 'Bearer token sent as Authorization header'],
    ['AI_PROVIDER_MODE', 'url | base64', '"url" posts { imageUrl }; "base64" posts decoded bytes'],
    ['AI_PROVIDER_TIMEOUT_MS', '12000', 'Request timeout before falling back to mock'],
    ['AI_PROVIDER_TOPK', '4', 'Top match + alternatives returned'],
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Icons.Sparkles className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-bold text-slate-800">Vision model status</p>
              <p className="text-xs text-slate-400">Self-hosted adapter with automatic mock fallback</p>
            </div>
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${status === 'live' ? 'bg-emerald-100 text-emerald-700' : status === 'mock' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
            {status === 'live' ? 'Self-hosted · LIVE' : status === 'mock' ? 'Mock / demo mode' : status === 'testing' ? 'Testing…' : 'Unknown — run test'}
          </span>
        </div>
        <Btn className="mt-4" onClick={runTest} disabled={status === 'testing'}><Icons.Sparkles className="w-4 h-4" /> {status === 'testing' ? 'Testing…' : 'Run test identification'}</Btn>
        {last && (
          <div className="mt-3 text-xs bg-slate-50 rounded-xl p-3 text-slate-600">
            <p><strong>Provider:</strong> {last.provider}{last.model ? ` (${last.model})` : ''}{last.fallback ? ' · fell back to mock' : ''}</p>
            <p><strong>Top match:</strong> {last.commonName} · {last.confidence}%</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <p className="font-bold text-slate-800 mb-1">Connect a self-hosted model</p>
        <p className="text-xs text-slate-500 mb-4">Set these environment variables on the <code className="bg-slate-100 px-1 rounded">ai-identify</code> edge function. The adapter normalizes common response shapes (TF-Serving, TorchServe, ONNX label/score arrays, predictions arrays) and enriches labels with species metadata.</p>
        <div className="space-y-2">
          {envVars.map(([k, def, desc]) => (
            <div key={k} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 border-b border-slate-50 pb-2 last:border-0">
              <code className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded w-fit">{k}</code>
              <span className="text-[11px] text-slate-400 w-fit">{def}</span>
              <span className="text-xs text-slate-600 flex-1">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg p-3 mt-4 flex items-start gap-2"><Icons.Shield className="w-4 h-4 shrink-0 mt-0.5" /> If the model is unset, unreachable, or times out, identification transparently falls back to the demo provider so the app never breaks.</p>
      </div>
    </div>
  );
};

