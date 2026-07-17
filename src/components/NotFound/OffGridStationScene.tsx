import styles from "./NotFound.module.css";

export default function OffGridStationScene() {
    return (
        <svg
            className="block size-full"
            viewBox="0 0 400 368"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ridgeBack" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3a5261" />
                    <stop offset="1" stopColor="#2b3d49" />
                </linearGradient>
                <linearGradient id="ridgeMid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#28323a" />
                    <stop offset="1" stopColor="#1d2830" />
                </linearGradient>
                <linearGradient id="ridgeFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#161f26" />
                    <stop offset="1" stopColor="#0f171c" />
                </linearGradient>
                <radialGradient id="moon" cx="0.35" cy="0.35" r="0.7">
                    <stop offset="0" stopColor="#f5f0ed" />
                    <stop offset="1" stopColor="#c7cfd3" />
                </radialGradient>
                <linearGradient id="mast" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8ca3b0" />
                    <stop offset="1" stopColor="#5e7481" />
                </linearGradient>
            </defs>

            {/* moon */}
            <circle cx="312" cy="66" r="26" fill="url(#moon)" opacity="0.9" />
            <circle cx="322" cy="58" r="26" fill="#1c2c35" opacity="0.55" />

            {/* stars */}
            <circle className={styles.twinkle} cx="70" cy="54" r="1.6" fill="#f5f0ed" />
            <circle className={styles.twinkleB} cx="132" cy="90" r="1.2" fill="#f5f0ed" />
            <circle className={styles.twinkleC} cx="196" cy="46" r="1.4" fill="#f5f0ed" />
            <circle className={styles.twinkleD} cx="248" cy="112" r="1.1" fill="#f5f0ed" />
            <circle className={styles.twinkleB} cx="96" cy="128" r="1.1" fill="#f5f0ed" />
            <circle className={styles.twinkleC} cx="360" cy="120" r="1.3" fill="#f5f0ed" />

            {/* drifting clouds */}
            <g className={styles.drift} opacity="0.16" fill="#9fb3bf">
                <ellipse cx="120" cy="150" rx="34" ry="12" />
                <ellipse cx="150" cy="146" rx="26" ry="14" />
                <ellipse cx="92" cy="152" rx="20" ry="10" />
            </g>
            <g className={styles.drift2} opacity="0.12" fill="#9fb3bf">
                <ellipse cx="300" cy="182" rx="30" ry="10" />
                <ellipse cx="326" cy="178" rx="22" ry="12" />
            </g>

            {/* ridges (Mt. Oíti layers) */}
            <path
                d="M0 238 L60 196 L110 224 L168 176 L230 220 L300 182 L360 216 L400 198 L400 368 L0 368 Z"
                fill="url(#ridgeBack)"
            />
            <path
                d="M0 286 L70 250 L140 284 L210 246 L280 288 L360 256 L400 280 L400 368 L0 368 Z"
                fill="url(#ridgeMid)"
            />
            <path
                d="M0 344 L90 300 L150 322 L210 300 L270 330 L340 306 L400 330 L400 368 L0 368 Z"
                fill="url(#ridgeFront)"
            />

            {/* weather station (sits on mid ridge) */}
            <g className={styles.floaty}>
                {/* tripod legs */}
                <line x1="200" y1="248" x2="184" y2="290" stroke="#42505a" strokeWidth="4" strokeLinecap="round" />
                <line x1="200" y1="248" x2="216" y2="290" stroke="#42505a" strokeWidth="4" strokeLinecap="round" />
                <line x1="200" y1="248" x2="200" y2="292" stroke="#42505a" strokeWidth="4" strokeLinecap="round" />

                {/* mast */}
                <rect x="197" y="120" width="6" height="132" rx="3" fill="url(#mast)" />

                {/* solar panel */}
                <g transform="translate(158 214) rotate(-18)">
                    <rect x="0" y="0" width="46" height="26" rx="2" fill="#1f3a4a" stroke="#4d6675" strokeWidth="1.5" />
                    <line x1="15" y1="0" x2="15" y2="26" stroke="#33566b" strokeWidth="1" />
                    <line x1="31" y1="0" x2="31" y2="26" stroke="#33566b" strokeWidth="1" />
                    <line x1="0" y1="13" x2="46" y2="13" stroke="#33566b" strokeWidth="1" />
                </g>
                <line x1="188" y1="212" x2="200" y2="200" stroke="#5e7481" strokeWidth="3" />

                {/* instrument shelter (louvered box) */}
                <g>
                    <rect x="206" y="188" width="34" height="30" rx="3" fill="#dfe6e9" stroke="#a9b7bd" strokeWidth="1.5" />
                    <line x1="209" y1="194" x2="237" y2="194" stroke="#b3c0c6" strokeWidth="2" />
                    <line x1="209" y1="200" x2="237" y2="200" stroke="#b3c0c6" strokeWidth="2" />
                    <line x1="209" y1="206" x2="237" y2="206" stroke="#b3c0c6" strokeWidth="2" />
                    <line x1="209" y1="212" x2="237" y2="212" stroke="#b3c0c6" strokeWidth="2" />
                </g>
                <line x1="203" y1="200" x2="206" y2="200" stroke="#5e7481" strokeWidth="3" />

                {/* cross arm */}
                <line x1="150" y1="150" x2="238" y2="150" stroke="#5e7481" strokeWidth="4" strokeLinecap="round" />

                {/* anemometer */}
                <circle cx="200" cy="120" r="4" fill="#5e7481" />
                <g className={styles.spin}>
                    <line x1="200" y1="120" x2="200" y2="98" stroke="#7c96a3" strokeWidth="3" />
                    <line x1="200" y1="120" x2="219" y2="131" stroke="#7c96a3" strokeWidth="3" />
                    <line x1="200" y1="120" x2="181" y2="131" stroke="#7c96a3" strokeWidth="3" />
                    <circle cx="200" cy="95" r="5.5" fill="#3fb6c4" />
                    <circle cx="222" cy="133" r="5.5" fill="#3fb6c4" />
                    <circle cx="178" cy="133" r="5.5" fill="#3fb6c4" />
                </g>

                {/* antenna + broken signal */}
                <line x1="238" y1="150" x2="262" y2="100" stroke="#5e7481" strokeWidth="2.5" />
                <circle cx="262" cy="96" r="3.5" fill="#9fb3bf" />
                <path
                    className={`${styles.wave} ${styles.waveA}`}
                    d="M255 88 A12 12 0 0 1 269 88"
                    fill="none"
                    stroke="#3fb6c4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    className={`${styles.wave} ${styles.waveB}`}
                    d="M250 83 A18 18 0 0 1 274 83"
                    fill="none"
                    stroke="#3fb6c4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
                <path
                    className={`${styles.wave} ${styles.waveC}`}
                    d="M245 78 A24 24 0 0 1 279 78"
                    fill="none"
                    stroke="#3fb6c4"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                {/* no-signal cross */}
                <g className={styles.blink} transform="translate(262 70)">
                    <circle r="8" fill="#be3144" />
                    <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3.5" y1="-3.5" x2="-3.5" y2="3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </g>
            </g>
        </svg>
    );
}
