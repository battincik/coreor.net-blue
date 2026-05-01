"use client";
import { useEffect, useRef, useState } from "react";
import {
    Target,
    Eye,
    Heart,
    Award,
    Globe,
    Code as Code2,
    ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNav } from "@/lib/navigation";

const milestones = [
    {
        year: "2022",
        title: "Foundation",
        desc: "Coreor was founded in Ankara with a team of 2 engineers passionate about building exceptional software.",
    },
    {
        year: "2023",
        title: "First Enterprise Client",
        desc: "Delivered custom ERP and CRM solutions for our first enterprise client, helping them manage and streamline their company operations.",
    },
    {
        year: "2024",
        title: "Infrastructure & Data Services Expansion",
        desc: "Transitioned to our own server infrastructure to deliver uninterrupted service, and introduced additional solutions in database management and data operations.",
    },
    {
        year: "2025",
        title: "International Growth Milestone",
        desc: "Reached 25+ clients across 3 countries and expanded our team network with part-time developers and designers.",
    },
    {
        year: "2026",
        title: "Global SaaS & Enterprise Solutions",
        desc: "Entered a new phase of global growth by launching our own products and investments, offering fully customizable ERP, e-commerce, and CRM solutions for enterprise companies worldwide.",
    },
];

const values = [
    {
        icon: Target,
        title: "Precision",
        desc: "We are meticulous about quality. Every line of code, every design decision is made with care and purpose.",
    },
    {
        icon: Heart,
        title: "Ownership",
        desc: "We treat every client project as if it were our own company. Your success is genuinely our success.",
    },
    {
        icon: Globe,
        title: "Transparency",
        desc: "No surprises. Honest estimates, clear communication, and regular updates at every stage of the project.",
    },
    {
        icon: Award,
        title: "Excellence",
        desc: "We hold ourselves to the highest professional standards — in code quality, communication, and delivery.",
    },
];

const team = [
    {
        name: "Ahmet Kaya",
        role: "CEO & Co-Founder",
        dept: "Leadership",
        bio: "10+ years building enterprise software. Previously at SAP and Getir.",
    },
    {
        name: "Zeynep Yilmaz",
        role: "CTO & Co-Founder",
        dept: "Engineering",
        bio: "Former Google engineer. Loves distributed systems and clean architecture.",
    },
    {
        name: "Can Demir",
        role: "Lead Designer",
        dept: "Design",
        bio: "Award-winning UX designer with a background in cognitive psychology.",
    },
    {
        name: "Elif Sahin",
        role: "Head of Cloud",
        dept: "Infrastructure",
        bio: "AWS certified solutions architect with 8 years in DevOps.",
    },
    {
        name: "Burak Arslan",
        role: "Lead Backend Engineer",
        dept: "Engineering",
        bio: "Go and Python expert who built systems processing millions of transactions.",
    },
    {
        name: "Irem Koc",
        role: "Business Development",
        dept: "Sales",
        bio: "Grew revenue 3x at her previous SaaS startup. Connects people and builds partnerships.",
    },
];

const techStack = [
    // Frontend
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",

    // Backend & API
    "Node.js",
    "NestJS",
    "Fastify",
    "Express.js",
    "tRPC",
    "Apollo Server",
    "GraphQL",
    "gRPC",

    // Mobile
    "React Native",
    "Swift",

    // Databases & ORM
    "PostgreSQL",
    "MongoDB",
    "MySQL",
    "SQLite",
    "Cassandra",
    "Redis",
    "Prisma",
    "Supabase",

    // Messaging & Search
    "RabbitMQ",
    "Elasticsearch",

    // DevOps & Infrastructure
    "Docker",
    "Kubernetes",
    "AWS",
    "Cloudflare",
    "Nginx",
    "GitHub Actions",

    // Observability
    "Prometheus",
    "Grafana",
    "New Relic",

    // Testing
    "Jest",
    "Mocha",

    // Security & Auth
    "JWT",

    // Languages
    "Go",
    "Python",

    // AI / ML
    "TensorFlow",
    "PyTorch",
];

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
            { threshold: 0.1 },
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

