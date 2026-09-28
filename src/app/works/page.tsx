"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import {
    ArrowRight,
    Blocks,
    Braces,
    Code as Code2,
    Database,
    ExternalLink,
    Globe,
    Layers,
    LockKeyhole,
    Monitor,
    Package,
    Search,
    Server,
    ShoppingBag,
    Sparkles,
    Table2,
    Terminal,
    Workflow,
    Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Category = "All" | "Web" | "Desktop" | "Backend" | "Product";
type ProjectCategory = Exclude<Category, "All">;
type ProjectStatus =
    | "Open Source"
    | "Private"
    | "Active Development"
    | "Pre-release"
    | "Product Direction";

type Project = {
    title: string;
    slug: string;
    category: ProjectCategory;
    status: ProjectStatus;
    tags: string[];
    technologies: string[];
    desc: string;
    impact: string[];
    year: string;
    color: string;
    href: string;
    liveUrl?: string;
    private?: boolean;
    icon: LucideIcon;
    overview: string;
    focus: string;
    highlights: string[];
};

const techIcons: Record<string, LucideIcon> = {
    React: Blocks,
    TypeScript: Braces,
    "Next.js": Zap,
    "Tauri 2": Monitor,
    Rust: Terminal,
    SQL: Database,
    "MySQL2": Database,
    Bun: Zap,
    Elysia: Server,
    "Data Grid": Table2,
    NPM: Package,
    Commerce: ShoppingBag,
    "Product UI": Layers,
    "Web App": Globe,
    CRM: Workflow,
    "Product Design": Sparkles,
    "Product Strategy": Search,
    Backend: Server,
};

