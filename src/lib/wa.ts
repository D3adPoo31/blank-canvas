// WhatsApp helpers + currency formatter
export const WHATSAPP_PHONE = "5592993051106"; // (92) 99305-1106
export const WHATSAPP_PHONE_2 = "5592995010935"; // (92) 99501-0935
export const PIX_KEY = "adubodamazonia@gmail.com";
export const PIX_NAME = "Adubo Amazônico";
export const COMPANY_EMAIL = "adubodamazonia@gmail.com";
export const COMPANY_ADDRESS =
  "Ramal Pico Bela, CEP 69.415-000, Iranduba — Amazonas";

export const waLink = (text = "", phone: string = WHATSAPP_PHONE) =>
  `https://wa.me/${phone}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const formatBRL = (v: number) =>
  Number(v || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
