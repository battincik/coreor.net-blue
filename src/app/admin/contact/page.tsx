"use client"

import React, { useEffect, useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import { SERVICES } from "@/lib/services"
import { cn } from "@/lib/utils"
import { CalendarDays, ChevronLeft, ChevronRight, Eye, Mail, Search, UserRound, X } from "lucide-react"

const API_BASE = process.env.NEXT_PUBLIC_CONTACT_API_BASE_URL ?? "https://api.coreor.net/v1/contact/messages/search"

type ContactMessage = {
  id: string
  fullName: string
  email: string
  company: string | null
  role: string | null
  phoneCountryIso: string | null
  phoneCountryCode: string | null
  phone: string | null
  subjectCategory: string
  subjectKey: string
  subject: string
  subjectSpecificDetails: Record<string, unknown> | string | null
  message: string
  pageUrl: string | null
  referrer: string | null
  elapsedMs: number | null
  botSuspected: number | boolean
  createdAt: string
  updatedAt: string
}

type Meta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

type Filters = {
  search: string
  subjectCategory: string
  subjectKey: string
  role: string
  phoneCountryIso: string
  dateFrom: string
  dateTo: string
}

const INITIAL_FILTERS: Filters = {
  search: "",
  subjectCategory: "",
  subjectKey: "",
  role: "",
  phoneCountryIso: "",
  dateFrom: "",
  dateTo: "",
}

const roles = [
  "Founder / CEO",
  "Product Manager / Product Owner",
  "Engineering Manager / Team Lead",
  "CTO / Head of Engineering",
  "Marketing / Growth",
  "Operations / Admin",
  "Other",
]

const generalSubjects = [
  { value: "new-project", label: "New Project" },
  { value: "consulting", label: "Consulting" },
  { value: "partnership", label: "Partnership" },
  { value: "support-maintenance", label: "Support / Maintenance" },
  { value: "other", label: "Other" },
]

const serviceSubjects = SERVICES.map((service) => ({ value: `service:${service.slug}`, label: service.title }))

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value))
  } catch {
    return value
  }
}

function parseDetails(value: ContactMessage["subjectSpecificDetails"]) {
  if (!value) return null
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as Record<string, unknown>
    } catch {
      return null
    }
  }
  return value
}

function valueText(value: unknown) {
  if (Array.isArray(value)) return value.join(", ")
  if (value === null || value === undefined || value === "") return "—"
  if (typeof value === "object") return JSON.stringify(value)
  return String(value)
}

function DetailRow({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</p>
      <p className="text-sm text-foreground wrap-break-word">{valueText(value)}</p>
    </div>
  )
}

