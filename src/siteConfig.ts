// Sazaan Heating & Air - Site Configuration
const rawWebhookUrl = (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined) || "";

// Enforce production webhook endpoint to prevent CORS preflight test-mode failures
const targetWebhookUrl =
  rawWebhookUrl.includes("webhook-test") || !rawWebhookUrl
    ? "https://balochbb.app.n8n.cloud/webhook/lead-capture"
    : rawWebhookUrl;

export const siteConfig = {
  brandName: "Sazaan Heating & Air",
  brandShort: "Sazaan H&A",
  phoneDisplay: "(555) 040-0199",
  phoneHref: "tel:+15550400199",
  serviceArea: "the Greater Metro area",
  licenseNumber: "HVAC-0042719",
  footerYear: new Date().getFullYear(),

  leadWebhookUrl: targetWebhookUrl,
};

export type SiteConfig = typeof siteConfig;
