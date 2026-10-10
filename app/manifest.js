export default function manifest() {
  return {
    name: 'Cubic Yard Calculator',
    short_name: 'Yard Calc',
    description: 'Fast cubic yard calculator with waste, weight, and cost estimates for bulk materials.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable'
      }
    ]
  };
}
