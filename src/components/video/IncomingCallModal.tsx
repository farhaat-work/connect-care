import React from 'react';
import { Phone, PhoneOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IncomingCallModalProps {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
}

const IncomingCallModal: React.FC<IncomingCallModalProps> = ({
  callerName,
  onAccept,
  onReject,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-video-bg/90 backdrop-blur-sm animate-fade-in">
      <div className="flex flex-col items-center gap-8 p-8">
        {/* Caller avatar with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring" />
          <div className="relative w-32 h-32 rounded-full bg-secondary/30 flex items-center justify-center border-4 border-primary/50">
            <User className="w-16 h-16 text-primary-foreground" />
          </div>
        </div>

        {/* Caller info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            Incoming Video Call
          </h2>
          <p className="text-lg text-muted-foreground">{callerName}</p>
        </div>

        {/* Call actions */}
        <div className="flex items-center gap-8">
          <button
            onClick={onReject}
            className="w-16 h-16 rounded-full bg-call-end flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:bg-call-end/80"
            aria-label="Reject call"
          >
            <PhoneOff className="w-8 h-8 text-primary-foreground" />
          </button>

          <button
            onClick={onAccept}
            className="w-16 h-16 rounded-full bg-call-active flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:bg-call-active/80"
            aria-label="Accept call"
          >
            <Phone className="w-8 h-8 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;
