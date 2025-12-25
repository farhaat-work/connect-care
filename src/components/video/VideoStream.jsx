import { useEffect, useRef } from 'react';
import { User, VideoOff } from 'lucide-react';

const VideoStream = ({ 
  stream, 
  muted = false, 
  label = '', 
  isLocal = false,
  showPlaceholder = true,
  className = '' 
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const hasVideo = stream?.getVideoTracks().some(track => track.enabled);

  if (!stream && showPlaceholder) {
    return (
      <div className={`flex items-center justify-center bg-muted/30 ${className}`}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">{label || 'Waiting for video...'}</p>
        </div>
      </div>
    );
  }

  if (stream && !hasVideo) {
    return (
      <div className={`flex items-center justify-center bg-muted/30 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-2">
            <VideoOff className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-muted-foreground/70 text-xs">Camera off</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
        style={{ transform: isLocal ? 'scaleX(-1)' : 'none' }}
      />
      {label && (
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
          {label}
        </div>
      )}
    </div>
  );
};

export default VideoStream;
