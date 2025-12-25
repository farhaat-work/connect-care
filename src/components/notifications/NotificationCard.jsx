import { Mail, MessageSquare, Check, Clock, AlertCircle, Circle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NotificationCard = ({ notification, onMarkAsRead }) => {
  const { id, title, message, channel, status, isRead, createdAt } = notification;

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getChannelIcon = () => {
    return channel === "sms" ? (
      <MessageSquare className="w-3 h-3" />
    ) : (
      <Mail className="w-3 h-3" />
    );
  };

  const getStatusBadge = () => {
    const statusConfig = {
      sent: { icon: Check, className: "bg-primary/10 text-primary", label: "Sent" },
      pending: { icon: Clock, className: "bg-accent/10 text-accent", label: "Pending" },
      failed: { icon: AlertCircle, className: "bg-destructive/10 text-destructive", label: "Failed" },
    };

    const config = statusConfig[status] || statusConfig.sent;
    const Icon = config.icon;

    return (
      <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", config.className)}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <div
      onClick={() => !isRead && onMarkAsRead?.(id)}
      className={cn(
        "p-4 rounded-xl border transition-smooth cursor-pointer group",
        isRead
          ? "bg-card border-border/50 hover:border-border"
          : "bg-primary-light border-primary/20 hover:border-primary/40"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Read/Unread indicator */}
        <div className="mt-1">
          {isRead ? (
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Circle className="w-4 h-4 text-primary fill-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className={cn(
              "font-semibold text-sm truncate",
              isRead ? "text-foreground" : "text-foreground"
            )}>
              {title}
            </h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTime(createdAt)}
            </span>
          </div>

          {/* Message */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {message}
          </p>

          {/* Footer */}
          <div className="flex items-center gap-2">
            {/* Channel badge */}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium uppercase">
              {getChannelIcon()}
              {channel}
            </span>

            {/* Status badge */}
            {getStatusBadge()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
