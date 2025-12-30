import { supabase } from "@/integrations/supabase/client";

export class SignalingService {
  constructor(roomId, userId, onSignal) {
    this.roomId = roomId;
    this.userId = userId;
    this.onSignal = onSignal;
    this.channel = null;
    this.isConnected = false;
    this.pendingMessages = [];
    this.presenceInterval = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const channelName = `video-call:${this.roomId}`;
      console.log('[Signaling] Connecting to channel:', channelName, 'as:', this.userId);
      
      this.channel = supabase.channel(channelName, {
        config: {
          broadcast: { self: false },
          presence: { key: this.userId }
        }
      });

      this.channel
        .on('broadcast', { event: 'signal' }, ({ payload }) => {
          console.log('[Signaling] Received signal:', payload.type, 'from:', payload.senderId);
          if (payload.senderId !== this.userId) {
            this.onSignal?.(payload);
          }
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          console.log('[Signaling] Presence join:', key);
          if (key !== this.userId) {
            // Another user joined - notify via signal
            this.onSignal?.({ type: 'join', senderId: key });
          }
        })
        .on('presence', { event: 'leave' }, ({ key }) => {
          console.log('[Signaling] Presence leave:', key);
          if (key !== this.userId) {
            this.onSignal?.({ type: 'leave', senderId: key });
          }
        })
        .subscribe(async (status) => {
          console.log('[Signaling] Channel status:', status);
          if (status === 'SUBSCRIBED') {
            this.isConnected = true;
            
            // Track presence
            await this.channel.track({ online_at: new Date().toISOString() });
            
            // Send any pending messages
            this.pendingMessages.forEach(msg => this._send(msg));
            this.pendingMessages = [];
            
            resolve(this.channel);
          } else if (status === 'CHANNEL_ERROR') {
            reject(new Error('Failed to connect to signaling channel'));
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
    console.log('[Signaling] Sending join broadcast');
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
    if (this.presenceInterval) {
      clearInterval(this.presenceInterval);
      this.presenceInterval = null;
    }
    
    if (this.channel) {
      this.isConnected = false;
      this.channel.untrack();
      supabase.removeChannel(this.channel);
      this.channel = null;
      console.log('[Signaling] Disconnected');
    }
  }
}
