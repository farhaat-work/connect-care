import React, { useRef, useEffect } from 'react';
import { User } from 'lucide-react';

interface VideoStreamProps {
  stream: MediaStream | null;
  muted?: boolean;
  label?: string;
  isLocal?: boolean;
  className?: string;
}

const VideoStream: React.FC<VideoStreamProps> = ({
  stream,
  muted = false,
  label,
  isLocal = false,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className={`video-container ${className}`}>
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className={`video-stream ${isLocal ? 'scale-x-[-1]' : ''}`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-secondary/30 flex items-center justify-center">
            <User className="w-12 h-12 text-muted-foreground" />
          </div>
        </div>
      )}
      
      {/* Gradient overlay */}
      <div className="video-overlay" />
      
      {/* Label */}
      {label && (
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-video-bg/70 backdrop-blur-sm rounded-lg">
          <span className="text-sm font-medium text-secondary-foreground">{label}</span>
        </div>
      )}
    </div>
  );
};

export default VideoStream;
