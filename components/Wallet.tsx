
import React, { useState } from 'react';
import { User, Transaction, ViewType } from '../types';
import { Wallet as WalletIcon, ArrowDownToLine, ArrowUpFromLine, History, IndianRupee, CreditCard, Smartphone } from 'lucide-react';
import WithdrawalModal from './WithdrawalModal';

interface WalletProps {
  user: User;
  transactions: Transaction[];
  onWithdraw: (coins: number, method: string, details: string) => void;
}

const Wallet: React.FC<WalletProps> = ({ user, transactions, onWithdraw }) => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  return (
    <div className="h-full bg-zinc-950 p-6 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">My Wallet</h2>
        <div className="p-2 bg-blue-500/10 rounded-lg">
          <WalletIcon className="text-blue-500" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-20">
          <WalletIcon size={150} />
        </div>
        <p className="text-blue-100 text-sm font-medium mb-1">Available Balance</p>
        <div className="flex items-baseline gap-2 mb-6">
          <h3 className="text-4xl font-bold">{user.coins.toLocaleString()}</h3>
          <span className="text-blue-200 text-sm font-medium">Coins</span>
        </div>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold mb-1">Value in INR</p>
            <p className="text-lg font-bold">₹{(user.coins * 0.1).toFixed(2)}</p>
          </div>
          <button 
            onClick={() => setShowWithdrawModal(true)}
            className="flex-[1.5] bg-white text-blue-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-100 active:scale-95 transition-all"
          >
            <ArrowDownToLine size={20} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-500 text-xs font-medium mb-1">Total Earned</p>
          <p className="text-xl font-bold text-green-500">₹{user.totalEarnings}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <p className="text-zinc-500 text-xs font-medium mb-1">Daily Limit</p>
          <p className="text-xl font-bold">{user.dailyAdsWatched}/25</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-zinc-500" />
        <h4 className="font-bold text-zinc-300">Transaction History</h4>
      </div>

      <div className="space-y-3">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div key={t.id} className="bg-zinc-900/50 border border-zinc-900 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl ${
                  t.type === 'EARN' ? 'bg-green-500/10 text-green-500' : 
                  t.type === 'WITHDRAW' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                }`}>
                  {t.type === 'EARN' ? <ArrowUpFromLine size={20} /> : <ArrowDownToLine size={20} />}
                </div>
                <div>
                  <p className="font-bold text-sm">
                    {t.type === 'EARN' ? 'Video Reward' : 
                     t.type === 'BONUS' ? 'Daily Bonus' : 'Withdrawal'}
                  </p>
                  <p className="text-xs text-zinc-500">{new Date(t.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${t.type === 'WITHDRAW' ? 'text-red-500' : 'text-green-500'}`}>
                  {t.type === 'WITHDRAW' ? '-' : '+'}{t.amount}
                </p>
                <p className={`text-[10px] px-2 py-0.5 rounded-full inline-block ${
                  t.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' : 
                  t.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {t.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-zinc-600">
            <p>No transactions yet</p>
          </div>
        )}
      </div>

      {showWithdrawModal && (
        <WithdrawalModal 
          userCoins={user.coins} 
          onClose={() => setShowWithdrawModal(false)}
          onConfirm={(coins, method, details) => {
            onWithdraw(coins, method, details);
            setShowWithdrawModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Wallet;
