
import React from 'react';

interface VideoPlaceholderProps {
  className?: string;
  src: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  className = "",
  src,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true
}) => {
  return (
    <video 
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      onError={(e) => {
        // Fallback to gradient background if video fails to load
        const target = e.target as HTMLVideoElement;
        target.style.display = 'none';
      }}
    >
      <source src={src} type="video/mp4" />
      {/* Fallback gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/50 via-pink-500/50 to-orange-400/50"></div>
    </video>
  );
};

export default VideoPlaceholder;
