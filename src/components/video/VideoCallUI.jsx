import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, User, Monitor, MonitorOff, 
  MessageSquare, X, Send, FileText, CheckCircle, Calendar, Clock, Stethoscope
} from "lucide-react";

const VideoCallUI = ({ consultation, userType, onEndCall, onMarkComplete, isWaitingRoom = false }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [callStatus, setCallStatus] = useState(isWaitingRoom ? "waiting" : "connecting");
  const [notes, setNotes] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "system", text: "Chat started. Messages are simulated.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Simulate connection or waiting room
  useEffect(() => {
    if (isWaitingRoom) {
      // Simulate doctor joining after 5 seconds in waiting room
      const timer = setTimeout(() => {
        setCallStatus("connecting");
        setTimeout(() => {
          setCallStatus("in-call");
        }, 2000);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCallStatus("in-call");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isWaitingRoom]);

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

    setTimeout(() => {
      const replyMsg = {
        id: messages.length + 2,
        sender: "other",
        text: "Thanks for your message. This is a simulated response.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const handleEndCall = () => {
    setCallStatus("ended");
    setTimeout(() => {
      onEndCall();
    }, 1500);
  };

  const handleMarkComplete = () => {
    if (onMarkComplete) {
      onMarkComplete(consultation.id);
    }
    handleEndCall();
  };

  const getStatusIndicator = () => {
    switch (callStatus) {
      case "waiting":
        return (
          <div className="flex items-center gap-2 text-blue-400">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Waiting Room
          </div>
        );
      case "connecting":
        return (
          <div className="flex items-center gap-2 text-yellow-400">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            Connecting...
          </div>
        );
      case "in-call":
        return (
          <div className="flex items-center gap-2 text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            In Call
          </div>
        );
      case "ended":
        return (
          <div className="flex items-center gap-2 text-red-400">
            <span className="w-2 h-2 bg-red-400 rounded-full" />
            Call Ended
          </div>
        );
      default:
        return null;
    }
  };

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
            <p className="text-xs opacity-50">ID: {consultation.id}</p>
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
          {/* Remote Video / Screen Share (Large) */}
          <div className="w-full h-full bg-muted/20 rounded-2xl flex items-center justify-center overflow-hidden">
            {callStatus === "waiting" ? (
              <div className="text-center max-w-md">
                <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-12 h-12 text-blue-400 animate-pulse" />
                </div>
                <h2 className="text-primary-foreground text-2xl font-bold mb-2">Waiting Room</h2>
                <p className="text-primary-foreground/70 text-lg mb-4">
                  Your appointment with {otherPartyName} hasn't started yet
                </p>
                <div className="bg-card/20 rounded-xl p-4 mb-6">
                  <p className="text-primary-foreground/60 text-sm mb-2">Scheduled for</p>
                  <p className="text-primary-foreground font-semibold">
                    {formatDate(consultation.appointmentDate)} at {consultation.appointmentTime}
                  </p>
                </div>
                <p className="text-primary-foreground/50 text-sm">
                  Please wait here. The doctor will start the consultation shortly.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            ) : callStatus === "connecting" ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-4 border-primary/30 border-t-primary animate-spin mx-auto mb-4" />
                <p className="text-primary-foreground/70 text-lg">Connecting to {otherPartyName}...</p>
                <p className="text-primary-foreground/50 text-sm mt-2">Please wait</p>
              </div>
            ) : callStatus === "ended" ? (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <PhoneOff className="w-10 h-10 text-red-400" />
                </div>
                <p className="text-primary-foreground/70 text-lg">Call Ended</p>
                <p className="text-primary-foreground/50 text-sm mt-2">Redirecting...</p>
              </div>
            ) : isScreenSharing ? (
              <div className="w-full h-full bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-20 h-20 text-primary-foreground/30 mx-auto mb-4" />
                  <p className="text-primary-foreground/70 text-lg">Screen Sharing Active</p>
                  <p className="text-primary-foreground/50 text-sm mt-2">
                    Your screen is being shared with {otherPartyName}
                  </p>
                  <div className="mt-6 bg-card/20 rounded-xl p-6 max-w-md mx-auto">
                    <div className="h-3 bg-primary-foreground/10 rounded mb-3 w-3/4"></div>
                    <div className="h-3 bg-primary-foreground/10 rounded mb-3 w-full"></div>
                    <div className="h-3 bg-primary-foreground/10 rounded mb-3 w-5/6"></div>
                    <div className="h-20 bg-primary-foreground/5 rounded mt-4"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <User className="w-16 h-16 text-primary-foreground/50" />
                </div>
                <p className="text-primary-foreground/70 text-lg">{otherPartyName}</p>
                <p className="text-primary-foreground/50 text-sm">Camera feed would appear here</p>
              </div>
            )}
          </div>

          {/* Local Video (Small - Picture in Picture) */}
          <div className="absolute bottom-8 right-8 w-40 h-56 bg-muted/30 rounded-xl border-2 border-primary/30 overflow-hidden shadow-elevated">
            {isCameraOn ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center mx-auto mb-2">
                    <User className="w-8 h-8 text-primary-foreground/70" />
                  </div>
                  <p className="text-primary-foreground/70 text-xs">{currentUserName}</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <div className="text-center">
                  <VideoOff className="w-8 h-8 text-primary-foreground/50 mx-auto mb-2" />
                  <p className="text-primary-foreground/50 text-xs">Camera off</p>
                </div>
              </div>
            )}
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
                //onClick={handleMarkComplete}
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
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? "Unmute" : "Mute"}
            disabled={callStatus !== "in-call"}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant={!isCameraOn ? "destructive" : "secondary"}
            size="lg"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsCameraOn(!isCameraOn)}
            title={isCameraOn ? "Turn off camera" : "Turn on camera"}
            disabled={callStatus !== "in-call"}
          >
            {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            variant={isScreenSharing ? "default" : "secondary"}
            size="lg"
            className={`w-14 h-14 rounded-full ${isScreenSharing ? 'bg-accent hover:bg-accent/80' : ''}`}
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            title={isScreenSharing ? "Stop sharing" : "Share screen"}
            disabled={callStatus !== "in-call"}
          >
            {isScreenSharing ? <MonitorOff className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
          </Button>

          <Button
            variant={isChatOpen ? "default" : "secondary"}
            size="lg"
            className={`w-14 h-14 rounded-full ${isChatOpen ? 'bg-primary hover:bg-primary/80' : ''}`}
            onClick={() => { setIsChatOpen(!isChatOpen); setIsNotesOpen(false); }}
            title={isChatOpen ? "Close chat" : "Open chat"}
            disabled={callStatus !== "in-call"}
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
              disabled={callStatus !== "in-call"}
            >
              <FileText className="w-6 h-6" />
            </Button>
          )}

          <Button
            variant="destructive"
            size="lg"
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700"
            onClick={handleEndCall}
            title="End call"
          >
            <PhoneOff className="w-7 h-7" />
          </Button>
        </div>

        {/* <p className="text-center text-primary-foreground/50 text-sm mt-4">
          This is a mock video consultation interface
        </p> */}
      </div>
    </div>
  );
};

export default VideoCallUI;
