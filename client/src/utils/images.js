// Local, network-free fallback so an image never appears broken.
export const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0ea5e9" />
          <stop offset="100%" stop-color="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="url(#g)" />
      <circle cx="760" cy="120" r="60" fill="#ffffff" opacity="0.25" />
      <path d="M0 430 L180 300 L330 400 L520 250 L700 390 L960 280 L960 540 L0 540 Z" fill="#ffffff" opacity="0.18" />
      <text x="480" y="285" font-family="Arial, Helvetica, sans-serif" font-size="56" font-weight="bold" fill="#ffffff" text-anchor="middle">SmartGuide</text>
    </svg>`
  );

export function withImageFallback(event) {
  if (event.target.dataset.fallbackApplied) return;
  event.target.dataset.fallbackApplied = 'true';
  event.target.src = FALLBACK_IMAGE;
}
