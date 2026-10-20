import type { ReactNode } from "react";
import type { InspirationKind } from "@/lib/inspirations";

interface ProductArtProps {
  kind: InspirationKind;
  className?: string;
}

const ink = "#111110";
const paper = "#F7F4EC";
const volt = "#C24657";

function Frame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 360 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="180"
        cy="160"
        r="132"
        stroke={ink}
        strokeOpacity="0.16"
        strokeDasharray="3 7"
      />
      <path d="M28 252H332" stroke={ink} strokeOpacity="0.16" />
      <path d="M180 18V44" stroke={ink} strokeOpacity="0.3" />
      <path d="M180 276V302" stroke={ink} strokeOpacity="0.3" />
      <path d="M34 160H56" stroke={ink} strokeOpacity="0.3" />
      <path d="M304 160H326" stroke={ink} strokeOpacity="0.3" />
      <text
        x="30"
        y="40"
        fill={ink}
        fillOpacity="0.45"
        fontSize="10"
        fontFamily="monospace"
        letterSpacing="1.5"
      >
        OF / INSPIRATION
      </text>
      <text
        x="330"
        y="298"
        textAnchor="end"
        fill={ink}
        fillOpacity="0.45"
        fontSize="10"
        fontFamily="monospace"
        letterSpacing="1.5"
      >
        MOROCCO
      </text>
      {children}
      <ellipse cx="180" cy="282" rx="102" ry="9" fill={ink} fillOpacity="0.08" />
    </svg>
  );
}

function Sneaker() {
  return (
    <>
      <path
        d="M52 226C75 222 92 212 107 195L137 161C146 151 160 150 171 158L199 179C213 189 230 196 248 200L286 208C300 211 309 222 309 236V249C309 257 303 263 295 263H66C55 263 46 254 46 243V234C46 231 48 228 52 226Z"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M47 244H309"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.35"
      />
      <path
        d="M109 226L128 202M128 230L147 207M147 234L166 213"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="116" cy="220" r="2.5" fill={ink} />
      <circle cx="135" cy="224" r="2.5" fill={ink} />
      <circle cx="154" cy="228" r="2.5" fill={ink} />
      <path
        d="M159 201C190 217 226 223 264 215L269 227C227 238 186 231 151 213Z"
        fill={volt}
        stroke={ink}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M137 161C143 175 154 186 169 194"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.45"
      />
      <path
        d="M66 257H92"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      <path
        d="M258 257H286"
        stroke={ink}
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />
      <rect
        x="265"
        y="228"
        width="25"
        height="15"
        rx="2"
        fill={ink}
      />
      <text
        x="277.5"
        y="239"
        textAnchor="middle"
        fill={paper}
        fontSize="8"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
      >
        OF
      </text>
    </>
  );
}

function Tee() {
  return (
    <>
      <path
        d="M120 66L151 55C158 69 171 76 180 76C189 76 202 69 209 55L240 66L274 102L248 131L230 116V257H130V116L112 131L86 102L120 66Z"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M151 55C158 80 202 80 209 55"
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M130 116L130 257M230 116L230 257"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.2"
      />
      <path
        d="M112 131L130 149M248 131L230 149"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.3"
      />
      <rect x="157" y="145" width="46" height="46" fill={volt} stroke={ink} strokeWidth="3" />
      <text
        x="180"
        y="175"
        textAnchor="middle"
        fill={ink}
        fontSize="21"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        letterSpacing="-1"
      >
        OF
      </text>
      <path
        d="M148 238H212"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.3"
      />
      <path
        d="M157 248H203"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.15"
      />
    </>
  );
}

function Jacket() {
  return (
    <>
      <path
        d="M122 62L154 51L180 82L206 51L238 62L270 96L254 149L232 138V259H128V138L106 149L90 96L122 62Z"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M154 51L180 82L206 51"
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M180 82V259" stroke={ink} strokeWidth="3" />
      <path
        d="M180 82V259"
        stroke={paper}
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <path
        d="M128 138V259M232 138V259"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.22"
      />
      <path
        d="M106 149L128 162M254 149L232 162"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.28"
      />
      <path
        d="M143 191H167V216H143Z"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.6"
      />
      <path
        d="M193 191H217V216H193Z"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.6"
      />
      <path
        d="M143 191L150 184M217 191L210 184"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <path
        d="M153 118H207"
        stroke={volt}
        strokeWidth="10"
      />
      <path
        d="M153 118H207"
        stroke={ink}
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M128 247H232"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.3"
      />
      <circle cx="180" cy="100" r="3.5" fill={ink} />
    </>
  );
}

