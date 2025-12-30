import { supabase } from "@/integrations/supabase/client";

export class SignalingService {
  constructor(roomId, userId, onSignal) {
    this.roomId = roomId;
    this.userId = userId;
    this.onSignal = onSignal;
    this.channel = null;
    this.isConnected = false;
    this.pendingMessages = [];
  }

  connect() {
    return new Promise((resolve) => {
      const channelName = `video-call:${this.roomId}`;
      console.log('[Signaling] Connecting to channel:', channelName);
      
      this.channel = supabase.channel(channelName, {
        config: {
          broadcast: { self: false }
        }
      });

      this.channel
        .on('broadcast', { event: 'signal' }, ({ payload }) => {
          console.log('[Signaling] Received signal:', payload.type, 'from:', payload.senderId);
          if (payload.senderId !== this.userId) {
            this.onSignal?.(payload);
          }
        })
        .subscribe((status) => {
          console.log('[Signaling] Channel status:', status);
          if (status === 'SUBSCRIBED') {
            this.isConnected = true;
            // Send any pending messages
            this.pendingMessages.forEach(msg => this._send(msg));
            this.pendingMessages = [];
            resolve(this.channel);
          }
        });
    });
  }

  async _send(message) {
    if (!this.channel) {
      console.warn('[Signaling] Cannot send, no channel');
      return;
    }
    
    if (!this.isConnected) {
      console.log('[Signaling] Queuing message:', message.payload.type);
      this.pendingMessages.push(message);
      return;
    }

    try {
      const result = await this.channel.send(message);
      console.log('[Signaling] Sent:', message.payload.type, 'result:', result);
    } catch (err) {
      console.error('[Signaling] Send error:', err);
    }
  }

  async sendOffer(offer) {
    console.log('[Signaling] Sending offer');
    await this._send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        type: 'offer',
        data: offer,
        senderId: this.userId
      }
    });
  }

  async sendAnswer(answer) {
    console.log('[Signaling] Sending answer');
    await this._send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        type: 'answer',
        data: answer,
        senderId: this.userId
      }
    });
  }

  async sendIceCandidate(candidate) {
    console.log('[Signaling] Sending ICE candidate');
    await this._send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        type: 'ice-candidate',
        data: candidate,
        senderId: this.userId
      }
    });
  }

  async sendJoin() {
    console.log('[Signaling] Sending join');
    await this._send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        type: 'join',
        senderId: this.userId
      }
    });
  }

  async sendLeave() {
    console.log('[Signaling] Sending leave');
    await this._send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        type: 'leave',
        senderId: this.userId
      }
    });
  }

  disconnect() {
    if (this.channel) {
      this.isConnected = false;
      supabase.removeChannel(this.channel);
      this.channel = null;
      console.log('[Signaling] Disconnected');
    }
  }
}
