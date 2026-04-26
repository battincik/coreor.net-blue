import { useState, useEffect, useRef } from "react"
import { MapPin, Clock, DollarSign, ChevronDown, ChevronUp, CircleCheck as CheckCircle, X, Loader as Loader2, Users, Zap, Heart, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase, type JobPosition } from "@/lib/supabase"

const benefits = [
  { icon: Zap, title: "Competitive Salary", desc: "Top-of-market compensation with transparent salary bands and annual reviews." },
  { icon: Users, title: "Remote-First Culture", desc: "Work from anywhere in the world. We have teammates in 8 countries." },
  { icon: Heart, title: "Health Coverage", desc: "Full private health insurance for you and your family." },
  { icon: TrendingUp, title: "Growth Budget", desc: "$2,000/year for conferences, courses, books, and professional development." },
  { icon: CheckCircle, title: "Home Office Setup", desc: "$1,500 one-time stipend to build your perfect workspace." },
  { icon: Clock, title: "Flexible Hours", desc: "Async-first with no mandatory hours — we care about outcomes, not presence." },
]

type FormData = {
  first_name: string
  last_name: string
  email: string
  phone: string
  experience_years: string
  applicant_role: string
  linkedin_url: string
  portfolio_url: string
  cover_letter: string
  how_did_you_hear: string
}

const INITIAL_FORM: FormData = {
  first_name: "", last_name: "", email: "", phone: "",
  experience_years: "", applicant_role: "", linkedin_url: "",
  portfolio_url: "", cover_letter: "", how_did_you_hear: "",
}

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

