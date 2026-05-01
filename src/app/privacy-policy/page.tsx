import { Badge } from "@/components/ui/badge"

const LAST_UPDATED = "May 1, 2026"
const CONTACT_EMAIL = "hello@coreor.net"

const sections = [
  {
    id: "scope",
    title: "1. Scope",
    content: (
      <p>
        This policy applies to all users, visitors, clients, job applicants, and partners interacting with
        Coreor.net through our websites, mobile applications, APIs, forms, communication channels, and related
        digital services.
      </p>
    ),
  },
  {
    id: "data-we-collect",
    title: "2. Data We Collect",
    content: (
      <>
        <h3>2.1 Identity Data</h3>
        <p>
          Name, surname, email address, phone number, company information, job title, location, and other identifiers
          submitted through contact, quote, support, or application forms.
        </p>

        <h3>2.2 Professional Data and CV Data</h3>
        <p>
          Resume or CV information, employment history, education, skills, portfolio links, GitHub or LinkedIn profiles,
          references, interview notes, role preferences, compensation expectations, and other information voluntarily
          submitted during recruitment processes.
        </p>

        <h3>2.3 Technical Data</h3>
        <p>
          IP address, device type, operating system, browser type, session data, log records, cookie identifiers,
          interaction data, crash reports, analytics events, and security-related records.
        </p>

        <h3>2.4 Communication Data</h3>
        <p>
          Messages submitted through contact forms, email, support requests, business inquiries, project discussions,
          or other communication channels.
        </p>

        <h3>2.5 Sensitive Data</h3>
        <p>
          We do not intentionally request sensitive personal data unless it is legally necessary for a specific purpose.
          Job applicants should avoid including unnecessary sensitive information in CVs, cover letters, portfolios, or
          messages unless specifically requested for a lawful and limited purpose.
        </p>
      </>
    ),
  },
  {
    id: "processing-purposes",
    title: "3. Purpose of Processing",
    content: (
      <ul>
        <li>Providing software development, application development, consulting, and technical services.</li>
        <li>Responding to contact, quote, demo, support, and business inquiry requests.</li>
        <li>Managing client relationships, project discussions, contracts, and operational records.</li>
        <li>Receiving, reviewing, and managing job applications and candidate evaluation processes.</li>
        <li>Improving products, services, platform performance, and user experience.</li>
        <li>Maintaining website, application, API, infrastructure, and account security.</li>
        <li>Detecting, preventing, and investigating fraud, abuse, unauthorized access, and security incidents.</li>
        <li>Complying with legal, regulatory, accounting, tax, employment, and recordkeeping obligations.</li>
        <li>Establishing, exercising, or defending legal claims.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "4. Legal Basis under GDPR and KVKK",
    content: (
      <>
        <p>
          Depending on the nature of the processing activity, we may process personal data based on one or more of the
          following legal grounds:
        </p>
        <ul>
          <li>Explicit consent, where required or where processing is optional.</li>
          <li>Performance of a contract or taking pre-contractual steps at your request.</li>
          <li>Compliance with legal obligations.</li>
          <li>Legitimate interests, provided that such interests do not override your fundamental rights and freedoms.</li>
          <li>Establishment, exercise, or defense of legal claims.</li>
          <li>Other legal grounds permitted under applicable data protection laws.</li>
        </ul>
        <p>
          Where processing relies on consent, you may withdraw your consent at any time. Withdrawal does not affect the
          lawfulness of processing carried out before the withdrawal.
        </p>
      </>
    ),
  },
  {
    id: "recruitment",
    title: "5. Recruitment and CV Processing",
    content: (
      <>
        <p>
          If you apply for a role at Coreor.net, we process your application data to receive and review your application,
          communicate with you, organize interviews, evaluate your suitability, verify relevant information where
          appropriate, prepare offers, and maintain recruitment records.
        </p>
        <p>
          Evaluation for a current role is generally based on pre-contractual steps, legitimate interests, legal
          obligations, or the establishment, exercise, or defense of legal claims. Consent is not usually the primary basis
          for assessing candidates for a current vacancy.
        </p>
        <p>
          If we wish to keep your application data for future opportunities, we will request separate optional consent.
          Refusing this consent will not affect your current application.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "6. Data Sharing",
    content: (
      <>
        <p>
          We may share personal data with carefully selected recipients where necessary for the purposes described in this
          Privacy Policy.
        </p>
        <ul>
          <li>Hosting, cloud infrastructure, CDN, DNS, security, and backup providers.</li>
          <li>Email, CRM, customer support, communication, and productivity tools.</li>
          <li>Applicant tracking systems, recruitment platforms, and HR service providers.</li>
          <li>Analytics, error monitoring, performance monitoring, and log management providers.</li>
          <li>Legal, accounting, tax, audit, and professional advisors.</li>
          <li>Business partners, contractors, and suppliers involved in relevant projects.</li>
          <li>Public authorities, courts, regulators, and law enforcement bodies where legally required.</li>
        </ul>
        <p>
          We require service providers that process personal data on our behalf to implement appropriate confidentiality,
          security, and data protection obligations.
        </p>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "7. International Data Transfers",
    content: (
      <p>
        Personal data may be transferred internationally where our service providers, infrastructure, support teams, or
        technical systems are located outside Turkey or the European Economic Area. Where required, such transfers are
        protected through appropriate safeguards, which may include adequacy decisions, Standard Contractual Clauses,
        binding corporate rules, approved transfer mechanisms, explicit consent, or other safeguards permitted by
        applicable law.
      </p>
    ),
  },
  {
    id: "retention",
    title: "8. Data Retention",
    content: (
      <>
        <p>
          We retain personal data only for as long as necessary for the purposes for which it was collected, unless a
          longer retention period is required or permitted by law.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/70 text-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Record type</th>
                <th className="px-4 py-3 font-semibold">Retention approach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Contact inquiries</td>
                <td className="px-4 py-3">Retained for a reasonable business follow-up period after the last meaningful interaction.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Project and proposal records</td>
                <td className="px-4 py-3">Retained as needed for contract, business, accounting, legal, and dispute management purposes.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Candidate data for current roles</td>
                <td className="px-4 py-3">Retained for the recruitment process and a reasonable period for objection, audit, or legal defense.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Talent pool data</td>
                <td className="px-4 py-3">Retained only with separate optional consent, typically for up to 24 months unless withdrawn earlier.</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">Security logs</td>
                <td className="px-4 py-3">Retained as necessary for security, incident response, monitoring, and audit purposes.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          When personal data is no longer required, it is deleted, destroyed, anonymized, or otherwise restricted in
          accordance with applicable law and internal retention procedures.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "9. Security Measures",
    content: (
      <>
        <p>
          We implement technical and organizational measures designed to protect personal data against unauthorized access,
          unlawful processing, accidental loss, destruction, alteration, or disclosure.
        </p>
        <ul>
          <li>Role-based access controls and least-privilege access.</li>
          <li>Multi-factor authentication for administrative and sensitive access where appropriate.</li>
          <li>Encryption in transit and appropriate protection for stored data.</li>
          <li>Secure password, secret, and identity management practices.</li>
          <li>Logging, monitoring, backup, and recovery processes.</li>
          <li>Vulnerability management, patching, and environment separation.</li>
          <li>Confidentiality obligations, staff awareness, vendor due diligence, and incident response procedures.</li>
        </ul>
        <p>
          Although no digital system can be guaranteed to be completely secure, we work to maintain reasonable, current,
          and risk-based safeguards.
        </p>
      </>
    ),
  },
  {
    id: "user-rights",
    title: "10. User Rights",
    content: (
      <>
        <p>Depending on the applicable law, you may have the right to:</p>
        <ul>
          <li>Access your personal data.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request deletion or destruction of your personal data.</li>
          <li>Restrict or object to processing.</li>
          <li>Request data portability where applicable.</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Object to direct marketing.</li>
          <li>Challenge certain automated decisions where applicable.</li>
          <li>Request information about transfers to third parties in Turkey or abroad.</li>
        </ul>
        <p>
          To exercise your rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We may request
          reasonable information to verify your identity before responding.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "11. Cookies",
    content: (
      <>
        <p>
          We use cookies and similar technologies to operate our website, maintain security, remember preferences, analyze
          performance, and improve our services.
        </p>
        <p>
          Essential cookies may be used because they are necessary for the website to function. Analytics, personalization,
          advertising, or similar non-essential technologies are used only where legally permitted and, where required, based
          on your consent. You may manage cookie preferences through our cookie banner or browser settings.
        </p>
      </>
    ),
  },
  {
    id: "automated-decisions",
    title: "12. Automated Decision-Making",
    content: (
      <p>
        We do not make decisions based solely on automated processing that produce legal or similarly significant effects
        unless permitted by law and accompanied by appropriate safeguards. Tools used for security, analytics, CV parsing,
        spam filtering, or technical classification are generally used as support tools rather than final decision-makers.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "13. Third Parties",
    content: (
      <p>
        Our website, applications, or communications may contain links to third-party websites, platforms, repositories,
        social media pages, or professional profiles. We are not responsible for the privacy practices of third parties.
        Please review their privacy notices before submitting personal data to them.
      </p>
    ),
  },
  {
    id: "children",
    title: "14. Children’s Privacy",
    content: (
      <p>
        Our services are not directed to children, and we do not knowingly seek to collect personal data from children. If
        you believe that a child has provided personal data to us, please contact us so that we can review and take
        appropriate action.
      </p>
    ),
  },
  {
    id: "complaints",
    title: "15. Complaints",
    content: (
      <p>
        If you are not satisfied with our response to your request, you may have the right to lodge a complaint with the
        competent data protection authority. Under KVKK, complaints are generally submitted to the Turkish Personal Data
        Protection Authority after first applying to the data controller. Under GDPR, you may contact the relevant
        supervisory authority in the European Economic Area where applicable.
      </p>
    ),
  },
  {
    id: "contact",
    title: "16. Contact",
    content: (
      <p>
        Coreor.net <br />
        Ankara, Turkey <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-background pt-28 pb-24 text-foreground">
      <div className="relative mx-auto max-w-6xl px-6">
        <header className="rounded-[2rem] border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur sm:p-10">
          <Badge className="mb-6 border border-primary/30 bg-primary/10 text-xs uppercase tracking-widest text-primary hover:bg-primary/10">
            Privacy Policy
          </Badge>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            This Privacy Policy explains how Coreor.net collects, processes, stores, transfers, and protects personal data
            in accordance with applicable laws, including the General Data Protection Regulation (GDPR) and the Turkish
            Personal Data Protection Law (KVKK).
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            By accessing or using our website, services, applications, or by submitting any form including job applications
            and CVs, you acknowledge that you have read and understood this Privacy Policy.
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
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Location</p>
              <p className="mt-1 font-medium text-foreground">Ankara, Turkey</p>
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
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Short Form Notices</h2>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                  <h3 className="font-semibold text-foreground">Contact form notice</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    We process the information you submit to respond to your request, communicate with you, manage
                    potential business or project discussions, and maintain related records. For more information, please
                    review our Privacy Policy.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                  <h3 className="font-semibold text-foreground">Marketing consent checkbox</h3>
                  <label className="mt-3 flex gap-3 text-sm leading-7 text-muted-foreground">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                    <span>
                      I would like to receive product updates, insights, and marketing communications from Coreor.net. I
                      understand that I can unsubscribe at any time.
                    </span>
                  </label>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                  <h3 className="font-semibold text-foreground">Job application notice</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    We process the personal data you submit as part of your application to evaluate your application,
                    communicate with you, organize interviews, verify relevant information where appropriate, and manage
                    recruitment records. Please do not include unnecessary sensitive personal data in your CV.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                  <h3 className="font-semibold text-foreground">Future opportunities checkbox</h3>
                  <label className="mt-3 flex gap-3 text-sm leading-7 text-muted-foreground">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-border" />
                    <span>
                      I consent to Coreor.net retaining my application data for up to 24 months so that I may be considered
                      for future opportunities. I understand that this is optional and does not affect my current application.
                    </span>
                  </label>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/70 p-5">
                  <h3 className="font-semibold text-foreground">Cookie banner text</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
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
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