const projects: Project[] = [
    {
        title: "Coreor DataTable",
        slug: "coreor-datatable",
        category: "Product",
        status: "Active Development",
        tags: ["React", "TypeScript", "Next.js", "Data Grid", "NPM"],
        technologies: ["React", "TypeScript", "Next.js", "JavaScript", "NPM Package", "Data Grid", "Virtualization", "CSV Export", "Server Queries", "Tailwind CSS"],
        desc: "A typed React data grid and interactive showcase for building dense, configurable data experiences.",
        impact: [
            "19 configurable cell types",
            "Virtual rows and server-query patterns",
            "Selection across pages with CSV export",
            "Table Maker for reusable grid configuration",
        ],
        year: "2026",
        color: "from-cyan-500/30 via-blue-500/15 to-indigo-500/10",
        href: "https://github.com/battincik/coreor-datatable",
        liveUrl: "https://datatable.coreor.net",
        icon: Table2,
        overview:
            "Coreor DataTable is a reusable data experience for dashboards and business applications that need powerful tables without rebuilding the same interaction patterns.",
        focus: "Typed, configurable data grids with a strong focus on filtering, editing and predictable workflows.",
        highlights: [
            "Reusable cell renderers and inline editors",
            "Column-aware filters and pagination",
            "Selection across pages and CSV export",
            "Interactive showcase and Table Maker",
        ],
    },
    {
        title: "Coreor Database",
        slug: "coreor-database",
        category: "Desktop",
        status: "Pre-release",
        tags: ["Tauri 2", "Rust", "React", "Next.js", "SQL"],
        technologies: ["Tauri 2", "Rust", "React", "Next.js", "TypeScript", "SQL", "MySQL", "MariaDB", "PostgreSQL", "CockroachDB", "TiDB", "Microsoft SQL Server", "Tauri IPC"],
        desc: "A local-first, cross-platform database client for SQL, schema exploration and database administration.",
        impact: [
            "MySQL, MariaDB, PostgreSQL and SQL Server workflows",
            "Object Explorer and SQL workspace",
            "Table editing, filtering and pagination",
            "Schema graph, import/export and performance tools",
        ],
        year: "2026",
        color: "from-sky-500/30 via-indigo-500/15 to-violet-500/10",
        href: "https://github.com/battincik/coreor-database",
        icon: Database,
        overview:
            "Coreor Database is a local-first desktop workspace that brings SQL editing, object exploration and administration tools together in one focused application.",
        focus: "Native desktop performance, local data handling and a productive database workflow.",
        highlights: [
            "Tauri 2 and Rust native layer",
            "Object Explorer for database objects",
            "SQL editor, history and notebooks",
            "Schema graph, import/export and administration tools",
        ],
    },
    {
        title: "Coreor Commerce",
        slug: "coreor-commerce",
        category: "Web",
        status: "Private",
        tags: ["Next.js", "TypeScript", "Commerce", "Product UI"],
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Commerce UI", "Product Catalog", "Responsive Design", "Vercel"],
        desc: "A commerce-focused product experience exploring a polished foundation for catalog, shopping and operational workflows.",
        impact: [
            "Commerce product direction and interface system",
            "Responsive web application foundation",
            "Designed for future modular expansion",
            "Clear path from product concept to implementation",
        ],
        year: "2026",
        color: "from-violet-500/30 via-fuchsia-500/15 to-pink-500/10",
        href: "https://github.com/battincik/coreor-commerce",
        liveUrl: "https://coreor-commerce.vercel.app",
        private: true,
        icon: ShoppingBag,
        overview:
            "Coreor Commerce explores a flexible digital commerce experience with a clear visual system and room for catalog, customer and operational workflows.",
        focus: "A refined product foundation that can grow from a storefront experience into a broader commerce workspace.",
        highlights: [
            "Responsive commerce interface foundation",
            "Reusable product-oriented UI patterns",
            "Designed for modular feature expansion",
            "Web-first experience built with Next.js",
        ],
    },
    {
        title: "Inkflow Client",
        slug: "inkflow-client",
        category: "Product",
        status: "Private",
        tags: ["TypeScript", "React", "Next.js", "Product Design"],
        technologies: ["TypeScript", "React", "Next.js", "API Client", "Responsive UI", "Product Design", "Web Application"],
        desc: "A focused client application concept built around a clean interaction model and an adaptable product foundation.",
        impact: [
            "Focused client-side product experience",
            "Reusable TypeScript application foundation",
            "Designed for iterative feature development",
            "Clean interface direction for future workflows",
        ],
        year: "2026",
        color: "from-emerald-500/30 via-teal-500/15 to-cyan-500/10",
        href: "https://github.com/battincik/inkflow-client",
        liveUrl: "https://inkflow-client-six.vercel.app",
        private: true,
        icon: Monitor,
        overview:
            "Inkflow Client is the product-facing application layer for the Inkflow ecosystem, designed around focused workflows and a clean, modern interface.",
        focus: "A maintainable client foundation that keeps product interactions clear as the application evolves.",
        highlights: [
            "Modern TypeScript client foundation",
            "Focused product interaction model",
            "Responsive interface direction",
            "Prepared for API-backed workflows",
        ],
    },
    {
        title: "Inkflow API",
        slug: "inkflow-api",
        category: "Backend",
        status: "Active Development",
        tags: ["Bun", "Elysia", "TypeScript", "MySQL2", "Backend"],
        technologies: ["Bun", "Elysia", "TypeScript", "MySQL2", "OOP", "REST API", "OpenAPI", "Scalar", "Auth Middleware", "Rate Limiting", "Request Logger", "Modular Architecture"],
        desc: "A modular OOP backend foundation for building structured APIs with Bun, Elysia and TypeScript.",
        impact: [
            "Route → Controller → Service architecture",
            "Centralized Core, database and logger services",
            "OpenAPI and Scalar documentation",
            "Auth middleware, request logging and rate limiting",
        ],
        year: "2026",
        color: "from-orange-500/30 via-amber-500/15 to-yellow-500/10",
        href: "https://github.com/battincik/api.inkflow",
        private: true,
        icon: Server,
        overview:
            "Inkflow API is a modular backend foundation for creating maintainable APIs without scattering database connections, configuration and infrastructure concerns across every route.",
        focus: "Object-oriented structure, centralized dependencies and a clean separation between routes, controllers and services.",
        highlights: [
            "Bun and Elysia runtime foundation",
            "Single MySQL2 pool through Core",
            "Decorated request context with client, database and logger",
            "OpenAPI/Scalar documentation and example modules",
        ],
    },
    {
        title: "Nexa CRM",
        slug: "nexa-crm",
        category: "Product",
        status: "Product Direction",
        tags: ["TypeScript", "CRM", "Web App", "Product Strategy"],
        technologies: ["TypeScript", "React", "Next.js", "CRM", "Web App", "Customer Data", "Sales Pipeline", "Product Strategy", "Workspace UX"],
        desc: "A CRM product direction for bringing customer relationships, sales workflows and team context into one focused workspace.",
        impact: [
            "CRM-focused product architecture",
            "Customer and pipeline workflow foundation",
            "Prepared for modular team experiences",
            "Clear product direction for the next build phase",
        ],
        year: "2026",
        color: "from-amber-500/30 via-orange-500/15 to-red-500/10",
        href: "https://github.com/battincik/nexa-crm",
        private: true,
        icon: Workflow,
        overview:
            "Nexa CRM is a product direction for organizing customer context, sales activity and team workflows in one focused workspace.",
        focus: "A clear foundation for future CRM workflows, data relationships and collaborative team operations.",
        highlights: [
            "Customer and account context",
            "Pipeline-oriented workflow direction",
            "Modular workspace architecture",
            "Prepared for future team collaboration features",
        ],
    },
];

