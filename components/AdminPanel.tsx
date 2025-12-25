
import React from 'react';
import { WithdrawalRequest } from '../types';
import { LayoutDashboard, Users, TrendingUp, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AdminPanelProps {
  withdrawalRequests: WithdrawalRequest[];
  onUpdateRequest: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ withdrawalRequests, onUpdateRequest }) => {
  const stats = [
    { label: 'Total Users', value: '12,450', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Today Revenue', value: '₹4,500', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="h-full bg-zinc-950 p-6 overflow-y-auto no-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-xs text-zinc-500">Manage rewards and users</p>
        </div>
        <div className="p-2 bg-purple-500/10 rounded-lg">
          <LayoutDashboard className="text-purple-500" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} inline-block mb-3`}>
                <Icon size={18} />
              </div>
              <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider mb-1">{stat.label}</p>
              <h4 className="text-xl font-black">{stat.value}</h4>
            </div>
          );
        })}
      </div>

      {/* Withdrawal Management */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h4 className="font-bold text-zinc-300">Pending Withdrawals</h4>
        <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
          {withdrawalRequests.filter(r => r.status === 'PENDING').length} Action Needed
        </span>
      </div>

      <div className="space-y-4">
        {withdrawalRequests.length > 0 ? (
          withdrawalRequests.map((req) => (
            <div key={req.id} className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h5 className="font-bold text-sm">{req.userName}</h5>
                  <p className="text-[10px] text-zinc-500">{new Date(req.timestamp).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-blue-500">₹{req.amount}</p>
                  <p className="text-[10px] text-zinc-500">{req.coins} Coins</p>
                </div>
              </div>

              <div className="bg-black/50 p-3 rounded-2xl border border-zinc-800 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[8px] uppercase font-black text-zinc-600 tracking-widest">{req.method} Details</span>
                </div>
                <p className="text-xs font-mono text-zinc-300 break-all">{req.details}</p>
              </div>

              {req.status === 'PENDING' ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onUpdateRequest(req.id, 'REJECTED')}
                    className="flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold text-xs hover:bg-red-500/20 transition-all"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                  <button
                    onClick={() => onUpdateRequest(req.id, 'APPROVED')}
                    className="flex items-center justify-center gap-2 py-3 bg-green-500 text-black rounded-2xl font-bold text-xs hover:bg-green-400 transition-all"
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>
                </div>
              ) : (
                <div className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs ${
                  req.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {req.status === 'APPROVED' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  Payment {req.status}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-zinc-700 bg-zinc-900/20 rounded-[40px] border border-dashed border-zinc-800">
            <Clock size={48} className="mb-4 opacity-20" />
            <p className="font-bold">No Pending Requests</p>
            <p className="text-xs">All caught up!</p>
          </div>
        )}
      </div>

      <div className="mt-10 p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
        <h5 className="font-bold text-sm mb-2 text-blue-400 flex items-center gap-2">
          <AlertCircle size={16} />
          Admin Tip
        </h5>
        <p className="text-[10px] text-zinc-500 leading-relaxed">
          Regularly check for fraud users watching more than 50 ads per day via unauthorized API calls. Manual approval of withdrawals is recommended for security.
        </p>
      </div>
      
      <div className="h-20" /> {/* Spacer */}
    </div>
  );
};

export default AdminPanel;
