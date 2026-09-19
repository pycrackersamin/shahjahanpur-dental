import heroImage from "../assets/dental-hero.png";

const values = [
  ["Comfortable Care", "A calm, friendly experience centered on your comfort."],
  ["Modern Approach", "Thoughtful dental care in a clean clinical environment."],
  ["Convenient Booking", "Choose an available evening appointment online."],
];

function About() {
  return (
    <section className="overflow-hidden bg-slate-50 py-16 sm:py-24" aria-labelledby="about-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -bottom-6 -left-6 size-40 rounded-full bg-blue-200/50 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-blue-100 shadow-xl shadow-blue-900/10">
            <img src={heroImage} alt="Modern dental clinic care environment" className="aspect-[4/3] w-full object-cover object-left" loading="lazy" />
          </div>
          <div className="absolute -bottom-5 right-4 rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-lg sm:right-8">
            <p className="text-sm font-bold text-slate-900">Care that feels reassuring</p>
            <p className="mt-1 text-xs text-slate-500">Right here in Shahjahanpur</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-clinic-700">About Shahjahanpur Dental</span>
          <h2 id="about-heading" className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">Gentle Care for Every Smile</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">We focus on comfortable, reliable dental care for individuals and families in Shahjahanpur. Our approach is simple: listen carefully, explain clearly, and make every visit feel as easy as possible.</p>
          <div className="mt-8 space-y-4">
            {values.map(([title, text]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-clinic-50 text-clinic-600"><svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 10 3 3 7-7" /></svg></span>
                <div><h3 className="font-bold text-slate-900">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
