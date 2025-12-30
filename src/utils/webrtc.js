// WebRTC configuration with multiple STUN servers for reliability
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun3.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:19302" }
  ],
  iceCandidatePoolSize: 10
};

export class WebRTCConnection {
  constructor(onRemoteStream, onConnectionStateChange) {
    this.peerConnection = null;
    this.localStream = null;
    this.onRemoteStream = onRemoteStream;
    this.onConnectionStateChange = onConnectionStateChange;
    this.onIceCallback = null;
  }

  async initialize() {
    console.log('[WebRTC] Initializing peer connection');
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);

    // Handle incoming remote tracks
    this.peerConnection.ontrack = (event) => {
      console.log('[WebRTC] Remote track received:', event.track.kind);
      const stream = event.streams?.[0];
      if (stream) {
        console.log('[WebRTC] Remote stream set with tracks:', stream.getTracks().length);
        this.onRemoteStream?.(stream);
      }
    };

    // Connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      const state = this.peerConnection.connectionState;
      console.log('[WebRTC] Connection state:', state);
      this.onConnectionStateChange?.(state);
    };

    // ICE connection state for debugging
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('[WebRTC] ICE connection state:', this.peerConnection.iceConnectionState);
    };

    // ICE gathering state
    this.peerConnection.onicegatheringstatechange = () => {
      console.log('[WebRTC] ICE gathering state:', this.peerConnection.iceGatheringState);
    };

    // ICE candidate handling
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('[WebRTC] Local ICE candidate:', event.candidate.type);
        this.onIceCallback?.(event.candidate);
      }
    };

    // Negotiation needed (for renegotiation scenarios)
    this.peerConnection.onnegotiationneeded = () => {
      console.log('[WebRTC] Negotiation needed');
    };

    return this.peerConnection;
  }

  async getLocalStream(withVideo = true, withAudio = true) {
    console.log('[WebRTC] Getting local stream, video:', withVideo, 'audio:', withAudio);
    
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: withVideo ? { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } : false,
        audio: withAudio ? {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } : false
      });

      console.log('[WebRTC] Local stream obtained with tracks:', this.localStream.getTracks().length);

      // Add all tracks to peer connection
      this.localStream.getTracks().forEach(track => {
        console.log('[WebRTC] Adding track to peer connection:', track.kind);
        this.peerConnection.addTrack(track, this.localStream);
      });

      return this.localStream;
    } catch (err) {
      console.error('[WebRTC] Error getting local stream:', err);
      throw err;
    }
  }

  async createOffer() {
    console.log('[WebRTC] Creating offer');
    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
    await this.peerConnection.setLocalDescription(offer);
    console.log('[WebRTC] Local description set (offer)');
    return offer;
  }

  async createAnswer(offer) {
    const signalingState = this.peerConnection.signalingState;
    console.log('[WebRTC] Creating answer, current state:', signalingState);
    
    if (signalingState !== "stable") {
      console.warn('[WebRTC] Cannot create answer in state:', signalingState);
      return null;
    }

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    console.log('[WebRTC] Remote description set (offer)');
    
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    console.log('[WebRTC] Local description set (answer)');
    
    return answer;
  }

  async setRemoteAnswer(answer) {
    const signalingState = this.peerConnection.signalingState;
    console.log('[WebRTC] Setting remote answer, current state:', signalingState);
    
    if (signalingState !== "have-local-offer") {
      console.warn('[WebRTC] Cannot set answer in state:', signalingState);
      return;
    }
    
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('[WebRTC] Remote description set (answer)');
  }

  async addIceCandidate(candidate) {
    try {
      if (this.peerConnection.remoteDescription) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('[WebRTC] ICE candidate added');
      }
    } catch (err) {
      console.warn('[WebRTC] Error adding ICE candidate:', err.message);
    }
  }

  onIceCandidate(callback) {
    this.onIceCallback = callback;
  }

  // Toggle audio track
  toggleAudio(enabled) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
        console.log('[WebRTC] Audio track enabled:', enabled);
      });
    }
  }

  // Toggle video track
  toggleVideo(enabled) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
        console.log('[WebRTC] Video track enabled:', enabled);
      });
    }
  }

  close() {
    console.log('[WebRTC] Closing connection');
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
        console.log('[WebRTC] Track stopped:', track.kind);
      });
      this.localStream = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }
}