export default function AdminContactPage() {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<Filters>(INITIAL_FILTERS)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [meta, setMeta] = useState<Meta>({ page: 1, limit: 20, total: 0, totalPages: 1 })
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [detailId, setDetailId] = useState<string | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const lastRequestKeyRef = React.useRef("")

  const searchUrl = useMemo(() => {
    const url = new URL(API_BASE)
    url.searchParams.set("page", String(page))
    url.searchParams.set("limit", String(limit))

    if (appliedFilters.search.trim()) url.searchParams.set("search", appliedFilters.search.trim())
    if (appliedFilters.subjectCategory) url.searchParams.set("subjectCategory", appliedFilters.subjectCategory)
    if (appliedFilters.subjectKey) url.searchParams.set("subjectKey", appliedFilters.subjectKey)
    if (appliedFilters.role) url.searchParams.set("role", appliedFilters.role)
    if (appliedFilters.phoneCountryIso) url.searchParams.set("phoneCountryIso", appliedFilters.phoneCountryIso)
    if (appliedFilters.dateFrom) url.searchParams.set("dateFrom", appliedFilters.dateFrom)
    if (appliedFilters.dateTo) url.searchParams.set("dateTo", appliedFilters.dateTo)

    return url.toString()
  }, [appliedFilters, page, limit])

  useEffect(() => {
    let cancelled = false
    const requestKey = searchUrl

    if (lastRequestKeyRef.current === requestKey) {
      return () => {
        cancelled = true
      }
    }

    lastRequestKeyRef.current = requestKey
    const controller = new AbortController()

    const load = async () => {
      setLoading(true)
      setError("")

      try {
        const response = await fetch(searchUrl, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        })
        const json = await response.json()

        if (!response.ok || json.status !== "success") {
          throw new Error(json.message || "Failed to load messages")
        }

        if (cancelled) return
        setMessages(Array.isArray(json.data) ? json.data : [])
        setMeta(json.meta ?? { page, limit, total: 0, totalPages: 1 })
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [searchUrl, page, limit])

  const stats = [
    { label: "Total", value: meta.total },
    { label: "Page", value: `${meta.page} / ${meta.totalPages}` },
    { label: "Limit", value: limit },
    { label: "Visible", value: messages.length },
  ]

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS)
    setAppliedFilters(INITIAL_FILTERS)
    setPage(1)
  }

  const applyFilters = () => {
    setAppliedFilters(filters)
    setPage(1)
  }

  return (
    <div className="relative overflow-hidden">
      <section className="relative pt-28 pb-14">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0 hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary uppercase tracking-widest">
              Admin Panel
            </Badge>
            <Badge variant="outline" className="border-border/50 text-muted-foreground">
              /admin/contact
            </Badge>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
                Contact <span className="gradient-text">Messages</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Filtered search, pagination, date range, and subject-based review.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <Card key={item.label} className="border-border/60 bg-card/70 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{item.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <Card className="border-border/60 bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">Filters</CardTitle>
                  <CardDescription>Search by name, email, company, subject, role or date.</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowAdvanced((s) => !s)} className={cn("border-border/60 bg-background/40", showAdvanced ? "ring-2 ring-primary/30" : "")}>
                    <Search className="mr-2 h-4 w-4" /> Advanced Search
                  </Button>
                  <Button variant="outline" onClick={resetFilters} className="border-border/60 bg-background/40">
                    <X className="mr-2 h-4 w-4" /> Reset
                  </Button>
                  <Button onClick={applyFilters} className="btn-glow bg-primary text-primary-foreground">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="md:col-span-2 xl:col-span-3">
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Search</label>
                  <Input
                    value={filters.search}
                    onChange={(event) => setFilters((prev) => ({ ...prev, search: event.target.value }))}
                    placeholder="Search name, email, company, role, subject or message..."
                    className="bg-input/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Subject Category</label>
                    <Select value={filters.subjectCategory || "__all"} onValueChange={(value) => setFilters((prev) => ({ ...prev, subjectCategory: value === "__all" ? "" : value }))}>
                    <SelectTrigger className="w-full border-border/60 bg-card/80">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all">All categories</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Role</label>
                  <Select value={filters.role || "__any"} onValueChange={(value) => setFilters((prev) => ({ ...prev, role: value === "__any" ? "" : value }))}>
                    <SelectTrigger className="w-full border-border/60 bg-card/80">
                      <SelectValue placeholder="Any role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__any">Any</SelectItem>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone Country ISO</label>
                  <Input
                    value={filters.phoneCountryIso}
                    onChange={(event) => setFilters((prev) => ({ ...prev, phoneCountryIso: event.target.value.toUpperCase() }))}
                    placeholder="TR, US, GB..."
                    className="bg-input/30 uppercase"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Subject Key</label>
                  <Input
                    value={filters.subjectKey}
                    onChange={(event) => setFilters((prev) => ({ ...prev, subjectKey: event.target.value }))}
                    placeholder="service:web-development"
                    className="bg-input/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">From</label>
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(event) => setFilters((prev) => ({ ...prev, dateFrom: event.target.value }))}
                    className="bg-input/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">To</label>
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(event) => setFilters((prev) => ({ ...prev, dateTo: event.target.value }))}
                    className="bg-input/30"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Per Page</label>
                  <Select value={String(limit)} onValueChange={(value) => setLimit(Number(value))}>
                    <SelectTrigger className="w-full border-border/60 bg-card/80">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[10, 20, 50, 100].map((option) => (
                        <SelectItem key={option} value={String(option)}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {showAdvanced ? (
                <div className="mt-4 rounded-lg border border-border/50 bg-background/30 p-4">
                  <h3 className="mb-3 text-sm font-semibold">Advanced Filters</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Subject Key</label>
                      <Input
                        value={filters.subjectKey}
                        onChange={(event) => setFilters((prev) => ({ ...prev, subjectKey: event.target.value }))}
                        placeholder="service:web-development"
                        className="bg-input/30"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Phone Country ISO</label>
                      <Input
                        value={filters.phoneCountryIso}
                        onChange={(event) => setFilters((prev) => ({ ...prev, phoneCountryIso: event.target.value.toUpperCase() }))}
                        placeholder="TR, US, GB..."
                        className="bg-input/30 uppercase"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Date Range</label>
                      <div className="flex gap-2">
                        <Input type="date" value={filters.dateFrom} onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))} className="bg-input/30" />
                        <Input type="date" value={filters.dateTo} onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))} className="bg-input/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {error ? (
            <div className="mb-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {loading ? (
            <Card className="border-border/60 bg-card/80">
              <CardContent className="p-6 text-muted-foreground">Loading messages...</CardContent>
            </Card>
          ) : null}

          {!loading && messages.length === 0 ? (
            <Card className="border-border/60 bg-card/80">
              <CardContent className="p-10 text-center text-muted-foreground">
                No messages found for the selected filters.
              </CardContent>
            </Card>
          ) : null}

          <div className="space-y-4">
            {messages.map((message) => {
              const details = parseDetails(message.subjectSpecificDetails)
              const isExpanded = detailId === message.id

              return (
                <Card key={message.id} className="border-border/60 bg-card/80 backdrop-blur-xl">
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="mb-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                            {message.subjectCategory}
                          </Badge>
                          {message.botSuspected ? (
                            <Badge variant="destructive">Bot Suspected</Badge>
                          ) : null}
                          <Badge variant="outline" className="border-border/50 text-muted-foreground">
                            {message.subjectKey}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{message.fullName}</CardTitle>
                        <CardDescription className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                          <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{message.email}</span>
                          <span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{message.role ?? "—"}</span>
                          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatDate(message.createdAt)}</span>
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={() => setDetailId(isExpanded ? null : message.id)} className="border-border/60 bg-background/40">
                        <Eye className="mr-2 h-4 w-4" /> {isExpanded ? "Hide" : "Details"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      <DetailRow label="Company" value={message.company} />
                      <DetailRow label="Phone" value={message.phone} />
                      <DetailRow label="Country" value={message.phoneCountryIso} />
                      <DetailRow label="Elapsed Ms" value={message.elapsedMs} />
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-background/40 p-4">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">Message</p>
                      <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">{message.message}</p>
                    </div>

                    {isExpanded ? (
                      <div className="space-y-4 rounded-2xl border border-border/60 bg-background/30 p-4">
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                          <DetailRow label="Page URL" value={message.pageUrl} />
                          <DetailRow label="Referrer" value={message.referrer} />
                          <DetailRow label="Subject" value={message.subject} />
                        </div>

                        <div>
                          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Subject Specific Details</p>
                          <pre className="overflow-auto rounded-2xl border border-border/60 bg-card/80 p-4 text-xs leading-6 text-foreground">
{JSON.stringify(details ?? {}, null, 2)}
                          </pre>
                        </div>

                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                          <DetailRow label="Phone Country Code" value={message.phoneCountryCode} />
                          <DetailRow label="Updated At" value={message.updatedAt} />
                          <DetailRow label="Bot Suspected" value={message.botSuspected} />
                          <DetailRow label="ID" value={message.id} />
                        </div>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {messages.length} of {meta.total} messages
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((current) => Math.max(current - 1, 1))}
                disabled={page <= 1}
                className="border-border/60 bg-background/40"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Prev
              </Button>
              <span className="rounded-full border border-border/60 px-4 py-2 text-sm text-muted-foreground">
                Page {page} / {meta.totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage((current) => Math.min(current + 1, meta.totalPages))}
                disabled={page >= meta.totalPages}
                className="border-border/60 bg-background/40"
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
