function AppointmentCta() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-clinic-700 to-blue-500 px-6 py-12 text-center text-white shadow-xl shadow-blue-900/15 sm:px-12 sm:py-16">
        <div className="absolute -left-16 -top-20 size-56 rounded-full border-[32px] border-white/10" />
        <div className="absolute -bottom-24 -right-16 size-64 rounded-full bg-white/10" />
        <div className="relative">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to take care of your smile?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-50">Book an appointment and let us help you maintain a healthy, confident smile.</p>
          <a href="#appointment" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 py-3 font-bold text-clinic-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50">Book Appointment</a>
        </div>
      </div>
    </section>
  );
}

export default AppointmentCta;
