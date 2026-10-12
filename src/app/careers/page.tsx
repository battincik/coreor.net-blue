"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  Clock3,
  ExternalLink,
  Heart,
  Laptop2,
  Loader2,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const API_BASE = "https://api.coreor.net"

export type JobPosition = {
  id: string
  title: string
  department: string
  location: string
  type: string
  workplace_model?: string | null
  seniority?: string | null
  employment_level?: string | null
  salary_range?: string | null
  salary_min?: number | string | null
  salary_max?: number | string | null
  salary_currency?: string | null
  salary_period?: string | null
  description: string
  responsibilities?: string[] | string | null
  requirements: string[] | string
  nice_to_have?: string[] | string | null
  benefits?: string[] | string | null
  skills?: string[] | string | null
  headcount?: number | string | null
  application_deadline?: string | null
  contact_email?: string | null
  featured?: boolean | number
  is_active: boolean | number
  created_at: string
}

type ApplicationForm = {
  first_name: string
  last_name: string
  email: string
  phone: string
  experience_years: string
  applicant_role: string
  current_company: string
  linkedin_url: string
  portfolio_url: string
  notice_period: string
  expected_salary: string
  expected_salary_currency: string
  work_authorization: string
  willing_to_relocate: boolean
  remote_preference: string
  preferred_contact: string
  cover_letter: string
  how_did_you_hear: string
  privacy_consent: boolean
}

const INITIAL_FORM: ApplicationForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  experience_years: "",
  applicant_role: "",
  current_company: "",
  linkedin_url: "",
  portfolio_url: "",
  notice_period: "",
  expected_salary: "",
  expected_salary_currency: "TRY",
  work_authorization: "",
  willing_to_relocate: false,
  remote_preference: "",
  preferred_contact: "email",
  cover_letter: "",
  how_did_you_hear: "",
  privacy_consent: false,
}

const benefits = [
  { icon: Zap, title: "High ownership", desc: "Small teams, clear responsibility and room to make decisions." },
  { icon: Laptop2, title: "Flexible work", desc: "Role-dependent remote and hybrid options with outcome-focused work." },
  { icon: TrendingUp, title: "Continuous growth", desc: "Time and support for learning, experimentation and technical depth." },
  { icon: Heart, title: "Sustainable pace", desc: "We value consistency, quality and long-term performance over busywork." },
  { icon: ShieldCheck, title: "Strong engineering standards", desc: "Security, maintainability and observability are part of the product." },
  { icon: Users, title: "Direct collaboration", desc: "Work closely with product, design and engineering without unnecessary layers." },
]

function list(value: JobPosition["requirements"] | undefined | null) {
  if (Array.isArray(value)) return value.filter(Boolean)
  if (!value) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter(Boolean) : []
  } catch {
    return []
  }
}

function money(position: JobPosition) {
  if (position.salary_range) return position.salary_range
  if (position.salary_min == null && position.salary_max == null) return null
  const currency = position.salary_currency || "TRY"
  const period = position.salary_period ? ` / ${position.salary_period}` : ""
  const formatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 })
  const min = position.salary_min != null ? formatter.format(Number(position.salary_min)) : null
  const max = position.salary_max != null ? formatter.format(Number(position.salary_max)) : null
  return `${min || ""}${min && max ? " – " : ""}${max || ""} ${currency}${period}`.trim()
}

function deadline(value?: string | null) {
  if (!value) return null
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return null
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(parsed)
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.setTimeout(() => setVisible(true), delay)
        observer.unobserve(el)
      }
    }, { threshold: 0.08 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}>{children}</div>
}

