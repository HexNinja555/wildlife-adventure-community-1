import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { SEED_FEED, SeedPost } from './data';

export interface WQUser {
  username: string; name: string; email: string; avatar: string;
  location?: string; bio?: string; points: number;
}

export interface Toast { id: number; msg: string; type: 'success' | 'error' | 'info'; }

interface Ctx {
  user: WQUser | null;
  view: string; params: Record<string, string>;
  navigate: (v: string, p?: Record<string, string>) => void;
  signup: (d: Partial<WQUser> & { password: string }) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  toasts: Toast[]; toast: (msg: string, type?: Toast['type']) => void;
  observations: any[];
  joinedChallenges: string[];
  joinChallenge: (id: string) => void;
  addObservation: (o: any) => Promise<any>;
  refreshFeed: () => void;
  feed: any[];
  likePost: (id: string) => void;
  likedPosts: string[];
}

const C = createContext<Ctx>(null as any);
export const useWQ = () => useContext(C);

const DEMO_PW = 'password';

export const WQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<WQUser | null>(null);
  const [view, setView] = useState('landing');
  const [params, setParams] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
  const [joinedChallenges, setJoined] = useState<string[]>([]);
  const [feed, setFeed] = useState<any[]>(SEED_FEED);
  const [likedPosts, setLiked] = useState<string[]>([]);

  const toast = useCallback((msg: string, type: Toast['type'] = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const navigate = useCallback((v: string, p: Record<string, string> = {}) => {
    setView(v); setParams(p); window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const s = localStorage.getItem('wq_user');
    if (s) setUser(JSON.parse(s));
    const j = localStorage.getItem('wq_joined');
    if (j) setJoined(JSON.parse(j));
  }, []);

  const persistUser = (u: WQUser | null) => {
    setUser(u);
    if (u) localStorage.setItem('wq_user', JSON.stringify(u));
    else localStorage.removeItem('wq_user');
  };

  const refreshFeed = useCallback(async () => {
    const { data } = await supabase.from('wq_observations').select('*').eq('shared', true).order('created_at', { ascending: false }).limit(30);
    const mapped = (data || []).map((o: any) => ({
      id: o.id, username: o.username, avatar: (o.username || '?')[0].toUpperCase(), image: o.image_url,
      common: o.common_name, sci: o.scientific_name, category: o.category, confidence: Number(o.confidence) || 0,
      location: o.location || 'Unknown', date: 'just now', caption: o.notes || '', challenge: o.challenge_id,
      likes: o.likes || 0, comments: [], live: true,
    }));
    setFeed([...mapped, ...SEED_FEED]);
  }, []);

  useEffect(() => { refreshFeed(); }, [refreshFeed]);

  const signup = async (d: Partial<WQUser> & { password: string }) => {
    if (!d.username || !d.email) { toast('Missing fields', 'error'); return false; }
    const u: WQUser = { username: d.username!, name: d.name || d.username!, email: d.email!, avatar: (d.name || d.username!)[0].toUpperCase(), location: d.location, bio: d.bio, points: 0 };
    await supabase.from('wq_profiles').upsert({ username: u.username, name: u.name, email: u.email, avatar: u.avatar, location: u.location, bio: u.bio }, { onConflict: 'username' });
    persistUser(u); toast(`Welcome to WildQuest, ${u.name}!`); navigate('dashboard');
    return true;
  };

  const login = async (email: string, _password: string) => {
    const { data } = await supabase.from('wq_profiles').select('*').eq('email', email).maybeSingle();
    if (data) {
      persistUser({ username: data.username, name: data.name, email: data.email, avatar: data.avatar || data.username[0].toUpperCase(), location: data.location, bio: data.bio, points: data.points || 0 });
    } else {
      // demo fallback
      persistUser({ username: email.split('@')[0], name: 'Explorer', email, avatar: 'E', points: 1240 });
    }
    toast('Logged in!'); navigate('dashboard'); return true;
  };

  const logout = () => { persistUser(null); toast('Logged out', 'info'); navigate('landing'); };

  const joinChallenge = (id: string) => {
    if (!user) { navigate('login'); return; }
    setJoined((j) => { const n = j.includes(id) ? j : [...j, id]; localStorage.setItem('wq_joined', JSON.stringify(n)); return n; });
    supabase.from('wq_challenge_members').upsert({ challenge_id: id, username: user.username }, { onConflict: 'challenge_id,username' });
    toast('Challenge joined! Good luck, explorer.');
  };

  const addObservation = async (o: any) => {
    const row = {
      username: user?.username || 'guest', image_url: o.image_url, common_name: o.common_name,
      scientific_name: o.scientific_name, category: o.category, confidence: o.confidence,
      description: o.description, habitat: o.habitat, location: o.location, notes: o.notes,
      challenge_id: o.challenge_id || null, shared: !!o.shared,
    };
    const { data } = await supabase.from('wq_observations').insert(row).select().single();
    setObservations((p) => [data, ...p]);
    if (o.shared) refreshFeed();
    return data;
  };

  const likePost = (id: string) => {
    setLiked((l) => l.includes(id) ? l.filter((x) => x !== id) : [...l, id]);
    setFeed((f) => f.map((p) => p.id === id ? { ...p, likes: p.likes + (likedPosts.includes(id) ? -1 : 1) } : p));
  };

  return (
    <C.Provider value={{ user, view, params, navigate, signup, login, logout, toasts, toast, observations, joinedChallenges, joinChallenge, addObservation, refreshFeed, feed, likePost, likedPosts }}>
      {children}
    </C.Provider>
  );
};
