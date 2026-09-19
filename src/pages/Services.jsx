const services = [
  ["Dental Checkup", "Routine examination and practical advice to keep your smile healthy."],
  ["Teeth Cleaning", "Professional scaling and polishing for cleaner teeth and gums."],
  ["Tooth Extraction", "Careful assessment and extraction with your comfort in mind."],
  ["Root Canal Treatment", "Treatment designed to save an infected or painful tooth."],
  ["Dental Filling", "Durable fillings to restore damaged or decayed teeth."],
  ["Braces Consultation", "An initial orthodontic assessment and treatment guidance."],
];

function ServiceIcon() {
  return <svg viewBox="0 0 32 32" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9.2 5.8c2-1.1 4.5-.4 6.8-.4s4.8-.7 6.8.4c3.4 1.9 3.1 6.6 1.5 10.1-1.4 3-2 9.8-4.9 9.8-2.1 0-1.4-5.4-3.4-5.4s-1.3 5.4-3.4 5.4c-2.9 0-3.5-6.8-4.9-9.8-1.6-3.5-1.9-8.2 1.5-10.1Z" /></svg>;
}

function Services() {
  return (
    <section id="services" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[.18em] text-clinic-600">Our services</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Complete Care for Your Smile</h2>
          <p className="mt-4 leading-7 text-slate-600">Practical dental services delivered with a gentle, patient-first approach.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(([name, description], index) => (
            <article key={name} className="group rounded-3xl border border-blue-100 bg-white p-6 shadow-sm shadow-blue-900/5 transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10 sm:p-7">
              <div className="flex items-start justify-between">
                <span className="grid size-13 place-items-center rounded-2xl bg-clinic-50 text-clinic-600 transition group-hover:bg-clinic-600 group-hover:text-white"><ServiceIcon /></span>
                <span className="text-xs font-bold text-blue-200">0{index + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{name}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
