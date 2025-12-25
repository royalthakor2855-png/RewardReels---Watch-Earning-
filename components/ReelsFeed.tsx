
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_VIDEOS } from '../constants';
import { User as UserType, VideoContent } from '../types';
import { Heart, MessageCircle, Share2, Coins, Play, CheckCircle2 } from 'lucide-react';

interface ReelsFeedProps {
  user: UserType;
  onCompleteAd: (reward: number) => void;
}

const ReelsFeed: React.FC<ReelsFeedProps> = ({ user, onCompleteAd }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState<{ [key: string]: 'playing' | 'watched' | 'locked' }>({});
  const [progress, setProgress] = useState(0);
  const [showRewardPop, setShowRewardPop] = useState<{ show: boolean, amount: number }>({ show: false, amount: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const currentVideo = MOCK_VIDEOS[activeIndex];

  useEffect(() => {
    let interval: any;
    if (videoStatus[currentVideo.id] !== 'watched') {
      setProgress(0);
      const step = 100 / (currentVideo.duration * 10); // Update every 100ms
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            handleWatchComplete(currentVideo);
            return 100;
          }
          return prev + step;
        });
      }, 100);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleWatchComplete = (video: VideoContent) => {
    if (videoStatus[video.id] !== 'watched') {
      setVideoStatus(prev => ({ ...prev, [video.id]: 'watched' }));
      onCompleteAd(video.reward);
      setShowRewardPop({ show: true, amount: video.reward });
      setTimeout(() => setShowRewardPop({ show: false, amount: 0 }), 1500);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollPos / height);
    if (index !== activeIndex && index >= 0 && index < MOCK_VIDEOS.length) {
      setActiveIndex(index);
    }
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black"
    >
      {MOCK_VIDEOS.map((video, idx) => (
        <div 
          key={video.id} 
          className="h-full w-full snap-start relative flex flex-col justify-center items-center overflow-hidden"
        >
          {/* Video Mock (Using actual video tag) */}
          <video
            src={video.url}
            className="w-full h-full object-cover"
            autoPlay={idx === activeIndex}
            loop
            muted
            playsInline
          />

          {/* Overlay UI */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

          {/* Progress Bar */}
          {idx === activeIndex && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-800 z-20">
              <div 
                className="h-full bg-blue-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Reward Status Floating */}
          <div className="absolute top-12 left-4 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Coins className="text-yellow-400" size={18} />
            <span className="text-xs font-bold text-yellow-400">
              {videoStatus[video.id] === 'watched' ? 'Earned' : `Watching for ${video.reward} Coins`}
            </span>
            {videoStatus[video.id] === 'watched' && <CheckCircle2 className="text-green-500" size={14} />}
          </div>

          {/* Right Action Sidebar */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-30 items-center">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full mb-1 hover:bg-white/20 cursor-pointer">
                <Heart size={26} />
              </div>
              <span className="text-[10px] font-bold">2.4k</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full mb-1 hover:bg-white/20 cursor-pointer">
                <MessageCircle size={26} />
              </div>
              <span className="text-[10px] font-bold">128</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-white/10 backdrop-blur-lg rounded-full mb-1 hover:bg-white/20 cursor-pointer">
                <Share2 size={26} />
              </div>
              <span className="text-[10px] font-bold">Share</span>
            </div>
          </div>

          {/* Video Metadata */}
          <div className="absolute bottom-4 left-4 right-16 z-30">
            <h3 className="font-bold text-lg mb-1 drop-shadow-lg">{video.brand}</h3>
            <p className="text-sm text-zinc-200 line-clamp-2 drop-shadow-md">{video.title}</p>
          </div>

          {/* Coin Pop Animation */}
          {showRewardPop.show && idx === activeIndex && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
              <div className="flex flex-col items-center animate-coin-pop">
                <div className="bg-yellow-400 rounded-full p-2 shadow-2xl">
                  <Coins size={48} className="text-black" />
                </div>
                <span className="text-2xl font-black text-yellow-400 mt-2">+{showRewardPop.amount} Coins!</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReelsFeed;
