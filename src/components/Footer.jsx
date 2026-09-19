import BrandMark from "./BrandMark";

const links = [["Home", "#home"], ["Services", "#services"], ["Appointment", "#appointment"], ["Contact", "#contact"]];

function Footer() {
  return (
    <footer className="bg-[#07152d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-16">
        <div>
          <div className="flex items-center gap-3"><BrandMark className="size-11" /><div><p className="font-bold">Shahjahanpur Dental</p><p className="mt-0.5 text-xs text-blue-200">Healthy Smiles, Brighter Lives</p></div></div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Friendly, modern dental care and convenient online appointment booking in Shahjahanpur.</p>
        </div>
        <div className="md:justify-self-center">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-200">Quick links</h2>
          <nav className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3" aria-label="Footer navigation">{links.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</a>)}</nav>
        </div>
        <div className="md:justify-self-end">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-200">Contact</h2>
          <a href="tel:01755516710" className="mt-4 block text-sm font-semibold text-white hover:text-blue-200">01755516710</a>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">Shahjahanpur, Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-500">© 2026 Shahjahanpur Dental. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
