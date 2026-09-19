import { useState } from "react";
import BrandMark from "./BrandMark";

const links = [["Home", "#home"], ["Services", "#services"], ["Appointment", "#appointment"], ["Contact", "#contact"]];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/70 bg-white/95 backdrop-blur-lg">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-[72px] items-center justify-between gap-3">
          <a href="#home" className="flex min-w-0 items-center gap-2.5" aria-label="Shahjahanpur Dental home">
            <BrandMark className="size-10" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-[15px] font-bold text-slate-900 sm:text-base">Shahjahanpur Dental</span>
              <span className="hidden text-[10px] font-medium tracking-wide text-slate-500 min-[390px]:block sm:text-[11px]">Healthy Smiles, Brighter Lives</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map(([label, href]) => <a key={href} href={href} className="text-sm font-semibold text-slate-600 transition hover:text-clinic-600">{label}</a>)}
          </div>

          <a href="tel:01755516710" className="hidden items-center gap-2 rounded-full bg-clinic-50 px-4 py-2.5 text-sm font-bold text-clinic-700 transition hover:bg-clinic-100 md:flex">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" /></svg>
            01755516710
          </a>

          <button type="button" onClick={() => setIsOpen((open) => !open)} className="grid size-11 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 md:hidden" aria-expanded={isOpen} aria-controls="mobile-menu" aria-label="Toggle menu">
            <span className="text-2xl leading-none" aria-hidden="true">{isOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="border-t border-slate-100 py-3 md:hidden">
            {links.map(([label, href]) => <a key={href} href={href} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-slate-700 hover:bg-clinic-50 hover:text-clinic-700">{label}</a>)}
            <a href="tel:01755516710" className="mt-2 flex min-h-12 items-center justify-center rounded-xl bg-clinic-600 px-4 font-bold text-white">Call 01755516710</a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
