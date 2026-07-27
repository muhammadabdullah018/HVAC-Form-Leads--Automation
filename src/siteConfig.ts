// Sazaan Heating & Air - Site Configuration
export const siteConfig = {
  brandName: "Sazaan Heating & Air",
  brandShort: "Sazaan H&A",
  phoneDisplay: "(555) 040-0199",
  phoneHref: "tel:+15550400199",
  serviceArea: "the Greater Metro area",
  licenseNumber: "HVAC-0042719",
  footerYear: new Date().getFullYear(),

  // Test n8n webhook URL
  leadWebhookUrl:
    (import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined) ||
    "https://balochbb.app.n8n.cloud/webhook-test/lead-capture",
};

export type SiteConfig = typeof siteConfig;
