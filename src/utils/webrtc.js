// WebRTC configuration
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" }
  ]
};

export class WebRTCConnection {
  constructor(onRemoteStream, onConnectionStateChange) {
    this.peerConnection = null;
    this.localStream = null;
    this.onRemoteStream = onRemoteStream;
    this.onConnectionStateChange = onConnectionStateChange;
  }

  async initialize() {
    this.peerConnection = new RTCPeerConnection(ICE_SERVERS);

    // Remote stream callback
    this.peerConnection.ontrack = (event) => {
      const stream = event.streams?.[0];
      if (stream) this.onRemoteStream?.(stream);
    };

    this.peerConnection.onconnectionstatechange = () => {
      this.onConnectionStateChange?.(this.peerConnection.connectionState);
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.onIceCallback) {
        this.onIceCallback(event.candidate);
      }
    };
  }

  async getLocalStream() {
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: true
    });

    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    return this.localStream;
  }

  async createOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(offer) {
    if (this.peerConnection.signalingState !== "stable") return null;

    await this.peerConnection.setRemoteDescription(offer);
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteAnswer(answer) {
    if (this.peerConnection.signalingState !== "have-local-offer") return;
    await this.peerConnection.setRemoteDescription(answer);
  }

  async addIceCandidate(c) {
    await this.peerConnection.addIceCandidate(c);
  }

  onIceCandidate(cb) {
    this.onIceCallback = cb;
  }

  close() {
    this.localStream?.getTracks().forEach(t => t.stop());
    this.peerConnection.close();
  }
}
