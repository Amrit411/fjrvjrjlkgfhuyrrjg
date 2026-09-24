import { LegendEntry } from '../types/mythology';

export function formatPowerTier(power: number): { label: string; tone: string } {
  if (power >= 95) return { label: 'Supreme Cosmic', tone: 'text-amber-400' };
  if (power >= 85) return { label: 'Primordial Major', tone: 'text-yellow-400' };
  if (power >= 75) return { label: 'Ascended Divine', tone: 'text-emerald-400' };
  if (power >= 60) return { label: 'Heroic Sovereign', tone: 'text-sky-400' };
  return { label: 'Earthly / Mystical', tone: 'text-slate-400' };
}

export function generateCitation(legend: LegendEntry): string {
  const year = new Date().getFullYear();
  return `"${legend.name}: ${legend.title}." Mythos Atlas: Comparative World Mythology Archive, edited by Curatorial Team, ${year}. Mythological Tradition: ${legend.mythology} (${legend.region}).`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
