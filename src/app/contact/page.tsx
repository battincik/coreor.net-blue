"use client"
import React, { useState, useEffect, useRef, Suspense, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, Phone, MapPin, Clock, Send, CircleCheck as CheckCircle, Loader as Loader2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SERVICES } from "@/lib/services"
import countryList from "../../lib/countries.json"
type Country = {
  name: string
  dial_code: string
  code: string
}


const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary by scope. A standard MVP web application takes 6-10 weeks. Enterprise integrations may take 3-6 months. We always provide a detailed timeline during our discovery phase.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We work with everyone from early-stage startups to Fortune 500 companies. Our pricing and process adapts to your stage and budget.",
  },
  {
    q: "Do you sign NDAs and provide source code ownership?",
    a: "Yes to both. We sign NDAs before any project discussion. All code, IP, and deliverables are transferred to you fully upon project completion.",
  },
  {
    q: "What does ongoing support look like after launch?",
    a: "We offer flexible retainer packages for maintenance, monitoring, and feature development. Most clients continue with us on a monthly retainer after initial delivery.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Absolutely. We do thorough code audits before taking on existing projects and have extensive experience modernizing legacy systems.",
  },
  {
    q: "What is your development process?",
    a: "We follow Agile methodologies with 2-week sprints, weekly demos, and daily async standups. You always have visibility into progress and can provide feedback at every stage.",
  },
]

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.unobserve(el) }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>
      {children}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
      >
        <span className="font-medium text-foreground text-sm">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {open && <p className="text-sm text-muted-foreground pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

function SubjectPrefill({
  onSet,
}: {
  onSet: (k: keyof ContactForm, v: string) => void
}) {
  const search = useSearchParams()
  const lastAppliedSubject = useRef<string | null>(null)

  useEffect(() => {
    const subject = resolveSubjectValue(search)
    if (!subject || lastAppliedSubject.current === subject) return
    lastAppliedSubject.current = subject
    onSet("subject", subject)
  }, [search, onSet])

  return null
}

type ContactForm = {
  name: string
  email: string
  company: string
  role: string
  phoneCountry: string
  phone: string
  website: string
  subject: string
  message: string
}

type SubjectField =
  | { key: string; label: string; type: "select"; options: string[]; placeholder: string; required?: boolean }
  | { key: string; label: string; type: "radio"; options: string[]; required?: boolean }
  | { key: string; label: string; type: "checkbox"; options: string[]; helper?: string; required?: boolean }
  | { key: string; label: string; type: "textarea"; placeholder: string; required?: boolean }

const INIT: ContactForm = { name: "", email: "", company: "", role: "", phoneCountry: "TR", phone: "", website: "", subject: "", message: "" }
const timelines = ["ASAP", "Within 1-2 months", "3-6 months", "6+ months", "Exploring"]
const roles = [
  "Founder / CEO",
  "Product Manager / Product Owner",
  "Engineering Manager / Team Lead",
  "CTO / Head of Engineering",
  "Marketing / Growth",
  "Operations / Admin",
  "Other",
]
const phoneCountries = (countryList as Country[]).map((country) => ({
  label: country.name,
  code: country.dial_code,
  iso: country.code,
}))
const defaultPhoneCountry = phoneCountries.find((country) => country.iso === "TR") ?? phoneCountries[0]

function getPhoneCountryByIso(iso: string) {
  return phoneCountries.find((country) => country.iso === iso) ?? defaultPhoneCountry
}
const companySizes = ["1-10", "11-50", "51-200", "200+"]
const contactMethods = ["Email", "Phone", "WhatsApp", "Video Call"]
const projectTypes = ["New website", "Redesign", "Migration", "Ongoing development", "Integration"]
const projectPhases = ["Discovery", "MVP", "Growth", "Rescue / Fix existing work"]
const focusAreas = ["Product strategy", "Architecture", "SEO / Content", "Performance", "Technical planning"]
const deliveryModels = ["Fixed scope", "Retainer", "Discovery first"]
const priorities = ["SEO", "Speed", "Maintainability", "Integrations", "Conversion", "Scalability"]
const projectGoals = ["Launch faster", "Improve conversions", "Modernize old stack", "Stabilize existing product"]
const partnershipTypes = ["Technical partnership", "Delivery partnership", "White-label work", "Referral partnership"]
const supportScopes = ["Bug fixes", "Performance tuning", "Feature updates", "Security and maintenance", "All of the above"]
const urgencyLevels = ["Low", "Medium", "High", "Critical"]
const collaborationTypes = ["Lead generation", "Joint delivery", "White-label execution", "Long-term support"]
const serviceNeeds = ["Build from scratch", "Redesign", "Extend existing", "Audit / Improve"]
const serviceObjectives = ["SEO", "Speed", "Maintainability", "Integrations", "Conversion", "Scalability"]
const serviceEngagements = ["Fixed scope", "Retainer", "Discovery first"]
const cloudProviders = ["AWS", "GCP", "Azure", "Not decided"]
const cloudGoals = ["Migrate safely", "Reduce cost", "Increase reliability", "Improve observability"]
const aiUseCases = ["Chat assistant", "Search / retrieval", "Automation", "Summarization", "Classification"]
const dataReadiness = ["Ready", "Partially ready", "Needs cleanup", "Not sure yet"]
const dbTypes = ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Other"]
const dbIssues = ["Slow queries", "Schema design", "Migration", "Backup / recovery", "Scaling"]
const hostingNeeds = ["Managed hosting", "Deployment automation", "Monitoring", "Scaling", "Maintenance"]

const generalSubjects = [
  { value: "new-project", label: "New Project" },
  { value: "consulting", label: "Consulting" },
  { value: "partnership", label: "Partnership" },
  { value: "support-maintenance", label: "Support / Maintenance" },
  { value: "other", label: "Other" },
]

const serviceSubjects = SERVICES.map((service) => ({
  value: `service:${service.slug}`,
  label: service.title,
  description: service.short,
}))

const subjectOptions = [...generalSubjects, ...serviceSubjects]
const subjectLookup = new Map<string, string>([
  ...generalSubjects.map((subject) => [subject.value, subject.label] as const),
  ...serviceSubjects.map((subject) => [subject.value, subject.label] as const),
  ...generalSubjects.map((subject) => [subject.label.toLowerCase(), subject.value] as const),
  ...serviceSubjects.map((subject) => [subject.label.toLowerCase(), subject.value] as const),
  ...serviceSubjects.map((subject) => [subject.value.replace("service:", ""), subject.value] as const),
])

function resolveSubjectValue(search: URLSearchParams | null) {
  const raw = search?.get("service") ?? search?.get("subject") ?? search?.get("topic")
  if (!raw) return ""
  const normalized = raw.trim().toLowerCase()
  return subjectLookup.get(normalized) ?? subjectLookup.get(raw.trim()) ?? ""
}

function resolveSubjectLabel(value: string) {
  return subjectLookup.get(value) ?? value
}

function getSubjectCategory(value: string) {
  if (!value) return "general"
  return value.startsWith("service:") ? "service" : "general"
}

function formatPhoneNumber(countryCode: string, value: string) {
  const digits = value.replace(/\D/g, "")
  if (!digits) return ""

  if (countryCode === "+90") {
    const normalized = digits.replace(/^90/, "").replace(/^0/, "").slice(0, 10)
    if (!normalized) return ""
    const parts = [normalized.slice(0, 3), normalized.slice(3, 6), normalized.slice(6, 8), normalized.slice(8, 10)].filter(Boolean)
    return parts.join(" ")
  }

  return digits.slice(0, 15)
}

function getPhonePlaceholder(countryCode: string) {
  if (countryCode === "+90") return "555 555 55 55"
  if (countryCode === "+1") return "555 555 5555"
  if (countryCode === "+44") return "20 7946 0958"
  if (countryCode === "+49") return "30 123456"
  return "Phone number"
}

function getSubjectFields(subject: string): SubjectField[] {
  if (subject.startsWith("service:")) {
    return [
      { key: "serviceNeed", label: "What do you need?", type: "select", options: serviceNeeds, placeholder: "Choose the main need", required: true },
      { key: "serviceModel", label: "Engagement Model", type: "radio", options: serviceEngagements, required: true },
      { key: "serviceObjectives", label: "Primary Objectives", type: "checkbox", options: serviceObjectives, helper: "Select all that apply" },
      { key: "timeline", label: "Expected Timeline", type: "select", options: timelines, placeholder: "When do you want to start?", required: true },
      { key: "goal", label: "What should this service achieve?", type: "textarea", placeholder: "Describe the outcome you want.", required: true },
    ]
  }

  switch (subject) {
    case "new-project":
      return [
        { key: "projectType", label: "Project Type", type: "select", options: projectTypes, placeholder: "Select project type", required: true },
        { key: "projectPhase", label: "Current Phase", type: "radio", options: projectPhases, required: true },
        { key: "priorities", label: "Top Priorities", type: "checkbox", options: priorities, helper: "Pick the outcomes you care about most" },
        { key: "timeline", label: "Expected Timeline", type: "select", options: timelines, placeholder: "When do you want to start?", required: true },
        { key: "goal", label: "Project Goal", type: "textarea", placeholder: "What are you trying to build or improve?", required: true },
      ]
    case "consulting":
      return [
        { key: "focusArea", label: "Focus Area", type: "radio", options: focusAreas, required: true },
        { key: "consultingModel", label: "Session Type", type: "select", options: deliveryModels, placeholder: "Choose a format", required: true },
        { key: "consultingTopics", label: "Topics to Cover", type: "checkbox", options: ["Audit", "Planning", "Architecture", "SEO", "Workflow"], helper: "Select the topics you want us to cover" },
        { key: "goal", label: "What do you need help with?", type: "textarea", placeholder: "Decision, audit, architecture, planning, etc.", required: true },
      ]
    case "partnership":
      return [
        { key: "partnershipType", label: "Partnership Type", type: "select", options: partnershipTypes, placeholder: "Select partnership type", required: true },
        { key: "partnershipModel", label: "How do you want to work together?", type: "radio", options: collaborationTypes, required: true },
        { key: "partnershipGoals", label: "Partnership Goals", type: "checkbox", options: ["Lead gen", "Delivery", "Maintenance", "Product work", "White-label"], helper: "Choose all that fit" },
        { key: "goal", label: "Partnership Goal", type: "textarea", placeholder: "What would a successful partnership look like?", required: true },
      ]
    case "support-maintenance":
      return [
        { key: "supportScope", label: "Support Scope", type: "select", options: supportScopes, placeholder: "Select support scope", required: true },
        { key: "urgency", label: "Urgency", type: "radio", options: urgencyLevels, required: true },
        { key: "supportNeeds", label: "What should we focus on?", type: "checkbox", options: ["Bug fixes", "Performance", "Security", "Monitoring", "Updates"], helper: "Pick all that apply" },
        { key: "goal", label: "What needs attention?", type: "textarea", placeholder: "Bug, performance, security, feature work...", required: true },
      ]
    case "mobile-apps":
      return [
        { key: "mobileScope", label: "App Scope", type: "select", options: ["New app", "Redesign", "Add features", "Fix existing app"], placeholder: "Choose app scope", required: true },
        { key: "mobilePlatforms", label: "Target Platforms", type: "checkbox", options: ["iOS", "Android", "Both"], helper: "Select one or more platforms" },
        { key: "mobileStage", label: "Current Stage", type: "radio", options: ["Idea", "Prototype", "Live", "Needs rescue"], required: true },
        { key: "goal", label: "App Goal", type: "textarea", placeholder: "What should the app solve for users?", required: true },
      ]
    case "cloud-solutions":
      return [
        { key: "cloudProvider", label: "Cloud Provider", type: "select", options: cloudProviders, placeholder: "Choose provider", required: true },
        { key: "cloudGoal", label: "Main Goal", type: "radio", options: cloudGoals, required: true },
        { key: "cloudPriorities", label: "Priority Areas", type: "checkbox", options: ["Cost", "Security", "Reliability", "Observability", "Deployment"], helper: "Select all that matter" },
        { key: "goal", label: "What do you want to improve?", type: "textarea", placeholder: "Share the migration or operations challenge.", required: true },
      ]
    case "ai-integration":
      return [
        { key: "aiUseCase", label: "AI Use Case", type: "select", options: aiUseCases, placeholder: "Choose use case", required: true },
        { key: "dataReadiness", label: "Data Readiness", type: "radio", options: dataReadiness, required: true },
        { key: "aiNeeds", label: "Needs / Constraints", type: "checkbox", options: ["Latency", "Cost control", "Accuracy", "Guardrails", "Fallbacks"], helper: "Select the constraints you care about" },
        { key: "goal", label: "What should the AI do?", type: "textarea", placeholder: "Describe the workflow or product feature.", required: true },
      ]
    case "database-management":
      return [
        { key: "databaseType", label: "Database Type", type: "select", options: dbTypes, placeholder: "Choose database", required: true },
        { key: "databaseIssue", label: "Primary Issue", type: "radio", options: dbIssues, required: true },
        { key: "databaseNeeds", label: "What do you need?", type: "checkbox", options: ["Indexing", "Schema review", "Migration", "Backup plan", "Replication"], helper: "Choose all that apply" },
        { key: "goal", label: "What should we fix?", type: "textarea", placeholder: "Explain the problem or target state.", required: true },
      ]
    case "server-hosting":
      return [
        { key: "hostingNeed", label: "Hosting Need", type: "select", options: hostingNeeds, placeholder: "Choose hosting need", required: true },
        { key: "hostingState", label: "Current State", type: "radio", options: ["Not live yet", "Live but unstable", "Live and scaling", "Needs takeover"], required: true },
        { key: "hostingPriorities", label: "Priority Areas", type: "checkbox", options: ["Uptime", "Deployments", "Monitoring", "Scaling", "Backups"], helper: "Select all that matter" },
        { key: "goal", label: "What should improve?", type: "textarea", placeholder: "Share the ops challenge.", required: true },
      ]
    default:
      return [
        { key: "preferredContactMethod", label: "Preferred Contact Method", type: "select", options: contactMethods, placeholder: "How should we reach you?", required: true },
        { key: "goal", label: "Tell us more", type: "textarea", placeholder: "Share any extra details that help us route your request.", required: true },
      ]
  }
}

type SubjectFieldsSectionProps = {
  subjectFields: SubjectField[]
  details: Record<string, string | string[]>
  errors: Record<string, string>
  phoneCountryCode: string
  phoneCountryIso: string
  phoneValue: string
  phoneError?: string
  phonePlaceholder: string
  onPhoneCountryChange: (value: string) => void
  onPhoneChange: (value: string) => void
  onDetailChange: (key: string, value: string) => void
  onDetailToggle: (key: string, option: string) => void
}

const SubjectFieldsSection = React.memo(function SubjectFieldsSection({
  subjectFields,
  details,
  errors,
  phoneCountryCode,
  phoneCountryIso,
  phoneValue,
  phoneError,
  phonePlaceholder,
  onPhoneCountryChange,
  onPhoneChange,
  onDetailChange,
  onDetailToggle,
}: SubjectFieldsSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[160px_minmax(0,1fr)] gap-4">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Country</label>
          <Select value={phoneCountryIso} onValueChange={onPhoneCountryChange}>
            <SelectTrigger className="w-full border-border/60 bg-card/80 text-foreground shadow-sm backdrop-blur-sm">
              <SelectValue placeholder="Country code" />
            </SelectTrigger>
            <SelectContent>
              {phoneCountries.map((country) => (
                <SelectItem key={country.iso} value={country.iso}>
                  {country.label} ({country.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number</label>
          <Input value={phoneValue} onChange={e => onPhoneChange(e.target.value)} placeholder={phonePlaceholder} inputMode="tel" autoComplete="tel" className="bg-input/30" />
          {phoneError ? <p className="text-xs text-destructive mt-1">{phoneError}</p> : null}
          <p className="mt-1 text-[11px] text-muted-foreground">Country code: {phoneCountryCode}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-background/30 p-4 space-y-4">
        <div>
          <p className="text-sm font-semibold text-foreground">Subject-specific details</p>
          <p className="text-xs text-muted-foreground">Fill only what matters for this topic.</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {subjectFields.map((field) => (
            <div key={field.key} className="w-full">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{field.label}</label>
              {field.type === "select" ? (
                <Select value={String(details[field.key] ?? "")} onValueChange={(value) => onDetailChange(field.key, value)}>
                  <SelectTrigger className="w-full border-border/60 bg-card/80 text-foreground shadow-sm backdrop-blur-sm">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === "radio" ? (
                <RadioGroup value={String(details[field.key] ?? "")} onValueChange={(value) => onDetailChange(field.key, value)} className="grid grid-cols-1 gap-2">
                  {field.options.map((option) => (
                    <label key={option} className="flex w-full items-center gap-3 rounded-xl border border-border/60 bg-card/60 px-3 py-3 text-left text-sm leading-snug text-foreground hover:border-primary/50 transition-colors">
                      <RadioGroupItem value={option} />
                      <span className="min-w-0 whitespace-normal wrap-break-word">{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              ) : field.type === "checkbox" ? (
                <div className="space-y-3 rounded-xl border border-border/60 bg-card/60 p-3">
                  {field.helper ? <p className="text-xs text-muted-foreground">{field.helper}</p> : null}
                  <div className="grid grid-cols-1 gap-2">
                    {field.options.map((option) => {
                      const current = Array.isArray(details[field.key]) ? (details[field.key] as string[]) : []
                      const checked = current.includes(option)
                      return (
                        <label key={option} className="flex w-full items-start gap-3 rounded-lg border border-border/40 px-3 py-3 text-left text-sm leading-snug text-foreground hover:border-primary/50 transition-colors">
                          <Checkbox checked={checked} onCheckedChange={() => onDetailToggle(field.key, option)} />
                          <span className="min-w-0 whitespace-normal wrap-break-word">{option}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <Textarea
                  value={String(details[field.key] ?? "")}
                  onChange={(e) => onDetailChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  rows={4}
                  className="bg-input/30 resize-none"
                />
              )}
              {errors[field.key] ? <p className="text-xs text-destructive mt-1">{errors[field.key]}</p> : null}
            </div>
          ))}
        </div>
      </div>
    </>
  )
})

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(INIT)
  const [details, setDetails] = useState<Record<string, string | string[]>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const formStartedAt = useRef(Date.now())
  const subjectFields = useMemo(() => (form.subject ? getSubjectFields(form.subject) : []), [form.subject])
  const selectedPhoneCountry = useMemo(() => getPhoneCountryByIso(form.phoneCountry), [form.phoneCountry])

  const set = useCallback((k: keyof ContactForm, v: string) => {
    if (k === "subject") {
      setDetails({})
    }
    setForm((prev) => ({ ...prev, [k]: v }))
    setErrors((prev) => {
      if (!prev[k]) return prev
      return { ...prev, [k]: "" }
    })
  }, [])

  const setDetail = useCallback((key: string, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const toggleDetail = useCallback((key: string, option: string) => {
    setDetails((prev) => {
      const current = Array.isArray(prev[key]) ? prev[key] as string[] : []
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
      return { ...prev, [key]: next }
    })
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }, [])

  const handlePhoneChange = useCallback((value: string) => {
    set("phone", formatPhoneNumber(selectedPhoneCountry.code, value))
  }, [selectedPhoneCountry.code, set])

  const handlePhoneCountryChange = useCallback((value: string) => {
    setForm((prev) => ({
      ...prev,
      phoneCountry: value,
      phone: formatPhoneNumber(getPhoneCountryByIso(value).code, prev.phone),
    }))
  }, [])

  const validateEmail = useCallback((value: string) => {
    const email = value.trim()
    if (!email) return "Required"
    if (!email.includes("@") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address"
    return ""
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Required"
    const emailError = validateEmail(form.email)
    if (emailError) e.email = emailError
    if (!form.role.trim()) e.role = "Please select your role"
    if (!form.subject) e.subject = "Please select a subject"
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please write at least 20 characters"
    subjectFields.forEach((field) => {
      if (!field.required) return
      const value = details[field.key]
      if (field.type === "checkbox") {
        if (!Array.isArray(value) || value.length === 0) e[field.key] = "Please select at least one option"
      } else if (!String(value ?? "").trim()) {
        e[field.key] = "Required"
      }
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const elapsedMs = Date.now() - formStartedAt.current
    const botSuspected = Boolean(form.website.trim()) || elapsedMs < 4000

    setSubmitting(true)

    setSubmitError("")

    try {
      const response = await fetch("https://api.coreor.net/v1/contact/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullName: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim() || null,
          role: form.role || null,
          phoneCountryIso: form.phoneCountry,
          phoneCountryCode: getPhoneCountryByIso(form.phoneCountry).code,
          phone: form.phone ? `${getPhoneCountryByIso(form.phoneCountry).code} ${form.phone}`.trim() : null,
          website: form.website.trim() || null,
          subjectCategory: getSubjectCategory(form.subject),
          subject: resolveSubjectLabel(form.subject),
          subjectKey: form.subject,
          subjectSpecificDetails: Object.fromEntries(
            subjectFields.map((field) => [field.key, details[field.key] ?? null])
          ),
          message: form.message.trim(),
          pageUrl: typeof window !== "undefined" ? window.location.href : null,
          referrer: typeof document !== "undefined" ? document.referrer || null : null,
          elapsedMs,
          botSuspected,
        }),
      })

      const json = await response.json().catch(() => null)

      if (!response.ok || (json && json.status && json.status !== "success")) {
        throw new Error(json?.message || "Failed to send message")
      }

      if (botSuspected) {
        setSubmitError("Please take a moment before sending again.")
        return
      }

      setSubmitted(true)
      setForm(INIT)
      setDetails({})
      formStartedAt.current = Date.now()
    } catch (error) {
      console.error(error)
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 hero-glow" />
        <div className="relative max-w-3xl mx-auto px-6">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
            Get in Touch
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Let's <span className="gradient-text">Talk</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your project. We'll get back to you within 24 hours with an initial response.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-10 border-y border-border/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Mail, label: "Email", value: "hello@coreor.net", sub: "Fastest response" },
              { icon: Phone, label: "Phone", value: "+90 (312) 911 4815", sub: "Mon–Fri 9am–6pm" },
              { icon: MapPin, label: "Office", value: "Ankara, Turkey", sub: "By appointment" },
              { icon: Clock, label: "Response Time", value: "< 24 hours", sub: "Usually much faster" },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 70}>
                <div className="glow-card rounded-xl p-5 bg-card flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      {(() => { const Icon = item.icon; return <Icon className="w-4 h-4 text-primary" /> })()}
                    </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                    <div className="text-sm font-medium text-foreground">{item.value}</div>
                    <div className="text-xs text-primary mt-0.5">{item.sub}</div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form + FAQ */}
      <section className="py-24 relative">
        <div className="absolute inset-0 dot-bg opacity-15" />
        <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Form */}
          <RevealSection>
            <div className="glow-card rounded-2xl p-8 bg-card">
              <div className="flex items-center gap-2.5 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Send a Message</h2>
              </div>
                  <Suspense fallback={null}>
                    <SubjectPrefill onSet={set} />
                  </Suspense>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thanks {form.name.split(" ")[0]}! We'll be in touch within 24 hours.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => { setForm(INIT); setSubmitted(false) }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    name="website"
                    value={form.website}
                    onChange={e => set("website", e.target.value)}
                    className="sr-only"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
                      <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" aria-invalid={!!errors.name} className="bg-input/30" />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
                      <Input
                        type="text"
                        inputMode="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={e => set("email", e.target.value)}
                        onBlur={e => {
                          const nextError = validateEmail(e.target.value)
                          setErrors((prev) => ({ ...prev, email: nextError }))
                        }}
                        placeholder="jane@company.com"
                        aria-invalid={!!errors.email}
                        className="bg-input/30"
                      />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Company / Organization</label>
                      <Input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Corp" className="bg-input/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your Role *</label>
                      <Select value={form.role} onValueChange={(value) => set("role", value)}>
                        <SelectTrigger className="w-full border-border/60 bg-card/80 text-foreground shadow-sm backdrop-blur-sm">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.role && <p className="text-xs text-destructive mt-1">{errors.role}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subject *</label>
                    <Select value={form.subject} onValueChange={(value) => set("subject", value)}>
                      <SelectTrigger className="w-full border-border/60 bg-card/80 text-foreground shadow-sm backdrop-blur-sm" aria-invalid={!!errors.subject}>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>General</SelectLabel>
                          {generalSubjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Services</SelectLabel>
                          {serviceSubjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                  </div>

                  {form.subject ? (
                    <>
                      <SubjectFieldsSection
                        subjectFields={subjectFields}
                        details={details}
                        errors={errors}
                        phoneCountryCode={selectedPhoneCountry.code}
                        phoneCountryIso={form.phoneCountry}
                        phoneValue={form.phone}
                        phoneError={errors.phone}
                        phonePlaceholder={getPhonePlaceholder(selectedPhoneCountry.code)}
                        onPhoneCountryChange={handlePhoneCountryChange}
                        onPhoneChange={handlePhoneChange}
                        onDetailChange={setDetail}
                        onDetailToggle={toggleDetail}
                      />

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message *</label>
                        <Textarea
                          value={form.message}
                          onChange={e => set("message", e.target.value)}
                          placeholder="Tell us about your project, goals, timeline, and any other relevant details..."
                          rows={5}
                          aria-invalid={!!errors.message}
                          className="bg-input/30 resize-none"
                        />
                        {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                      </div>

                      <Button type="submit" disabled={submitting} className="w-full btn-glow bg-primary text-primary-foreground font-semibold">
                        {submitting ? (
                          <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <><Send className="mr-2 w-4 h-4" /> Send Message</>
                        )}
                      </Button>
                      {submitError ? <p className="text-sm text-destructive text-center">{submitError}</p> : null}
                    </>
                  ) : null}
                </form>
              )}
            </div>
          </RevealSection>

          {/* FAQ */}
          <RevealSection delay={150}>
            <div>
              <Badge variant="outline" className="mb-5 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
                FAQ
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">Common Questions</h2>
              <div className="divide-y divide-border/50 rounded-xl bg-card border border-border/40 px-6">
                {faqs.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="py-16 bg-card/30 border-t border-border/30 relative">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <RevealSection>
            <p className="text-muted-foreground text-sm mb-2">Prefer a direct conversation?</p>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Book a Free 30-Minute Discovery Call
            </h3>
            <Button size="lg" className="btn-glow bg-primary text-primary-foreground font-semibold">
              Schedule a Call
            </Button>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
