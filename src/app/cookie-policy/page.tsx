import { Badge } from "@/components/ui/badge"

const LAST_UPDATED = "May 1, 2026"
const CONTACT_EMAIL = "hello@coreor.net"

const cookieCategories = [
  {
    category: "Essential cookies",
    purpose: "Required for the website to work securely and correctly, including session handling, security, load balancing, and remembering privacy choices.",
    consent: "Always active",
  },
  {
    category: "Analytics cookies",
    purpose: "Help us understand how visitors use our website, which pages are visited, and how we can improve performance and usability.",
    consent: "Used with consent where required",
  },
  {
    category: "Preference cookies",
    purpose: "Remember choices such as language, region, layout, or other interface preferences.",
    consent: "Used with consent where required",
  },
  {
    category: "Marketing cookies",
    purpose: "May be used to measure campaigns, personalize communications, or understand the effectiveness of advertising activities.",
    consent: "Used only with consent where required",
  },
  {
    category: "Third-party embedded content cookies",
    purpose: "May be set when embedded content such as videos, maps, widgets, or social media features are loaded.",
    consent: "Used with consent where required",
  },
]

const sections = [
  {
    id: "what-are-cookies",
    title: "1. What Are Cookies?",
    content: (
      <p>
        Cookies are small text files placed on your device when you visit a website. They allow websites to recognize
        your browser, remember certain information, maintain security, provide core functionality, measure performance,
        and improve user experience. Similar technologies, such as pixels, tags, local storage, SDKs, and device
        identifiers, may also be used for comparable purposes.
      </p>
    ),
  },
  {
    id: "scope",
    title: "2. Scope of This Cookie Policy",
    content: (
      <p>
        This Cookie Policy explains how Coreor.net uses cookies and similar technologies on its website, digital services,
        forms, landing pages, and related online interfaces. It should be read together with our Privacy Policy, which
        explains how we process personal data more generally.
      </p>
    ),
  },
  {
    id: "why-we-use-cookies",
    title: "3. Why We Use Cookies",
    content: (
      <ul>
        <li>To keep the website secure, stable, and functional.</li>
        <li>To remember cookie choices and privacy preferences.</li>
        <li>To understand how visitors interact with our website.</li>
        <li>To improve page performance, usability, and content quality.</li>
        <li>To detect errors, abuse, spam, fraud, or suspicious activity.</li>
        <li>To support embedded content or third-party functionality where enabled.</li>
        <li>To measure the effectiveness of marketing or communication campaigns where permitted.</li>
      </ul>
    ),
  },
  {
    id: "cookie-categories",
    title: "4. Types of Cookies We Use",
    content: (
      <>
        <p>
          The exact cookies used may change depending on our website configuration, analytics tools, security providers,
          embedded content, and user choices. The main categories are listed below.
        </p>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Purpose</th>
                <th className="px-4 py-3 font-semibold">Consent status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {cookieCategories.map((item) => (
                <tr key={item.category} className="align-top">
                  <td className="px-4 py-3 font-medium text-foreground">{item.category}</td>
                  <td className="px-4 py-3">{item.purpose}</td>
                  <td className="px-4 py-3">{item.consent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "essential-cookies",
    title: "5. Essential Cookies",
    content: (
      <>
        <p>
          Essential cookies are necessary for the website to operate. They may be used for security, session management,
          network routing, fraud prevention, form protection, consent preference storage, and accessibility-related
          functionality.
        </p>
        <p>
          Because these cookies are required for the website to function, they are generally active by default and cannot
          be disabled through our cookie preference panel. You may block them through your browser settings, but doing so
          may cause parts of the website to stop working correctly.
        </p>
      </>
    ),
  },
  {
    id: "analytics-cookies",
    title: "6. Analytics and Performance Cookies",
    content: (
      <>
        <p>
          Analytics and performance cookies help us understand website traffic, page usage, visitor interactions,
          performance issues, and content effectiveness. These insights help us improve our services and user experience.
        </p>
        <p>
          Where required by applicable law, these cookies are used only after you provide consent. If analytics are
          configured in a privacy-preserving or strictly necessary way, the applicable legal basis and consent requirement
          may differ depending on the configuration and jurisdiction.
        </p>
      </>
    ),
  },
  {
    id: "preference-cookies",
    title: "7. Preference Cookies",
    content: (
      <p>
        Preference cookies allow the website to remember choices you make, such as language, region, display settings,
        or other interface preferences. These cookies improve convenience but are not always strictly necessary. Where
        required, they are used based on your consent.
      </p>
    ),
  },
  {
    id: "marketing-cookies",
    title: "8. Marketing Cookies",
    content: (
      <>
        <p>
          Marketing cookies may be used to understand campaign performance, measure conversions, personalize marketing
          communications, or limit repeated exposure to the same content. These cookies may be set by Coreor.net or by
          third-party providers that help us measure and improve our marketing activities.
        </p>
        <p>
          We do not activate marketing cookies unless legally permitted and, where required, you have provided consent.
          You can withdraw or change your consent at any time through the cookie preference panel.
        </p>
      </>
    ),
  },
  {
    id: "third-party-cookies",
    title: "9. Third-Party Cookies and Embedded Content",
    content: (
      <>
        <p>
          Some pages may include third-party content such as videos, maps, analytics tools, social media features, chat
          widgets, fonts, or external media. These third parties may set cookies or similar technologies when their
          content is loaded or when you interact with it.
        </p>
        <p>
          Third-party providers process data according to their own privacy and cookie policies. We recommend reviewing
          those policies before interacting with third-party content. Where feasible, non-essential third-party content
          should remain disabled until you make a choice.
        </p>
      </>
    ),
  },
  {
    id: "cookie-duration",
    title: "10. Cookie Duration",
    content: (
      <>
        <p>Cookies may be stored for different periods depending on their purpose:</p>
        <ul>
          <li>Session cookies are deleted when you close your browser.</li>
          <li>Persistent cookies remain on your device for a defined period or until deleted manually.</li>
          <li>Consent preference cookies may be stored to remember your choices.</li>
          <li>Analytics and marketing cookies may have different retention periods depending on the provider.</li>
        </ul>
        <p>
          We aim to keep cookie durations proportionate and avoid retaining identifiers longer than necessary for the
          relevant purpose.
        </p>
      </>
    ),
  },
  {
    id: "manage-cookies",
    title: "11. How to Manage Cookies",
    content: (
      <>
        <p>
          You can manage non-essential cookies through our cookie banner or cookie preference panel where available. You
          may accept all, reject all, or customize your choices by category.
        </p>
        <p>
          You can also control cookies through your browser settings. Most browsers allow you to delete existing cookies,
          block new cookies, receive warnings before cookies are stored, or block cookies from specific websites. Browser
          controls may affect website functionality, especially if essential cookies are blocked.
        </p>
      </>
    ),
  },
  {
    id: "consent-withdrawal",
    title: "12. Consent and Withdrawal",
    content: (
      <p>
        Where cookies are used based on consent, you may withdraw or change your consent at any time. Withdrawing consent
        does not affect the lawfulness of processing carried out before withdrawal. After withdrawal, we will stop using
        the relevant non-essential cookies unless another valid legal basis applies.
      </p>
    ),
  },
  {
    id: "personal-data",
    title: "13. Cookies and Personal Data",
    content: (
      <p>
        Some cookies and similar technologies may process personal data, such as IP addresses, device identifiers, cookie
        IDs, usage events, or interaction data. Where such data is processed, we handle it in accordance with our Privacy
        Policy, GDPR where applicable, KVKK, and other relevant data protection laws.
      </p>
    ),
  },
  {
    id: "updates",
    title: "14. Changes to This Cookie Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes in our website, technologies, providers,
        legal requirements, or business practices. The latest version will be published on this page with the updated
        effective date.
      </p>
    ),
  },
  {
    id: "contact",
    title: "15. Contact",
    content: (
      <p>
        If you have questions about this Cookie Policy or how Coreor.net uses cookies and similar technologies, you can
        contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    ),
  },
]

export default function CookiePolicyPage() {
  return (
    <main className="relative min-h-screen bg-background pt-28 pb-24 text-foreground">
      <div className="relative mx-auto max-w-6xl px-6">
        <header className="rounded-[2rem] border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur sm:p-10">
          <Badge className="mb-6 border border-primary/30 bg-primary/10 text-xs uppercase tracking-widest text-primary hover:bg-primary/10">
            Cookie Policy
          </Badge>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Cookie Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            This Cookie Policy explains how Coreor.net uses cookies and similar technologies to operate our website,
            protect our services, remember preferences, analyze performance, and improve user experience.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            This policy should be read together with our Privacy Policy. It describes the main cookie categories we use,
            why we use them, and how you can manage your choices.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last updated</p>
              <p className="mt-1 font-medium text-foreground">{LAST_UPDATED}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Controller</p>
              <p className="mt-1 font-medium text-foreground">Coreor.net</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact</p>
              <p className="mt-1 font-medium text-foreground">{CONTACT_EMAIL}</p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <nav className="rounded-3xl border border-border/60 bg-card/50 p-5 shadow-sm backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                On this page
              </h2>

              <ol className="mt-4 space-y-1 text-sm">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      {section.title.replace(/^\d+\.\s*/, "")}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="space-y-8">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 rounded-3xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur sm:p-8"
              >
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{section.title}</h2>

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_h3]:pt-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                  {section.content}
                </div>
              </section>
            ))}

            <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Cookie Banner Text</h2>

              <div className="mt-6 rounded-2xl border border-border/60 bg-background/70 p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  We use essential cookies to keep this website secure and functional. With your permission, we also use
                  analytics and similar technologies to understand site performance and improve our services. You can
                  accept all, reject all, or customize your choices.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    Accept all
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground"
                  >
                    Reject all
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur sm:p-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Implementation Note</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Before publishing this Cookie Policy, Coreor.net should add the actual cookie names, providers, durations,
                categories, and transfer locations used on the website. The cookie banner should block non-essential
                cookies until the visitor makes a valid choice where consent is required.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
