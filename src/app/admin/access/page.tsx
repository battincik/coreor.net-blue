import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminAccessPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Access Control</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Only users with wildcard permission can reach admin pages.</p>
      </div>

      <Card className="border-border/60 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Permission Rule</CardTitle>
          <CardDescription>Mockup access explanation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Admin access requires the permissions array to contain <span className="font-semibold text-foreground">*</span>.</p>
          <p>If the token is valid but the wildcard permission is missing, the app sends the user to the 403 page.</p>
        </CardContent>
      </Card>
    </section>
  )
}