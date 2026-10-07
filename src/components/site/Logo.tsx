export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="wos-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ddc97" />
          <stop offset="1" stopColor="#2cc6c0" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#0b1211" stroke="rgba(255,255,255,.14)" />
      <path d="M8 10.5l2.6 11 3.2-8.2h.4l3.2 8.2 2.6-11" fill="none" stroke="url(#wos-g)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="10.5" r="2" fill="#3ddc97" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight text-fg">
      <LogoMark />
      <span className="text-[15px]">WorkOS</span>
    </span>
  );
}
