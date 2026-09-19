const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2xxBefZvg3K1_UJnJyJVNtu0WCcNmtyheaUf6hdAWLntWx0qpbjCKiOtSQM7KkQD8/exec";
const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || DEFAULT_SCRIPT_URL;

export function getAvailableSlots(date) {
  return new Promise((resolve, reject) => {
    const callback = `slots_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callback];
      script.remove();
    };
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error("The clinic server took too long to respond. Please try again."));
    }, 12000);

    window[callback] = (data) => {
      window.clearTimeout(timer);
      cleanup();
      if (data?.success === false) reject(new Error(data.message || "Could not load appointments."));
      else resolve(data?.availableSlots || []);
    };
    script.onerror = () => {
      window.clearTimeout(timer);
      cleanup();
      reject(new Error("Could not connect to the clinic server. Please check your internet connection."));
    };
    script.src = `${SCRIPT_URL}?action=slots&date=${encodeURIComponent(date)}&callback=${encodeURIComponent(callback)}`;
    document.body.appendChild(script);
  });
}

export async function createAppointment(appointment) {
  let response;
  try {
    response = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(appointment),
    });
  } catch {
    throw new Error("Could not connect to the clinic server. Please try again.");
  }

  if (!response.ok) throw new Error("The clinic server is unavailable. Please try again.");
  const data = await response.json();
  if (!data.success) {
    const error = new Error(data.message || "The appointment could not be booked.");
    error.code = data.code;
    throw error;
  }
  return data;
}
