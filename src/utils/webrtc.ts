// WebRTC configuration and utilities for video calls

const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  { urls: 'stun:stun2.l.google.com:19302' },
];

export const createPeerConnection = (): RTCPeerConnection => {
  return new RTCPeerConnection({
    iceServers: ICE_SERVERS,
  });
};

export const getUserMedia = async (
  video: boolean = true,
  audio: boolean = true
): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video ? {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user',
      } : false,
      audio: audio ? {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      } : false,
    });
    return stream;
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw error;
  }
};

export const stopMediaStream = (stream: MediaStream | null): void => {
  if (stream) {
    stream.getTracks().forEach(track => {
      track.stop();
    });
  }
};

export const toggleTrack = (
  stream: MediaStream | null,
  kind: 'audio' | 'video',
  enabled: boolean
): void => {
  if (stream) {
    stream.getTracks()
      .filter(track => track.kind === kind)
      .forEach(track => {
        track.enabled = enabled;
      });
  }
};

export type SignalingMessage = 
  | { type: 'offer'; sdp: RTCSessionDescriptionInit; from: string; to: string }
  | { type: 'answer'; sdp: RTCSessionDescriptionInit; from: string; to: string }
  | { type: 'ice-candidate'; candidate: RTCIceCandidateInit; from: string; to: string }
  | { type: 'call-request'; from: string; to: string; roomId: string }
  | { type: 'call-accepted'; from: string; to: string; roomId: string }
  | { type: 'call-rejected'; from: string; to: string }
  | { type: 'call-ended'; from: string; to: string };

export class WebRTCConnection {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private onRemoteStream: ((stream: MediaStream) => void) | null = null;
  private onConnectionStateChange: ((state: RTCPeerConnectionState) => void) | null = null;
  private onIceCandidate: ((candidate: RTCIceCandidate) => void) | null = null;
  private pendingCandidates: RTCIceCandidateInit[] = [];

  constructor() {
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
  }

  setCallbacks(callbacks: {
    onRemoteStream?: (stream: MediaStream) => void;
    onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
    onIceCandidate?: (candidate: RTCIceCandidate) => void;
  }): void {
    this.onRemoteStream = callbacks.onRemoteStream || null;
    this.onConnectionStateChange = callbacks.onConnectionStateChange || null;
    this.onIceCandidate = callbacks.onIceCandidate || null;
  }

  async initialize(video: boolean = true, audio: boolean = true): Promise<MediaStream> {
    console.log('Initializing WebRTC connection...');
    
    // Get local media stream
    this.localStream = await getUserMedia(video, audio);
    
    // Create peer connection
    this.peerConnection = createPeerConnection();
    
    // Add local tracks to peer connection
    this.localStream.getTracks().forEach(track => {
      if (this.peerConnection && this.localStream) {
        this.peerConnection.addTrack(track, this.localStream);
      }
    });

    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      console.log('Remote track received:', event.track.kind);
      if (event.streams && event.streams[0]) {
        this.remoteStream = event.streams[0];
        if (this.onRemoteStream) {
          this.onRemoteStream(this.remoteStream);
        }
      }
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.onIceCandidate) {
        console.log('ICE candidate generated');
        this.onIceCandidate(event.candidate);
      }
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection && this.onConnectionStateChange) {
        console.log('Connection state:', this.peerConnection.connectionState);
        this.onConnectionStateChange(this.peerConnection.connectionState);
      }
    };

    // Handle ICE connection state changes
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.peerConnection?.iceConnectionState);
    };

    return this.localStream;
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    console.log('Offer created');
    return offer;
  }

  async handleOffer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    console.log('Remote description set from offer');
    
    // Process any pending ICE candidates
    await this.processPendingCandidates();
    
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    console.log('Answer created');
    return answer;
  }

  async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    console.log('Remote description set from answer');
    
    // Process any pending ICE candidates
    await this.processPendingCandidates();
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    // If remote description is not set yet, queue the candidate
    if (!this.peerConnection.remoteDescription) {
      console.log('Queuing ICE candidate (remote description not set)');
      this.pendingCandidates.push(candidate);
      return;
    }

    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      console.log('ICE candidate added');
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  private async processPendingCandidates(): Promise<void> {
    if (!this.peerConnection || !this.peerConnection.remoteDescription) {
      return;
    }

    console.log(`Processing ${this.pendingCandidates.length} pending ICE candidates`);
    
    for (const candidate of this.pendingCandidates) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding pending ICE candidate:', error);
      }
    }
    
    this.pendingCandidates = [];
  }

  toggleAudio(enabled: boolean): void {
    toggleTrack(this.localStream, 'audio', enabled);
  }

  toggleVideo(enabled: boolean): void {
    toggleTrack(this.localStream, 'video', enabled);
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }

  getConnectionState(): RTCPeerConnectionState | null {
    return this.peerConnection?.connectionState || null;
  }

  close(): void {
    console.log('Closing WebRTC connection');
    
    stopMediaStream(this.localStream);
    stopMediaStream(this.remoteStream);
    
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    this.localStream = null;
    this.remoteStream = null;
    this.pendingCandidates = [];
  }
}
