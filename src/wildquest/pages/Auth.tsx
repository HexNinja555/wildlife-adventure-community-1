import React, { useState } from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';
import { Btn } from '../ui/common';
import { IMG } from '../data';

export const AuthPage: React.FC<{ mode: 'login' | 'signup' }> = ({ mode }) => {
  const { login, signup, navigate, toast } = useWQ();
  const [f, setF] = useState({ name: '', username: '', email: '', password: '', location: '', bio: '' });
  const [loading, setLoading] = useState(false);
  const isSignup = mode === 'signup';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.email.includes('@') || f.password.length < 4) { toast('Check your email and password (min 4 chars)', 'error'); return; }
    if (isSignup && !f.username) { toast('Pick a username', 'error'); return; }
    setLoading(true);
    if (isSignup) {
      // also add to CRM
      try { await fetch('https://famous.ai/api/crm/6a2650d20fb250ab0e344b36/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: f.email, name: f.name, source: 'signup', tags: ['signup', 'wildquest'] }) }); } catch (e) {}
      await signup(f);
    } else {
      await login(f.email, f.password);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#faf8f3]">
      <div className="relative hidden lg:block">
        <img src={IMG.hero} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2417]/90 to-emerald-900/60" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
          <button onClick={() => navigate('landing')} className="flex items-center gap-2 w-fit">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center"><Icons.Binoculars className="w-5 h-5" /></div>
            <span className="text-xl font-bold">WildQuest</span>
          </button>
          <div>
            <h2 className="text-4xl font-black leading-tight">Every photo is a discovery waiting to happen.</h2>
            <p className="text-emerald-100/70 mt-4 max-w-md">Join naturalists worldwide identifying species, completing hunts, and protecting wildlife — responsibly.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 py-12">
        <form onSubmit={submit} className="w-full max-w-md">
          <button onClick={() => navigate('landing')} className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center"><Icons.Binoculars className="w-4 h-4 text-white" /></div>
            <span className="text-lg font-bold text-slate-800">WildQuest</span>
          </button>
          <h1 className="text-3xl font-black text-slate-900">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
          <p className="text-slate-500 mt-1">{isSignup ? 'Start your wildlife adventure today.' : 'Log in to continue your quest.'}</p>

          <div className="space-y-3 mt-7">
            {isSignup && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Full name" value={f.name} onChange={(v) => setF({ ...f, name: v })} placeholder="Jane Doe" />
                <Field label="Username" value={f.username} onChange={(v) => setF({ ...f, username: v })} placeholder="janedoe" />
              </div>
            )}
            <Field label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} placeholder="you@email.com" />
            <Field label="Password" type="password" value={f.password} onChange={(v) => setF({ ...f, password: v })} placeholder="••••••••" />
            {isSignup && (
              <>
                <Field label="Location (optional)" value={f.location} onChange={(v) => setF({ ...f, location: v })} placeholder="Portland, OR" />
                <div>
                  <label className="text-sm font-medium text-slate-700">Bio (optional)</label>
                  <textarea value={f.bio} onChange={(e) => setF({ ...f, bio: e.target.value })} rows={2} placeholder="Tell the community about yourself..." className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-sm" />
                </div>
              </>
            )}
          </div>

          <Btn type="submit" disabled={loading} className="w-full mt-6 !py-3">{loading ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}</Btn>

          <button type="button" onClick={() => toast('OAuth providers ready to connect (Google, GitHub)', 'info')} className="w-full mt-3 flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Icons.Lock className="w-4 h-4" /> Continue with OAuth
          </button>

          <p className="text-center text-sm text-slate-500 mt-6">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={() => navigate(isSignup ? 'login' : 'signup')} className="text-emerald-600 font-semibold">{isSignup ? 'Log in' : 'Sign up'}</button>
          </p>
        </form>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <div>
    <label className="text-sm font-medium text-slate-700">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full mt-1 px-4 py-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 text-sm" />
  </div>
);
