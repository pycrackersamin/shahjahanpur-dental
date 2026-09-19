const CONFIG = Object.freeze({
  SHEET_NAME: "Appointments",
  TIME_ZONE: "Asia/Dhaka",
  MAX_DAYS_AHEAD: 7,
  SLOTS: ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM"],
  SERVICES: ["Dental Checkup", "Teeth Cleaning", "Tooth Extraction", "Root Canal Treatment", "Dental Filling", "Braces Consultation"],
  HEADERS: ["Created At", "Name", "Phone", "Service", "Date", "Time", "Message"],
});

function doGet(e) {
  let lock;
  try {
    if (!e || e.parameter.action !== "slots") return output_({ success: false, code: "BAD_REQUEST", message: "Unknown action." }, e);
    validateDate_(e.parameter.date);

    // Sheet initialization and reads share the same lock as writes. This avoids
    // two first-time requests both trying to create the Appointments tab.
    lock = LockService.getScriptLock();
    lock.waitLock(20000);
    const booked = getBookedSlots_(e.parameter.date);
    return output_({ success: true, availableSlots: CONFIG.SLOTS.filter(function (slot) { return !booked.has(slot); }) }, e);
  } catch (error) {
    return output_({ success: false, code: error.code || "SERVER_ERROR", message: error.message || "Could not load availability." }, e);
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function doPost(e) {
  let lock;
  try {
    const data = parseBody_(e);
    const appointment = validateAppointment_(data);

    lock = LockService.getScriptLock();
    lock.waitLock(20000);

    // This check and write happen under one script lock, making the reservation atomic.
    const booked = getBookedSlots_(appointment.date);
    if (booked.has(appointment.time)) throw apiError_("SLOT_UNAVAILABLE", "That time was just booked. Please choose another available time.");

    const sheet = getAppointmentsSheet_();
    sheet.getRange("C:C").setNumberFormat("@");
    sheet.appendRow([
      new Date(),
      safeCell_(appointment.name),
      appointment.phone,
      appointment.service,
      appointment.date,
      appointment.time,
      safeCell_(appointment.message),
    ]);
    SpreadsheetApp.flush();

    // Future SMS calls belong here. Read credentials from PropertiesService,
    // never from the React request or source code.
    // sendAppointmentSms_(appointment);

    return output_({ success: true, message: "Appointment confirmed." });
  } catch (error) {
    return output_({ success: false, code: error.code || "SERVER_ERROR", message: error.message || "Could not create the appointment." });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}

function validateAppointment_(data) {
  if (!data || typeof data !== "object") throw apiError_("BAD_REQUEST", "Invalid appointment data.");
  const appointment = {
    name: clean_(data.name, 80),
    phone: String(data.phone || "").trim(),
    service: clean_(data.service, 80),
    date: String(data.date || "").trim(),
    time: String(data.time || "").trim(),
    message: clean_(data.message, 500),
  };
  if (!appointment.name) throw apiError_("INVALID_NAME", "Patient name is required.");
  if (!/^01\d{9}$/.test(appointment.phone)) throw apiError_("INVALID_PHONE", "Enter exactly 11 digits starting with 01.");
  if (CONFIG.SERVICES.indexOf(appointment.service) === -1) throw apiError_("INVALID_SERVICE", "Please select a valid service.");
  validateDate_(appointment.date);
  if (CONFIG.SLOTS.indexOf(appointment.time) === -1) throw apiError_("INVALID_TIME", "Please select a valid appointment time.");
  return appointment;
}

function validateDate_(dateText) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(dateText || ""))) throw apiError_("INVALID_DATE", "Please select a valid appointment date.");
  const selected = dateAtNoon_(dateText);
  if (isNaN(selected.getTime()) || Utilities.formatDate(selected, CONFIG.TIME_ZONE, "yyyy-MM-dd") !== dateText) throw apiError_("INVALID_DATE", "Please select a valid appointment date.");

  const todayText = Utilities.formatDate(new Date(), CONFIG.TIME_ZONE, "yyyy-MM-dd");
  const today = dateAtNoon_(todayText);
  const difference = Math.round((selected.getTime() - today.getTime()) / 86400000);
  if (difference < 0 || difference > CONFIG.MAX_DAYS_AHEAD) throw apiError_("INVALID_DATE", "Appointments are available from today through the next 7 days.");
}

function dateAtNoon_(dateText) {
  const parts = String(dateText).split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
}

function getBookedSlots_(dateText) {
  const sheet = getAppointmentsSheet_();
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return new Set();
  const rows = sheet.getRange(2, 5, lastRow - 1, 2).getDisplayValues();
  return new Set(rows.filter(function (row) { return row[0] === dateText; }).map(function (row) { return row[1]; }));
}

function getAppointmentsSheet_() {
  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const spreadsheet = spreadsheetId ? SpreadsheetApp.openById(spreadsheetId) : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw apiError_("CONFIG_ERROR", "Set the SPREADSHEET_ID script property or bind this script to a spreadsheet.");
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CONFIG.HEADERS);
    sheet.getRange(1, 1, 1, CONFIG.HEADERS.length).setFontWeight("bold").setBackground("#d7f7f2");
    sheet.setFrozenRows(1);
    sheet.getRange("C:C").setNumberFormat("@");
  }
  return sheet;
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw apiError_("BAD_REQUEST", "Request body is required.");
  try { return JSON.parse(e.postData.contents); }
  catch (error) { throw apiError_("BAD_REQUEST", "Request body must be valid JSON."); }
}

function clean_(value, maxLength) {
  return String(value || "").trim().replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, maxLength);
}

function safeCell_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function apiError_(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function output_(payload, e) {
  const json = JSON.stringify(payload);
  const callback = e && e.parameter && e.parameter.callback;
  if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
    return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
