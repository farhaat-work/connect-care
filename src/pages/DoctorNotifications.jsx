import { useState } from "react";
import { Bell, BellOff, Check, Stethoscope } from "lucide-react";
import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import NotificationCard from "@/components/notifications/NotificationCard.jsx";
import { useNotifications } from "@/context/NotificationContext.jsx";
import { Button } from "@/components/ui/button.jsx";

const DoctorNotifications = () => {
  const [filter, setFilter] = useState("all");
  const { getDoctorNotifications, markAsRead, markAllAsRead, getUnreadCount } = useNotifications();

  const notifications = getDoctorNotifications();
  const unreadCount = getUnreadCount("doctor");

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
                <Stethoscope className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Doctor Notifications
                </h1>
                <p className="text-muted-foreground">
                  Manage your patient appointments and consultations
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
                onClick={() => markAllAsRead("doctor")}
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
                  : "Notifications about new appointments and consultations will appear here."}
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

          {/* Stats card for doctors */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
                  <p className="text-xs text-muted-foreground">Total Notifications</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
                  <p className="text-xs text-muted-foreground">Unread</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Check className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{notifications.length - unreadCount}</p>
                  <p className="text-xs text-muted-foreground">Read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorNotifications;
