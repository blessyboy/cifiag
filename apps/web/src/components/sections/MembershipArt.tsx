import type { ReactNode } from "react";

/**
 * Brand illustrations for membership grade cards. One shared style: white
 * line-and-fill forms on the crest-indigo card header, sky-blue support
 * shapes and a single crest-red accent. Purely decorative (aria-hidden):
 * the card title names the grade.
 *
 * When a category has a real photograph (`image`), that is shown instead.
 */

const SKY = "#9fd8ff";
const RED = "#e8344f";
const SOFT = "rgb(255 255 255 / 14%)";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg className="card__art" viewBox="0 0 320 180" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      {/* shared backdrop rings, echoing the hero motif */}
      <circle cx="262" cy="34" r="70" fill="none" stroke={SOFT} strokeWidth="2" />
      <circle cx="262" cy="34" r="44" fill="none" stroke={SOFT} strokeWidth="1.5" />
      <circle cx="40" cy="168" r="54" fill={SOFT} opacity="0.5" />
      <path d="M0 152 H320" stroke={SOFT} strokeWidth="2" />
      {children}
    </svg>
  );
}

/** Students: open book, mortarboard and a small growth chart. */
function StudentsArt() {
  return (
    <Frame>
      <path d="M108 112 Q134 100 160 110 V150 Q134 140 108 152 Z" fill="#fff" />
      <path d="M212 112 Q186 100 160 110 V150 Q186 140 212 152 Z" fill="#fff" opacity="0.88" />
      <path d="M118 120 Q134 113 150 118 M118 130 Q134 123 150 128 M118 140 Q134 133 150 138" stroke="#2a1a72" strokeOpacity="0.25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M170 118 Q186 113 202 120 M170 128 Q186 123 202 130" stroke="#2a1a72" strokeOpacity="0.25" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M160 42 L206 60 L160 78 L114 60 Z" fill="#fff" />
      <path d="M136 69 V84 Q160 98 184 84 V69 L160 78 Z" fill={SKY} />
      <path d="M160 60 L198 64 V88" stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="198" cy="92" r="5" fill={RED} />
      <g fill={SKY} opacity="0.9">
        <rect x="236" y="122" width="10" height="22" rx="2" />
        <rect x="252" y="110" width="10" height="34" rx="2" />
        <rect x="268" y="96" width="10" height="48" rx="2" />
      </g>
    </Frame>
  );
}

/** Associate Members: a qualification certificate with a rising chart and a seal. */
function AssociateArt() {
  return (
    <Frame>
      <rect x="112" y="34" width="96" height="118" rx="8" fill="#fff" />
      <rect x="126" y="48" width="44" height="6" rx="3" fill="#2a1a72" opacity="0.3" />
      <rect x="126" y="60" width="66" height="5" rx="2.5" fill="#2a1a72" opacity="0.15" />
      <g fill="#2a1a72" opacity="0.14">
        <rect x="128" y="104" width="12" height="26" rx="2" />
        <rect x="146" y="94" width="12" height="36" rx="2" />
        <rect x="164" y="84" width="12" height="46" rx="2" />
      </g>
      <path d="M126 116 L148 100 L166 106 L192 78" stroke={RED} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="192" cy="78" r="5" fill={RED} />
      <circle cx="208" cy="140" r="22" fill={SKY} />
      <path d="M198 140 L205 147 L219 132" stroke="#2a1a72" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M196 158 L192 176 L201 170 L208 178 L210 160" fill={SKY} opacity="0.8" />
    </Frame>
  );
}

