import React from 'react';
import { WQProvider, useWQ } from '@/wildquest/store';
import { Sidebar, BottomNav, TopBar } from '@/wildquest/ui/Nav';
import Toasts from '@/wildquest/ui/Toasts';
import Landing from '@/wildquest/pages/Landing';
import { AuthPage } from '@/wildquest/pages/Auth';
import Dashboard from '@/wildquest/pages/Dashboard';
import Upload from '@/wildquest/pages/Upload';
import { ChallengesPage, ChallengeDetail } from '@/wildquest/pages/Challenges';
import { FeedPage, ObservationDetail } from '@/wildquest/pages/Feed';
import { ProfilePage, BadgesPage, LeaderboardPage } from '@/wildquest/pages/Profile';
import { SettingsPage, GuidelinesPage, AdminPage } from '@/wildquest/pages/Misc';

const Router: React.FC = () => {
  const { view } = useWQ();

  // Full-screen pages (no app shell)
  if (view === 'landing') return <Landing />;
  if (view === 'login') return <AuthPage mode="login" />;
  if (view === 'signup') return <AuthPage mode="signup" />;
  if (view === 'guidelines') return <div className="bg-[#faf8f3] min-h-screen"><GuidelinesPage /></div>;

  const renderPage = () => {
    switch (view) {
      case 'dashboard': return <Dashboard />;
      case 'upload': return <Upload />;
      case 'challenges': return <ChallengesPage />;
      case 'challenge': return <ChallengeDetail />;
      case 'feed': return <FeedPage />;
      case 'observation': return <ObservationDetail />;
      case 'profile': return <ProfilePage />;
      case 'badges': return <BadgesPage />;
      case 'leaderboard': return <LeaderboardPage />;
      case 'settings': return <SettingsPage />;
      case 'admin': return <AdminPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex bg-[#faf8f3] min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0 pb-20 md:pb-0">
        <TopBar />
        {renderPage()}
      </div>
      <BottomNav />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <WQProvider>
      <Router />
      <Toasts />
    </WQProvider>
  );
};

export default AppLayout;