function JobCard({
  position,
  onApply,
}: {
  position: JobPosition
  onApply: (p: JobPosition) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glow-card rounded-xl bg-card overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{position.department}</Badge>
              <Badge variant="outline" className="text-xs border-border/60 text-muted-foreground">{position.type}</Badge>
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">{position.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{position.location}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{position.type}</span>
              {position.salary_range && (
                <span className="flex items-center gap-1.5 text-primary"><DollarSign className="w-3.5 h-3.5" />{position.salary_range}</span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-muted-foreground hover:text-primary transition-colors mt-1">
            {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {open && (
        <div className="px-6 pb-6 border-t border-border/40">
          <p className="text-sm text-muted-foreground leading-relaxed mt-5 mb-5">{position.description}</p>
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-foreground mb-3">Requirements</h4>
            <ul className="space-y-2">
              {position.requirements.map((req, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={() => onApply(position)}
            className="btn-glow bg-primary text-primary-foreground font-semibold"
          >
            Apply for This Role
          </Button>
        </div>
      )}
    </div>
  )
}

function ApplicationModal({
  position,
  onClose,
}: {
  position: JobPosition
  onClose: () => void
}) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (key: keyof FormData, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: "" }))
  }

  const validate = () => {
    const e: Partial<FormData> = {}
    if (!form.first_name.trim()) e.first_name = "Required"
    if (!form.last_name.trim()) e.last_name = "Required"
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required"
    if (!form.experience_years || isNaN(Number(form.experience_years))) e.experience_years = "Required"
    if (!form.cover_letter.trim() || form.cover_letter.trim().length < 50) e.cover_letter = "Please write at least 50 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const { error } = await supabase.from("job_applications").insert({
        position_id: position.id,
        position_title: position.title,
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        experience_years: Number(form.experience_years),
        applicant_role: form.applicant_role.trim() || null,
        linkedin_url: form.linkedin_url.trim() || null,
        portfolio_url: form.portfolio_url.trim() || null,
        cover_letter: form.cover_letter.trim(),
        how_did_you_hear: form.how_did_you_hear.trim() || null,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setErrors({ email: "Something went wrong. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border border-border/60 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border/50 px-6 py-4 flex items-start justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">Apply Now</h2>
            <p className="text-sm text-primary">{position.title}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Application Received!</h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                Thank you for applying to <span className="text-foreground font-medium">{position.title}</span>.
                We review every application carefully and will be in touch within 5 business days.
              </p>
              <Button onClick={onClose} variant="outline">Close</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">First Name *</label>
                  <Input
                    value={form.first_name}
                    onChange={e => set("first_name", e.target.value)}
                    placeholder="Jane"
                    aria-invalid={!!errors.first_name}
                    className="bg-input/30"
                  />
                  {errors.first_name && <p className="text-xs text-destructive mt-1">{errors.first_name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Last Name *</label>
                  <Input
                    value={form.last_name}
                    onChange={e => set("last_name", e.target.value)}
                    placeholder="Doe"
                    aria-invalid={!!errors.last_name}
                    className="bg-input/30"
                  />
                  {errors.last_name && <p className="text-xs text-destructive mt-1">{errors.last_name}</p>}
                </div>
              </div>

              {/* Contact row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => set("email", e.target.value)}
                    placeholder="jane@example.com"
                    aria-invalid={!!errors.email}
                    className="bg-input/30"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone Number</label>
                  <Input
                    value={form.phone}
                    onChange={e => set("phone", e.target.value)}
                    placeholder="+90 555 000 0000"
                    className="bg-input/30"
                  />
                </div>
              </div>

              {/* Experience row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Years of Experience *</label>
                  <Input
                    type="number"
                    min="0"
                    max="40"
                    value={form.experience_years}
                    onChange={e => set("experience_years", e.target.value)}
                    placeholder="e.g. 4"
                    aria-invalid={!!errors.experience_years}
                    className="bg-input/30"
                  />
                  {errors.experience_years && <p className="text-xs text-destructive mt-1">{errors.experience_years}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Current Role / Title</label>
                  <Input
                    value={form.applicant_role}
                    onChange={e => set("applicant_role", e.target.value)}
                    placeholder="e.g. Senior Developer"
                    className="bg-input/30"
                  />
                </div>
              </div>

              {/* Profile links */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">LinkedIn URL</label>
                  <Input
                    value={form.linkedin_url}
                    onChange={e => set("linkedin_url", e.target.value)}
                    placeholder="linkedin.com/in/..."
                    className="bg-input/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Portfolio / GitHub</label>
                  <Input
                    value={form.portfolio_url}
                    onChange={e => set("portfolio_url", e.target.value)}
                    placeholder="github.com/..."
                    className="bg-input/30"
                  />
                </div>
              </div>

              {/* Cover letter */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Cover Letter *</label>
                <Textarea
                  value={form.cover_letter}
                  onChange={e => set("cover_letter", e.target.value)}
                  placeholder="Tell us about yourself, why you're interested in this role, and what makes you a strong fit..."
                  rows={6}
                  aria-invalid={!!errors.cover_letter}
                  className="bg-input/30 resize-none"
                />
                <div className="flex justify-between mt-1">
                  {errors.cover_letter
                    ? <p className="text-xs text-destructive">{errors.cover_letter}</p>
                    : <span />
                  }
                  <span className="text-xs text-muted-foreground">{form.cover_letter.length} chars</span>
                </div>
              </div>

              {/* How did you hear */}
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">How did you find us?</label>
                <Input
                  value={form.how_did_you_hear}
                  onChange={e => set("how_did_you_hear", e.target.value)}
                  placeholder="LinkedIn, friend referral, Google, etc."
                  className="bg-input/30"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-glow bg-primary text-primary-foreground font-semibold"
                >
                  {submitting ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Submitting...</>
                  ) : "Submit Application"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  We respect your privacy. Your data is kept confidential and never shared.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export function CareersPage() {
  const [positions, setPositions] = useState<JobPosition[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null)

  useEffect(() => {
    async function fetchPositions() {
      const { data, error } = await supabase
        .from("job_positions")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
      if (!error && data) setPositions(data)
      setLoading(false)
    }
    fetchPositions()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 hero-glow" />
        <div className="relative max-w-4xl mx-auto px-6">
          <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
            Join the Team
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Build the Future <span className="gradient-text">With Us</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're a growing team of engineers, designers, and strategists who love solving hard problems.
            Remote-first, ambitious, and genuinely collaborative.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 border-y border-border/30 bg-card/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealSection>
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
                Culture
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">A Place to Do Your Best Work</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Coreor, we believe great work happens when smart people are trusted, respected, and given the resources they need.
                We don't micromanage — we hire excellent people and give them ownership.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our engineering culture values clean code, honest feedback, continuous learning, and shipping things that actually work.
                We move fast but never cut corners on quality.
              </p>
            </RevealSection>
            <RevealSection delay={100}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Team Size", value: "30+" },
                  { label: "Countries", value: "8" },
                  { label: "Avg Tenure", value: "2.8 yrs" },
                  { label: "Open Roles", value: String(positions.length) },
                ].map((stat) => (
                  <div key={stat.label} className="glow-card rounded-xl p-5 bg-card text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 relative">
        <div className="absolute inset-0 dot-bg opacity-15" />
        <div className="relative max-w-6xl mx-auto px-6">
          <RevealSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
              Benefits
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3">What We Offer</h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <RevealSection key={b.title} delay={i * 60}>
                <div className="glow-card rounded-xl p-5 bg-card flex gap-4">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{b.title}</h3>
                    <p className="text-xs text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section className="py-20 bg-card/20 border-t border-border/30 relative">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-4xl mx-auto px-6">
          <RevealSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
              Open Positions
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {loading ? "Loading..." : `${positions.length} Open Role${positions.length !== 1 ? "s" : ""}`}
            </h2>
            <p className="text-muted-foreground">Click a position to read the full description and apply.</p>
          </RevealSection>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 rounded-xl shimmer" />
              ))}
            </div>
          ) : positions.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              No open positions right now — check back soon or send us an open application.
            </div>
          ) : (
            <div className="space-y-4">
              {positions.map((p, i) => (
                <RevealSection key={p.id} delay={i * 60}>
                  <JobCard position={p} onApply={setSelectedJob} />
                </RevealSection>
              ))}
            </div>
          )}

          <RevealSection className="text-center mt-12">
            <p className="text-muted-foreground text-sm mb-4">
              Don't see your perfect role? Send us an open application.
            </p>
            <Button
              variant="outline"
              className="border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/5"
              onClick={() => {
                if (positions.length > 0) {
                  setSelectedJob({
                    id: "", title: "Open Application", department: "General",
                    location: "Remote", type: "Full-time", salary_range: null,
                    description: "", requirements: [], is_active: true, created_at: "",
                  })
                }
              }}
            >
              Submit Open Application
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* Modal */}
      {selectedJob && (
        <ApplicationModal position={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  )
}
