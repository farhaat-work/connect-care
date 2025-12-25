// WebRTC configuration
const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ]
};

export class WebRTCConnection {
  constructor(onRemoteStream, onConnectionStateChange) {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
    this.onRemoteStream = onRemoteStream;
    this.onConnectionStateChange = onConnectionStateChange;
  }

  async initialize() {
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);
    
    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      console.log('[WebRTC] Remote track received:', event.track.kind);
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }
      this.remoteStream.addTrack(event.track);
      this.onRemoteStream?.(this.remoteStream);
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('[WebRTC] Connection state:', this.peerConnection.connectionState);
      this.onConnectionStateChange?.(this.peerConnection.connectionState);
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('[WebRTC] ICE connection state:', this.peerConnection.iceConnectionState);
    };

    return this.peerConnection;
  }

  async getLocalStream(video = true, audio = true) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: video ? { width: 1280, height: 720, facingMode: 'user' } : false,
        audio: audio ? { echoCancellation: true, noiseSuppression: true } : false
      });
      
      // Add tracks to peer connection
      if (this.peerConnection) {
        this.localStream.getTracks().forEach(track => {
          this.peerConnection.addTrack(track, this.localStream);
        });
      }
      
      console.log('[WebRTC] Local stream acquired');
      return this.localStream;
    } catch (error) {
      console.error('[WebRTC] Error getting local stream:', error);
      throw error;
    }
  }

  async createOffer() {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    
    console.log('[WebRTC] Offer created');
    return offer;
  }

  async createAnswer(offer) {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    
    console.log('[WebRTC] Answer created');
    return answer;
  }

  async setRemoteAnswer(answer) {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    
    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('[WebRTC] Remote answer set');
  }

  async addIceCandidate(candidate) {
    if (!this.peerConnection) throw new Error('Peer connection not initialized');
    
    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      console.log('[WebRTC] ICE candidate added');
    } catch (error) {
      console.error('[WebRTC] Error adding ICE candidate:', error);
    }
  }

  onIceCandidate(callback) {
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('[WebRTC] ICE candidate generated');
          callback(event.candidate);
        }
      };
    }
  }

  toggleAudio(enabled) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
      });
      console.log('[WebRTC] Audio', enabled ? 'enabled' : 'disabled');
    }
  }

  toggleVideo(enabled) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
      });
      console.log('[WebRTC] Video', enabled ? 'enabled' : 'disabled');
    }
  }

  close() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    this.remoteStream = null;
    console.log('[WebRTC] Connection closed');
  }
}
