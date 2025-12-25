import React from 'react';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff,
  ScreenShare,
  Settings,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CallControlsProps {
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onEndCall: () => void;
  onScreenShare?: () => void;
  onOpenChat?: () => void;
  onOpenSettings?: () => void;
  disabled?: boolean;
}

const CallControls: React.FC<CallControlsProps> = ({
  isAudioEnabled,
  isVideoEnabled,
  onToggleAudio,
  onToggleVideo,
  onEndCall,
  onScreenShare,
  onOpenChat,
  onOpenSettings,
  disabled = false,
}) => {
  return (
    <div className="video-controls-bar">
      <div className="flex items-center justify-center gap-4">
        {/* Audio toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleAudio}
              disabled={disabled}
              className={`control-button ${
                isAudioEnabled ? 'control-button-default' : 'control-button-muted'
              }`}
              aria-label={isAudioEnabled ? 'Mute microphone' : 'Unmute microphone'}
            >
              {isAudioEnabled ? (
                <Mic className="w-6 h-6" />
              ) : (
                <MicOff className="w-6 h-6" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isAudioEnabled ? 'Mute' : 'Unmute'}
          </TooltipContent>
        </Tooltip>

        {/* Video toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleVideo}
              disabled={disabled}
              className={`control-button ${
                isVideoEnabled ? 'control-button-default' : 'control-button-muted'
              }`}
              aria-label={isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
            >
              {isVideoEnabled ? (
                <Video className="w-6 h-6" />
              ) : (
                <VideoOff className="w-6 h-6" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isVideoEnabled ? 'Turn off camera' : 'Turn on camera'}
          </TooltipContent>
        </Tooltip>

        {/* Screen share */}
        {onScreenShare && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onScreenShare}
                disabled={disabled}
                className="control-button control-button-default"
                aria-label="Share screen"
              >
                <ScreenShare className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Share screen</TooltipContent>
          </Tooltip>
        )}

        {/* End call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onEndCall}
              disabled={disabled}
              className="control-button control-button-end"
              aria-label="End call"
            >
              <PhoneOff className="w-6 h-6" />
            </button>
          </TooltipTrigger>
          <TooltipContent>End call</TooltipContent>
        </Tooltip>

        {/* Chat */}
        {onOpenChat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onOpenChat}
                disabled={disabled}
                className="control-button control-button-default"
                aria-label="Open chat"
              >
                <MessageSquare className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Chat</TooltipContent>
          </Tooltip>
        )}

        {/* Settings */}
        {onOpenSettings && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onOpenSettings}
                disabled={disabled}
                className="control-button control-button-default"
                aria-label="Settings"
              >
                <Settings className="w-6 h-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default CallControls;
