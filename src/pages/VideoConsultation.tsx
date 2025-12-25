import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useVideoCall, CallStatus } from '@/hooks/useVideoCall';
import VideoStream from '@/components/video/VideoStream';
import CallControls from '@/components/video/CallControls';
import ConnectionStatus from '@/components/video/ConnectionStatus';
import IncomingCallModal from '@/components/video/IncomingCallModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Phone, Copy, Check } from 'lucide-react';

const VideoConsultation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Get room and user IDs from URL or generate them
  const roomId = searchParams.get('room') || `room-${Date.now()}`;
  const role = searchParams.get('role') || 'patient';
  const userId = `${role}-${Math.random().toString(36).substr(2, 9)}`;
  
  const [targetUserId, setTargetUserId] = useState('');
  const [callDuration, setCallDuration] = useState('00:00');
  const [callStartTime, setCallStartTime] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    localStream,
    remoteStream,
    callStatus,
    isAudioEnabled,
    isVideoEnabled,
    error,
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    toggleAudio,
    toggleVideo,
    incomingCallFrom,
  } = useVideoCall({
    roomId,
    userId,
    onCallEnded: () => {
      toast({
        title: 'Call ended',
        description: 'The video consultation has ended.',
      });
    },
  });

  // Track call duration
  useEffect(() => {
    if (callStatus === 'connected' && !callStartTime) {
      setCallStartTime(Date.now());
    }

    if (callStatus === 'connected' && callStartTime) {
      const interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - callStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        setCallDuration(`${minutes}:${seconds}`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [callStatus, callStartTime]);

  // Reset duration on call end
  useEffect(() => {
    if (callStatus === 'ended' || callStatus === 'failed') {
      setCallStartTime(null);
      setCallDuration('00:00');
    }
  }, [callStatus]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleStartCall = useCallback(async () => {
    if (!targetUserId.trim()) {
      toast({
        title: 'Enter user ID',
        description: 'Please enter the ID of the person you want to call.',
        variant: 'destructive',
      });
      return;
    }
    await startCall(targetUserId.trim());
  }, [targetUserId, startCall, toast]);

  const handleBack = useCallback(() => {
    if (callStatus === 'connected' || callStatus === 'connecting') {
      endCall();
    }
    navigate('/');
  }, [callStatus, endCall, navigate]);

  const copyUserId = useCallback(() => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    toast({
      title: 'Copied!',
      description: 'Your user ID has been copied to clipboard.',
    });
    setTimeout(() => setCopied(false), 2000);
  }, [userId, toast]);

  const isInCall = callStatus === 'connected' || callStatus === 'connecting';

  return (
    <div className="min-h-screen bg-video-bg">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-30 p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="text-primary-foreground hover:bg-secondary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <ConnectionStatus status={callStatus} duration={callDuration} />
        </div>
      </header>

      {/* Main video area */}
      <main className="relative w-full h-screen">
        {/* Remote video (full screen) */}
        <VideoStream
          stream={remoteStream}
          label={isInCall ? 'Remote' : undefined}
          className="absolute inset-0"
        />

        {/* Local video (picture-in-picture) */}
        {localStream && (
          <div className="pip-video z-20">
            <VideoStream
              stream={localStream}
              muted
              isLocal
              label="You"
            />
          </div>
        )}

        {/* Pre-call UI */}
        {callStatus === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center bg-video-bg/95 z-10">
            <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-card shadow-elevated animate-slide-up">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-card-foreground mb-2">
                  Video Consultation
                </h1>
                <p className="text-muted-foreground">
                  Start or join a video call with your {role === 'doctor' ? 'patient' : 'doctor'}
                </p>
              </div>

              {/* Your ID */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Your ID (share this to receive calls)
                </label>
                <div className="flex gap-2">
                  <Input
                    value={userId}
                    readOnly
                    className="bg-muted font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyUserId}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-call-active" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Call someone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Enter recipient's ID to call
                </label>
                <Input
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  placeholder="e.g., doctor-abc123..."
                  className="mb-4"
                />
                <Button
                  onClick={handleStartCall}
                  className="w-full gradient-hero text-primary-foreground"
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Start Call
                </Button>
              </div>

              {/* Room info */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Room: {roomId} • Role: {role}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Requesting call UI */}
        {callStatus === 'requesting' && (
          <div className="absolute inset-0 flex items-center justify-center bg-video-bg/95 z-10">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse-ring">
                <Phone className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-primary-foreground mb-2">
                Calling...
              </h2>
              <p className="text-muted-foreground mb-6">
                Waiting for {targetUserId} to answer
              </p>
              <Button
                variant="destructive"
                onClick={endCall}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Call ended UI */}
        {(callStatus === 'ended' || callStatus === 'failed') && (
          <div className="absolute inset-0 flex items-center justify-center bg-video-bg/95 z-10">
            <div className="text-center animate-fade-in">
              <h2 className="text-xl font-semibold text-primary-foreground mb-4">
                {callStatus === 'failed' ? 'Call Failed' : 'Call Ended'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {error || 'The video consultation has ended.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => window.location.reload()}
                  className="gradient-hero text-primary-foreground"
                >
                  Start New Call
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBack}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Call controls */}
        {isInCall && (
          <CallControls
            isAudioEnabled={isAudioEnabled}
            isVideoEnabled={isVideoEnabled}
            onToggleAudio={toggleAudio}
            onToggleVideo={toggleVideo}
            onEndCall={endCall}
          />
        )}
      </main>

      {/* Incoming call modal */}
      {callStatus === 'incoming' && incomingCallFrom && (
        <IncomingCallModal
          callerName={incomingCallFrom}
          onAccept={acceptCall}
          onReject={rejectCall}
        />
      )}
    </div>
  );
};

export default VideoConsultation;
