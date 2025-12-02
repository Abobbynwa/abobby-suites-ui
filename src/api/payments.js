export async function uploadPaymentProof(bookingId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/payments/upload-payment-proof/${bookingId}`,
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
}
