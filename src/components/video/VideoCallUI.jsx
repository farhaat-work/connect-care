import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, Monitor, MonitorOff, 
  MessageSquare, X, Send, FileText, CheckCircle, Calendar, Clock, Stethoscope,
  Loader2, AlertCircle
} from "lucide-react";
import VideoStream from "./VideoStream.jsx";
import { useVideoCall } from "@/hooks/useVideoCall.js";

const VideoCallUI = ({ consultation, userType, onEndCall, onMarkComplete, isWaitingRoom = false }) => {
  const roomId = `consultation-${consultation.id}`;
  const {
    localStream,
    remoteStream,
    connectionState,
    isAudioEnabled,
    isVideoEnabled,
    error,
    peerJoined,
    startCall,
    endCall,
    toggleAudio,
    toggleVideo,
  } = useVideoCall(roomId);

  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "system", text: "Chat started. Messages are shared in real-time.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Start call on mount
  useEffect(() => {
    startCall();
  }, [startCall]);

  const otherPartyName = userType === "patient" 
    ? consultation.doctorName 
    : consultation.patientName;

  const currentUserName = userType === "patient" ? "You" : "Dr. You";

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMsg = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setNewMessage("");
  };

  const handleEndCall = () => {
    endCall();
    onEndCall();
  };

  const handleMarkComplete = () => {
    if (onMarkComplete) {
      onMarkComplete(consultation.id);
    }
    handleEndCall();
  };

  const getStatusIndicator = () => {
    if (error) {
      return (
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="w-4 h-4" />
          Error: {error}
        </div>
      );
    }

    switch (connectionState) {
      case "new":
      case "connecting":
        return (
          <div className="flex items-center gap-2 text-yellow-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            Connecting...
          </div>
        );
      case "connected":
        return (
          <div className="flex items-center gap-2 text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Connected
          </div>
        );
      case "disconnected":
      case "failed":
      case "closed":
        return (
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-2 h-2 bg-red-400 rounded-full" />
            Disconnected
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 text-blue-400">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            {peerJoined ? 'Peer joined' : 'Waiting for peer...'}
          </div>
        );
    }
  };

  const isCallActive = connectionState === 'connected' || localStream;

  return (
    <div className="fixed inset-0 bg-foreground z-50 flex flex-col">
      {/* Header */}
      <div className="bg-card/10 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="text-primary-foreground">
          <p className="text-sm opacity-70">In call with</p>
          <p className="font-semibold">{otherPartyName}</p>
        </div>
        <div className="flex items-center gap-4">
          {getStatusIndicator()}
          {isScreenSharing && (
            <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
              Screen Sharing
            </span>
          )}
          <div className="text-primary-foreground text-right">
            <p className="text-sm opacity-70">{consultation.specialization}</p>
            <p className="text-xs opacity-50">Room: {roomId}</p>
          </div>
        </div>
      </div>

      {/* Appointment Info Banner */}
      <div className="bg-primary/20 backdrop-blur-sm px-4 py-2 flex items-center justify-center gap-6 text-sm text-primary-foreground/80">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(consultation.appointmentDate)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{consultation.appointmentTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="w-4 h-4" />
          <span>{consultation.specialization}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Video Area */}
        <div className={`flex-1 relative p-4 transition-all duration-300 ${isChatOpen || isNotesOpen ? 'pr-80' : ''}`}>
          {/* Remote Video (Large) */}
          <VideoStream
            stream={remoteStream}
            label={otherPartyName}
            showPlaceholder={true}
            className="w-full h-full rounded-2xl"
          />

          {/* Local Video (Small - Picture in Picture) */}
          <div className="absolute bottom-8 right-8 w-40 h-56 rounded-xl border-2 border-primary/30 overflow-hidden shadow-elevated">
            <VideoStream
              stream={localStream}
              muted={true}
              isLocal={true}
              label={currentUserName}
              showPlaceholder={true}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Chat Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-card/20 backdrop-blur-md border-l border-primary-foreground/10 flex flex-col transition-transform duration-300 ${isChatOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-primary-foreground/10 flex items-center justify-between">
            <h3 className="text-primary-foreground font-semibold">Chat</h3>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'system' ? (
                  <div className="text-center w-full">
                    <p className="text-xs text-primary-foreground/40 bg-primary-foreground/5 rounded-full px-3 py-1 inline-block">
                      {msg.text}
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-md'
                          : 'bg-primary-foreground/10 text-primary-foreground rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <p className="text-xs text-primary-foreground/40 mt-1 px-1">
                      {msg.sender === 'user' ? 'You' : otherPartyName} • {msg.time}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-primary-foreground/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-primary hover:bg-primary/80"
                disabled={!newMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Notes Panel (Doctor Only) */}
        {userType === "doctor" && (
          <div className={`absolute top-0 right-0 h-full w-80 bg-card/20 backdrop-blur-md border-l border-primary-foreground/10 flex flex-col transition-transform duration-300 ${isNotesOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-4 border-b border-primary-foreground/10 flex items-center justify-between">
              <h3 className="text-primary-foreground font-semibold">Prescription Notes</h3>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsNotesOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 p-4">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Type here..."
                className="w-full h-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl p-4 text-primary-foreground placeholder:text-primary-foreground/40 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="p-4 border-t border-primary-foreground/10 space-y-3">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Submit Prescription
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-card/10 backdrop-blur-sm p-6">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={!isAudioEnabled ? "destructive" : "secondary"}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={toggleAudio}
            title={isAudioEnabled ? "Mute" : "Unmute"}
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>

          <Button
            variant={!isVideoEnabled ? "destructive" : "secondary"}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={toggleVideo}
            title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            className={`w-14 h-14 rounded-full ${isScreenSharing ? 'bg-accent hover:bg-accent/80' : ''}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            title={isScreenSharing ? "Stop sharing" : "Share screen"}
          >
            {isScreenSharing ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
          </Button>

          <Button
            variant={isChatOpen ? "default" : "secondary"}
            size="lg"
            className={`w-14 h-14 rounded-full ${isChatOpen ? 'bg-primary hover:bg-primary/80' : ''}`}
            onClick={() => { setIsChatOpen(!isChatOpen); setIsNotesOpen(false); }}
            title={isChatOpen ? "Close chat" : "Open chat"}
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          {userType === "doctor" && (
            <Button
              variant={isNotesOpen ? "default" : "secondary"}
              size="lg"
              className={`w-14 h-14 rounded-full ${isNotesOpen ? 'bg-primary hover:bg-primary/80' : ''}`}
              onClick={() => { setIsNotesOpen(!isNotesOpen); setIsChatOpen(false); }}
              title={isNotesOpen ? "Close notes" : "Open notes"}
            >
              <FileText className="w-6 h-6" />
            </Button>
          )}

          <div className="w-px h-10 bg-primary-foreground/20 mx-2" />

          {userType === "doctor" && (
            <Button
              variant="default"
              size="lg"
              className="rounded-full px-6 bg-green-600 hover:bg-green-700 gap-2"
              onClick={handleMarkComplete}
            >
              <CheckCircle className="w-5 h-5" />
              Complete
            </Button>
          )}

          <Button
            variant="destructive"
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={handleEndCall}
            title="End call"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallUI;
