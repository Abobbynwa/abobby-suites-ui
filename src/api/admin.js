// src/api/admin.js
const BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

async function jsonFetch(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: {
      ...(opts.headers || {}),
      // Add Authorization header here if you use JWT:
      // Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || "API error");
  }
  return res.json();
}

export async function fetchBookings() {
  // Adjust endpoint to your backend: e.g., /bookings (should return bookings with user & room)
  return jsonFetch(`${BASE}/bookings`);
}

export async function verifyBookingPayment(bookingId, status = "verified") {
  // Call the verify endpoint on backend
  // This expects POST /payments/verify-payment/{id} with JSON { status }
  return jsonFetch(`${BASE}/payments/verify-payment/${bookingId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
}
