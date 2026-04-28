import { Badge } from "@/components/ui/badge"

export default function TermsOfServicePage() {
  return (
    <main className="relative pt-28 pb-24">
      <div className="relative max-w-4xl mx-auto px-6">
        <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
          Terms
        </Badge>
        <h1 className="text-4xl font-extrabold mb-6">Terms of Service</h1>

        <section className="prose prose-invert max-w-none text-muted-foreground">
          <p>
            Bu hizmet şartları, Coreor.net tarafından sunulan içerik ve hizmetlerin
            kullanım koşullarını düzenler. Sitemizi veya hizmetlerimizi kullanarak
            bu şartları kabul etmiş olursunuz.
          </p>

          <h2>Kabul ve Değişiklikler</h2>
          <p>
            Coreor.net, bu şartları herhangi bir zamanda güncelleme hakkına
            sahiptir. Önemli değişiklikler olduğunda bildirim yapılacaktır.
          </p>

          <h2>Sorumluluk Sınırları</h2>
          <p>
            Site içeriği bilgilendirme amaçlıdır; Coreor.net belirli uygulamalar
            ya da sonuçlar için garanti vermez. Hizmetlerin kesintisiz veya
            hatasız olacağı garanti edilmez.
          </p>

          <h2>Fesih</h2>
          <p>
            Kullanıcı sözleşmeyi ihlal ederse erişim sınırlanabilir veya sonlandırılabilir.
          </p>

          <h2>İletişim</h2>
          <p>Her türlü yasal ve sözleşmesel bildirim için hello@coreor.net adresine yazın.</p>
        </section>
      </div>
    </main>
  )
}
