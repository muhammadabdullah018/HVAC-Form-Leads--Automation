# Sazaan Heating & Air — HVAC Lead Automation Landing Page

A high-converting, modern single-page web application built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Features a liquid dark-mode design system, cinematic HLS background video, animated 3D assets, interactive quote form, and automated webhook integration for lead collection.

---

## ⚡ Tech Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + Custom Dark Glassmorphic Design Token System
- **Animations**: Framer Motion
- **Video Background**: HLS.js streaming via Mux
- **Icons**: Lucide React + Custom Inline SVGs
- **Form Management**: React Hook Form + Zod validation

---

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/muhammadabdullah018/HVAC-Form-Leads--Automation.git
   cd HVAC-Form-Leads--Automation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env.local` and add your n8n / webhook endpoint:
   ```bash
   cp .env.example .env.local
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploying to Vercel

This project is pre-configured for instant deployment on **Vercel**:

1. Push your repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/new) and select **Import Project**.
3. Choose your repository `HVAC-Form-Leads--Automation`.
4. Framework Preset: **Vite** (detected automatically).
5. Add `VITE_N8N_WEBHOOK_URL` in **Environment Variables** if using webhook automation.
6. Click **Deploy**!

---

## 📄 License

MIT License. Developed for Sazaan Heating & Air.
