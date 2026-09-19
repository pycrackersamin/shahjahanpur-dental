function BrandMark({ className = "size-10" }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-2xl bg-clinic-600 text-white shadow-sm shadow-blue-900/20 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 32 32" className="size-6" fill="none">
        <path d="M9.2 5.8c2-1.1 4.5-.4 6.8-.4s4.8-.7 6.8.4c3.4 1.9 3.1 6.6 1.5 10.1-1.4 3-2 9.8-4.9 9.8-2.1 0-1.4-5.4-3.4-5.4s-1.3 5.4-3.4 5.4c-2.9 0-3.5-6.8-4.9-9.8-1.6-3.5-1.9-8.2 1.5-10.1Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default BrandMark;
