/**
 * Icon drawings on a 24px grid, stroked at 1.75. Most are ported from the
 * Agent Fleet landing page (apps/web/components/landing/icons.tsx) so the
 * studio and Fleet share one icon language; terminal, layout-grid,
 * download, and the arrows are drawn to the same grid.
 */
export type Hue = 'accent' | 'blue' | 'violet' | 'cyan' | 'amber' | 'green' | 'red'

export const hueHex: Record<Hue, string> = {
  accent: '#5e6ad2',
  blue: '#5b8def',
  violet: '#8b7ff0',
  cyan: '#4dc9c9',
  amber: '#e2a94d',
  green: '#4dbb87',
  red: '#e2685e',
}

export const iconPaths = {
  workflow:
    '<circle cx="5.5" cy="6" r="2.25"/><circle cx="5.5" cy="18" r="2.25"/><circle cx="18.5" cy="12" r="2.25"/><path d="M7.6 6.9 16.5 11M7.6 17.1 16.5 13"/>',
  network:
    '<circle cx="12" cy="12" r="2.25"/><circle cx="5" cy="5.5" r="1.75"/><circle cx="19" cy="5.5" r="1.75"/><circle cx="12" cy="19.5" r="1.75"/><path d="M10.5 10.3 6.3 6.8M13.5 10.3 17.7 6.8M12 14.25V17.5"/>',
  chat: '<path d="M4 5.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.5 4V17H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 1-1Z"/><path d="M7.5 9.5h9M7.5 12.5h5.5"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="2.75"/><path d="M5 6v6c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75V6"/><path d="M5 12v6c0 1.52 3.13 2.75 7 2.75s7-1.23 7-2.75v-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.3 15.3 20 20"/>',
  code: '<path d="M9 8 4.5 12 9 16"/><path d="M15 8 19.5 12 15 16"/>',
  shield: '<path d="M12 3.5 19 6.5v5.2c0 4.6-3 7.9-7 8.8-4-0.9-7-4.2-7-8.8V6.5l7-3Z"/><path d="M9 12l2 2 4-4.2"/>',
  globe:
    '<circle cx="12" cy="12" r="8.25"/><path d="M3.75 12h16.5"/><path d="M12 3.75c2.5 2.3 3.9 5.2 3.9 8.25s-1.4 5.95-3.9 8.25c-2.5-2.3-3.9-5.2-3.9-8.25S9.5 6.05 12 3.75Z"/>',
  activity: '<path d="M3 12h4l2-6 4 12 2-8 2 2h4"/>',
  'git-branch':
    '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 8v8"/><path d="M18 8a6 6 0 0 1-6 6H9"/>',
  server:
    '<rect x="3.5" y="4" width="17" height="6.5" rx="1.5"/><rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5"/><circle cx="7" cy="7.25" r="0.9" fill="currentColor" stroke="none"/><circle cx="7" cy="16.75" r="0.9" fill="currentColor" stroke="none"/><path d="M11 7.25h6M11 16.75h6"/>',
  briefcase:
    '<rect x="3.5" y="8" width="17" height="11" rx="1.75"/><path d="M8.5 8V6a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 6v2"/><path d="M3.5 13h17"/><rect x="10.5" y="12" width="3" height="2.5" rx="0.5" fill="currentColor" stroke="none"/>',
  'list-checks':
    '<path d="M3.5 6.5 5 8l3.5-3.5"/><path d="M11 6.5h9.5"/><path d="M3.5 12.5 5 14l3.5-3.5"/><path d="M11 12.5h9.5"/><path d="M3.5 18.5 5 20l3.5-3.5"/><path d="M11 18.5h9.5"/>',
  'file-text':
    '<path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4"/><path d="M8.5 12.5h7M8.5 16h5"/>',
  gauge: '<path d="M4 15.5a8 8 0 1 1 16 0"/><path d="M12 15.5 16 10"/><circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none"/>',
  sparkle:
    '<path d="M12 3.5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z"/><path d="M19 15c.25 1.4.9 2.1 2.3 2.4-1.4.25-2.05.9-2.3 2.3-.25-1.4-.9-2.05-2.3-2.3 1.4-.3 2.05-1 2.3-2.4Z"/>',
  terminal: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M7 9.5l3 2.5-3 2.5M12.5 15h4.5"/>',
  'layout-grid':
    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.25"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.25"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.25"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.25"/>',
  download: '<path d="M12 4v11M7.5 10.5 12 15l4.5-4.5M5 19.5h14"/>',
  'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7M9 7h8v8"/>',
} as const

export type IconName = keyof typeof iconPaths
