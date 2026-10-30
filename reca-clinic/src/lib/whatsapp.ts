import { clinic } from '../data/clinic';

/** Prefilled WhatsApp message for a page or service, e.g. "Hi, saya berminat dengan Rawatan X." */
export function waMessage(topic?: string): string {
  return topic
    ? `Hi, saya berminat dengan ${topic}. Boleh saya tahu slot yang ada?`
    : `Hi, saya ingin bertanya tentang ${clinic.name}.`;
}

export function waLink(topic?: string): string {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(waMessage(topic))}`;
}

export const telLink = `tel:${clinic.phone}`;
