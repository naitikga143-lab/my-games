import { state } from './data.js';

export function inviteLink(slot) {
  const u = new URL(location.href);
  u.search = '';
  u.hash = '';
  u.searchParams.set('lobby', state.code);
  u.searchParams.set('join', `${slot.team}-${slot.player}`);
  return u.toString();
}

const text = (slot) =>
  `Hide and Seek: Peace Less me aao! Team ${slot.team} Player ${slot.player} ka slot khaali hai.`;

// phone ki share sheet: WhatsApp, Instagram, Telegram sab wahin dikhte hain
export async function nativeShare(slot) {
  if (!navigator.share) return false;
  try {
    await navigator.share({ title: 'Peace Less', text: text(slot), url: inviteLink(slot) });
  } catch { /* user ne cancel kiya */ }
  return true;
}

export const whatsappUrl = (slot) =>
  'https://wa.me/?text=' + encodeURIComponent(text(slot) + ' ' + inviteLink(slot));

export async function copyLink(slot) {
  try {
    await navigator.clipboard.writeText(inviteLink(slot));
    return true;
  } catch {
    prompt('Link copy karo:', inviteLink(slot));
    return false;
  }
}