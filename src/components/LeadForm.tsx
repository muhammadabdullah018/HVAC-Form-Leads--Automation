// Sazaan Heating & Air - Lead Submission Form Component
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2, Flame, Snowflake, Wrench } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/siteConfig";

const SERVICE_OPTIONS = [
  "AC Repair",
  "Heating Repair",
  "Installation / Replacement",
  "Routine Maintenance",
  "Plumbing",
  "Emergency (24/7)",
] as const;

const CONTACT_TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Anytime"] as const;

const URGENCY_OPTIONS = [
  { value: "emergency", label: "Emergency — ASAP", icon: Flame },
  { value: "this_week", label: "This Week", icon: Wrench },
  { value: "quote_only", label: "Quote Only", icon: Snowflake },
] as const;

const leadSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  phone: z
    .string()
    .trim()
    .refine((val) => (val.match(/\d/g)?.length ?? 0) >= 10, {
      message: "Enter a valid phone number",
    }),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(3, "Enter your service address or ZIP code"),
  serviceNeeded: z.enum(SERVICE_OPTIONS, {
    error: "Select the service you need",
  }),
  urgency: z.enum(["emergency", "this_week", "quote_only"], {
    error: "Select how soon you need help",
  }),
  contactTime: z.enum(CONTACT_TIME_OPTIONS).optional(),
  details: z.string().trim().max(1000, "Keep it under 1000 characters").optional(),
  website: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
  });

  const onSubmit = async (values: LeadFormValues) => {
    setStatus("submitting");

    try {
      const webhookUrl =
        siteConfig.leadWebhookUrl || "https://balochbb.app.n8n.cloud/webhook/lead-capture";

      const payload = {
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        service: values.serviceNeeded,
        message: values.details || "",
        website: values.website || "",
        address: values.address,
        urgency: values.urgency,
        contactTime: values.contactTime || "Anytime",
        submittedAt: new Date().toISOString(),
      };

      console.log("Posting lead to n8n webhook:", webhookUrl, payload);

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": import.meta.env.VITE_WEBHOOK_SECRET || "baloch..?123+**",
        },
        body: JSON.stringify(payload),
      });

      console.log("n8n Webhook response status code:", res.status);

      if (!res.ok) {
        throw new Error(`n8n Webhook HTTP error: ${res.status}`);
      }

      const data = await res.json().catch(() => null);
      console.log("n8n Webhook parsed JSON response:", data);

      if (data && data.status && data.status !== "success") {
        throw new Error(data.message || "n8n returned a non-success status");
      }

      // ONLY set success AFTER the fetch call completes with HTTP 200 OK
      setStatus("success");
    } catch (err) {
      console.error("Lead submission to n8n failed:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-[#131313]/60 backdrop-blur-xl p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.6)] md:p-10 max-w-xl mx-auto">
        <div className="rounded-full bg-purple-500/10 p-3 ring-1 ring-purple-500/20">
          <CheckCircle2 className="h-10 w-10 text-purple-400" />
        </div>
        <h3 className="font-kanit text-2xl font-semibold text-white tracking-tight">Got it — help is on the way!</h3>
        <p className="max-w-sm text-sm text-white/60 leading-relaxed font-kanit">
          A licensed dispatcher will reach out to you within one business hour. For immediate emergency dispatch, call{" "}
          <a href={siteConfig.phoneHref} className="font-medium text-purple-400 underline underline-offset-2 hover:text-purple-300">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-white/10 bg-[#131313]/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.6)] max-w-2xl mx-auto w-full relative"
    >
      {/* Visually hidden honeypot input */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <label htmlFor="hpWebsite">Company Website</label>
        <input
          id="hpWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="new-password"
          data-1p-ignore="true"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Full Name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="John Doe"
            aria-invalid={!!errors.fullName}
            className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500/30 transition-all font-kanit"
            {...register("fullName")}
          />
          {errors.fullName && <FieldError message={errors.fullName.message} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 123-4567"
            aria-invalid={!!errors.phone}
            className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500/30 transition-all font-kanit"
            {...register("phone")}
          />
          {errors.phone && <FieldError message={errors.phone.message} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500/30 transition-all font-kanit"
            {...register("email")}
          />
          {errors.email && <FieldError message={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Service Address / ZIP</Label>
          <Input
            id="address"
            autoComplete="postal-code"
            placeholder="123 Cozy Lane"
            aria-invalid={!!errors.address}
            className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500/30 transition-all font-kanit"
            {...register("address")}
          />
          {errors.address && <FieldError message={errors.address.message} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="serviceNeeded" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Service Needed</Label>
          <Controller
            control={control}
            name="serviceNeeded"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger 
                  id="serviceNeeded" 
                  aria-invalid={!!errors.serviceNeeded}
                  className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all font-kanit"
                >
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-white/10 text-white">
                  {SERVICE_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-purple-600 focus:text-white font-kanit">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.serviceNeeded && <FieldError message={errors.serviceNeeded.message} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="contactTime" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Best Time to Call</Label>
          <Controller
            control={control}
            name="contactTime"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger 
                  id="contactTime"
                  className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all font-kanit"
                >
                  <SelectValue placeholder="No preference" />
                </SelectTrigger>
                <SelectContent className="bg-[#161616] border-white/10 text-white">
                  {CONTACT_TIME_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt} className="text-white/80 focus:bg-purple-600 focus:text-white font-kanit">
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-white/80 font-kanit text-xs tracking-wider uppercase">Urgency Status</legend>
        <Controller
          control={control}
          name="urgency"
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {URGENCY_OPTIONS.map(({ value, label, icon: Icon }) => {
                const active = field.value === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => field.onChange(value)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 font-kanit",
                      active
                        ? "border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                        : "border-white/10 bg-[#1a1a1a]/60 text-white/70 hover:border-white/30 hover:text-white"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active ? "text-white" : "text-white/40")} />
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        />
        {errors.urgency && <FieldError message={errors.urgency.message} />}
      </fieldset>

      <div className="mt-5 flex flex-col gap-1.5">
        <Label htmlFor="details" className="text-white/80 font-kanit text-xs tracking-wider uppercase">Message Details</Label>
        <Textarea
          id="details"
          placeholder="AC not cooling, strange sounds, routine checkup, etc..."
          className="bg-[#1a1a1a]/60 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500 focus-visible:ring-1 focus-visible:ring-purple-500/30 transition-all font-kanit"
          {...register("details")}
        />
        {errors.details && <FieldError message={errors.details.message} />}
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400 font-kanit">
          Error sending request. Please call us directly at{" "}
          <a href={siteConfig.phoneHref} className="underline font-semibold hover:text-red-300">
            {siteConfig.phoneDisplay}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold uppercase tracking-wider text-white transition-all duration-200 outline-none hover:opacity-90 active:scale-[0.98]"
        style={{
          background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
          boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
          outline: "2px solid #E3E3E3",
          outlineOffset: "-3px",
        }}
      >
        {status === "submitting" ? "Submitting Request..." : "Request Dispatch"}
        <ArrowRight className="h-5 w-5" />
      </button>
      <p className="mt-3 text-center text-xs text-white/40 font-kanit">
        Avg. callback time is under 15 minutes. Emergency calls get priority.
      </p>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-semibold text-red-400 mt-1 font-kanit">{message}</p>;
}
