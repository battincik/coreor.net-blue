import { Badge } from "@/components/ui/badge"

export default function CookiePolicyPage() {
  return (
    <main className="relative pt-28 pb-24">
      <div className="relative max-w-4xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
          Cookies
        </Badge>
        <h1 className="text-4xl font-extrabold mb-6">Cookie Policy</h1>

        <section className="prose prose-invert max-w-none text-muted-foreground">
          <p>
            Bu sayfa, Coreor.net'in çerez kullanımını açıklar. Çerezler, site
            deneyimini iyileştirmek, performansı ölçmek ve tercihlerinizin
            hatırlanması için kullanılır.
          </p>

          <h2>Çerez Türleri</h2>
          <ul>
            <li><strong>Zorunlu Çerezler:</strong> Site çalışması için gerekli olan çerezler.</li>
            <li><strong>Performans Çerezleri:</strong> Site kullanımını analiz eder ve geliştirmeye yardımcı olur.</li>
            <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi ve ayarlarınızı hatırlar.</li>
          </ul>

          <h2>Çerez Yönetimi</h2>
          <p>
            Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz,
            ancak bazı özellikler düzgün çalışmayabilir.
          </p>

          <h2>İletişim</h2>
          <p>Çerezler hakkında sorularınız için hello@coreor.net ile iletişime geçin.</p>
        </section>
      </div>
    </main>
  )
}
