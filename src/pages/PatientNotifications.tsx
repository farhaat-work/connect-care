import React from 'react';
import { Link } from 'react-router-dom';
import { useNotifications } from '@/context/NotificationContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bell, Check, Trash2, Video, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

const PatientNotifications: React.FC = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case 'call-request':
      case 'call-accepted':
      case 'call-ended':
        return <Video className="w-5 h-5" />;
      case 'appointment':
        return <Calendar className="w-5 h-5" />;
      case 'message':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">Patient Notifications</h1>
            </div>

            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <Check className="w-4 h-4 mr-2" />
                  Mark all read
                </Button>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Notifications</h2>
            <p className="text-muted-foreground">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-all ${
                  notification.read
                    ? 'bg-card border-border'
                    : 'bg-primary-light border-primary/20'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    notification.read ? 'bg-secondary' : 'gradient-hero text-primary-foreground'
                  }`}>
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-card-foreground">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(notification.timestamp, 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientNotifications;
