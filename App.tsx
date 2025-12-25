
import React, { useState, useEffect } from 'react';
import { ViewType, User, Transaction, WithdrawalRequest } from './types';
import ReelsFeed from './components/ReelsFeed';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import { Home, Wallet as WalletIcon, User as UserIcon, Settings, BarChart3 } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.REELS);
  const [user, setUser] = useState<User>({
    id: 'user_123',
    name: 'Rohit Sharma',
    email: 'rohit@example.com',
    coins: 450,
    referralCode: 'REWARD50',
    dailyAdsWatched: 0,
    totalEarnings: 45,
    isAdmin: true // For demo purposes, we allow admin access
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 't1', type: 'EARN', amount: 15, timestamp: Date.now() - 3600000, status: 'COMPLETED' },
    { id: 't2', type: 'BONUS', amount: 50, timestamp: Date.now() - 86400000, status: 'COMPLETED' },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([]);

  const handleAddCoins = (amount: number) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount,
      totalEarnings: prev.totalEarnings + (amount * 0.1),
      dailyAdsWatched: prev.dailyAdsWatched + 1
    }));
    
    setTransactions(prev => [
      {
        id: Math.random().toString(36).substr(2, 9),
        type: 'EARN',
        amount: amount,
        timestamp: Date.now(),
        status: 'COMPLETED'
      },
      ...prev
    ]);
  };

  const handleWithdraw = (coins: number, method: string, details: string) => {
    const amount = coins * 0.1;
    const newRequest: WithdrawalRequest = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      amount: amount,
      coins: coins,
      method: method,
      details: details,
      status: 'PENDING',
      timestamp: Date.now()
    };
    
    setWithdrawalRequests(prev => [newRequest, ...prev]);
    setUser(prev => ({ ...prev, coins: prev.coins - coins }));
    
    setTransactions(prev => [
      {
        id: newRequest.id,
        type: 'WITHDRAW',
        amount: coins,
        timestamp: Date.now(),
        status: 'PENDING',
        method: method
      },
      ...prev
    ]);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-black text-white relative shadow-2xl overflow-hidden">
      {/* Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {activeView === ViewType.REELS && (
          <ReelsFeed user={user} onCompleteAd={handleAddCoins} />
        )}
        {activeView === ViewType.WALLET && (
          <Wallet 
            user={user} 
            transactions={transactions} 
            onWithdraw={handleWithdraw}
          />
        )}
        {activeView === ViewType.PROFILE && (
          <Profile user={user} onLogout={() => console.log('logout')} />
        )}
        {activeView === ViewType.ADMIN && (
          <AdminPanel 
            withdrawalRequests={withdrawalRequests} 
            onUpdateRequest={(id, status) => {
              setWithdrawalRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
            }}
          />
        )}
      </main>

      {/* Navigation */}
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        isAdmin={user.isAdmin} 
      />
    </div>
  );
};

export default App;
