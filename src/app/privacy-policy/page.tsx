import { Badge } from "@/components/ui/badge"

export default function PrivacyPolicyPage() {
  return (
    <main className="relative pt-28 pb-24">
      <div className="relative max-w-4xl mx-auto px-6">

        <Badge className="mb-6 border border-primary/30 text-primary bg-primary/10 text-xs tracking-widest uppercase">
          Privacy Policy
        </Badge>

        <h1 className="text-4xl font-extrabold text-foreground mb-10">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

          <p>
            This Privacy Policy explains how Coreor.net (“Company”, “we”, “our”, or “us”)
            collects, processes, stores, transfers, and protects personal data in accordance
            with applicable laws including the General Data Protection Regulation (GDPR)
            and the Turkish Personal Data Protection Law (KVKK).
          </p>

          <p>
            By accessing or using our website, services, applications, or submitting any
            form including job applications and CVs, you acknowledge that you have read,
            understood, and agreed to this Privacy Policy.
          </p>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              1. Scope
            </h2>
            <p>
              This policy applies to all users, visitors, clients, job applicants,
              and partners interacting with our digital platforms including websites,
              mobile applications, APIs, and communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              2. Data We Collect
            </h2>

            <h3 className="font-medium text-foreground">2.1 Identity Data</h3>
            <p>
              Name, surname, email address, phone number, company information,
              and other identifiers submitted through forms.
            </p>

            <h3 className="font-medium text-foreground">2.2 Professional Data (CV Data)</h3>
            <p>
              Resume/CV information including employment history, education,
              skills, references, and any additional data voluntarily shared.
            </p>

            <h3 className="font-medium text-foreground">2.3 Technical Data</h3>
            <p>
              IP address, device type, operating system, browser type, session data,
              log records, and interaction data.
            </p>

            <h3 className="font-medium text-foreground">2.4 Communication Data</h3>
            <p>
              Messages submitted through contact forms, emails, or other channels.
            </p>

          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              3. Purpose of Processing
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Providing software development services</li>
              <li>Managing job applications and candidate evaluation</li>
              <li>Responding to inquiries and communication requests</li>
              <li>Improving products and user experience</li>
              <li>Ensuring platform security and fraud prevention</li>
              <li>Compliance with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              4. Legal Basis (GDPR & KVKK)
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Explicit consent</li>
              <li>Performance of a contract</li>
              <li>Legal obligations</li>
              <li>Legitimate interest</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              5. Data Sharing
            </h2>
            <p>
              We may share data with service providers, hosting providers, analytics tools,
              legal authorities, and business partners under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              6. Data Transfers
            </h2>
            <p>
              Data may be transferred internationally with appropriate safeguards such as
              Standard Contractual Clauses (SCCs).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              7. Data Retention
            </h2>
            <p>
              Personal data is retained only as long as necessary for its purpose or as required by law.
              CV data may be retained for future recruitment opportunities unless deletion is requested.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              8. Security Measures
            </h2>
            <p>
              We implement encryption, secure servers, access controls, and monitoring systems
              to protect personal data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              9. User Rights
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access your data</li>
              <li>Request correction</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              10. Cookies
            </h2>
            <p>
              We use cookies to improve performance and user experience. Users may disable
              cookies via browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              11. Third Parties
            </h2>
            <p>
              We are not responsible for third-party services linked from our platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              12. Contact
            </h2>
            <p>
              Coreor.net <br />
              Ankara, Turkey <br />
              Email: hello@coreor.net
            </p>
          </section>

        </div>
      </div>
    </main>
  )
}