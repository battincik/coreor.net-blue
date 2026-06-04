import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const settings = [
  { label: "Theme", value: "System" },
  { label: "Notifications", value: "Enabled" },
  { label: "Public Mode", value: "Restricted" },
]

export default function AdminSettingsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Admin</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">Mockup settings page for admin preferences and access flags.</p>
      </div>

      <Card className="border-border/60 bg-card/80 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Current Preferences</CardTitle>
          <CardDescription>Placeholder configuration summary</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {settings.map((setting) => (
            <div key={setting.label} className="rounded-2xl border border-border/60 bg-background/40 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{setting.label}</p>
              <p className="mt-2 text-sm font-medium text-foreground">{setting.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">Mockup</Badge>
        <Badge variant="outline" className="border-border/40 bg-background/60 text-muted-foreground">Ready for wiring</Badge>
      </div>
    </section>
  )
}