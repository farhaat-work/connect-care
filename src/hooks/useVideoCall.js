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
  const pendingCandidatesRef = useRef([]);
  const peerIdRef = useRef(null);
  const isInitiatorRef = useRef(false);

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
        const added = await webrtcRef.current.addIceCandidate(candidate);
        if (!added) {
          // Re-queue if couldn't add
          pendingCandidatesRef.current.push(candidate);
        }
      } catch (err) {
        console.warn('[useVideoCall] Failed to add queued candidate:', err.message);
      }
    }
  }, []);

  // Create and send offer
  const createAndSendOffer = useCallback(async () => {
    if (!webrtcRef.current || !signalingRef.current) return;
    
    try {
      console.log('[useVideoCall] Creating and sending offer');
      const offer = await webrtcRef.current.createOffer();
      if (offer) {
        await signalingRef.current.sendOffer(offer);
      }
    } catch (err) {
      console.error('[useVideoCall] Error creating offer:', err);
    }
  }, []);

  // Handle signaling messages
  const handleSignal = useCallback(async (signal) => {
    console.log('[useVideoCall] Signal received:', signal.type, 'from:', signal.senderId);
    
    if (!webrtcRef.current) {
      console.warn('[useVideoCall] WebRTC not initialized, ignoring signal');
      return;
    }

    try {
      switch (signal.type) {
        case 'join':
          // Prevent duplicate join handling
          if (peerIdRef.current === signal.senderId) {
            console.log('[useVideoCall] Ignoring duplicate join from:', signal.senderId);
            return;
          }
          
          console.log('[useVideoCall] Peer joined:', signal.senderId);
          setPeerJoined(true);
          peerIdRef.current = signal.senderId;
          
          // Determine who should create offer (higher ID creates offer to avoid glare)
          const shouldOffer = userIdRef.current > signal.senderId;
          console.log('[useVideoCall] Should create offer:', shouldOffer, 'myId:', userIdRef.current, 'peerId:', signal.senderId);
          
          if (shouldOffer) {
            isInitiatorRef.current = true;
            // Small delay to ensure peer is ready to receive
            setTimeout(() => {
              console.log('[useVideoCall] Initiating offer after delay');
              createAndSendOffer();
            }, 300);
          }
          break;

        case 'offer':
          console.log('[useVideoCall] Received offer from:', signal.senderId);
          isInitiatorRef.current = false;
          peerIdRef.current = signal.senderId;
          setPeerJoined(true);
          
          const answer = await webrtcRef.current.handleOffer(signal.data);
          if (answer) {
            console.log('[useVideoCall] Sending answer');
            await signalingRef.current?.sendAnswer(answer);
            // Process any queued candidates now that we have remote description
            await processQueuedCandidates();
          } else {
            console.warn('[useVideoCall] Failed to create answer');
          }
          break;

        case 'answer':
          console.log('[useVideoCall] Received answer from:', signal.senderId);
          await webrtcRef.current.handleAnswer(signal.data);
          // Process any queued candidates now that we have remote description
          await processQueuedCandidates();
          break;

        case 'ice-candidate':
          console.log('[useVideoCall] Received ICE candidate');
          
          // Queue if we don't have remote description yet
          if (!webrtcRef.current.hasRemoteDescription()) {
            console.log('[useVideoCall] Queuing ICE candidate - no remote description yet');
            pendingCandidatesRef.current.push(signal.data);
          } else {
            const added = await webrtcRef.current.addIceCandidate(signal.data);
            if (!added) {
              console.log('[useVideoCall] Re-queuing ICE candidate');
              pendingCandidatesRef.current.push(signal.data);
            }
          }
          break;

        case 'leave':
          console.log('[useVideoCall] Peer left:', signal.senderId);
          if (peerIdRef.current === signal.senderId) {
            setPeerJoined(false);
            peerIdRef.current = null;
            setRemoteStream(null);
            setConnectionState('disconnected');
            pendingCandidatesRef.current = [];
          }
          break;
      }
    } catch (err) {
      console.error('[useVideoCall] Signal handling error:', err);
      setError(err.message);
    }
  }, [processQueuedCandidates, createAndSendOffer]);

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
      console.log('[useVideoCall] Starting call for room:', roomId, 'userId:', userIdRef.current);
      setError(null);
      setConnectionState('connecting');
      setIsCallActive(true);
      pendingCandidatesRef.current = [];
      isInitiatorRef.current = false;

      // Step 1: Initialize WebRTC connection
      webrtcRef.current = new WebRTCConnection(
        handleRemoteStream,
        handleConnectionStateChange
      );
      await webrtcRef.current.initialize();

      // Step 2: Set up ICE candidate handler BEFORE getting media
      webrtcRef.current.onIceCandidate((candidate) => {
        console.log('[useVideoCall] Sending ICE candidate');
        signalingRef.current?.sendIceCandidate(candidate);
      });

      // Step 3: Set up negotiation handler (for renegotiation scenarios)
      webrtcRef.current.setNegotiationHandler(() => {
        if (isInitiatorRef.current && peerIdRef.current) {
          console.log('[useVideoCall] Renegotiation needed');
          createAndSendOffer();
        }
      });

      // Step 4: Initialize signaling BEFORE getting media
      signalingRef.current = new SignalingService(
        roomId,
        userIdRef.current,
        handleSignal
      );
      await signalingRef.current.connect();
      console.log('[useVideoCall] Signaling connected');

      // Step 5: Get local media stream (this will trigger onnegotiationneeded)
      const stream = await webrtcRef.current.getLocalStream(true, true);
      setLocalStream(stream);
      setIsAudioEnabled(true);
      setIsVideoEnabled(true);
      console.log('[useVideoCall] Local stream ready');

      // Step 6: Announce presence AFTER everything is set up
      console.log('[useVideoCall] Announcing presence');
      await signalingRef.current.sendJoin();

    } catch (err) {
      console.error('[useVideoCall] Start call error:', err);
      setError(err.message);
      setConnectionState('failed');
      setIsCallActive(false);
    }
  }, [roomId, handleRemoteStream, handleConnectionStateChange, handleSignal, isCallActive, createAndSendOffer]);

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
    pendingCandidatesRef.current = [];
    peerIdRef.current = null;
    isInitiatorRef.current = false;
  }, []);

  // Toggle microphone - directly manipulate tracks
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const newState = !isAudioEnabled;
      // Update local stream directly for immediate UI feedback
      localStream.getAudioTracks().forEach(track => {
        track.enabled = newState;
      });
      // Also update through WebRTC class
      webrtcRef.current?.toggleAudio(newState);
      setIsAudioEnabled(newState);
      console.log('[useVideoCall] Audio toggled:', newState ? 'enabled' : 'disabled');
    }
  }, [localStream, isAudioEnabled]);

  // Toggle camera - directly manipulate tracks
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const newState = !isVideoEnabled;
      // Update local stream directly for immediate UI feedback
      localStream.getVideoTracks().forEach(track => {
        track.enabled = newState;
      });
      // Also update through WebRTC class
      webrtcRef.current?.toggleVideo(newState);
      setIsVideoEnabled(newState);
      console.log('[useVideoCall] Video toggled:', newState ? 'enabled' : 'disabled');
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
