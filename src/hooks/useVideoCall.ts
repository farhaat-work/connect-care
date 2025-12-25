import { useState, useCallback, useRef, useEffect } from 'react';
import { WebRTCConnection, SignalingMessage } from '@/utils/webrtc';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export type CallStatus = 
  | 'idle' 
  | 'requesting' 
  | 'incoming' 
  | 'connecting' 
  | 'connected' 
  | 'reconnecting'
  | 'ended' 
  | 'failed';

interface UseVideoCallOptions {
  roomId: string;
  userId: string;
  onCallEnded?: () => void;
}

interface UseVideoCallReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  callStatus: CallStatus;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  error: string | null;
  startCall: (targetUserId: string) => Promise<void>;
  acceptCall: () => Promise<void>;
  rejectCall: () => void;
  endCall: () => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  incomingCallFrom: string | null;
}

export const useVideoCall = ({ 
  roomId, 
  userId,
  onCallEnded 
}: UseVideoCallOptions): UseVideoCallReturn => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [incomingCallFrom, setIncomingCallFrom] = useState<string | null>(null);

  const webrtcRef = useRef<WebRTCConnection | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const targetUserRef = useRef<string | null>(null);

  // Send signaling message through Supabase Realtime
  const sendSignalingMessage = useCallback((message: SignalingMessage) => {
    if (channelRef.current) {
      console.log('Sending signaling message:', message.type);
      channelRef.current.send({
        type: 'broadcast',
        event: 'signaling',
        payload: message,
      });
    }
  }, []);

  // Handle incoming signaling messages
  const handleSignalingMessage = useCallback(async (message: SignalingMessage) => {
    console.log('Received signaling message:', message.type, 'from:', message.from);

    // Ignore messages from self
    if (message.from === userId) return;
    
    // Ignore messages not addressed to us (except for call requests)
    if (message.to && message.to !== userId && message.type !== 'call-request') return;

    switch (message.type) {
      case 'call-request':
        if (message.to === userId && callStatus === 'idle') {
          setIncomingCallFrom(message.from);
          setCallStatus('incoming');
          targetUserRef.current = message.from;
        }
        break;

      case 'call-accepted':
        if (message.to === userId && callStatus === 'requesting') {
          setCallStatus('connecting');
          // Initialize WebRTC and create offer
          try {
            const webrtc = new WebRTCConnection();
            webrtcRef.current = webrtc;
            
            webrtc.setCallbacks({
              onRemoteStream: (stream) => {
                console.log('Remote stream received');
                setRemoteStream(stream);
                setCallStatus('connected');
              },
              onConnectionStateChange: (state) => {
                console.log('Connection state changed:', state);
                if (state === 'disconnected' || state === 'failed') {
                  setCallStatus('failed');
                }
              },
              onIceCandidate: (candidate) => {
                sendSignalingMessage({
                  type: 'ice-candidate',
                  candidate: candidate.toJSON(),
                  from: userId,
                  to: targetUserRef.current!,
                });
              },
            });

            const stream = await webrtc.initialize(true, true);
            setLocalStream(stream);

            const offer = await webrtc.createOffer();
            sendSignalingMessage({
              type: 'offer',
              sdp: offer,
              from: userId,
              to: message.from,
            });
          } catch (err) {
            console.error('Error initializing call:', err);
            setError('Failed to initialize call');
            setCallStatus('failed');
          }
        }
        break;

      case 'call-rejected':
        if (message.to === userId) {
          setCallStatus('ended');
          cleanup();
        }
        break;

      case 'offer':
        if (message.to === userId && webrtcRef.current) {
          try {
            const answer = await webrtcRef.current.handleOffer(message.sdp);
            sendSignalingMessage({
              type: 'answer',
              sdp: answer,
              from: userId,
              to: message.from,
            });
          } catch (err) {
            console.error('Error handling offer:', err);
            setError('Failed to process call offer');
          }
        }
        break;

      case 'answer':
        if (message.to === userId && webrtcRef.current) {
          try {
            await webrtcRef.current.handleAnswer(message.sdp);
          } catch (err) {
            console.error('Error handling answer:', err);
            setError('Failed to process call answer');
          }
        }
        break;

      case 'ice-candidate':
        if (message.to === userId && webrtcRef.current) {
          try {
            await webrtcRef.current.addIceCandidate(message.candidate);
          } catch (err) {
            console.error('Error adding ICE candidate:', err);
          }
        }
        break;

      case 'call-ended':
        if (message.to === userId || message.from !== userId) {
          setCallStatus('ended');
          cleanup();
          onCallEnded?.();
        }
        break;
    }
  }, [userId, callStatus, sendSignalingMessage, onCallEnded]);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (webrtcRef.current) {
      webrtcRef.current.close();
      webrtcRef.current = null;
    }
    setLocalStream(null);
    setRemoteStream(null);
    setIncomingCallFrom(null);
    targetUserRef.current = null;
  }, []);

  // Initialize Supabase Realtime channel
  useEffect(() => {
    console.log('Setting up Realtime channel for room:', roomId);
    
    const channel = supabase.channel(`video-call:${roomId}`, {
      config: {
        broadcast: { self: false },
      },
    });

    channel
      .on('broadcast', { event: 'signaling' }, ({ payload }) => {
        handleSignalingMessage(payload as SignalingMessage);
      })
      .subscribe((status) => {
        console.log('Channel subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      console.log('Cleaning up Realtime channel');
      cleanup();
      supabase.removeChannel(channel);
    };
  }, [roomId, handleSignalingMessage, cleanup]);

  // Start a call to another user
  const startCall = useCallback(async (targetUserId: string) => {
    setCallStatus('requesting');
    setError(null);
    targetUserRef.current = targetUserId;

    sendSignalingMessage({
      type: 'call-request',
      from: userId,
      to: targetUserId,
      roomId,
    });

    // Timeout for call request
    setTimeout(() => {
      if (callStatus === 'requesting') {
        setCallStatus('failed');
        setError('Call request timed out');
      }
    }, 30000);
  }, [userId, roomId, sendSignalingMessage, callStatus]);

  // Accept incoming call
  const acceptCall = useCallback(async () => {
    if (!incomingCallFrom) return;

    setCallStatus('connecting');
    setError(null);

    try {
      const webrtc = new WebRTCConnection();
      webrtcRef.current = webrtc;

      webrtc.setCallbacks({
        onRemoteStream: (stream) => {
          console.log('Remote stream received');
          setRemoteStream(stream);
          setCallStatus('connected');
        },
        onConnectionStateChange: (state) => {
          console.log('Connection state changed:', state);
          if (state === 'disconnected' || state === 'failed') {
            setCallStatus('failed');
          }
        },
        onIceCandidate: (candidate) => {
          sendSignalingMessage({
            type: 'ice-candidate',
            candidate: candidate.toJSON(),
            from: userId,
            to: targetUserRef.current!,
          });
        },
      });

      const stream = await webrtc.initialize(true, true);
      setLocalStream(stream);

      sendSignalingMessage({
        type: 'call-accepted',
        from: userId,
        to: incomingCallFrom,
        roomId,
      });
    } catch (err) {
      console.error('Error accepting call:', err);
      setError('Failed to accept call');
      setCallStatus('failed');
    }
  }, [incomingCallFrom, userId, roomId, sendSignalingMessage]);

  // Reject incoming call
  const rejectCall = useCallback(() => {
    if (incomingCallFrom) {
      sendSignalingMessage({
        type: 'call-rejected',
        from: userId,
        to: incomingCallFrom,
      });
    }
    setCallStatus('idle');
    setIncomingCallFrom(null);
    targetUserRef.current = null;
  }, [incomingCallFrom, userId, sendSignalingMessage]);

  // End the call
  const endCall = useCallback(() => {
    if (targetUserRef.current) {
      sendSignalingMessage({
        type: 'call-ended',
        from: userId,
        to: targetUserRef.current,
      });
    }
    setCallStatus('ended');
    cleanup();
    onCallEnded?.();
  }, [userId, sendSignalingMessage, cleanup, onCallEnded]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (webrtcRef.current) {
      const newState = !isAudioEnabled;
      webrtcRef.current.toggleAudio(newState);
      setIsAudioEnabled(newState);
    }
  }, [isAudioEnabled]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (webrtcRef.current) {
      const newState = !isVideoEnabled;
      webrtcRef.current.toggleVideo(newState);
      setIsVideoEnabled(newState);
    }
  }, [isVideoEnabled]);

  return {
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
  };
};