const categories: Category[] = ["All", "Web", "Desktop", "Backend", "Product"];

const statusStyles: Record<ProjectStatus, string> = {
    "Open Source": "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    Private: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    "Active Development": "border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
    "Pre-release": "border-violet-400/30 bg-violet-400/10 text-violet-300",
    "Product Direction": "border-orange-400/30 bg-orange-400/10 text-orange-300",
};

function RevealSection({
    children,
    className = "",
    delay = 0,
}: {
    children: ReactNode;
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
            className={cn(
                "transition-all duration-700",
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                className,
            )}
        >
            {children}
        </div>
    );
}

function ProjectCard({
    project,
    index,
    onOpen,
}: {
    project: Project;
    index: number;
    onOpen: () => void;
}) {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const Icon = project.icon;

    return (
        <RevealSection delay={index * 80}>
            <div
                role="button"
                tabIndex={0}
                onClick={(event) => {
                    if ((event.target as HTMLElement).closest("a")) return;
                    onOpen();
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onOpen();
                    }
                }}
                onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
                    const y = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
                    setTilt({ x, y });
                }}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                className="group h-full cursor-pointer outline-none"
                style={{
                    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                    transition: "transform 180ms ease-out",
                }}
            >
                <div className="glow-card relative flex h-full flex-col overflow-hidden rounded-2xl bg-card">
                    <div
                        className={`relative flex h-36 items-end overflow-hidden bg-gradient-to-br ${project.color} p-5`}
                    >
                        <div className="absolute inset-0 grid-bg opacity-40" />
                        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />
                        <div className="relative flex w-full items-end justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-white shadow-lg backdrop-blur-sm">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="outline"
                                    className="border-white/20 bg-black/20 text-xs text-white backdrop-blur-sm"
                                >
                                    {project.category}
                                </Badge>
                                {project.private && (
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm" title="Private repository">
                                        <LockKeyhole className="h-3.5 w-3.5" />
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                                <p className="mt-1 text-xs text-muted-foreground">{project.year}</p>
                            </div>
                            <Badge variant="outline" className={cn("shrink-0 text-[10px]", statusStyles[project.status])}>
                                {project.status}
                            </Badge>
                        </div>

                        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {project.desc}
                        </p>

                        <div className="mb-5 flex flex-wrap gap-2">
                            {project.tags.map((tag) => {
                                const TechIcon = techIcons[tag] || Code2;
                                return (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                                    >
                                        <TechIcon className="h-3 w-3" />
                                        {tag}
                                    </span>
                                );
                            })}
                        </div>

                        <div className="border-t border-border/50 pt-4">
                            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                Highlights
                            </p>
                            <div className="space-y-1.5">
                                {project.impact.slice(0, 3).map((item) => (
                                    <div key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onOpen();
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-primary"
                            >
                                View details
                                <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                                >
                                    <Globe className="h-3.5 w-3.5" />
                                    Live demo
                                </a>
                            )}
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                            >
                                <Code2 className="h-3.5 w-3.5" />
                                Repository
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </RevealSection>
    );
}

export default function WorksPage() {
    const { navigate } = useNav();
    const [active, setActive] = useState<Category>("All");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        if (!selectedProject) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelectedProject(null);
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [selectedProject]);

    const filtered =
        active === "All"
            ? projects
            : projects.filter((project) => project.category === active);

    return (
        <div className="overflow-hidden">
            <section className="relative pt-32 pb-16 text-center">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 hero-glow" />
                <div className="relative mx-auto max-w-4xl px-6">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/30 bg-primary/10 text-xs uppercase tracking-widest text-primary"
                    >
                        Selected Work
                    </Badge>
                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl">
                        Our <span className="gradient-text">Work</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                        Products, platforms and engineering foundations shaped around
                        thoughtful, scalable digital experiences.
                    </p>
                </div>
            </section>

            <div className="mx-auto mb-10 max-w-7xl px-6">
                <div className="flex flex-wrap justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setActive(category)}
                            className={cn(
                                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                                active === category
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                            )}
                        >
                            {category}
                            <span className="ml-1.5 text-xs opacity-60">
                                {category === "All"
                                    ? projects.length
                                    : projects.filter((project) => project.category === category).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <section className="relative pb-24">
                <div className="absolute inset-0 dot-bg opacity-15" />
                <div className="relative mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {filtered.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                index={index}
                                onOpen={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative border-t border-border/30 bg-card/20 py-20 text-center">
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="relative mx-auto max-w-2xl px-6">
                    <RevealSection>
                        <h2 className="mb-4 text-3xl font-bold text-foreground">
                            Have a Project in Mind?
                        </h2>
                        <p className="mb-8 text-muted-foreground">
                            Let's discuss how we can build something remarkable together.
                        </p>
                        <Button
                            size="lg"
                            onClick={() => navigate("contact")}
                            className="btn-glow bg-primary font-semibold text-primary-foreground"
                        >
                            Start the Conversation
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </RevealSection>
                </div>
            </section>

            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                    role="presentation"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-dialog-title"
                        onClick={(event) => event.stopPropagation()}
                        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-border/70 bg-card shadow-2xl"
                    >
                        <div className={`relative overflow-hidden bg-gradient-to-br ${selectedProject.color} p-8`}>
                            <div className="absolute inset-0 grid-bg opacity-40" />
                            <div className="relative flex items-start justify-between gap-4">
                                <div>
                                    <Badge
                                        variant="outline"
                                        className="mb-4 border-white/20 bg-black/20 text-white backdrop-blur-sm"
                                    >
                                        {selectedProject.category}
                                    </Badge>
                                    <h2 id="project-dialog-title" className="text-3xl font-bold text-white">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="mt-2 text-sm text-white/75">
                                        {selectedProject.status} · {selectedProject.year}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    aria-label="Close project details"
                                    onClick={() => setSelectedProject(null)}
                                    className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-sm text-white transition-colors hover:bg-black/40"
                                >
                                    Esc
                                </button>
                            </div>
                        </div>

                        <div className="space-y-7 p-8">
                            <div>
                                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                    Overview
                                </p>
                                <p className="leading-relaxed text-foreground/85">
                                    {selectedProject.overview}
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="rounded-xl border border-border/60 bg-background/30 p-5">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        Project focus
                                    </p>
                                    <p className="text-sm leading-relaxed text-foreground/80">
                                        {selectedProject.focus}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-border/60 bg-background/30 p-5">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                        Technology
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tag) => {
                                            const TechIcon = techIcons[tag] || Code2;
                                            return (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs text-primary"
                                                >
                                                    <TechIcon className="h-3 w-3" />
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                                    Highlights
                                </p>
                                <div className="grid gap-2 sm:grid-cols-2">
                                    {selectedProject.highlights.map((highlight) => (
                                        <div key={highlight} className="flex items-start gap-2 text-sm text-foreground/80">
                                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                                            <span>{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 border-t border-border/50 pt-6">
                                {selectedProject.liveUrl && (
                                    <a
                                        href={selectedProject.liveUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                    >
                                        <Globe className="h-4 w-4" />
                                        Live demo
                                    </a>
                                )}
                                <a
                                    href={selectedProject.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
                                >
                                    <Code2 className="h-4 w-4" />
                                    View repository
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
