import { useState, useRef, useCallback, useEffect } from 'react';
import { WebRTCConnection } from '@/utils/webrtc';
import { SignalingService } from '@/utils/signaling';

export const useVideoCall = (roomId) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [connectionState, setConnectionState] = useState('new');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [error, setError] = useState(null);
  const [peerJoined, setPeerJoined] = useState(false);

  const webrtcRef = useRef(null);
  const signalingRef = useRef(null);
  const userIdRef = useRef(`user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const isInitiatorRef = useRef(false);

  const handleRemoteStream = useCallback((stream) => {
    console.log('[useVideoCall] Remote stream received');
    setRemoteStream(stream);
  }, []);

  const handleConnectionStateChange = useCallback((state) => {
    console.log('[useVideoCall] Connection state changed:', state);
    setConnectionState(state);
  }, []);

  const handleSignal = useCallback(async (signal) => {
    console.log('[useVideoCall] Handling signal:', signal.type);
    
    try {
      switch (signal.type) {
        case 'join':
          setPeerJoined(true);
          // If we're already in the room, send an offer
          if (webrtcRef.current && localStream) {
            isInitiatorRef.current = true;
            const offer = await webrtcRef.current.createOffer();
            await signalingRef.current?.sendOffer(offer);
          }
          break;
          
        case 'offer':
          if (webrtcRef.current) {
            const answer = await webrtcRef.current.createAnswer(signal.data);
            await signalingRef.current?.sendAnswer(answer);
          }
          break;
          
        case 'answer':
          if (webrtcRef.current) {
            await webrtcRef.current.setRemoteAnswer(signal.data);
          }
          break;
          
        case 'ice-candidate':
          if (webrtcRef.current) {
            await webrtcRef.current.addIceCandidate(signal.data);
          }
          break;
          
        case 'leave':
          setPeerJoined(false);
          setRemoteStream(null);
          setConnectionState('disconnected');
          break;
      }
    } catch (err) {
      console.error('[useVideoCall] Signal handling error:', err);
      setError(err.message);
    }
  }, [localStream]);

  const startCall = useCallback(async () => {
    if (!roomId) {
      setError('Room ID is required');
      return;
    }

    try {
      setError(null);
      setConnectionState('connecting');

      // Initialize WebRTC
      webrtcRef.current = new WebRTCConnection(
        handleRemoteStream,
        handleConnectionStateChange
      );
      await webrtcRef.current.initialize();

      // Get local stream
      const stream = await webrtcRef.current.getLocalStream(true, true);
      setLocalStream(stream);

      // Set up ICE candidate handling
      webrtcRef.current.onIceCandidate((candidate) => {
        signalingRef.current?.sendIceCandidate(candidate);
      });

      // Initialize signaling
      signalingRef.current = new SignalingService(
        roomId,
        userIdRef.current,
        handleSignal
      );
      signalingRef.current.connect();

      // Announce joining
      setTimeout(() => {
        signalingRef.current?.sendJoin();
      }, 500);

      console.log('[useVideoCall] Call started, room:', roomId);
    } catch (err) {
      console.error('[useVideoCall] Start call error:', err);
      setError(err.message);
      setConnectionState('failed');
    }
  }, [roomId, handleRemoteStream, handleConnectionStateChange, handleSignal]);

  const endCall = useCallback(() => {
    console.log('[useVideoCall] Ending call');
    
    signalingRef.current?.sendLeave();
    signalingRef.current?.disconnect();
    webrtcRef.current?.close();
    
    signalingRef.current = null;
    webrtcRef.current = null;
    
    setLocalStream(null);
    setRemoteStream(null);
    setConnectionState('closed');
    setPeerJoined(false);
  }, []);

  const toggleAudio = useCallback(() => {
    const newState = !isAudioEnabled;
    webrtcRef.current?.toggleAudio(newState);
    setIsAudioEnabled(newState);
  }, [isAudioEnabled]);

  const toggleVideo = useCallback(() => {
    const newState = !isVideoEnabled;
    webrtcRef.current?.toggleVideo(newState);
    setIsVideoEnabled(newState);
  }, [isVideoEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endCall();
    };
  }, [endCall]);

  return {
    localStream,
    remoteStream,
    connectionState,
    isAudioEnabled,
    isVideoEnabled,
    error,
    peerJoined,
    startCall,
    endCall,
    toggleAudio,
    toggleVideo,
  };
};
