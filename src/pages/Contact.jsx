function Contact() {
  return (
    <section id="contact" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[.18em] text-clinic-600">Get in touch</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Visit Shahjahanpur Dental</h2>
              <p className="mt-4 max-w-md leading-7 text-slate-600">Questions before booking? Call us directly or visit the clinic in Shahjahanpur.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="tel:01755516710" className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-clinic-600"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg></span>
                <span className="mt-4 block text-sm font-semibold text-slate-500">Call the clinic</span>
                <strong className="mt-1 block text-lg text-slate-900 group-hover:text-clinic-700">01755516710</strong>
              </a>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <span className="grid size-10 place-items-center rounded-xl bg-blue-100 text-clinic-600"><svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
                <span className="mt-4 block text-sm font-semibold text-slate-500">Clinic address</span>
                <strong className="mt-1 block text-lg leading-7 text-slate-900">Shahjahanpur, Dhaka, Bangladesh</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
