import type { Metadata } from "next"
import { Mail, MessageSquare, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the CheckEMI team. We welcome feedback, questions and suggestions.",
}

const INFO = [
  { icon: Mail, title: "Email", value: "hello@checkemi.app" },
  { icon: MessageSquare, title: "Feedback", value: "Tell us which calculator to build next" },
  { icon: Clock, title: "Response time", value: "Usually within 1–2 business days" },
]

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact us</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Have a question, spotted a bug, or want us to add a new calculator? We&apos;d love to hear from you.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <ContactForm />
        <div className="space-y-3">
          {INFO.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