function Bag() {
  return (
    <>
      <path
        d="M112 124L84 62C80 55 84 47 92 45C99 43 107 47 110 55L140 120"
        stroke={ink}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M248 124L276 62C280 55 276 47 268 45C261 43 253 47 250 55L220 120"
        stroke={ink}
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect
        x="92"
        y="118"
        width="176"
        height="140"
        rx="10"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M92 164H268"
        stroke={ink}
        strokeWidth="3"
      />
      <path
        d="M110 148H250"
        stroke={ink}
        strokeWidth="2"
        strokeDasharray="4 5"
        strokeOpacity="0.4"
      />
      <rect
        x="157"
        y="145"
        width="46"
        height="38"
        rx="4"
        fill={volt}
        stroke={ink}
        strokeWidth="3"
      />
      <path d="M180 145V183" stroke={ink} strokeWidth="2" />
      <circle cx="180" cy="164" r="3" fill={ink} />
      <path
        d="M118 232H166"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <path
        d="M194 232H242"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.25"
      />
      <text
        x="238"
        y="246"
        textAnchor="end"
        fill={ink}
        fontSize="9"
        fontWeight="700"
        fontFamily="monospace"
        letterSpacing="1"
      >
        OF
      </text>
      <path
        d="M128 128V118M232 128V118"
        stroke={ink}
        strokeWidth="4"
      />
    </>
  );
}

function Shorts() {
  return (
    <>
      <path
        d="M110 68H250L272 258H198L180 148L162 258H88L110 68Z"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M110 96H250"
        stroke={ink}
        strokeWidth="3"
      />
      <path
        d="M88 240L154 240M206 240L272 240"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.22"
      />
      <path
        d="M110 68V96M250 68V96"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.35"
      />
      <path
        d="M163 82V119M197 82V119"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="163" cy="123" r="3" fill={volt} stroke={ink} strokeWidth="2" />
      <circle cx="197" cy="123" r="3" fill={volt} stroke={ink} strokeWidth="2" />
      <path
        d="M96 112L107 228"
        stroke={volt}
        strokeWidth="8"
      />
      <path
        d="M264 112L253 228"
        stroke={volt}
        strokeWidth="8"
      />
      <path
        d="M120 180C132 184 143 184 151 180"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
      <path
        d="M209 180C217 184 228 184 240 180"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.3"
      />
      <path
        d="M140 246L166 246M204 246L230 246"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.18"
      />
    </>
  );
}

function Hoodie() {
  return (
    <>
      <path
        d="M126 62C130 34 230 34 234 62L266 90L258 158L238 151V258H122V151L102 158L94 90L126 62Z"
        fill={paper}
        stroke={ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M126 62C126 98 234 98 234 62"
        stroke={ink}
        strokeWidth="4"
      />
      <path
        d="M140 72C148 92 212 92 220 72"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.35"
      />
      <path
        d="M160 88V132M200 88V132"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M158 132H162M198 132H202"
        stroke={volt}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M122 151V258M238 151V258"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.2"
      />
      <path
        d="M102 158L122 171M258 158L238 171"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.28"
      />
      <path
        d="M134 194H226V242H134V194Z"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.55"
      />
      <path
        d="M134 194L150 208M226 194L210 208"
        stroke={ink}
        strokeWidth="3"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      <rect x="157" y="142" width="46" height="32" fill={volt} stroke={ink} strokeWidth="3" />
      <text
        x="180"
        y="165"
        textAnchor="middle"
        fill={ink}
        fontSize="17"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
      >
        OF
      </text>
      <path
        d="M122 246H238"
        stroke={ink}
        strokeWidth="3"
        strokeOpacity="0.25"
      />
    </>
  );
}

export function ProductArt({ kind, className }: ProductArtProps) {
  return (
    <Frame className={className}>
      {kind === "sneaker" && <Sneaker />}
      {kind === "tee" && <Tee />}
      {kind === "jacket" && <Jacket />}
      {kind === "bag" && <Bag />}
      {kind === "shorts" && <Shorts />}
      {kind === "hoodie" && <Hoodie />}
    </Frame>
  );
}
