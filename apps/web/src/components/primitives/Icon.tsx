/**
 * Small inline icon set (24×24 stroke icons). Always decorative: the
 * surrounding text carries the meaning, so icons are aria-hidden.
 */
const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5.5v13l10.5-6.5z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4.5-2 1.5a11 11 0 006 6l1.5-2L20 15.5V19a1.5 1.5 0 01-1.6 1.5A16.5 16.5 0 013.5 5.6 1.5 1.5 0 015 4z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5L12 13l8.5-6.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13l2.5-7h11L20 13v5a1 1 0 01-1 1H5a1 1 0 01-1-1z" />
      <path d="M4 13h4.5l1 2h5l1-2H20" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a1.5 1.5 0 00-1.5 1.5v15A1.5 1.5 0 007 21h10a1.5 1.5 0 001.5-1.5V7.5z" />
      <path d="M14 3v4.5h4.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className ? `icon ${className}` : "icon"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
