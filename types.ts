
export enum ViewType {
  REELS = 'REELS',
  WALLET = 'WALLET',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN',
  EARN = 'EARN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  coins: number;
  referralCode: string;
  dailyAdsWatched: number;
  totalEarnings: number;
  isAdmin: boolean;
}

export interface VideoContent {
  id: string;
  url: string;
  title: string;
  reward: number;
  duration: number; // seconds
  brand: string;
}

export interface Transaction {
  id: string;
  type: 'EARN' | 'WITHDRAW' | 'BONUS';
  amount: number;
  timestamp: number;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  method?: string;
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  coins: number;
  method: string;
  details: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  timestamp: number;
}
