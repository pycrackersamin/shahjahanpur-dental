import { useRef, useState } from "react";
import { createAppointment, getAvailableSlots } from "../lib/appointmentsApi";

const MAX_DAYS_AHEAD = 7;
const SERVICES = ["Dental Checkup", "Teeth Cleaning", "Tooth Extraction", "Root Canal Treatment", "Dental Filling", "Braces Consultation"];
const EMPTY_FORM = { name: "", phone: "", service: "", date: "", time: "", message: "" };

function toLocalDateInput(date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function AppointmentForm() {
  const today = new Date();
  const maxDateObject = new Date(today);
  maxDateObject.setDate(today.getDate() + MAX_DAYS_AHEAD);
  const minDate = toLocalDateInput(today);
  const maxDate = toLocalDateInput(maxDateObject);
  const requestId = useRef(0);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [phoneError, setPhoneError] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotLoading, setSlotLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const loadAvailableSlots = async (date) => {
    const currentRequest = ++requestId.current;
    setAvailableSlots([]);
    if (!date) return;
    setSlotLoading(true);
    setNotice(null);
    try {
      const slots = await getAvailableSlots(date);
      if (currentRequest === requestId.current) setAvailableSlots(slots);
    } catch (error) {
      if (currentRequest === requestId.current) setNotice({ type: "error", text: error.message });
    } finally {
      if (currentRequest === requestId.current) setSlotLoading(false);
    }
  };

  const updateField = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value }));

  const updatePhone = (event) => {
    const value = event.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setFormData((current) => ({ ...current, phone: value }));
      setPhoneError(value && !/^01\d{9}$/.test(value) ? "Enter exactly 11 digits starting with 01." : "");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!/^01\d{9}$/.test(formData.phone)) {
      setPhoneError("Enter exactly 11 digits starting with 01.");
      return;
    }
    if (!formData.time || !availableSlots.includes(formData.time)) {
      setNotice({ type: "error", text: "Please select an available appointment time." });
      return;
    }

    setSubmitting(true);
    setNotice(null);
    try {
      await createAppointment(formData);
      setFormData(EMPTY_FORM);
      setAvailableSlots([]);
      setPhoneError("");
      setNotice({ type: "success", text: "Your appointment is confirmed. The clinic will contact you if needed." });
    } catch (error) {
      setNotice({ type: "error", text: error.message });
      if (error.code === "SLOT_UNAVAILABLE") {
        setFormData((current) => ({ ...current, time: "" }));
        await loadAvailableSlots(formData.date);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "min-h-13 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-clinic-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-clinic-100 disabled:cursor-not-allowed disabled:bg-slate-100";
  const fullyBooked = formData.date && !slotLoading && availableSlots.length === 0 && !notice;

  return (
    <section id="appointment" className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 to-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-24 top-16 size-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-clinic-600">Online booking</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Book Your Appointment</h2>
          <p className="mt-4 text-slate-600">Select any available time from today through the next 7 days.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-blue-100 bg-white p-5 shadow-2xl shadow-blue-900/8 sm:p-8 lg:p-10" noValidate>
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            <label className="block text-sm font-semibold text-slate-700">Patient name
              <input name="name" value={formData.name} onChange={updateField} required maxLength="80" autoComplete="name" placeholder="Your full name" className={`${inputClass} mt-2`} />
            </label>
            <label className="block text-sm font-semibold text-slate-700">Mobile number
              <input type="tel" name="phone" inputMode="numeric" value={formData.phone} onChange={updatePhone} onBlur={() => formData.phone && setPhoneError(/^01\d{9}$/.test(formData.phone) ? "" : "Enter exactly 11 digits starting with 01.")} required autoComplete="tel" placeholder="01XXXXXXXXX" aria-invalid={Boolean(phoneError)} aria-describedby="phone-error" className={`${inputClass} mt-2 ${phoneError ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""}`} />
              {phoneError && <span id="phone-error" className="mt-1.5 block text-sm font-normal text-red-600" role="alert">{phoneError}</span>}
            </label>
            <label className="block text-sm font-semibold text-slate-700">Service
              <select name="service" value={formData.service} onChange={updateField} required className={`${inputClass} mt-2`}><option value="">Select a service</option>{SERVICES.map((service) => <option key={service}>{service}</option>)}</select>
            </label>
            <label className="block text-sm font-semibold text-slate-700">Appointment date
              <input type="date" name="date" value={formData.date} min={minDate} max={maxDate} onChange={(event) => { const date = event.target.value; setFormData((current) => ({ ...current, date, time: "" })); loadAvailableSlots(date); }} required className={`${inputClass} mt-2`} />
            </label>
            <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Appointment time
              <select name="time" value={formData.time} onChange={updateField} required disabled={!formData.date || slotLoading || availableSlots.length === 0} className={`${inputClass} mt-2`}>
                <option value="">{slotLoading ? "Checking availability…" : fullyBooked ? "Fully booked" : "Select an available time"}</option>
                {availableSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
              </select>
              {formData.date && !slotLoading && availableSlots.length > 0 && <span className="mt-1.5 block text-sm font-normal text-slate-500">{availableSlots.length} of 4 times available</span>}
              {fullyBooked && <span className="mt-1.5 block text-sm font-normal text-red-600" role="status">This date is fully booked. Please choose another date.</span>}
            </label>
            <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">Problem or message <span className="font-normal text-slate-400">(optional)</span>
              <textarea name="message" value={formData.message} onChange={updateField} rows="4" maxLength="500" placeholder="Briefly tell us how we can help" className={`${inputClass} mt-2 resize-y`} />
            </label>
          </div>

          {notice && <div className={`mt-5 rounded-xl p-4 text-sm ${notice.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`} role="status">{notice.text}</div>}
          <button type="submit" disabled={submitting || slotLoading || !formData.time || availableSlots.length === 0} className="mt-7 min-h-13 w-full rounded-xl bg-clinic-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-clinic-700 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none">
            {submitting ? "Confirming appointment…" : "Confirm appointment"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-slate-500">Your details are used only to manage your appointment.</p>
        </form>
      </div>
    </section>
  );
}

export default AppointmentForm;
