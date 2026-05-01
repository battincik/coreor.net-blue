import { getService } from "@/lib/services"
import Link from "next/link"

type Props = { params: Promise<{ slug: string }> }

export default async function ServicePage({ params }: Props) {
  const resolved = (await params) as { slug: string }
  const service = getService(resolved.slug)
  if (!service) {
    return (
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-2xl font-bold">Service not found</h1>
          <p className="text-muted-foreground">We couldn't find the service you're looking for.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-xs text-muted-foreground mb-4">Service</div>
        <h1 className="text-4xl font-extrabold mb-4">{service.title}</h1>
        <p className="text-muted-foreground mb-6">{service.overview}</p>
        <div className="prose prose-invert max-w-none text-muted-foreground mb-8">
          {service.details.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>

        <div className="flex gap-4">
          <Link href={`/contact?subject=${encodeURIComponent(service.title)}`} className="btn-glow bg-primary text-primary-foreground px-4 py-2 rounded-md">Contact us about this project</Link>
          <Link href="/contact" className="text-sm text-muted-foreground">General contact page</Link>
        </div>
      </div>
    </main>
  )
}