export default function AboutPage() {
    const { navigate } = useNav();

    return (
        <div className="overflow-hidden">
            {/* Hero */}
            <section className="relative pt-32 pb-20 text-center">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 hero-glow" />
                <div className="relative max-w-4xl mx-auto px-6">
                    <Badge
                        variant="outline"
                        className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                    >
                        About Us
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        We Build{" "}
                        <span className="gradient-text">Digital Futures</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Founded in Ankara in 2021, Coreor is a full-service
                        software development company serving clients across
                        three continents. We combine engineering rigor with
                        design thinking to create products that people love.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 border-y border-border/30">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <RevealSection>
                        <div className="glow-card rounded-xl p-8 bg-card h-full">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                                <Target className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                                Our Mission
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                To empower businesses of every size with
                                world-class software, cloud infrastructure, and
                                digital services — delivered with honesty,
                                craftsmanship, and a relentless focus on
                                results. We measure success not by lines of
                                code, but by the real-world impact we create for
                                our clients.
                            </p>
                        </div>
                    </RevealSection>
                    <RevealSection delay={100}>
                        <div className="glow-card rounded-xl p-8 bg-card h-full">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                                <Eye className="w-5 h-5 text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                                Our Vision
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                To become the most trusted software partner for
                                growing businesses worldwide — a company where
                                engineers do the best work of their lives, and
                                clients build products that genuinely change
                                industries. Technology should be a force
                                multiplier, and that is what we build every day.
                            </p>
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 relative">
                <div className="absolute inset-0 dot-bg opacity-15" />
                <div className="relative max-w-4xl mx-auto px-6">
                    <RevealSection className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            Our Journey
                        </Badge>
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Company Timeline
                        </h2>
                    </RevealSection>

                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/60 md:-translate-x-px" />
                        <div className="space-y-10">
                            {milestones.map((m, i) => (
                                <RevealSection key={m.year} delay={i * 80}>
                                    <div
                                        className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    >
                                        <div
                                            className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "pr-10 text-right" : "pl-10"}`}
                                        >
                                            <div className="inline-block p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                                                <div className="text-xs text-primary font-semibold tracking-widest mb-1">
                                                    {m.year}
                                                </div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    {m.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {m.desc}
                                                </p>
                                            </div>
                                        </div>
                                        {/* Dot */}
                                        <div className="relative flex items-center md:justify-center md:w-0">
                                            <div className="w-3 h-3 rounded-full bg-primary border-2 border-background md:absolute z-10" />
                                        </div>
                                        {/* Mobile / right side */}
                                        <div className={`md:hidden flex-1`}>
                                            <div className="p-4 rounded-xl bg-card border border-border/50">
                                                <div className="text-xs text-primary font-semibold tracking-widest mb-1">
                                                    {m.year}
                                                </div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    {m.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {m.desc}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`hidden md:block md:w-1/2 ${i % 2 === 0 ? "pl-10" : "pr-10 text-right"}`}
                                        />
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 bg-card/20 border-y border-border/30">
                <div className="max-w-6xl mx-auto px-6">
                    <RevealSection className="text-center mb-14">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            What We Stand For
                        </Badge>
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Our Core Values
                        </h2>
                    </RevealSection>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                        {values.map((v, i) => (
                            <RevealSection
                                key={v.title}
                                delay={i * 80}
                                className="h-full"
                            >
                                <div className="glow-card rounded-xl p-6 bg-card text-center h-full flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                            {(() => {
                                                const Icon = v.icon;
                                                return (
                                                    <Icon className="w-5 h-5 text-primary" />
                                                );
                                            })()}
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">
                                            {v.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {v.desc}
                                        </p>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            {/* <section className="py-24 relative">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="relative max-w-6xl mx-auto px-6">
                    <RevealSection className="text-center mb-14">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            The Team
                        </Badge>
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Meet the People
                        </h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            A diverse team of engineers, designers, and
                            strategists united by a passion for craft and
                            innovation.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, i) => (
                            <RevealSection key={member.name} delay={i * 70}>
                                <div className="glow-card rounded-xl p-6 bg-card flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                                        {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-foreground">
                                            {member.name}
                                        </div>
                                        <div className="text-xs text-primary mb-2">
                                            {member.role}
                                        </div>
                                        <Badge
                                            variant="secondary"
                                            className="text-xs mb-3"
                                        >
                                            {member.dept}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground">
                                            {member.bio}
                                        </p>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Tech stack */}
            <section className="py-20 bg-card/20 border-t border-border/30">
                <div className="max-w-5xl mx-auto px-6">
                    <RevealSection className="text-center mb-10">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            Technology
                        </Badge>
                        <h2 className="text-3xl font-bold text-foreground mb-3">
                            Tech We Master
                        </h2>
                        <p className="text-muted-foreground">
                            Modern, battle-tested tools that power reliable
                            systems at any scale.
                        </p>
                    </RevealSection>
                    <RevealSection>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {techStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 rounded-full bg-card border border-border/60 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-default"
                                >
                                    <Code2 className="inline w-3.5 h-3.5 mr-1.5 -mt-0.5" />
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </RevealSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 text-center relative">
                <div className="absolute inset-0 grid-bg opacity-40" />
                <div className="relative max-w-2xl mx-auto px-6">
                    <RevealSection>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Want to Work With Us?
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            We're always looking for talented people to join our
                            growing team.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => navigate("careers")}
                                className="btn-glow bg-primary text-primary-foreground font-semibold"
                            >
                                View Open Positions{" "}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("contact")}
                                className="border-border hover:border-primary/50"
                            >
                                Get in Touch
                            </Button>
                        </div>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
}
