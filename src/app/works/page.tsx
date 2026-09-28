"use client";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Code as Code2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Category = "All" | "Web" | "Desktop" | "Product";

const projects = [
    {
        title: "Coreor DataTable",
        category: "Product" as Category,
        tags: ["React", "TypeScript", "Next.js", "Data Grid", "NPM"],
        desc: "A typed React data grid and interactive showcase for building dense, configurable data experiences with reusable cell types, editors, filters, pagination and exports.",
        impact: [
            "19 configurable cell types",
            "Virtual rows and server-query patterns",
            "Selection across pages with CSV export",
            "Table Maker for reusable grid configuration",
        ],
        year: "2026",
        color: "from-cyan-500/20 to-blue-500/10",
        href: "https://github.com/battincik/coreor-datatable",
    },
    {
        title: "Coreor Database",
        category: "Desktop" as Category,
        tags: ["Tauri 2", "Rust", "React", "Next.js", "SQL"],
        desc: "A local-first, cross-platform database client designed for developers who need a focused workspace for SQL, schema exploration and database administration.",
        impact: [
            "MySQL, MariaDB, PostgreSQL and SQL Server workflows",
            "Object Explorer and SQL workspace",
            "Table editing, filtering and pagination",
            "Schema graph, import/export and performance tools",
        ],
        year: "2026",
        color: "from-sky-500/20 to-indigo-500/10",
        href: "https://github.com/battincik/coreor-database",
    },
    {
        title: "Coreor Commerce",
        category: "Web" as Category,
        tags: ["Next.js", "TypeScript", "Commerce", "Product UI"],
        desc: "A commerce-focused product experience exploring a polished foundation for catalog, shopping and operational workflows.",
        impact: [
            "Commerce product direction and interface system",
            "Responsive web application foundation",
            "Designed for future modular expansion",
            "Clear path from product concept to implementation",
        ],
        year: "2026",
        color: "from-violet-500/20 to-fuchsia-500/10",
        href: "https://github.com/battincik/coreor-commerce",
    },
    {
        title: "Inkflow Client",
        category: "Product" as Category,
        tags: ["TypeScript", "React", "Next.js", "Product Design"],
        desc: "A focused client application concept built around a clean, modern interaction model and a foundation that can evolve with the product.",
        impact: [
            "Focused client-side product experience",
            "Reusable TypeScript application foundation",
            "Designed for iterative feature development",
            "Clean interface direction for future workflows",
        ],
        year: "2026",
        color: "from-emerald-500/20 to-teal-500/10",
        href: "https://github.com/battincik/inkflow-client",
    },
    {
        title: "Nexa CRM",
        category: "Product" as Category,
        tags: ["TypeScript", "CRM", "Web App", "Product Strategy"],
        desc: "A CRM product direction for bringing customer relationships, sales workflows and team context into one focused workspace.",
        impact: [
            "CRM-focused product architecture",
            "Customer and pipeline workflow foundation",
            "Prepared for modular team experiences",
            "Clear product direction for the next build phase",
        ],
        year: "2026",
        color: "from-amber-500/20 to-orange-500/10",
        href: "https://github.com/battincik/nexa-crm",
    },
];

const categories: Category[] = ["All", "Web", "Desktop", "Product"];

function RevealSection({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.08 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
        >
            {children}
        </div>
    );
}

export default function WorksPage() {
    const { navigate } = useNav();
    const [active, setActive] = useState<Category>("All");

    const filtered =
        active === "All"
            ? projects
            : projects.filter((p) => p.category === active);

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-16 text-center">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 hero-glow" />
                <div className="relative max-w-4xl mx-auto px-6">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                    >
                        Case Studies
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Our <span className="gradient-text">Work</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                        A selection of products and engineering work that reflects our
                        approach to thoughtful, scalable digital experiences.
                    </p>
                </div>
            </section>

            {/* Filter */}
            <div className="max-w-7xl mx-auto px-6 mb-10">
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={cn(
                                "px-5 py-2 rounded-full text-sm font-medium transition-all border",
                                active === cat
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Projects grid */}
            <section className="pb-24 relative">
                <div className="absolute inset-0 dot-bg opacity-15" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map((p, i) => (
                            <RevealSection key={p.title} delay={i * 80}>
                                <div className="glow-card rounded-xl overflow-hidden bg-card h-full flex flex-col">
                                    {/* Gradient banner */}
                                    <div
                                        className={`h-28 bg-gradient-to-br ${p.color} relative flex items-end p-5`}
                                    >
                                        <div className="absolute inset-0 grid-bg opacity-40" />
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            {p.title}
                                            <Badge
                                                variant="outline"
                                                className="text-xs border-border/60 bg-card/40 text-foreground/80 mb-1 ml-2"
                                            >
                                                {p.category}
                                            </Badge>
                                            <div className="text-xs text-muted-foreground">
                                                {p.year}
                                            </div>
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                                            {p.desc}
                                        </p>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {p.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Impact */}
                                        <div className="border-t border-border/50 pt-4">
                                            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-medium">
                                                Impact
                                            </div>
                                            <div className="space-y-1">
                                                {p.impact.map((item) => (
                                                    <div
                                                        key={item}
                                                        className="flex items-center gap-2 text-sm text-foreground/80"
                                                    >
                                                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                                                        {item}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-5">
                                            <a
                                                href={p.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Code2 className="w-3.5 h-3.5" />
                                                View repository
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-card/20 border-t border-border/30 text-center relative">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative max-w-2xl mx-auto px-6">
                    <RevealSection>
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Have a Project in Mind?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Let's discuss how we can build something remarkable
                            together.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => navigate("contact")}
                            className="btn-glow bg-primary text-primary-foreground font-semibold"
                        >
                            Start the Conversation{" "}
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
}
