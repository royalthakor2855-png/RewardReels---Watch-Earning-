
import React, { useState } from 'react';
import { X, Smartphone, CreditCard, Gift, AlertCircle } from 'lucide-react';
import { MIN_WITHDRAWAL_COINS, COIN_VALUE_INR } from '../constants';

interface WithdrawalModalProps {
  userCoins: number;
  onClose: () => void;
  onConfirm: (coins: number, method: string, details: string) => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({ userCoins, onClose, onConfirm }) => {
  const [method, setMethod] = useState<'Paytm' | 'UPI' | 'Amazon' | ''>('');
  const [coins, setCoins] = useState(MIN_WITHDRAWAL_COINS);
  const [details, setDetails] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!method) return setError('Please select a payment method');
    if (coins < MIN_WITHDRAWAL_COINS) return setError(`Minimum withdrawal is ${MIN_WITHDRAWAL_COINS} coins`);
    if (coins > userCoins) return setError('Insufficient balance');
    if (!details) return setError('Please enter payment details (Mobile/UPI ID)');
    
    onConfirm(coins, method, details);
  };

  const paymentMethods = [
    { id: 'Paytm', name: 'Paytm Wallet', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'UPI', name: 'Google Pay / BHIM UPI', icon: CreditCard, color: 'bg-purple-500' },
    { id: 'Amazon', name: 'Amazon Gift Card', icon: Gift, color: 'bg-orange-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm px-4 pb-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-zinc-900 rounded-[32px] overflow-hidden shadow-2xl slide-in-from-bottom duration-500 border border-zinc-800">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Withdraw Funds</h3>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-3">Select Coin Amount</label>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2000, 5000].map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCoins(val)}
                    className={`py-3 rounded-2xl border-2 transition-all font-bold ${
                      coins === val ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-zinc-800 bg-zinc-800/50 text-zinc-400'
                    }`}
                  >
                    {val} <br/><span className="text-[10px] font-medium">₹{val * COIN_VALUE_INR}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-3">Withdrawal Method</label>
              <div className="space-y-2">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = method === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setMethod(pm.id as any)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-800 bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-xl ${pm.color} text-white`}>
                          <Icon size={20} />
                        </div>
                        <span className={`font-bold ${isSelected ? 'text-white' : 'text-zinc-400'}`}>{pm.name}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-blue-500' : 'border-zinc-700'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Details Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Payment Details</label>
              <input
                type="text"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={method === 'UPI' ? 'Enter VPA (e.g. user@okhdfcbank)' : 'Enter Mobile Number'}
                className="w-full bg-zinc-800/50 border-2 border-zinc-800 rounded-2xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 flex items-center gap-3 text-red-500 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
            >
              Request Withdrawal of ₹{coins * COIN_VALUE_INR}
            </button>
          </form>
          
          <p className="text-center text-[10px] text-zinc-600 mt-6 uppercase tracking-widest font-bold">
            Payments are processed within 24-48 business hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalModal;
