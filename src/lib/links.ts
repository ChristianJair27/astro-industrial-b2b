import { site } from '../config/site';

export function whatsappHref(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const telHref = `tel:${site.phoneHref}`;
export const mailHref = `mailto:${site.email}`;
/** mailto con asunto y cuerpo guía para RFQ por correo. */
export const rfqMailHref = `mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}&body=${encodeURIComponent(
  'Empresa:\nContacto:\nNúmero de parte / descripción:\nMaterial:\nVolumen anual:\nLink a planos (PDF/STEP):\n',
)}`;

export const mapsSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
export const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;
