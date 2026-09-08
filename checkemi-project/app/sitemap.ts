import type { MetadataRoute } from "next"
import { CALCULATOR_SEO_PAGES } from "@/lib/calculator-seo"
export const dynamic = 'force-dynamic'
const SITE_URL = "https://check-emi.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.6,
  }))

  const calculators = CALCULATOR_SEO_PAGES.map((page) => ({
    url: `${SITE_URL}/calculators/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))


  return [...pages, ...calculators]
}
