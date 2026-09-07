"use client"

import { useState } from "react"
import { CheckCircle2, Download, Mail, Send } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ContactDraft = {
  name: string
  email: string
  subject: string
  message: string
}

export function ContactForm() {
  const [draft, setDraft] = useState<ContactDraft | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [pdfError, setPdfError] = useState("")

  const downloadPdf = async () => {
    if (!draft) return
    setIsDownloading(true)
    setPdfError("")

    try {
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()
      const margin = 20
      const pageWidth = doc.internal.pageSize.getWidth()
      let y = 24

      doc.setTextColor(10, 115, 82)
      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("CheckEMI Contact Request", margin, y)
      y += 14

      doc.setTextColor(45, 55, 72)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(11)

      const addField = (label: string, value: string) => {
        doc.setFont("helvetica", "bold")
        doc.text(label, margin, y)
        y += 6
        doc.setFont("helvetica", "normal")
        const lines = doc.splitTextToSize(value, pageWidth - margin * 2)
        doc.text(lines, margin, y)
        y += lines.length * 6 + 7
      }

      addField("Name", draft.name)
      addField("Email", draft.email)
      addField("Subject", draft.subject)
      addField("Message", draft.message)

      doc.setDrawColor(220, 226, 232)
      doc.line(margin, y, pageWidth - margin, y)
      y += 9
      doc.setFontSize(9)
      doc.setTextColor(100, 116, 139)
      doc.text("Generated from checkemi.app. This PDF was created in your browser.", margin, y)

      const safeSubject = draft.subject.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      doc.save(`checkemi-contact-${safeSubject || "request"}.pdf`)
    } catch {
      setPdfError("The PDF could not be created. Please try again or copy the message into your email app.")
    } finally {
      setIsDownloading(false)
    }
  }

  if (draft) {
    const emailBody = [
      `Name: ${draft.name}`,
      `Email: ${draft.email}`,
      "",
      draft.message,
      "",
      "A PDF copy of this request is also available from CheckEMI.",
    ].join("\n")
    const mailto = `mailto:hello@checkemi.app?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(emailBody)}`

    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="size-10 text-primary" aria-hidden />
        <h2 className="text-lg font-semibold">Your contact request is ready</h2>
        <p className="text-sm text-muted-foreground">
          Download the PDF for your records, or open your own email app to send the request to CheckEMI.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button type="button" onClick={downloadPdf} disabled={isDownloading}>
            <Download className="size-4" aria-hidden />
            {isDownloading ? "Creating PDF..." : "Download PDF"}
          </Button>
          <a href={mailto} className={buttonVariants({ variant: "outline" })}>
            <Mail className="size-4" aria-hidden />
            Open email app
          </a>
        </div>
        {pdfError ? <p className="text-sm text-destructive">{pdfError}</p> : null}
        <Button variant="link" type="button" onClick={() => setDraft(null)}>
          Send another
        </Button>
      </div>
    )
  }

  return (
    <form
      className="space-y-4 rounded-2xl border border-border bg-card p-6"
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        setDraft({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          subject: String(data.get("subject") ?? ""),
          message: String(data.get("message") ?? ""),
        })
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" required placeholder="How can we help?" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Write your message..."
          className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        <Send className="size-4" aria-hidden />
        Send message
      </Button>
    </form>
  )
}
