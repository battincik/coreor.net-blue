"use client";
import { useState, useEffect, useRef } from "react";
import { ExternalLink, Code as Code2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type Category = "All" | "Web" | "Mobile" | "Cloud" | "AI";

const projects = [
    // {
    //   title: "NexusBank Platform",
    //   category: "Web" as Category,
    //   tags: ["React", "Node.js", "PostgreSQL", "AWS"],
    //   desc: "A fully-featured digital banking platform serving 200,000+ customers. Includes real-time transaction processing, multi-currency support, and a regulatory compliance dashboard.",
    //   impact: ["$2M+ daily transaction volume", "200K active users", "99.99% uptime"],
    //   year: "2023",
    //   color: "from-cyan-500/20 to-sky-500/10",
    // },
    // {
    //   title: "MediLink Health App",
    //   category: "Mobile" as Category,
    //   tags: ["React Native", "Go", "FHIR", "AWS"],
    //   desc: "A HIPAA-compliant telemedicine platform connecting patients with specialists. Features real-time video consultations, EHR integration, and AI-assisted symptom checking.",
    //   impact: ["15,000 monthly consultations", "50+ hospitals integrated", "4.9 App Store rating"],
    //   year: "2023",
    //   color: "from-teal-500/20 to-emerald-500/10",
    // },
    // {
    //   title: "CloudVault Infrastructure",
    //   category: "Cloud" as Category,
    //   tags: ["Kubernetes", "Terraform", "AWS", "Prometheus"],
    //   desc: "Designed and migrated a legacy monolith to a 40-microservice Kubernetes cluster for a logistics company. Reduced infrastructure costs by 60% while tripling throughput.",
    //   impact: ["60% cost reduction", "3x throughput increase", "Zero-downtime migration"],
    //   year: "2022",
    //   color: "from-sky-500/20 to-cyan-500/10",
    // },
    // {
    //   title: "DataMind Analytics",
    //   category: "AI" as Category,
    //   tags: ["Python", "TensorFlow", "Kafka", "React"],
    //   desc: "An AI-powered business intelligence platform that ingests streaming data and generates natural-language insights for non-technical executives. Processes 10M events per day.",
    //   impact: ["10M daily events", "98% prediction accuracy", "3-minute setup time"],
    //   year: "2024",
    //   color: "from-cyan-500/20 to-teal-500/10",
    // },
    {
        title: "Coreor E-Commerce Platform",
        category: "Web" as Category,
        tags: ["Next.js", "Stripe", "Redis", "Elasticsearch", "Microservices"],
        desc: "A scalable and fully customizable e-commerce platform designed for modern retail operations. Built with a composable architecture, the system supports modular feature development, enabling businesses to tailor every aspect of the shopping experience. It includes advanced product management, high-performance search powered by Elasticsearch, real-time caching with Redis, and seamless payment integrations. The platform is engineered to handle high traffic scenarios such as flash sales while maintaining low latency and reliability.",
        impact: [
            "Modular and extensible architecture enabling rapid feature development",
            "Sub-100ms response times with Redis-based caching",
            "Scalable infrastructure designed for high concurrency workloads",
            "Flexible product and campaign management system",
            "Ongoing development with continuous performance and feature improvements",
        ],
        year: "2023",
        color: "from-sky-500/20 to-blue-500/10",
    },
    {
        title: "Fleet Management Platform",
        category: "AI" as Category,
        tags: ["Python", "React Native", "GraphQL", "ML", "Microservices"],
        desc: "An end-to-end fleet management and analytics platform built for vehicle rental companies. The system provides real-time vehicle tracking, fuel consumption monitoring, predictive maintenance, customer management, and integrated payment workflows. Advanced machine learning models analyze vehicle usage patterns and predict potential failures, while analytics dashboards deliver actionable insights to optimize operations and reduce costs.",
        impact: [
            "2,000+ vehicles tracked in real-time",
            "45% reduction in downtime",
            "30% fuel cost optimization",
            "End-to-end rental, customer, and payment management",
        ],
        year: "2024",
        color: "from-cyan-500/20 to-sky-500/10",
    },
    {
        title: "Real Estate CRM Platform",
        category: "Web" as Category,
        tags: ["React", "Node.js", "MongoDB", "Mapbox", "Microservices"],
        desc: "A comprehensive CRM platform built for real estate agencies to manage property listings, land portfolios, and customer relationships in a unified system. The platform features advanced property search with interactive maps, lead tracking, client segmentation, and AI-assisted property valuation. Designed with a scalable microservices architecture, it supports multi-region operations and high-performance data processing for real-time insights.",
        impact: [
            "12,000+ active property listings",
            "Used across 3 countries",
            "AI-powered property valuation in under 2 seconds",
            "Improved lead conversion and client tracking efficiency",
        ],
        year: "2022",
        color: "from-teal-500/20 to-sky-500/10",
    },
];

const categories: Category[] = ["All", "Web", "Mobile", "Cloud", "AI"];

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
                        A selection of projects that showcase our range,
                        technical depth, and real-world impact.
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
                                            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                                <Code2 className="w-3.5 h-3.5" />{" "}
                                                Coreor.net - Development Partner
                                            </button>
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
