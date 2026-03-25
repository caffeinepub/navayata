# Navayata

## Current State
A classical Indian traditional clothing website with:
- HomePage with hero, features, collections, about, contact, footer
- Admin panel at /admin with password login
- WhatsApp enquiry flow on product cards
- Warm ivory/cream background with deep maroon (secondary) and antique gold (accent) theme
- Decorative mandala/lotus SVG elements throughout

## Requested Changes (Diff)

### Add
- New `/inquiry` route — a dedicated customer inquiry page
  - Unique, dramatic background (distinct from main site, still Indian-premium aesthetic — think dark rich jewel tones or ornate temple wall texture using CSS)
  - Form fields: Customer Name, Phone Number, City/Location, and Message (optional)
  - On submit: opens WhatsApp with all details pre-filled in message to 8910883176
  - Back button to return to home
- "Submit Inquiry" button/link visible on the main site (in the Contact CTA section and/or navbar) pointing to /inquiry

### Modify
- Main site background: upgrade to a "classic premium" look — richer, deeper, more refined. Replace the current warm ivory/cream bg with a deep, velvety dark tone (like deep navy-maroon or dark charcoal with warm undertones) accented by gold. The overall feel should be premium heritage — like a luxury Indian boutique. Keep all decorative elements (mandala, lotus, jali pattern) but adjust their opacity and colors for the new dark premium background.
- Update index.css `--background` and `--foreground` and card colors accordingly for the premium dark look.

### Remove
- Nothing removed

## Implementation Plan
1. Update `index.css` — change `--background` to a deep premium dark tone, update `--foreground`, `--card`, `--muted` for dark theme. Keep maroon secondary and gold accent.
2. Update `HomePage.tsx` — adjust any inline background styles to complement the new dark premium look. Add "Submit Inquiry" CTA in contact section and navbar.
3. Create `src/frontend/src/pages/InquiryPage.tsx` — dedicated page with unique ornate background (different from homepage — perhaps a deep jewel blue-green or indigo with gold jali pattern), customer form (Name, Phone, Location, Message), WhatsApp submit action.
4. Update `App.tsx` — add `/inquiry` route.
