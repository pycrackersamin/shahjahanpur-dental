import heroImage from "../assets/dental-hero.png";

const trustPoints = ["Professional Dental Care", "Safe & Hygienic Environment", "Patient-Centered Care"];

function Home() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/70 to-sky-100/60 py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-blue-200/25 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:px-8">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-bold text-clinic-700 shadow-sm sm:text-sm">
            <span className="size-2 rounded-full bg-clinic-500" /> Trusted Dental Care in Shahjahanpur
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Your Smile,<br /><span className="text-clinic-600">Our Priority</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">At Shahjahanpur Dental, we provide safe, modern and compassionate dental care for a healthier, brighter smile.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-100 text-clinic-600"><svg viewBox="0 0 20 20" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m5 10 3 3 7-7" /></svg></span>{point}
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 min-[430px]:flex-row">
            <a href="#appointment" className="inline-flex min-h-13 items-center justify-center rounded-full bg-clinic-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-clinic-700">Book an Appointment</a>
            <a href="#services" className="inline-flex min-h-13 items-center justify-center rounded-full border border-blue-200 bg-white px-7 py-3.5 font-bold text-slate-700 transition hover:border-clinic-500 hover:text-clinic-700">Our Services</a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-200/60 to-white/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl shadow-blue-900/15 sm:rounded-[2.5rem]">
            <img src={heroImage} alt="Clean tooth model and dental instruments in a modern clinic" className="aspect-[4/3] w-full object-cover object-center" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-xl backdrop-blur sm:bottom-6 sm:left-6 sm:p-4">
              <span className="grid size-10 place-items-center rounded-xl bg-clinic-600 text-white"><svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 5 6v5c0 4.6 2.9 8.8 7 10 4.1-1.2 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></svg></span>
              <span><strong className="block text-sm text-slate-900">Safe dental care</strong><span className="text-xs text-slate-500">Clean & patient focused</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
