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
  const [isCallActive, setIsCallActive] = useState(false);

  const webrtcRef = useRef(null);
  const signalingRef = useRef(null);
  const userIdRef = useRef(`user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const makingOfferRef = useRef(false);
  const isSettingRemoteRef = useRef(false);
  const pendingCandidatesRef = useRef([]);
  const hasRemoteDescRef = useRef(false);

  // Handle remote stream
  const handleRemoteStream = useCallback((stream) => {
    console.log('[useVideoCall] Remote stream received with tracks:', stream.getTracks().length);
    setRemoteStream(stream);
  }, []);

  // Handle connection state
  const handleConnectionStateChange = useCallback((state) => {
    console.log('[useVideoCall] Connection state:', state);
    setConnectionState(state);
  }, []);

  // Process queued ICE candidates
  const processQueuedCandidates = useCallback(async () => {
    if (!webrtcRef.current || pendingCandidatesRef.current.length === 0) return;
    
    console.log('[useVideoCall] Processing', pendingCandidatesRef.current.length, 'queued candidates');
    const candidates = [...pendingCandidatesRef.current];
    pendingCandidatesRef.current = [];
    
    for (const candidate of candidates) {
      try {
        await webrtcRef.current.addIceCandidate(candidate);
      } catch (err) {
        console.warn('[useVideoCall] Failed to add queued candidate:', err.message);
      }
    }
  }, []);

  // Handle signaling messages
  const handleSignal = useCallback(async (signal) => {
    console.log('[useVideoCall] Signal received:', signal.type, 'from:', signal.senderId);
    
    if (!webrtcRef.current) {
      console.warn('[useVideoCall] WebRTC not initialized');
      return;
    }

    const pc = webrtcRef.current.peerConnection;
    if (!pc) return;

    try {
      switch (signal.type) {
        case 'join':
          console.log('[useVideoCall] Peer joined the room');
          setPeerJoined(true);
          
          // Determine who should create offer (higher ID creates offer)
          const shouldOffer = userIdRef.current > signal.senderId;
          console.log('[useVideoCall] Should create offer:', shouldOffer);
          
          if (shouldOffer && !makingOfferRef.current) {
            makingOfferRef.current = true;
            try {
              const offer = await webrtcRef.current.createOffer();
              await signalingRef.current?.sendOffer(offer);
            } finally {
              makingOfferRef.current = false;
            }
          }
          break;

        case 'offer':
          console.log('[useVideoCall] Received offer, state:', pc.signalingState);
          
          // Handle glare - both sides tried to create offer
          const isPolite = userIdRef.current < signal.senderId;
          const offerCollision = makingOfferRef.current || pc.signalingState !== 'stable';
          
          if (offerCollision) {
            if (isPolite) {
              console.log('[useVideoCall] Polite peer rolling back');
              await pc.setLocalDescription({ type: 'rollback' });
            } else {
              console.log('[useVideoCall] Impolite peer ignoring offer');
              break;
            }
          }
          
          isSettingRemoteRef.current = true;
          const answer = await webrtcRef.current.createAnswer(signal.data);
          isSettingRemoteRef.current = false;
          hasRemoteDescRef.current = true;
          
          if (answer) {
            await signalingRef.current?.sendAnswer(answer);
            await processQueuedCandidates();
          }
          break;

        case 'answer':
          console.log('[useVideoCall] Received answer, state:', pc.signalingState);
          
          if (pc.signalingState === 'have-local-offer') {
            isSettingRemoteRef.current = true;
            await webrtcRef.current.setRemoteAnswer(signal.data);
            isSettingRemoteRef.current = false;
            hasRemoteDescRef.current = true;
            await processQueuedCandidates();
          }
          break;

        case 'ice-candidate':
          console.log('[useVideoCall] Received ICE candidate');
          
          // Queue candidates if we don't have remote description yet
          if (!hasRemoteDescRef.current || isSettingRemoteRef.current) {
            console.log('[useVideoCall] Queuing ICE candidate');
            pendingCandidatesRef.current.push(signal.data);
          } else {
            await webrtcRef.current.addIceCandidate(signal.data);
          }
          break;

        case 'leave':
          console.log('[useVideoCall] Peer left');
          setPeerJoined(false);
          setRemoteStream(null);
          setConnectionState('disconnected');
          hasRemoteDescRef.current = false;
          pendingCandidatesRef.current = [];
          break;
      }
    } catch (err) {
      console.error('[useVideoCall] Signal handling error:', err);
      setError(err.message);
    }
  }, [processQueuedCandidates]);

  // Start the call
  const startCall = useCallback(async () => {
    if (!roomId) {
      setError('Room ID is required');
      return;
    }

    if (isCallActive) {
      console.log('[useVideoCall] Call already active');
      return;
    }

    try {
      console.log('[useVideoCall] Starting call for room:', roomId);
      setError(null);
      setConnectionState('connecting');
      setIsCallActive(true);
      hasRemoteDescRef.current = false;
      makingOfferRef.current = false;
      pendingCandidatesRef.current = [];

      // Initialize WebRTC connection
      webrtcRef.current = new WebRTCConnection(
        handleRemoteStream,
        handleConnectionStateChange
      );
      await webrtcRef.current.initialize();

      // Get local media stream
      const stream = await webrtcRef.current.getLocalStream(true, true);
      setLocalStream(stream);
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);

      // Set up ICE candidate handler
      webrtcRef.current.onIceCandidate((candidate) => {
        console.log('[useVideoCall] Sending ICE candidate');
        signalingRef.current?.sendIceCandidate(candidate);
      });

      // Initialize signaling
      signalingRef.current = new SignalingService(
        roomId,
        userIdRef.current,
        handleSignal
      );
      signalingRef.current.connect();

      // Announce presence after channel is ready
      setTimeout(() => {
        console.log('[useVideoCall] Announcing presence');
        signalingRef.current?.sendJoin();
      }, 500);

    } catch (err) {
      console.error('[useVideoCall] Start call error:', err);
      setError(err.message);
      setConnectionState('failed');
      setIsCallActive(false);
    }
  }, [roomId, handleRemoteStream, handleConnectionStateChange, handleSignal, isCallActive]);

  // End the call
  const endCall = useCallback(() => {
    console.log('[useVideoCall] Ending call');
    
    signalingRef.current?.sendLeave();
    signalingRef.current?.disconnect();
    signalingRef.current = null;
    
    webrtcRef.current?.close();
    webrtcRef.current = null;
    
    setLocalStream(null);
    setRemoteStream(null);
    setConnectionState('closed');
    setPeerJoined(false);
    setIsCallActive(false);
    hasRemoteDescRef.current = false;
    makingOfferRef.current = false;
    pendingCandidatesRef.current = [];
  }, []);

  // Toggle microphone
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const newState = !isAudioEnabled;
      localStream.getAudioTracks().forEach(track => {
        track.enabled = newState;
      });
      webrtcRef.current?.toggleAudio(newState);
      setIsAudioEnabled(newState);
      console.log('[useVideoCall] Audio:', newState ? 'enabled' : 'disabled');
    }
  }, [localStream, isAudioEnabled]);

  // Toggle camera
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const newState = !isVideoEnabled;
      localStream.getVideoTracks().forEach(track => {
        track.enabled = newState;
      });
      webrtcRef.current?.toggleVideo(newState);
      setIsVideoEnabled(newState);
      console.log('[useVideoCall] Video:', newState ? 'enabled' : 'disabled');
    }
  }, [localStream, isVideoEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isCallActive) {
        endCall();
      }
    };
  }, [endCall, isCallActive]);

  return {
    localStream,
    remoteStream,
    connectionState,
    isAudioEnabled,
    isVideoEnabled,
    error,
    peerJoined,
    isCallActive,
    startCall,
    endCall,
    toggleAudio,
    toggleVideo,
  };
};
