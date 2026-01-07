import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  LogOut,
  LayoutDashboard,
  Bed,
  Calendar,
  Mail,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Eye,
  DollarSign,
} from "lucide-react";

type Tab = "dashboard" | "bookings" | "rooms" | "messages";

interface Booking {
  id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  payment_status: string;
  booking_status: string;
  special_requests: string;
  created_at: string;
  room_id: string;
}

interface Room {
  id: string;
  name: string;
  slug: string;
  price: number;
  capacity: number;
  is_available: boolean;
}

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/admin-login");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, roomsRes, messagesRes] = await Promise.all([
        supabase.from("bookings").select("*").order("created_at", { ascending: false }),
        supabase.from("rooms").select("*").order("price", { ascending: true }),
        supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
      ]);

      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (roomsRes.data) setRooms(roomsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string, type: "booking" | "payment") => {
    const field = type === "booking" ? "booking_status" : "payment_status";
    const { error } = await supabase
      .from("bookings")
      .update({ [field]: status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
    } else {
      toast({ title: "Success", description: `${type === "booking" ? "Booking" : "Payment"} status updated` });
      fetchData();
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to delete booking", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Booking removed" });
      fetchData();
    }
  };

  const markMessageRead = async (id: string, isRead: boolean) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: isRead })
      .eq("id", id);

    if (!error) fetchData();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (!error) {
      toast({ title: "Deleted", description: "Message removed" });
      fetchData();
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin-login");
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.booking_status === "pending").length,
    confirmedBookings: bookings.filter((b) => b.booking_status === "confirmed").length,
    totalRevenue: bookings
      .filter((b) => b.payment_status === "paid")
      .reduce((sum, b) => sum + Number(b.total_amount), 0),
    unreadMessages: messages.filter((m) => !m.is_read).length,
    totalRooms: rooms.length,
  };

  const getRoomName = (roomId: string) => {
    return rooms.find((r) => r.id === roomId)?.name || "Unknown Room";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-primary text-primary-foreground p-6 hidden lg:block">
        <div className="mb-8">
          <h1 className="font-serif text-xl font-bold">ABOBBY NWA</h1>
          <p className="text-primary-foreground/60 text-sm">Admin Dashboard</p>
        </div>

        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "bookings", label: "Bookings", icon: Calendar },
            { id: "rooms", label: "Rooms", icon: Bed },
            { id: "messages", label: "Messages", icon: Mail },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-primary-foreground/10"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
              {item.id === "messages" && stats.unreadMessages > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {stats.unreadMessages}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="outline" className="w-full" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden bg-primary text-primary-foreground p-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-lg font-bold">Admin</h1>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {["dashboard", "bookings", "rooms", "messages"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as Tab)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeTab === tab ? "bg-accent text-accent-foreground" : "bg-primary-foreground/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-xl p-6 shadow-luxury">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-luxury">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pendingBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-luxury">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Confirmed</p>
                    <p className="text-2xl font-bold text-foreground">{stats.confirmedBookings}</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 shadow-luxury">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Revenue</p>
                    <p className="text-2xl font-bold text-foreground">₦{stats.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-card rounded-xl shadow-luxury p-6">
              <h3 className="font-semibold text-foreground mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Guest</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Room</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Check In</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-border">
                        <td className="py-3 px-4">
                          <p className="font-medium text-foreground">{booking.guest_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.guest_email}</p>
                        </td>
                        <td className="py-3 px-4 text-foreground">{getRoomName(booking.room_id)}</td>
                        <td className="py-3 px-4 text-foreground">{booking.check_in}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.booking_status === "confirmed" ? "bg-green-100 text-green-700" :
                            booking.booking_status === "cancelled" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {booking.booking_status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground">₦{Number(booking.total_amount).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Manage Bookings</h2>
            
            <div className="bg-card rounded-xl shadow-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Guest</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Room</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Dates</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Amount</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Booking</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Payment</th>
                      <th className="text-left py-4 px-4 text-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border">
                        <td className="py-4 px-4">
                          <p className="font-medium text-foreground">{booking.guest_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.guest_email}</p>
                          <p className="text-sm text-muted-foreground">{booking.guest_phone}</p>
                        </td>
                        <td className="py-4 px-4 text-foreground">{getRoomName(booking.room_id)}</td>
                        <td className="py-4 px-4">
                          <p className="text-foreground">{booking.check_in}</p>
                          <p className="text-sm text-muted-foreground">to {booking.check_out}</p>
                        </td>
                        <td className="py-4 px-4 font-medium text-foreground">₦{Number(booking.total_amount).toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <select
                            value={booking.booking_status || "pending"}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value, "booking")}
                            className="px-2 py-1 rounded border border-border bg-background text-foreground text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={booking.payment_status || "pending"}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value, "payment")}
                            className="px-2 py-1 rounded border border-border bg-background text-foreground text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </td>
                        <td className="py-4 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {bookings.length === 0 && (
                  <p className="text-center py-8 text-muted-foreground">No bookings yet</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === "rooms" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Manage Rooms</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="bg-card rounded-xl shadow-luxury p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{room.name}</h3>
                      <p className="text-sm text-muted-foreground">Slug: {room.slug}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {room.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium text-foreground">₦{Number(room.price).toLocaleString()}/night</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity:</span>
                      <span className="font-medium text-foreground">{room.capacity} guests</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-foreground">Contact Messages</h2>
            
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-card rounded-xl shadow-luxury p-6 ${!msg.is_read ? "border-l-4 border-accent" : ""}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{msg.name}</h3>
                      <p className="text-sm text-muted-foreground">{msg.email} • {msg.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markMessageRead(msg.id, !msg.is_read)}
                      >
                        <Eye className={`h-4 w-4 ${msg.is_read ? "text-muted-foreground" : "text-accent"}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMessage(msg.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">Subject: {msg.subject}</p>
                  <p className="text-muted-foreground">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No messages yet</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;