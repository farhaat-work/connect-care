import { supabase } from "@/integrations/supabase/client";

export class SignalingService {
  constructor(roomId, userId, onSignal) {
    this.roomId = roomId;
    this.userId = userId;
    this.onSignal = onSignal;
    this.channel = null;
  }

  connect() {
    const channelName = `video-call:${this.roomId}`;
    console.log('[Signaling] Connecting to channel:', channelName);
    
    this.channel = supabase.channel(channelName, {
      config: {
        broadcast: { self: false }
      }
    });

    this.channel
      .on('broadcast', { event: 'signal' }, ({ payload }) => {
        console.log('[Signaling] Received signal:', payload.type);
        if (payload.senderId !== this.userId) {
          this.onSignal?.(payload);
        }
      })
      .subscribe((status) => {
        console.log('[Signaling] Channel status:', status);
      });

    return this.channel;
  }

  async sendOffer(offer) {
    console.log('[Signaling] Sending offer');
    await this.channel?.send({
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
    await this.channel?.send({
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
    await this.channel?.send({
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
    await this.channel?.send({
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
    await this.channel?.send({
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
      supabase.removeChannel(this.channel);
      this.channel = null;
      console.log('[Signaling] Disconnected');
    }
  }
}