/** Full Members: two professionals reviewing analysis on a board. */
function FullMembersArt() {
  return (
    <Frame>
      <rect x="150" y="36" width="112" height="76" rx="8" fill="#fff" />
      <g fill="#2a1a72" opacity="0.14">
        <rect x="164" y="80" width="12" height="20" rx="2" />
        <rect x="182" y="70" width="12" height="30" rx="2" />
        <rect x="200" y="62" width="12" height="38" rx="2" />
      </g>
      <path d="M162 92 L186 74 L206 80 L246 50" stroke={RED} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="246" cy="50" r="5" fill={RED} />
      <circle cx="232" cy="88" r="11" fill="none" stroke={SKY} strokeWidth="5" />
      <path d="M232 77 A11 11 0 0 1 243 88" stroke="#2a1a72" strokeWidth="5" fill="none" />
      {/* people */}
      <circle cx="92" cy="74" r="15" fill="#fff" />
      <path d="M66 152 V118 Q66 98 92 98 Q118 98 118 118 V152 Z" fill="#fff" />
      <circle cx="128" cy="88" r="13" fill={SKY} />
      <path d="M106 152 V128 Q106 110 128 110 Q150 110 150 128 V152 Z" fill={SKY} />
      <path d="M116 112 L140 96" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </Frame>
  );
}

/** Fellows: a medal within a laurel, beside published research. */
function FellowsArt() {
  const cx = 160, cy = 92, r = 46;
  const pt = (deg: number, rad = r) => [cx + rad * Math.cos((deg * Math.PI) / 180), cy + rad * Math.sin((deg * Math.PI) / 180)] as const;
  // SVG angles: 90° points down. Left branch sweeps 115° -> 230°, right mirrors it.
  const branch = (from: number, to: number, key: string) => {
    const [x1, y1] = pt(from), [x2, y2] = pt(to);
    const sweep = to > from ? 1 : 0;
    const leaves = Array.from({ length: 6 }, (_, i) => {
      const deg = from + ((to - from) * (i + 0.6)) / 6.4;
      const side = i % 2 === 0 ? 1 : -1;
      const [x, y] = pt(deg, r + side * 7);
      return (
        <ellipse key={key + i} cx={x} cy={y} rx="4.5" ry="10" fill="#fff"
          opacity={0.7 + (i / 6) * 0.3}
          transform={`rotate(${deg + side * 25} ${x} ${y})`} />
      );
    });
    return (
      <g key={key}>
        <path d={`M${x1} ${y1} A${r} ${r} 0 0 ${sweep} ${x2} ${y2}`} fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="3" strokeLinecap="round" />
        {leaves}
      </g>
    );
  };
  return (
    <Frame>
      <g transform="rotate(8 255 96)">
        <rect x="226" y="58" width="58" height="76" rx="6" fill="#fff" opacity="0.9" />
        <rect x="234" y="70" width="40" height="5" rx="2.5" fill="#2a1a72" opacity="0.22" />
        <rect x="234" y="82" width="34" height="5" rx="2.5" fill="#2a1a72" opacity="0.14" />
        <rect x="234" y="94" width="38" height="5" rx="2.5" fill="#2a1a72" opacity="0.14" />
        <rect x="234" y="106" width="28" height="5" rx="2.5" fill="#2a1a72" opacity="0.14" />
      </g>
      {branch(115, 232, "l")}
      {branch(65, -52, "r")}
      <path d="M148 112 L140 150 L152 143 L160 154 L163 118" fill={SKY} />
      <path d="M172 112 L180 150 L168 143 L160 154 L157 118" fill={SKY} opacity="0.75" />
      <circle cx={cx} cy={cy} r="28" fill="#fff" />
      <circle cx={cx} cy={cy} r="21" fill="none" stroke={SKY} strokeWidth="3" />
      <path d="M160 78 L164.2 86.6 L173.5 87.9 L166.8 94.4 L168.4 103.7 L160 99.3 L151.6 103.7 L153.2 94.4 L146.5 87.9 L155.8 86.6 Z" fill={RED} />
    </Frame>
  );
}

const ART: Record<string, () => ReactNode> = {
  students: StudentsArt,
  "associate-members": AssociateArt,
  "full-members": FullMembersArt,
  fellows: FellowsArt,
};

export function MembershipVisual({ slug, image }: { slug: string; image: { src: string; alt: string } | null }) {
  if (image) {
    return <img className="card__photo" src={image.src} alt={image.alt} loading="lazy" decoding="async" />;
  }
  const Art = ART[slug];
  return Art ? <Art /> : <Frame>{null}</Frame>;
}
