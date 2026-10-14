const DEFAULT_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby2xxBefZvg3K1_UJnJyJVNtu0WCcNmtyheaUf6hdAWLntWx0qpbjCKiOtSQM7KkQD8/exec";
const SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || DEFAULT_SCRIPT_URL;

export async function sendChatMessage(messages) {
  let response;
  try {
    response = await fetch(`${SCRIPT_URL}?action=chat`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "chat",
        messages: messages.slice(-8).map(({ role, content }) => ({ role, content })),
      }),
    });
  } catch {
    throw new Error("I could not connect right now. Please check your internet connection and try again.");
  }

  if (!response.ok) throw new Error("The dental assistant is temporarily unavailable. Please try again shortly.");

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("The dental assistant returned an unexpected response. Please try again.");
  }

  if (!data.success || !data.reply) {
    const appointmentCodes = new Set(["INVALID_NAME", "INVALID_PHONE", "INVALID_SERVICE", "INVALID_DATE", "INVALID_TIME", "SLOT_UNAVAILABLE"]);
    const message = appointmentCodes.has(data.code)
      ? "The live dental assistant backend is out of date. Please contact the clinic while it is being updated."
      : data.message || "The dental assistant could not respond. Please try again.";
    const error = new Error(message);
    error.code = data.code;
    throw error;
  }
  return data.reply;
}
