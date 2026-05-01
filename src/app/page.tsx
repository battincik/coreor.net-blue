"use client";
import { useEffect, useRef, useState } from "react";
import {
    Code as Code2,
    Server,
    Cloud,
    Smartphone,
    Shield,
    Database,
    Globe,
    CreditCard,
    Mail,
    Rocket,
    Users,
    Clock,
    TrendingUp,
    CircleCheck as CheckCircle,
    ArrowRight,
    Star,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNav } from "@/lib/navigation";
import { useIntersection } from "@/hooks/use-intersection";
import { useCounter } from "@/hooks/use-counter";

const ROTATING_WORDS = [
    "Scalable",
    "Secure",
    "Modern",
    "Innovative",
    "Resilient",
];

const services = [
    {
        icon: Code2,
        title: "Software Development",
        desc: "Custom web and mobile applications built with modern frameworks and best practices.",
        color: "text-cyan-400",
    },
    {
        icon: Globe,
        title: "Web & Mobile Apps",
        desc: "Responsive web apps and native mobile experiences that delight users on every platform.",
        color: "text-teal-400",
    },
    {
        icon: Cloud,
        title: "Cloud Infrastructure",
        desc: "Scalable, fault-tolerant cloud architectures on AWS, GCP and Azure.",
        color: "text-sky-400",
    },
    {
        icon: Database,
        title: "Database Management",
        desc: "Expert design, optimization, and ongoing maintenance of your database systems.",
        color: "text-cyan-400",
    },
    {
        icon: Server,
        title: "Server Services",
        desc: "Dedicated and managed server solutions with guaranteed 99.9% uptime SLA.",
        color: "text-teal-400",
    },
    {
        icon: Shield,
        title: "Cybersecurity",
        desc: "State-of-the-art security audits, penetration testing, and system hardening.",
        color: "text-sky-400",
    },
    {
        icon: Mail,
        title: "Email Services",
        desc: "Secure, enterprise-grade email infrastructure with spam protection and analytics.",
        color: "text-cyan-400",
    },
    {
        icon: CreditCard,
        title: "Payment Infrastructure",
        desc: "PCI-DSS compliant payment gateway integrations for seamless e-commerce.",
        color: "text-teal-400",
    },
    {
        icon: Smartphone,
        title: "Digital Advertising",
        desc: "Data-driven digital marketing campaigns that maximize your ROI and reach.",
        color: "text-sky-400",
    },
];

const whyUs = [
    {
        icon: Rocket,
        title: "Cutting-edge Technology",
        desc: "We use the latest technologies to build scalable, performant solutions that stand the test of time.",
    },
    {
        icon: Code2,
        title: "Custom Solutions",
        desc: "Tailored software that perfectly fits your unique business needs — no templates, no shortcuts.",
    },
    {
        icon: Users,
        title: "Collaborative Process",
        desc: "We work closely with your team at every stage, ensuring your vision becomes reality.",
    },
    {
        icon: Shield,
        title: "Robust Security",
        desc: "Your data and systems are protected with state-of-the-art security measures and regular audits.",
    },
    {
        icon: TrendingUp,
        title: "Innovative Approach",
        desc: "We think outside the box to solve complex problems creatively and efficiently.",
    },
    {
        icon: Clock,
        title: "Timely Delivery",
        desc: "We pride ourselves on delivering projects on time and within budget — every single time.",
    },
];

const testimonials = [
    {
        quote: "Coreor completely transformed our payment infrastructure. The team delivered a flawless integration that processes over $2M daily with zero downtime.",
        author: "David Reyes",
        role: "CTO",
        company: "NexusFinance",
        rating: 5,
    },
    {
        quote: "From concept to launch in just 8 weeks. The quality of work was exceptional and the team was always proactive in solving challenges before they became problems.",
        author: "Sarah Kim",
        role: "CEO",
        company: "HealthBridge",
        rating: 5,
    },
    {
        quote: "We've worked with many dev agencies, but Coreor is in a different league. Their cloud migration saved us 60% on infrastructure costs.",
        author: "Marcus Johnson",
        role: "VP Engineering",
        company: "LogiStream",
        rating: 5,
    },
];

const stats = [
    { value: 150, suffix: "+", label: "Projects Delivered" },
    { value: 60, suffix: "+", label: "Happy Clients" },
    { value: 99, suffix: ".9%", label: "Uptime SLA" },
    { value: 5, suffix: "+", label: "Years of Excellence" },
];

