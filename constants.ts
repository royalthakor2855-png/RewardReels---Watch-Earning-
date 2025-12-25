
import { VideoContent } from './types';

export const COIN_VALUE_INR = 0.1; // 1000 coins = ₹100
export const MIN_WITHDRAWAL_COINS = 1000;
export const DAILY_AD_LIMIT = 25;

export const MOCK_VIDEOS: VideoContent[] = [
  {
    id: '1',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-2940-large.mp4',
    title: 'Neon Groove - Premium Fashion',
    reward: 15,
    duration: 15,
    brand: 'GlowStyle'
  },
  {
    id: '2',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-low-angle-shot-1301-large.mp4',
    title: 'Nature Retreats - Eco Travel',
    reward: 10,
    duration: 10,
    brand: 'EcoEscape'
  },
  {
    id: '3',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-in-the-gym-2341-large.mp4',
    title: 'Titan Fitness - Be Strong',
    reward: 20,
    duration: 20,
    brand: 'TitanFit'
  },
  {
    id: '4',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-bubbles-on-a-blue-background-2729-large.mp4',
    title: 'Clear Skin - Organic Serum',
    reward: 12,
    duration: 12,
    brand: 'PureAqua'
  }
];
