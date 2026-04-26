import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MapPin, Clock, Send, CircleCheck as CheckCircle, Loader as Loader2, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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

type ContactForm = {
  name: string
  email: string
  company: string
  budget: string
  subject: string
  message: string
}

const INIT: ContactForm = { name: "", email: "", company: "", budget: "", subject: "", message: "" }
const budgets = ["< $10K", "$10K – $30K", "$30K – $100K", "$100K+", "Ongoing Retainer"]
const subjects = ["New Project", "Cloud / Infrastructure", "Database Management", "Consulting", "Partnership", "Other"]

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>(INIT)
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = (k: keyof ContactForm, v: string) => {
    setForm(prev => ({ ...prev, [k]: v }))
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: "" }))
  }

  const validate = () => {
    const e: Partial<ContactForm> = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required"
    if (!form.subject) e.subject = "Please select a subject"
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please write at least 20 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate API call — in production connect to Supabase edge function or email service
    await new Promise(r => setTimeout(r, 1200))
    setSubmitted(true)
    setSubmitting(false)
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
              { icon: Phone, label: "Phone", value: "+90 212 000 0000", sub: "Mon–Fri 9am–6pm" },
              { icon: MapPin, label: "Office", value: "Istanbul, Turkey", sub: "By appointment" },
              { icon: Clock, label: "Response Time", value: "< 24 hours", sub: "Usually much faster" },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={i * 70}>
                <div className="glow-card rounded-xl p-5 bg-card flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
                      <Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" aria-invalid={!!errors.name} className="bg-input/30" />
                      {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address *</label>
                      <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@company.com" aria-invalid={!!errors.email} className="bg-input/30" />
                      {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Company / Organization</label>
                      <Input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Corp" className="bg-input/30" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Project Budget</label>
                      <select
                        value={form.budget}
                        onChange={e => set("budget", e.target.value)}
                        className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm text-foreground"
                      >
                        <option value="">Select range</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subject *</label>
                    <select
                      value={form.subject}
                      onChange={e => set("subject", e.target.value)}
                      className="h-9 w-full rounded-md border border-input bg-input/30 px-3 py-1 text-sm text-foreground"
                      aria-invalid={!!errors.subject}
                    >
                      <option value="">Select a topic</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                  </div>

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
