/**
 * Canonical stylized Wamao — the spine of the site's visual identity.
 * Rendered as an SVG <g> in a 400×440 coordinate space so it can be dropped
 * into any parent <svg> and animated by class.
 *
 * Parts are grouped so consumers can stage reveals:
 *   .wm-body-group  — tail, ears, body, paws  (the "shaped body")
 *   .wm-face-group  — brows, eyes, nostrils, mouth, fangs  (the "awakened face")
 *   .wm-coin        — the commercial coin (Yuxi market reading only)
 * Individual hooks (.wm-body, .wm-mouth, .wm-coin, .wm-figure) are preserved.
 */

export const WAMAO_VIEWBOX = "0 0 400 440";

const INK = "#1C1A17";
const CREAM = "#f4f1ea";

export default function WamaoFigure({ bodyColor = "#a89488" }: { bodyColor?: string }) {
  return (
    <g className="wm-figure">
      <g className="wm-body-group">
        {/* tail (behind body) */}
        <path
          className="wm-tail"
          d="M312,302 C374,300 390,232 360,196 C345,179 320,188 330,210"
          fill="none"
          stroke={INK}
          strokeWidth={10}
          strokeLinecap="round"
        />

        {/* ears */}
        <polygon className="wm-ear wm-skin" points="132,112 172,168 108,160" fill={bodyColor} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <polygon className="wm-ear wm-skin" points="268,112 228,168 292,160" fill={bodyColor} stroke={INK} strokeWidth={4} strokeLinejoin="round" />
        <path d="M140,128 L151,153" stroke={INK} strokeWidth={3} strokeLinecap="round" />
        <path d="M260,128 L249,153" stroke={INK} strokeWidth={3} strokeLinecap="round" />

        {/* body */}
        <ellipse className="wm-body wm-skin" cx={200} cy={244} rx={126} ry={112} fill={bodyColor} stroke={INK} strokeWidth={4} />

        {/* front paws */}
        <ellipse className="wm-skin" cx={158} cy={348} rx={28} ry={17} fill={bodyColor} stroke={INK} strokeWidth={4} />
        <ellipse className="wm-skin" cx={242} cy={348} rx={28} ry={17} fill={bodyColor} stroke={INK} strokeWidth={4} />
        <path d="M148,352 L148,363 M159,353 L159,364 M170,352 L170,363" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M230,352 L230,363 M241,353 L241,364 M252,352 L252,363" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
      </g>

      <g className="wm-face-group">
        {/* brows */}
        <path d="M118,158 Q150,140 188,160" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
        <path d="M282,158 Q250,140 212,160" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />

        {/* eyes */}
        <circle cx={156} cy={190} r={32} fill={CREAM} stroke={INK} strokeWidth={4} />
        <circle cx={244} cy={190} r={32} fill={CREAM} stroke={INK} strokeWidth={4} />
        <circle cx={162} cy={194} r={15} fill={INK} />
        <circle cx={238} cy={194} r={15} fill={INK} />
        <circle cx={157} cy={188} r={5} fill={CREAM} />
        <circle cx={233} cy={188} r={5} fill={CREAM} />

        {/* nostrils */}
        <ellipse cx={186} cy={236} rx={7} ry={9} fill={INK} />
        <ellipse cx={214} cy={236} rx={7} ry={9} fill={INK} />

        {/* open mouth */}
        <ellipse className="wm-mouth" cx={200} cy={298} rx={84} ry={56} fill={INK} stroke={INK} strokeWidth={4} />

        {/* upper fangs */}
        <polygon points="150,254 170,254 160,294" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <polygon points="180,258 198,258 189,290" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <polygon points="202,258 220,258 211,290" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <polygon points="230,254 250,254 240,294" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        {/* lower fangs */}
        <polygon points="176,342 194,342 185,314" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
        <polygon points="206,342 224,342 215,314" fill={CREAM} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      </g>

      {/* coin (commercial reading only) */}
      <g className="wm-coin">
        <circle cx={200} cy={308} r={26} fill="#c9a24b" stroke={INK} strokeWidth={3} />
        <rect x={188} y={296} width={24} height={24} fill={INK} />
      </g>
    </g>
  );
}
