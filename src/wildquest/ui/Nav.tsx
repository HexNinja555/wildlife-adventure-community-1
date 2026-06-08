import React from 'react';
import { useWQ } from '../store';
import { Icons } from '../icons';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Icons.Home },
  { id: 'challenges', label: 'Challenges', icon: Icons.Compass },
  { id: 'upload', label: 'Upload', icon: Icons.Camera },
  { id: 'feed', label: 'Feed', icon: Icons.Users },
  { id: 'leaderboard', label: 'Leaderboard', icon: Icons.Trophy },
  { id: 'badges', label: 'Badges', icon: Icons.Award },
];

export const Sidebar: React.FC = () => {
  const { view, navigate, user, logout } = useWQ();
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 bg-[#0f2417] border-r border-emerald-900/40 px-4 py-6">
      <button onClick={() => navigate(user ? 'dashboard' : 'landing')} className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center shadow-lg">
          <Icons.Binoculars className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-cream tracking-tight" style={{ color: '#faf8f3' }}>WildQuest</span>
      </button>
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((it) => {
          const active = view === it.id;
          return (
            <button key={it.id} onClick={() => navigate(it.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-emerald-500/20 text-emerald-300' : 'text-emerald-100/60 hover:bg-emerald-900/30 hover:text-emerald-100'}`}>
              <it.icon className="w-5 h-5" /> {it.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-emerald-900/40 pt-3">
        {user ? (
          <div className="flex items-center gap-2 px-1">
            <button onClick={() => navigate('profile', { username: user.username })} className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white font-bold text-sm">{user.avatar}</button>
            <div className="flex-1 min-w-0" onClick={() => navigate('profile', { username: user.username })}>
              <p className="text-sm text-emerald-50 font-medium truncate cursor-pointer">{user.name}</p>
              <p className="text-xs text-emerald-300/50 truncate">@{user.username}</p>
            </div>
            <button onClick={logout} className="text-emerald-300/60 hover:text-emerald-100 p-1"><Icons.LogOut className="w-4 h-4" /></button>
          </div>
        ) : (
          <button onClick={() => navigate('login')} className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-2.5 rounded-xl text-sm font-semibold">Sign In</button>
        )}
        <button onClick={() => navigate('settings')} className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-xs text-emerald-300/50 hover:text-emerald-100"><Icons.Settings className="w-4 h-4" /> Settings</button>
      </div>
    </aside>
  );
};

export const BottomNav: React.FC = () => {
  const { view, navigate } = useWQ();
  const items = [
    { id: 'dashboard', icon: Icons.Home },
    { id: 'challenges', icon: Icons.Compass },
    { id: 'upload', icon: Icons.Camera, big: true },
    { id: 'feed', icon: Icons.Users },
    { id: 'leaderboard', icon: Icons.Trophy },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#0f2417]/95 backdrop-blur-lg border-t border-emerald-900/50 flex items-end justify-around px-2 pt-2 pb-3">
      {items.map((it) => {
        const active = view === it.id;
        if (it.big) return (
          <button key={it.id} onClick={() => navigate('upload')} className="-mt-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center shadow-xl shadow-emerald-900/40">
            <it.icon className="w-6 h-6 text-white" />
          </button>
        );
        return (
          <button key={it.id} onClick={() => navigate(it.id)} className={`flex flex-col items-center gap-0.5 py-1 px-3 ${active ? 'text-emerald-400' : 'text-emerald-100/40'}`}>
            <it.icon className="w-5 h-5" />
          </button>
        );
      })}
    </nav>
  );
};

export const TopBar: React.FC = () => {
  const { navigate, user } = useWQ();
  return (
    <div className="md:hidden sticky top-0 z-40 bg-[#0f2417]/95 backdrop-blur-lg border-b border-emerald-900/50 px-4 h-14 flex items-center justify-between">
      <button onClick={() => navigate(user ? 'dashboard' : 'landing')} className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 grid place-items-center"><Icons.Binoculars className="w-4 h-4 text-white" /></div>
        <span className="font-bold text-emerald-50">WildQuest</span>
      </button>
      {user ? (
        <button onClick={() => navigate('profile', { username: user.username })} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 grid place-items-center text-white font-bold text-xs">{user.avatar}</button>
      ) : (
        <button onClick={() => navigate('login')} className="text-emerald-300 text-sm font-semibold">Sign In</button>
      )}
    </div>
  );
};
