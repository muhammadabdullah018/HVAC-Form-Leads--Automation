// Swap these per client when reusing this template for a new pitch.
export const siteConfig = {
  brandName: "Sazaan Heating & Air",
  brandShort: "Sazaan H&A",
  phoneDisplay: "(555) 040-0199",
  phoneHref: "tel:+15550400199",
  serviceArea: "the Greater Metro area",
  licenseNumber: "HVAC-0042719",
  footerYear: new Date().getFullYear(),

  // Point this at an n8n "Webhook" trigger node (Production URL) to route
  // submitted leads into a workflow — e.g. write to a CRM, text the on-call
  // tech, send a confirmation email. Set VITE_N8N_WEBHOOK_URL in .env.local.
  // The form still shows a success state if this is unset, but nothing
  // will be sent anywhere until it's configured.
  leadWebhookUrl: import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined,
};

export type SiteConfig = typeof siteConfig;