function Meta({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><Icon className="h-3.5 w-3.5 text-primary" />{children}</span>
}

function JobCard({ position, onApply }: { position: JobPosition; onApply: (position: JobPosition) => void }) {
  const [open, setOpen] = useState(false)
  const required = list(position.requirements)
  const responsibilities = list(position.responsibilities)
  const niceToHave = list(position.nice_to_have)
  const jobBenefits = list(position.benefits)
  const skills = list(position.skills)
  const salary = money(position)
  const due = deadline(position.application_deadline)

  return (
    <article className="glow-card overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm">
      <button type="button" onClick={() => setOpen(value => !value)} className="w-full p-6 text-left md:p-7">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {Boolean(position.featured) && <Badge className="border-primary/30 bg-primary/10 text-primary"><Sparkles className="mr-1 h-3 w-3" />Featured</Badge>}
              <Badge variant="outline" className="border-border/70 bg-background/30">{position.department}</Badge>
              {position.seniority && <Badge variant="outline" className="border-border/70 text-muted-foreground">{position.seniority}</Badge>}
            </div>
            <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground md:text-2xl">{position.title}</h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Meta icon={MapPin}>{position.location}</Meta>
              <Meta icon={BriefcaseBusiness}>{position.type}</Meta>
              {position.workplace_model && <Meta icon={Laptop2}>{position.workplace_model}</Meta>}
              {salary && <Meta icon={CircleDollarSign}>{salary}</Meta>}
              {due && <Meta icon={CalendarDays}>Apply by {due}</Meta>}
            </div>
            {skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.slice(0, 6).map(skill => <span key={skill} className="rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-xs text-primary/90">{skill}</span>)}
                {skills.length > 6 && <span className="px-2 py-1 text-xs text-muted-foreground">+{skills.length - 6}</span>}
              </div>
            )}
          </div>
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/40 text-muted-foreground transition-colors hover:text-primary">
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </div>
      </button>

      {open && (
        <div className="border-t border-border/50 bg-background/20 px-6 py-7 md:px-7">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="space-y-8">
              <section>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary">About the role</h4>
                <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">{position.description}</p>
              </section>
              {responsibilities.length > 0 && <ListSection title="What you'll do" items={responsibilities} />}
              {required.length > 0 && <ListSection title="What we're looking for" items={required} />}
              {niceToHave.length > 0 && <ListSection title="Nice to have" items={niceToHave} muted />}
              {jobBenefits.length > 0 && <ListSection title="What this role offers" items={jobBenefits} />}
            </div>
            <aside className="h-fit rounded-xl border border-border/60 bg-card/70 p-5">
              <div className="mb-5">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Position details</div>
                <div className="mt-3 space-y-3 text-sm">
                  <Detail label="Department" value={position.department} />
                  <Detail label="Employment" value={position.type} />
                  <Detail label="Workplace" value={position.workplace_model || "Flexible"} />
                  <Detail label="Seniority" value={position.seniority || position.employment_level || "Not specified"} />
                  <Detail label="Openings" value={String(Number(position.headcount || 1))} />
                  {salary && <Detail label="Compensation" value={salary} />}
                  {due && <Detail label="Deadline" value={due} />}
                </div>
              </div>
              <Button onClick={() => onApply(position)} className="btn-glow w-full bg-primary font-semibold text-primary-foreground">Apply now <ArrowRight className="ml-2 h-4 w-4" /></Button>
              {position.contact_email && <a href={`mailto:${position.contact_email}`} className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-primary">Questions about this role? <ExternalLink className="h-3 w-3" /></a>}
            </aside>
          </div>
        </div>
      )}
    </article>
  )
}

