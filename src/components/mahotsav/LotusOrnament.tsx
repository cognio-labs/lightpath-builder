export function LotusEmblem({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 10C26.5 19 25 28 32 39C39 28 37.5 19 32 10Z"
        fill="url(#lotusGold)"
      />
      <path
        d="M32 39C22 33 17 24 18 15C25 19 29 27 32 39Z"
        fill="url(#lotusGoldSoft)"
      />
      <path
        d="M32 39C42 33 47 24 46 15C39 19 35 27 32 39Z"
        fill="url(#lotusGoldSoft)"
      />
      <path
        d="M32 42C19 40 11 33 9 24C17 25 25 31 32 42Z"
        fill="url(#lotusMaroon)"
        opacity="0.92"
      />
      <path
        d="M32 42C45 40 53 33 55 24C47 25 39 31 32 42Z"
        fill="url(#lotusMaroon)"
        opacity="0.92"
      />
      <path
        d="M14 47C22 44.5 42 44.5 50 47C43 51 21 51 14 47Z"
        fill="url(#lotusGold)"
      />
      <defs>
        <linearGradient
          id="lotusGold"
          x1="14"
          y1="10"
          x2="50"
          y2="51"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F2C97D" />
          <stop offset="1" stopColor="#B6781E" />
        </linearGradient>
        <linearGradient
          id="lotusGoldSoft"
          x1="18"
          y1="15"
          x2="46"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F5D799" />
          <stop offset="1" stopColor="#D49635" />
        </linearGradient>
        <linearGradient
          id="lotusMaroon"
          x1="9"
          y1="24"
          x2="55"
          y2="42"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8C1D23" />
          <stop offset="1" stopColor="#5E1216" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SacredDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4 my-4" aria-hidden="true">
      <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D49635]" />
      <span className="flex items-center gap-2 text-[#9A6213]">
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
        {label ? (
          <span className="text-xs font-semibold uppercase tracking-[0.22em]">
            {label}
          </span>
        ) : null}
      </span>
      <span className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D49635]" />
    </div>
  );
}
