import { useState } from "react";
import { Bell, BellOff, Check, Filter } from "lucide-react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import NotificationCard from "@/components/notifications/NotificationCard.jsx";
import { useNotifications } from "@/context/NotificationContext.jsx";
import { Button } from "@/components/ui/button.jsx";

const PatientNotifications = () => {
  const [filter, setFilter] = useState("all"); // "all", "unread", "read"
  const { getPatientNotifications, markAsRead, markAllAsRead, getUnreadCount } = useNotifications();

  const notifications = getPatientNotifications();
  const unreadCount = getUnreadCount("patient");

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.isRead;
    if (filter === "read") return notif.isRead;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Page header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
                <Bell className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Notifications
                </h1>
                <p className="text-muted-foreground">
                  Stay updated with your appointments and consultations
                </p>
              </div>
            </div>
          </div>

          {/* Actions bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            {/* Filter tabs */}
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              {[
                { value: "all", label: "All" },
                { value: "unread", label: `Unread${unreadCount > 0 ? ` (${unreadCount})` : ""}` },
                { value: "read", label: "Read" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                    filter === tab.value
                      ? "bg-card text-foreground shadow-soft"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Mark all as read */}
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAsRead("patient")}
                className="gap-2"
              >
                <Check className="w-4 h-4" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Notifications list */}
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-2xl border border-border">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <BellOff className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No notifications found
              </h3>
              <p className="text-muted-foreground text-center max-w-sm">
                {filter === "unread"
                  ? "You're all caught up! No unread notifications."
                  : filter === "read"
                  ? "No read notifications yet."
                  : "Book an appointment to receive notifications about your healthcare journey."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))}
            </div>
          )}

          {/* Info card */}
          {/* <div className="mt-8 p-4 bg-primary-light rounded-xl border border-primary/20">
            <div className="flex items-start gap-3">
              <Filter className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">About Notifications</h4>
                <p className="text-sm text-muted-foreground">
                  Notifications are stored temporarily in your browser session. They will clear when you refresh the page. 
                  In production, notifications would be synced with our backend for persistence.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PatientNotifications;
