// src/components/AdminDashboard.jsx
import React, { useEffect, useState, useMemo } from "react";
import { CheckCircle, XCircle, Download, Search } from "lucide-react"; // lucide-react optional
import { fetchBookings, verifyBookingPayment } from "../api/admin";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookings();
      setBookings(data || []);
    } catch (err) {
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.payment_status !== statusFilter) return false;
      if (!filter) return true;
      const q = filter.toLowerCase();
      return (
        (b.user?.full_name || "").toLowerCase().includes(q) ||
        (b.user?.email || "").toLowerCase().includes(q) ||
        (b.room?.name || "").toLowerCase().includes(q) ||
        (String(b.id) || "").includes(q)
      );
    });
  }, [bookings, filter, statusFilter]);

  const onVerify = async (id, status) => {
    setLoading(true);
    try {
      await verifyBookingPayment(id, status);
      await load();
    } catch (err) {
      setError(err.message || "Failed to verify");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin — Bookings & Payments</h1>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 bg-white border rounded px-3 py-1 shadow-sm">
            <Search size={16} />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search by name, email, room or booking id"
              className="outline-none text-sm"
            />
          </div>
          <select
            className="border rounded px-3 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            className="bg-sky-600 text-white px-3 py-1 rounded"
            onClick={load}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </header>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Booking ID</th>
              <th className="p-3">Guest</th>
              <th className="p-3">Room</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Total (NGN)</th>
              <th className="p-3">Payment Proof</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">
                  {loading ? "Loading..." : "No bookings found"}
                </td>
              </tr>
            )}
            {filtered.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3">{b.id}</td>
                <td className="p-3">
                  <div className="font-medium">{b.user?.full_name}</div>
                  <div className="text-xs text-gray-500">{b.user?.email}</div>
                </td>
                <td className="p-3">{b.room?.name}</td>
                <td className="p-3">
                  <div>{new Date(b.check_in).toLocaleDateString()}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(b.check_out).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-3">₦{Number(b.total_price).toLocaleString()}</td>
                <td className="p-3">
                  {b.payment_proof ? (
                    <div className="flex items-center gap-2">
                      <a
                        className="text-sky-600 underline text-sm flex items-center gap-1"
                        href={`${import.meta.env.VITE_BACKEND_URL}/${b.payment_proof}`.replace(
                          /\/+/g,
                          "/"
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Download size={14} /> View
                      </a>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm">No proof</div>
                  )}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      b.payment_status === "verified"
                        ? "bg-green-100 text-green-800"
                        : b.payment_status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {b.payment_status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded disabled:opacity-60"
                      onClick={() => onVerifyClick(b.id, "verified")}
                      disabled={b.payment_status === "verified"}
                    >
                      <CheckCircle size={14} /> Verify
                    </button>

                    <button
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded disabled:opacity-60"
                      onClick={() => onVerifyClick(b.id, "rejected")}
                      disabled={b.payment_status === "rejected"}
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  async function onVerifyClick(id, status) {
    setError(null);
    setLoading(true);
    try {
      await verifyBookingPayment(id, status);
      await load();
    } catch (err) {
      setError(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  }
}
