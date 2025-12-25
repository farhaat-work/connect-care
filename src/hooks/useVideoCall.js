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
  const hasReceivedOfferRef = useRef(false);
  const pendingCandidatesRef = useRef([]);

  const handleRemoteStream = useCallback((stream) => {
    console.log('[useVideoCall] Remote stream received');
    setRemoteStream(stream);
  }, []);

  const handleConnectionStateChange = useCallback((state) => {
    console.log('[useVideoCall] Connection state changed:', state);
    setConnectionState(state);
  }, []);

  const processPendingCandidates = useCallback(async () => {
    if (webrtcRef.current && pendingCandidatesRef.current.length > 0) {
      console.log('[useVideoCall] Processing pending ICE candidates:', pendingCandidatesRef.current.length);
      for (const candidate of pendingCandidatesRef.current) {
        try {
          await webrtcRef.current.addIceCandidate(candidate);
        } catch (err) {
          console.warn('[useVideoCall] Failed to add pending candidate:', err);
        }
      }
      pendingCandidatesRef.current = [];
    }
  }, []);

  const handleSignal = useCallback(async (signal) => {
    console.log('[useVideoCall] Handling signal:', signal.type, 'from:', signal.senderId);
    
    try {
      switch (signal.type) {
        case 'join':
          setPeerJoined(true);
          // Only the first person to join becomes initiator and sends offer
          // Compare user IDs to determine who initiates (higher ID initiates)
          if (webrtcRef.current && !hasReceivedOfferRef.current) {
            const shouldInitiate = userIdRef.current > signal.senderId;
            console.log('[useVideoCall] Should initiate:', shouldInitiate);
            
            if (shouldInitiate && !isInitiatorRef.current) {
              isInitiatorRef.current = true;
              const offer = await webrtcRef.current.createOffer();
              await signalingRef.current?.sendOffer(offer);
            }
          }
          break;
          
        case 'offer':
          if (webrtcRef.current) {
            const pc = webrtcRef.current.peerConnection;
            // Only process offer if we haven't already or if we're in stable state
            if (pc && (pc.signalingState === 'stable' || pc.signalingState === 'have-local-offer')) {
              // If we have a local offer and receive an offer, use polite peer logic
              if (pc.signalingState === 'have-local-offer') {
                // Lower ID is polite and accepts the offer
                if (userIdRef.current < signal.senderId) {
                  console.log('[useVideoCall] Polite peer: rolling back local offer');
                  await pc.setLocalDescription({ type: 'rollback' });
                } else {
                  console.log('[useVideoCall] Impolite peer: ignoring incoming offer');
                  break;
                }
              }
              
              hasReceivedOfferRef.current = true;
              const answer = await webrtcRef.current.createAnswer(signal.data);
              await signalingRef.current?.sendAnswer(answer);
              await processPendingCandidates();
            }
          }
          break;
          
        case 'answer':
          if (webrtcRef.current) {
            const pc = webrtcRef.current.peerConnection;
            // Only set answer if we're in the correct state
            if (pc && pc.signalingState === 'have-local-offer') {
              await webrtcRef.current.setRemoteAnswer(signal.data);
              await processPendingCandidates();
            } else {
              console.log('[useVideoCall] Ignoring answer, wrong state:', pc?.signalingState);
            }
          }
          break;
          
        case 'ice-candidate':
          if (webrtcRef.current) {
            const pc = webrtcRef.current.peerConnection;
            // Queue candidates if remote description not set yet
            if (pc && pc.remoteDescription && pc.remoteDescription.type) {
              await webrtcRef.current.addIceCandidate(signal.data);
            } else {
              console.log('[useVideoCall] Queuing ICE candidate');
              pendingCandidatesRef.current.push(signal.data);
            }
          }
          break;
          
        case 'leave':
          setPeerJoined(false);
          setRemoteStream(null);
          setConnectionState('disconnected');
          hasReceivedOfferRef.current = false;
          isInitiatorRef.current = false;
          pendingCandidatesRef.current = [];
          break;
      }
    } catch (err) {
      console.error('[useVideoCall] Signal handling error:', err);
      setError(err.message);
    }
  }, [processPendingCandidates]);

  const startCall = useCallback(async () => {
    if (!roomId) {
      setError('Room ID is required');
      return;
    }

    try {
      setError(null);
      setConnectionState('connecting');
      hasReceivedOfferRef.current = false;
      isInitiatorRef.current = false;
      pendingCandidatesRef.current = [];

      // Initialize WebRTC
      webrtcRef.current = new WebRTCConnection(
        handleRemoteStream,
        handleConnectionStateChange
      );
      await webrtcRef.current.initialize();

      // Get local stream
      const stream = await webrtcRef.current.getLocalStream(true, true);
      setLocalStream(stream);
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);

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

      // Announce joining after channel is ready
      setTimeout(() => {
        signalingRef.current?.sendJoin();
      }, 1000);

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
    hasReceivedOfferRef.current = false;
    isInitiatorRef.current = false;
    pendingCandidatesRef.current = [];
  }, []);

  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioEnabled(prev => !prev);
      console.log('[useVideoCall] Audio toggled:', !isAudioEnabled);
    }
  }, [localStream, isAudioEnabled]);

  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTracks = localStream.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoEnabled(prev => !prev);
      console.log('[useVideoCall] Video toggled:', !isVideoEnabled);
    }
  }, [localStream, isVideoEnabled]);

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
