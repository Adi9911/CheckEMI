import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How CheckEMI handles your data — the short version: your financial inputs never leave your device.",
}

const SECTIONS = [
  {
    title: "1. Your data stays with you",
    body: "Every calculation on CheckEMI runs entirely inside your web browser. The amounts, interest rates, tenures and dates you enter are never transmitted to us or stored on any server.",
  },
  {
    title: "2. No account required",
    body: "You do not need to register or sign in to use any calculator on CheckEMI. We do not collect names, email addresses or phone numbers unless you voluntarily contact us.",
  },
  {
    title: "3. Analytics",
    body: "We may use privacy-friendly, aggregate analytics to understand which calculators are popular and how the site performs. This data is anonymous and cannot be used to identify you.",
  },
  {
    title: "4. Cookies and local storage",
    body: "We use your browser's local storage only to remember lightweight preferences such as your light or dark theme choice. We do not use tracking cookies for advertising.",
  },
  {
    title: "5. Third-party links",
    body: "CheckEMI may occasionally link to external websites. We are not responsible for the privacy practices or content of those sites.",
  },
  {
    title: "6. Changes to this policy",
    body: "We may update this policy from time to time. Any changes will be posted on this page with a revised date.",
  },
]

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().getFullYear()}</p>
      <p className="mt-6 leading-relaxed text-muted-foreground">
        Your privacy matters to us. This policy explains, in plain language, how CheckEMI treats your information.
      </p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="text-lg font-semibold">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  )
}