const process = [
    {
        num: "01",
        title: "Discovery",
        desc: "We dive deep into your business goals, technical requirements, and user needs to build a solid foundation.",
    },
    {
        num: "02",
        title: "Architecture",
        desc: "Our engineers design a scalable system blueprint with clear milestones, technology choices, and risk assessment.",
    },
    {
        num: "03",
        title: "Development",
        desc: "Agile sprints with weekly demos. Clean code, thorough testing, and continuous integration from day one.",
    },
    {
        num: "04",
        title: "Launch & Support",
        desc: "We handle deployment, monitoring setup, and remain your long-term technical partner for growth and maintenance.",
    },
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

function useTypewriter(words: string[]) {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = words[wordIndex];

        let timeout: NodeJS.Timeout;

        if (!isDeleting && text !== current) {
            // yazma
            timeout = setTimeout(() => {
                setText(current.slice(0, text.length + 1));
            }, 90); // 🔥 yazma hızı
        } else if (!isDeleting && text === current) {
            // pause
            timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 1400); // 🔥 bekleme
        } else if (isDeleting && text !== "") {
            // silme
            timeout = setTimeout(() => {
                setText(current.slice(0, text.length - 1));
            }, 40); // 🔥 silme daha hızlı
        } else if (isDeleting && text === "") {
            // next word
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return text;
}

function StatCard({
    value,
    suffix,
    label,
    isActive,
}: {
    value: number;
    suffix: string;
    label: string;
    isActive: boolean;
}) {
    const count = useCounter(value, 1800, isActive);
    return (
        <div className="text-center">
            <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                {count}
                {suffix}
            </div>
            <div className="text-sm text-muted-foreground font-medium">
                {label}
            </div>
        </div>
    );
}

export default function HomePage() {
    const { navigate } = useNav();
    const animatedWord = useTypewriter(ROTATING_WORDS);
    const { ref: statsRef, isVisible: statsVisible } = useIntersection();

    return (
        <div className="overflow-hidden">
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center pt-16">
                <div className="absolute inset-0 grid-bg" />
                <div className="absolute inset-0 hero-glow" />
                {/* Decorative orbs */}
                <div
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-10 animate-float"
                    style={{
                        background:
                            "radial-gradient(circle, oklch(0.76 0.15 200), transparent)",
                    }}
                />
                <div
                    className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full opacity-8 animate-float-delayed"
                    style={{
                        background:
                            "radial-gradient(circle, oklch(0.68 0.14 170), transparent)",
                    }}
                />

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <div className="animate-slide-up">
                        <Badge
                            variant="outline"
                            className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs font-medium tracking-widest uppercase"
                        >
                            Next-Generation Software Solutions
                        </Badge>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none">
                        <span
                            className="block text-foreground animate-fade-in"
                            style={{ animationDelay: "0.1s" }}
                        >
                            Building
                        </span>
                        <span
                            className="block gradient-text animate-fade-in"
                            style={{ animationDelay: "0.2s" }}
                        >
                            <span className="inline-block">
                                {animatedWord}
                                <span className="ml-1 animate-pulse text-primary">
                                    |
                                </span>
                            </span>
                        </span>
                        <span
                            className="block text-foreground animate-fade-in"
                            style={{ animationDelay: "0.3s" }}
                        >
                            Digital Products
                        </span>
                    </h1>

                    <p
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
                        style={{ animationDelay: "0.4s" }}
                    >
                        From software development to cloud infrastructure,
                        Coreor provides end-to-end digital services trusted by
                        companies across fintech, healthcare, logistics, and
                        beyond.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
                        style={{ animationDelay: "0.5s" }}
                    >
                        <Button
                            size="lg"
                            onClick={() => navigate("contact")}
                            className="btn-glow bg-primary text-primary-foreground font-semibold px-8"
                        >
                            Start a Project
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate("works")}
                            className="border-border hover:border-primary/50 hover:text-primary"
                        >
                            View Our Work
                        </Button>
                    </div>

                    {/* Floating tech badges */}
                    <div
                        className="mt-16 flex flex-wrap justify-center gap-3 animate-fade-in"
                        style={{ animationDelay: "0.7s" }}
                    >
                        {[
                            "React",
                            "Node.js",
                            "TypeScript",
                            "AWS",
                            "Go",
                            "PostgreSQL",
                            "Docker",
                            "Kubernetes",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1.5 rounded-full border border-border/60 text-xs text-muted-foreground bg-card/50"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 border-y border-border/50 bg-card/30 relative">
                <div className="max-w-5xl mx-auto px-6">
                    <div
                        ref={statsRef as React.RefObject<HTMLDivElement>}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-10"
                    >
                        {stats.map((s) => (
                            <StatCard
                                key={s.label}
                                {...s}
                                isActive={statsVisible}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="py-24 relative">
                <div className="absolute inset-0 dot-bg opacity-20" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <RevealSection className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            What We Build
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Our Services
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            A full spectrum of digital services to take your
                            business from idea to production and beyond.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((s, i) => (
                            <RevealSection key={s.title} delay={i * 60}>
                                <div className="glow-card rounded-xl p-6 bg-card h-full">
                                    <div
                                        className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}
                                    >
                                        <s.icon
                                            className={`w-5 h-5 ${s.color}`}
                                        />
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        {s.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {s.desc}
                                    </p>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-24 bg-card/20 border-y border-border/30 relative">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <RevealSection className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            Why Coreor
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Built Different
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            We don't just write code — we build systems that
                            scale, partnerships that last, and products that
                            matter.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {whyUs.map((item, i) => (
                            <RevealSection
                                key={item.title}
                                delay={i * 80}
                                className="h-full"
                            >
                                <div className="flex gap-4 p-6 rounded-xl glow-card bg-card h-full">
                                    <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                        {(() => { const Icon = item.icon; return <Icon className="w-4 h-4 text-primary" /> })()}
                                    </div>

                                    <div className="flex flex-col justify-between h-full">
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1.5">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="py-24 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <RevealSection className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            How We Work
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Our Process
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            A proven four-step methodology that ensures every
                            project ships on time, on budget, and over
                            expectations.
                        </p>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((step, i) => (
                            <RevealSection key={step.num} delay={i * 100}>
                                <div className="relative p-6 rounded-xl bg-card border border-border/50 h-full group hover:border-primary/30 transition-colors">
                                    <div className="text-5xl font-black gradient-text mb-3 opacity-50 group-hover:opacity-80 transition-opacity">
                                        {step.num}
                                    </div>
                                    <h3 className="font-semibold text-foreground mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {step.desc}
                                    </p>
                                    {i < process.length - 1 && (
                                        <ChevronRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-border z-10" />
                                    )}
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-24 bg-card/20 border-y border-border/30 relative">
                <div className="absolute inset-0 dot-bg opacity-15" />
                <div className="relative max-w-7xl mx-auto px-6">
                    <RevealSection className="text-center mb-16">
                        <Badge
                            variant="outline"
                            className="mb-4 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            Client Stories
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Trusted Worldwide
                        </h2>
                    </RevealSection>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <RevealSection key={t.author} delay={i * 100}>
                                <div className="glow-card rounded-xl p-6 bg-card flex flex-col h-full">
                                    <div className="flex gap-0.5 mb-4">
                                        {Array.from({ length: t.rating }).map(
                                            (_, j) => (
                                                <Star
                                                    key={j}
                                                    className="w-4 h-4 fill-amber-400 text-amber-400"
                                                />
                                            ),
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic mb-6 flex-1">
                                        "{t.quote}"
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                                        <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-sm font-semibold text-primary">
                                            {t.author[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-foreground">
                                                {t.author}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {t.role}, {t.company}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <div className="absolute inset-0 hero-glow" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-8 blur-3xl"
                    style={{
                        background:
                            "radial-gradient(ellipse, oklch(0.76 0.15 200), transparent)",
                    }}
                />

                <div className="relative max-w-3xl mx-auto px-6 text-center">
                    <RevealSection>
                        <Badge
                            variant="outline"
                            className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase"
                        >
                            Let's Build Together
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                            Ready to Transform
                            <span className="block gradient-text">
                                Your Business?
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-10">
                            Join 60+ companies that trust Coreor to power their
                            most critical digital systems.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                onClick={() => navigate("contact")}
                                className="btn-glow bg-primary text-primary-foreground font-semibold px-10"
                            >
                                Get a Free Consultation
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("careers")}
                                className="border-border hover:border-primary/50"
                            >
                                <CheckCircle className="mr-2 w-4 h-4" />
                                Join Our Team
                            </Button>
                        </div>
                    </RevealSection>
                </div>
            </section>
        </div>
    );
}
