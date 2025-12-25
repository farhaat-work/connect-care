import React from 'react';
import { Loader2, Check, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { CallStatus } from '@/hooks/useVideoCall';

interface ConnectionStatusProps {
  status: CallStatus;
  duration?: string;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, duration }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'idle':
        return {
          icon: <Wifi className="w-4 h-4" />,
          text: 'Ready',
          className: 'status-connected',
        };
      case 'requesting':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Calling...',
          className: 'status-connecting',
        };
      case 'incoming':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Incoming call',
          className: 'status-connecting',
        };
      case 'connecting':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Connecting...',
          className: 'status-connecting',
        };
      case 'connected':
        return {
          icon: <Check className="w-4 h-4" />,
          text: duration || 'Connected',
          className: 'status-connected',
        };
      case 'reconnecting':
        return {
          icon: <Loader2 className="w-4 h-4 animate-spin" />,
          text: 'Reconnecting...',
          className: 'status-connecting',
        };
      case 'ended':
        return {
          icon: <WifiOff className="w-4 h-4" />,
          text: 'Call ended',
          className: 'status-disconnected',
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'Connection failed',
          className: 'status-disconnected',
        };
      default:
        return {
          icon: <Wifi className="w-4 h-4" />,
          text: 'Unknown',
          className: 'status-connecting',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`connection-status ${config.className}`}>
      <div className="flex items-center gap-2">
        {config.icon}
        <span>{config.text}</span>
      </div>
    </div>
  );
};

export default ConnectionStatus;