function ListSection({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <section>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((item, index) => <li key={`${item}-${index}`} className={`flex gap-3 text-sm leading-6 ${muted ? "text-muted-foreground" : "text-foreground/85"}`}><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" /><span>{item}</span></li>)}
      </ul>
    </section>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-2.5 last:border-0 last:pb-0"><span className="text-muted-foreground">{label}</span><strong className="max-w-[150px] text-right font-medium text-foreground">{value}</strong></div>
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}{required ? " *" : ""}</span>{children}{error && <span className="mt-1 block text-xs text-destructive">{error}</span>}</label>
}

function ApplicationModal({ position, onClose }: { position: JobPosition; onClose: () => void }) {
  const [form, setForm] = useState<ApplicationForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationForm, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = previous }
  }, [])

  const set = <K extends keyof ApplicationForm>(key: K, value: ApplicationForm[K]) => {
    setForm(current => ({ ...current, [key]: value }))
    setErrors(current => ({ ...current, [key]: undefined }))
    setSubmitError("")
  }

  const validate = () => {
    const next: Partial<Record<keyof ApplicationForm, string>> = {}
    if (!form.first_name.trim()) next.first_name = "First name is required"
    if (!form.last_name.trim()) next.last_name = "Last name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address"
    if (!form.experience_years || Number.isNaN(Number(form.experience_years)) || Number(form.experience_years) < 0) next.experience_years = "Enter your years of experience"
    if (form.linkedin_url && !/^https?:\/\//i.test(form.linkedin_url)) next.linkedin_url = "Use a full URL starting with http:// or https://"
    if (form.portfolio_url && !/^https?:\/\//i.test(form.portfolio_url)) next.portfolio_url = "Use a full URL starting with http:// or https://"
    if (form.cover_letter.trim().length < 80) next.cover_letter = "Please write at least 80 characters"
    if (!form.privacy_consent) next.privacy_consent = "Consent is required to submit your application"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setSubmitError("")
    try {
      const response = await fetch(`${API_BASE}/v1/jobs/${encodeURIComponent(position.id)}/apply`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          experience_years: Number(form.experience_years),
          applicant_role: form.applicant_role.trim() || null,
          current_company: form.current_company.trim() || null,
          linkedin_url: form.linkedin_url.trim() || null,
          portfolio_url: form.portfolio_url.trim() || null,
          notice_period: form.notice_period.trim() || null,
          expected_salary: form.expected_salary ? Number(form.expected_salary) : null,
          expected_salary_currency: form.expected_salary ? form.expected_salary_currency : null,
          work_authorization: form.work_authorization.trim() || null,
          remote_preference: form.remote_preference || null,
          preferred_contact: form.preferred_contact || null,
          cover_letter: form.cover_letter.trim(),
          how_did_you_hear: form.how_did_you_hear.trim() || null,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.status !== "success") throw new Error(result.message || "Application could not be submitted")
      setSuccess(true)
    } catch (reason) {
      setSubmitError(reason instanceof Error ? reason.message : "Application could not be submitted")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <button className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} aria-label="Close application" />
      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-black/40">
        <header className="flex items-start justify-between gap-6 border-b border-border/50 bg-card/95 px-5 py-4 backdrop-blur md:px-7">
          <div className="min-w-0">
            <div className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">Application</div>
            <h2 className="truncate text-xl font-bold text-foreground">{position.title}</h2>
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground"><span>{position.department}</span><span>·</span><span>{position.location}</span><span>·</span><span>{position.workplace_model || position.type}</span></div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:border-primary/30 hover:text-primary"><X className="h-4 w-4" /></button>
        </header>

        {success ? (
          <div className="overflow-y-auto px-6 py-16 text-center md:px-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10"><CheckCircle2 className="h-8 w-8 text-primary" /></div>
            <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Application received</Badge>
            <h3 className="mb-3 text-2xl font-bold">Thanks, {form.first_name}.</h3>
            <p className="mx-auto max-w-lg leading-7 text-muted-foreground">Your application for <strong className="font-medium text-foreground">{position.title}</strong> is now in our hiring pipeline. If your profile matches the role, the team will contact you using your preferred channel.</p>
            <Button variant="outline" onClick={onClose} className="mt-8">Close</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-7">
              <div className="space-y-8">
                <FormSection number="01" title="Contact information" description="How we can reach you during the hiring process.">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="First name" required error={errors.first_name}><Input value={form.first_name} onChange={e => set("first_name", e.target.value)} className="bg-background/40" /></Field>
                    <Field label="Last name" required error={errors.last_name}><Input value={form.last_name} onChange={e => set("last_name", e.target.value)} className="bg-background/40" /></Field>
                    <Field label="Email" required error={errors.email}><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="name@example.com" className="bg-background/40" /></Field>
                    <Field label="Phone"><Input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+90 5xx xxx xx xx" className="bg-background/40" /></Field>
                    <Field label="Preferred contact">
                      <select value={form.preferred_contact} onChange={e => set("preferred_contact", e.target.value)} className="h-10 w-full rounded-md border border-input bg-background/40 px-3 text-sm"><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select>
                    </Field>
                  </div>
                </FormSection>

                <FormSection number="02" title="Professional profile" description="A concise overview of your current experience.">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Current role"><Input value={form.applicant_role} onChange={e => set("applicant_role", e.target.value)} placeholder="Senior Full-Stack Developer" className="bg-background/40" /></Field>
                    <Field label="Current company"><Input value={form.current_company} onChange={e => set("current_company", e.target.value)} className="bg-background/40" /></Field>
                    <Field label="Years of experience" required error={errors.experience_years}><Input type="number" min="0" max="60" value={form.experience_years} onChange={e => set("experience_years", e.target.value)} className="bg-background/40" /></Field>
                    <Field label="Notice period"><Input value={form.notice_period} onChange={e => set("notice_period", e.target.value)} placeholder="Immediately / 2 weeks / 1 month" className="bg-background/40" /></Field>
                    <Field label="LinkedIn" error={errors.linkedin_url}><Input value={form.linkedin_url} onChange={e => set("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/..." className="bg-background/40" /></Field>
                    <Field label="Portfolio / GitHub" error={errors.portfolio_url}><Input value={form.portfolio_url} onChange={e => set("portfolio_url", e.target.value)} placeholder="https://github.com/..." className="bg-background/40" /></Field>
                  </div>
                </FormSection>

                <FormSection number="03" title="Work preferences" description="Helps us assess practical fit before interviews.">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Work authorization"><Input value={form.work_authorization} onChange={e => set("work_authorization", e.target.value)} placeholder="e.g. Authorized to work in Türkiye" className="bg-background/40" /></Field>
                    <Field label="Workplace preference">
                      <select value={form.remote_preference} onChange={e => set("remote_preference", e.target.value)} className="h-10 w-full rounded-md border border-input bg-background/40 px-3 text-sm"><option value="">No preference</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="On-site">On-site</option></select>
                    </Field>
                    <Field label="Expected salary">
                      <div className="grid grid-cols-[1fr_95px] gap-2"><Input type="number" min="0" value={form.expected_salary} onChange={e => set("expected_salary", e.target.value)} placeholder="Optional" className="bg-background/40" /><select value={form.expected_salary_currency} onChange={e => set("expected_salary_currency", e.target.value)} className="h-10 rounded-md border border-input bg-background/40 px-2 text-sm"><option>TRY</option><option>USD</option><option>EUR</option><option>GBP</option></select></div>
                    </Field>
                    <label className="flex items-center gap-3 rounded-lg border border-border/60 bg-background/30 px-4 py-3 text-sm"><input type="checkbox" checked={form.willing_to_relocate} onChange={e => set("willing_to_relocate", e.target.checked)} /><span><strong className="block font-medium text-foreground">Open to relocation</strong><span className="text-xs text-muted-foreground">I can relocate if the role requires it.</span></span></label>
                  </div>
                </FormSection>

                <FormSection number="04" title="Your application" description="Tell us why this role and Coreor are a strong match.">
                  <div className="space-y-4">
                    <Field label="Cover letter" required error={errors.cover_letter}><Textarea value={form.cover_letter} onChange={e => set("cover_letter", e.target.value)} rows={7} placeholder="What interests you about this role? What would you bring to the team?" className="resize-none bg-background/40" /><div className="mt-1 text-right text-xs text-muted-foreground">{form.cover_letter.length} characters</div></Field>
                    <Field label="How did you hear about Coreor?"><Input value={form.how_did_you_hear} onChange={e => set("how_did_you_hear", e.target.value)} placeholder="LinkedIn, referral, GitHub, search…" className="bg-background/40" /></Field>
                  </div>
                </FormSection>

                <label className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/30 p-4 text-sm">
                  <input className="mt-1" type="checkbox" checked={form.privacy_consent} onChange={e => set("privacy_consent", e.target.checked)} />
                  <span><strong className="font-medium text-foreground">Candidate data consent</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">I consent to Coreor storing and processing the information in this application for recruitment and candidate evaluation purposes.</span>{errors.privacy_consent && <span className="mt-1 block text-xs text-destructive">{errors.privacy_consent}</span>}</span>
                </label>
                {submitError && <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{submitError}</div>}
              </div>
            </div>
            <footer className="flex items-center justify-between gap-4 border-t border-border/50 bg-card/95 px-5 py-4 backdrop-blur md:px-7">
              <span className="hidden text-xs text-muted-foreground sm:block">Required fields are marked with *</span>
              <div className="ml-auto flex gap-2"><Button type="button" variant="outline" onClick={onClose}>Cancel</Button><Button type="submit" disabled={submitting} className="btn-glow bg-primary font-semibold text-primary-foreground">{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting</> : <>Submit application <ArrowRight className="ml-2 h-4 w-4" /></>}</Button></div>
            </footer>
          </form>
        )}
      </div>
    </div>
  )
}

function FormSection({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return <section className="grid gap-5 md:grid-cols-[180px_minmax(0,1fr)]"><div><div className="text-xs font-semibold tracking-[0.18em] text-primary">{number}</div><h3 className="mt-1 font-semibold text-foreground">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div><div>{children}</div></section>
}

export default function CareersPage() {
  const [positions, setPositions] = useState<JobPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)
  const [query, setQuery] = useState("")
  const [department, setDepartment] = useState("all")
  const [workplace, setWorkplace] = useState("all")

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      setLoading(true)
      setLoadError("")
      try {
        const response = await fetch(`${API_BASE}/v1/jobs`, { cache: "no-store" })
        const result = await response.json().catch(() => ({}))
        if (!response.ok || result.status !== "success") throw new Error(result.message || "Open positions could not be loaded")
        if (!cancelled) setPositions(Array.isArray(result.data) ? result.data : [])
      } catch (reason) {
        if (!cancelled) setLoadError(reason instanceof Error ? reason.message : "Open positions could not be loaded")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => { cancelled = true }
  }, [])

  const departments = useMemo(() => Array.from(new Set(positions.map(item => item.department).filter(Boolean))).sort(), [positions])
  const workplaces = useMemo(() => Array.from(new Set(positions.map(item => item.workplace_model).filter((item): item is string => Boolean(item)))).sort(), [positions])
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return positions.filter(position => {
      const matchesQuery = !normalized || [position.title, position.department, position.location, position.description, ...list(position.skills)].join(" ").toLowerCase().includes(normalized)
      const matchesDepartment = department === "all" || position.department === department
      const matchesWorkplace = workplace === "all" || position.workplace_model === workplace
      return matchesQuery && matchesDepartment && matchesWorkplace
    })
  }, [department, positions, query, workplace])

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border/30 pb-20 pt-32">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 hero-glow" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.18em] text-primary">Careers at Coreor</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">Build systems that <span className="gradient-text">matter.</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Join a small, product-focused team building software, infrastructure and digital experiences with high engineering standards and real ownership.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#open-roles"><Button className="btn-glow bg-primary font-semibold text-primary-foreground">Explore open roles <ArrowRight className="ml-2 h-4 w-4" /></Button></a><a href="#culture"><Button variant="outline" className="border-border/70">How we work</Button></a></div>
          </div>
          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
            {[{ label: "Open roles", value: String(positions.length) }, { label: "Work style", value: "Flexible" }, { label: "Engineering", value: "Product-led" }, { label: "Ownership", value: "High" }].map(item => <div key={item.label} className="rounded-xl border border-border/50 bg-card/50 p-4 backdrop-blur"><div className="text-lg font-bold text-foreground">{item.value}</div><div className="mt-1 text-xs text-muted-foreground">{item.label}</div></div>)}
          </div>
        </div>
      </section>

      <section id="culture" className="relative py-20">
        <div className="absolute inset-0 dot-bg opacity-15" />
        <div className="relative mx-auto max-w-6xl px-6">
          <RevealSection className="mb-10 max-w-2xl"><Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.16em] text-primary">How we work</Badge><h2 className="text-3xl font-bold md:text-4xl">A place for focused, ambitious work.</h2><p className="mt-4 leading-7 text-muted-foreground">We hire people we trust, give them context and expect ownership. Clear communication, thoughtful engineering and measurable outcomes matter more than ceremony.</p></RevealSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{benefits.map((benefit, index) => <RevealSection key={benefit.title} delay={index * 50}><div className="glow-card h-full rounded-xl border border-border/50 bg-card/70 p-5"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10"><benefit.icon className="h-4 w-4 text-primary" /></div><h3 className="font-semibold">{benefit.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{benefit.desc}</p></div></RevealSection>)}</div>
        </div>
      </section>

      <section id="open-roles" className="relative border-t border-border/30 bg-card/20 py-20">
        <div className="absolute inset-0 grid-bg opacity-35" />
        <div className="relative mx-auto max-w-6xl px-6">
          <RevealSection className="mb-8"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-xs uppercase tracking-[0.16em] text-primary">Open positions</Badge><h2 className="text-3xl font-bold md:text-4xl">Find your next challenge.</h2><p className="mt-3 text-muted-foreground">Every role below is managed live through Coreor Jobs.</p></div><div className="text-sm text-muted-foreground">{loading ? "Loading…" : `${filtered.length} of ${positions.length} roles`}</div></div></RevealSection>

          <div className="mb-8 grid gap-3 rounded-2xl border border-border/50 bg-card/70 p-3 md:grid-cols-[minmax(0,1fr)_220px_190px]">
            <div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, skill, location…" className="bg-background/40 pl-9" /></div>
            <select value={department} onChange={event => setDepartment(event.target.value)} className="h-10 rounded-md border border-input bg-background/40 px-3 text-sm"><option value="all">All departments</option>{departments.map(item => <option key={item} value={item}>{item}</option>)}</select>
            <select value={workplace} onChange={event => setWorkplace(event.target.value)} className="h-10 rounded-md border border-input bg-background/40 px-3 text-sm"><option value="all">All work models</option>{workplaces.map(item => <option key={item} value={item}>{item}</option>)}</select>
          </div>

          {loading ? <div className="space-y-4">{[1, 2, 3].map(item => <div key={item} className="h-36 rounded-2xl shimmer" />)}</div> : loadError ? <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center"><p className="font-medium text-foreground">We couldn't load open roles.</p><p className="mt-2 text-sm text-muted-foreground">{loadError}</p></div> : filtered.length === 0 ? <div className="rounded-2xl border border-border/50 bg-card/60 px-6 py-16 text-center"><Building2 className="mx-auto h-8 w-8 text-muted-foreground" /><h3 className="mt-4 font-semibold">No matching roles</h3><p className="mt-2 text-sm text-muted-foreground">Try changing your search or filters.</p></div> : <div className="space-y-4">{filtered.map((position, index) => <RevealSection key={position.id} delay={Math.min(index * 40, 240)}><JobCard position={position} onApply={setSelectedJob} /></RevealSection>)}</div>}
        </div>
      </section>

      <section className="border-t border-border/30 py-16">
        <div className="mx-auto max-w-4xl px-6 text-center"><Badge variant="outline" className="mb-4 border-primary/30 bg-primary/5 text-primary">Recruitment process</Badge><h2 className="text-2xl font-bold">Clear stages. No mystery.</h2><div className="mt-8 grid gap-3 md:grid-cols-4">{["Application review", "Team conversation", "Role assessment", "Offer & onboarding"].map((item, index) => <div key={item} className="rounded-xl border border-border/50 bg-card/50 p-4 text-left"><span className="text-xs font-semibold text-primary">0{index + 1}</span><div className="mt-2 text-sm font-medium">{item}</div></div>)}</div></div>
      </section>

      {selectedJob && <ApplicationModal position={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  )
}
