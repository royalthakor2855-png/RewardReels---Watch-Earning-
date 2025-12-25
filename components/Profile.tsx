
import React from 'react';
import { User } from '../types';
import { Settings, Share2, Award, Shield, HelpCircle, LogOut, ChevronRight, Copy, CheckCircle2 } from 'lucide-react';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const menuItems = [
    { icon: Award, label: 'Rewards History', color: 'text-yellow-500' },
    { icon: Share2, label: 'Refer & Earn', color: 'text-blue-500' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-zinc-400' },
    { icon: Shield, label: 'Privacy Policy', color: 'text-zinc-400' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralCode);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="h-full bg-black p-6 overflow-y-auto no-scrollbar">
      {/* User Info */}
      <div className="flex flex-col items-center text-center mt-6 mb-10">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-4 border-zinc-900 shadow-xl overflow-hidden">
            <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-2 border-black">
            <CheckCircle2 size={16} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-zinc-500 text-sm">{user.email}</p>
      </div>

      {/* Refer & Earn Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-bold text-lg">Refer & Earn</h4>
            <p className="text-xs text-zinc-500">Earn 50 coins for every friend you invite!</p>
          </div>
          <div className="bg-blue-500/10 p-2 rounded-xl">
            <Share2 className="text-blue-500" size={20} />
          </div>
        </div>
        <div className="bg-black/50 border border-zinc-800 rounded-2xl flex items-center justify-between p-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-black text-zinc-600 tracking-tighter">Your Referral Code</span>
            <span className="text-xl font-black tracking-widest text-white">{user.referralCode}</span>
          </div>
          <button onClick={handleCopy} className="p-3 bg-white/5 rounded-xl hover:bg-white/10 active:scale-90 transition-all">
            <Copy size={20} className="text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Daily Bonus Section */}
      <div className="mb-8">
        <h4 className="font-bold text-zinc-300 mb-4 px-1">Daily Challenges</h4>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-orange-500 flex items-center justify-center text-black">
              <Award size={24} />
            </div>
            <div>
              <p className="font-bold text-sm">Daily Check-in</p>
              <p className="text-xs text-green-500">Available to claim</p>
            </div>
          </div>
          <button className="bg-yellow-500 text-black font-bold text-sm px-4 py-2 rounded-xl active:scale-95 transition-all">
            Claim +25
          </button>
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-2 mb-8">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              className="w-full flex items-center justify-between p-4 bg-zinc-900/30 border border-transparent hover:border-zinc-800 hover:bg-zinc-900 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl bg-zinc-800/50 group-hover:bg-zinc-800 ${item.color}`}>
                  <Icon size={20} />
                </div>
                <span className="font-bold text-sm text-zinc-300 group-hover:text-white">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-zinc-600" />
            </button>
          );
        })}
      </div>

      <button
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 p-5 text-red-500 font-bold border-2 border-red-500/10 rounded-2xl hover:bg-red-500/5 transition-all mb-10"
      >
        <LogOut size={20} />
        Log Out Account
      </button>

      <p className="text-center text-zinc-700 text-[10px] uppercase font-bold tracking-[0.2em] pb-10">
        RewardReels Version 2.4.0 (Stable)
      </p>
    </div>
  );
};

export default Profile;
