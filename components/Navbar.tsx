
import React from 'react';
import { ViewType } from '../types';
import { Home, Wallet, User, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isAdmin: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, isAdmin }) => {
  const tabs = [
    { id: ViewType.REELS, icon: Home, label: 'Home' },
    { id: ViewType.WALLET, icon: Wallet, label: 'Wallet' },
    { id: ViewType.PROFILE, icon: User, label: 'Profile' },
  ];

  if (isAdmin) {
    tabs.push({ id: ViewType.ADMIN, icon: ShieldCheck, label: 'Admin' });
  }

  return (
    <nav className="flex justify-around items-center h-16 bg-zinc-900/90 backdrop-blur-md border-t border-zinc-800 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              isActive ? 'text-blue-500 scale-110' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;
