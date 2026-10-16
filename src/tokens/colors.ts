export interface ColorToken {
  name: string;
  hex: string;
  role: string;
  purpose: string[];
  rules: string;
  contrastWithCream: string;
  contrastWithWhite: string;
}

export const COLOR_TOKENS: Record<string, ColorToken> = {
  primary: {
    name: 'Primary — Forest Green',
    hex: '#285943',
    role: 'Primary action color, dominant throughout the application',
    purpose: ['Primary buttons', 'Active navigation', 'Important actions', 'Selected controls', 'Brand elements'],
    rules: 'Do NOT use saturated neon green. Keep consistent across all screens.',
    contrastWithCream: '6.4:1 (WCAG AAA)',
    contrastWithWhite: '7.1:1 (WCAG AAA)',
  },
  primaryDark: {
    name: 'Primary Dark — Deep Forest',
    hex: '#173D2B',
    role: 'High-emphasis typography & hero surfaces',
    purpose: ['Dark headings where appropriate', 'Navigation emphasis', 'Hero sections', 'Strong text accents', 'High-emphasis UI elements'],
    rules: 'Use for confident editorial titles and deep contrast accents.',
    contrastWithCream: '10.8:1 (WCAG AAA)',
    contrastWithWhite: '11.9:1 (WCAG AAA)',
  },
  secondary: {
    name: 'Secondary — Sage',
    hex: '#7FA58A',
    role: 'Supporting accent & subtle iconography',
    purpose: ['Secondary accents', 'Subtle illustrations', 'Supporting UI elements', 'Selected but non-primary states'],
    rules: 'Do NOT use this for small text where contrast may become insufficient.',
    contrastWithCream: '2.5:1 (Graphic elements only)',
    contrastWithWhite: '2.8:1 (Graphic elements only)',
  },
  background: {
    name: 'Background — Warm Cream',
    hex: '#F7F5EF',
    role: 'Application atmosphere & foundation',
    purpose: ['Primary application background', 'Landing page background', 'Large empty surfaces'],
    rules: 'Prevents the application from feeling sterile or overly corporate.',
    contrastWithCream: '1.0:1 (Base canvas)',
    contrastWithWhite: '1.1:1',
  },
  surface: {
    name: 'Surface — White',
    hex: '#FFFFFF',
    role: 'Elevated containers & content cards',
    purpose: ['Cards', 'Forms', 'Dialogs', 'Dashboards', 'Primary content surfaces'],
    rules: 'Use whitespace and subtle borders to separate surfaces rather than heavy shadows.',
    contrastWithCream: '1.1:1',
    contrastWithWhite: '1.0:1 (Base)',
  },
  primaryText: {
    name: 'Primary Text — Charcoal',
    hex: '#1F2933',
    role: 'Default textual content',
    purpose: ['Headings', 'Body text', 'Important labels'],
    rules: 'Avoid pure black (#000000) for interface text.',
    contrastWithCream: '12.4:1 (WCAG AAA)',
    contrastWithWhite: '13.7:1 (WCAG AAA)',
  },
  secondaryText: {
    name: 'Secondary Text — Muted Slate',
    hex: '#667085',
    role: 'Subordinate metadata & indicators',
    purpose: ['Metadata', 'Supporting text', 'Timestamps', 'Secondary descriptions'],
    rules: 'Ensure sufficient contrast. Do not use below 13px.',
    contrastWithCream: '4.8:1 (WCAG AA)',
    contrastWithWhite: '5.3:1 (WCAG AA)',
  },
  success: {
    name: 'Success — Green',
    hex: '#2E7D5B',
    role: 'Positive state verification',
    purpose: ['Successful donation', 'Completed delivery', 'Confirmed states'],
    rules: 'Always accompany success color with text or an icon (e.g. ✓ Donation Accepted). Never communicate success through color alone.',
    contrastWithCream: '5.6:1 (WCAG AA)',
    contrastWithWhite: '6.2:1 (WCAG AA)',
  },
  warning: {
    name: 'Warning / Urgency — Amber',
    hex: '#C88719',
    role: 'Time-sensitivity notification',
    purpose: ['Food approaching freshness deadline', 'Time-sensitive donations', 'Action warnings'],
    rules: 'Use amber sparingly. Do not turn the entire screen amber. Pair with icon (⚠) and text.',
    contrastWithCream: '3.3:1 (Bold/Large UI)',
    contrastWithWhite: '3.6:1 (Bold/Large UI)',
  },
  critical: {
    name: 'Critical / Expired — Muted Red',
    hex: '#B54747',
    role: 'Failure & deadline expiration',
    purpose: ['Expired food', 'Cancelled donation', 'Critical errors'],
    rules: 'Use muted red rather than bright red. Combine with ✕ icon and clear descriptive copy.',
    contrastWithCream: '5.1:1 (WCAG AA)',
    contrastWithWhite: '5.6:1 (WCAG AA)',
  },
  borderSubtle: {
    name: 'Border — Subtle Grey',
    hex: '#E5E7EB',
    role: 'Structural boundary separation',
    purpose: ['Card boundaries', 'Input borders', 'Table divider lines', 'Horizontal dividers'],
    rules: 'Prefer subtle borders + spacing over heavy dropshadows.',
    contrastWithCream: '1.2:1 (Structural)',
    contrastWithWhite: '1.3:1 (Structural)',
  }
};
