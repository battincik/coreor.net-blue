import { Badge } from "@/components/ui/badge"

const LAST_UPDATED = "May 1, 2026"
const CONTACT_EMAIL = "hello@coreor.net"
const COMPANY_NAME = "Coreor.net"

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of These Terms",
    content: (
      <>
        <p>
          These Terms of Service govern your access to and use of Coreor.net’s websites, software products,
          applications, APIs, digital platforms, consulting services, development services, technical support,
          documentation, and any related services we provide.
        </p>
        <p>
          By accessing or using our services, submitting a form, creating an account, requesting a quote, signing an
          order form, using an application, integrating with an API, or otherwise interacting with Coreor.net, you agree
          to be bound by these Terms. If you are using the services on behalf of a company, organization, or other legal
          entity, you represent that you have authority to bind that entity to these Terms.
        </p>
        <p>
          If you do not agree to these Terms, you must not access or use the services.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "2. Definitions",
    content: (
      <ul>
        <li>
          <strong>“Company”, “we”, “our”, or “us”</strong> means Coreor.net.
        </li>
        <li>
          <strong>“User”, “you”, or “your”</strong> means any individual or entity accessing or using the services.
        </li>
        <li>
          <strong>“Services”</strong> means our websites, applications, APIs, software, digital products, development
          services, consulting services, support services, documentation, and related offerings.
        </li>
        <li>
          <strong>“Client”</strong> means a person or entity purchasing, requesting, or receiving professional services,
          custom software development, technical support, or project-based work from Coreor.net.
        </li>
        <li>
          <strong>“User Content”</strong> means data, files, text, images, code, documents, credentials, feedback,
          instructions, business information, or other materials submitted to or processed through the services.
        </li>
        <li>
          <strong>“Order Form”</strong> means any written order, statement of work, proposal, subscription plan, quote,
          invoice, online checkout, or other document that describes specific services, pricing, scope, deliverables, or
          commercial terms.
        </li>
      </ul>
    ),
  },
  {
    id: "service-scope",
    title: "3. Scope of Services",
    content: (
      <>
        <p>Coreor.net may provide services including, but not limited to:</p>
        <ul>
          <li>software development and application development,</li>
          <li>web and mobile application design and implementation,</li>
          <li>API development, integration, and maintenance,</li>
          <li>cloud, backend, infrastructure, and database-related engineering,</li>
          <li>technical consulting, architecture, audits, and optimization,</li>
          <li>maintenance, support, bug fixing, monitoring, and managed technical services,</li>
          <li>software-as-a-service products, dashboards, tools, and digital platforms,</li>
          <li>documentation, onboarding, migration, training, and implementation support.</li>
        </ul>
        <p>
          The specific scope, deliverables, timeline, assumptions, dependencies, acceptance criteria, fees, and support
          level for a project or paid service may be described in a separate Order Form, statement of work, agreement,
          proposal, or invoice. If there is a conflict between these Terms and a signed written agreement or Order Form,
          the signed agreement or Order Form will control for that specific engagement to the extent of the conflict.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "4. Eligibility and Authority",
    content: (
      <>
        <p>
          You may use the services only if you are legally capable of entering into a binding agreement and are not barred
          from using the services under applicable law. If you use the services on behalf of a company or organization,
          you represent and warrant that you are authorized to accept these Terms on its behalf.
        </p>
        <p>
          You are responsible for ensuring that your use of the services complies with all laws, regulations, internal
          policies, and contractual obligations applicable to you or your organization.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "5. Accounts, Access, and Credentials",
    content: (
      <>
        <p>
          Some services may require an account, dashboard, API key, login credential, organization workspace, or other
          access mechanism. You agree to provide accurate, current, and complete information and to keep it updated.
        </p>
        <p>
          You are responsible for maintaining the confidentiality of your credentials, API keys, tokens, passwords,
          private links, and account access. You are also responsible for all activities that occur under your account,
          whether authorized by you or not, unless caused by our breach of these Terms.
        </p>
        <p>
          You must notify us promptly if you suspect unauthorized access, credential compromise, API key leakage,
          security abuse, or any other account-related incident.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    title: "6. Client Responsibilities",
    content: (
      <>
        <p>
          For project-based, consulting, development, maintenance, or support services, you agree to cooperate reasonably
          and provide the information, materials, approvals, access, feedback, credentials, test data, technical
          specifications, brand assets, third-party account access, and business decisions required for us to perform the
          services.
        </p>
        <p>You are responsible for:</p>
        <ul>
          <li>the accuracy and completeness of instructions, requirements, and materials you provide,</li>
          <li>obtaining rights, licenses, and permissions for third-party materials supplied to us,</li>
          <li>reviewing deliverables within agreed review periods,</li>
          <li>testing deliverables in your own environment before production use,</li>
          <li>maintaining backups of your own systems, databases, files, and credentials,</li>
          <li>ensuring that your systems and third-party services are properly configured and maintained,</li>
          <li>making timely payments and approvals,</li>
          <li>ensuring that your use of deliverables complies with applicable laws and third-party terms.</li>
        </ul>
        <p>
          Delays in providing required information, access, feedback, approvals, or payments may affect timelines,
          delivery dates, support obligations, and project scope.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "7. Acceptable Use",
    content: (
      <>
        <p>You agree not to use the services, directly or indirectly, to:</p>
        <ul>
          <li>violate any applicable law, regulation, court order, contractual obligation, or third-party right,</li>
          <li>infringe intellectual property, privacy, publicity, confidentiality, or data protection rights,</li>
          <li>upload, transmit, or distribute malware, spyware, ransomware, worms, trojans, or other harmful code,</li>
          <li>attempt unauthorized access to systems, accounts, networks, APIs, infrastructure, or data,</li>
          <li>interfere with service integrity, availability, performance, security, or operation,</li>
          <li>perform excessive scraping, crawling, scanning, probing, penetration testing, or load testing without written permission,</li>
          <li>send spam, phishing messages, deceptive communications, or unlawful marketing,</li>
          <li>process or upload data you do not have the right to use, disclose, or transfer,</li>
          <li>reverse engineer, decompile, disassemble, or attempt to extract source code except where legally permitted,</li>
          <li>resell, sublicense, rent, lease, or commercially exploit the services unless expressly authorized,</li>
          <li>use the services to build a competing product or benchmark the services for competitive purposes without permission,</li>
          <li>abuse free trials, promotional credits, support channels, or technical resources.</li>
        </ul>
        <p>
          We may suspend or restrict access if we reasonably believe that your use creates legal, security, operational,
          reputational, or financial risk to Coreor.net, our users, our infrastructure, or third parties.
        </p>
      </>
    ),
  },
  {
    id: "fees-payment",
    title: "8. Fees, Payment, and Taxes",
    content: (
      <>
        <p>
          Fees, payment schedules, billing terms, and taxes for paid services are described in the applicable Order Form,
          invoice, subscription plan, checkout page, proposal, or written agreement. Unless otherwise stated, fees are
          exclusive of taxes, duties, bank fees, currency conversion fees, payment processor fees, and similar charges.
        </p>
        <p>
          You agree to pay all amounts due on time and in the currency specified. Late payments may result in suspension
          of services, delayed delivery, interest where permitted by law, collection costs, or termination of the relevant
          engagement.
        </p>
        <p>
          If you dispute an invoice in good faith, you must notify us promptly and provide reasonable details. You remain
          responsible for paying undisputed amounts by the due date.
        </p>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "9. Subscriptions, Renewals, and Plan Changes",
    content: (
      <>
        <p>
          Some services may be offered on a subscription, recurring, usage-based, or credit-based model. Subscription
          terms, renewal periods, usage limits, seat limits, storage limits, API limits, and cancellation rules will be
          described in the applicable plan, dashboard, Order Form, or written agreement.
        </p>
        <p>
          Unless otherwise stated, subscriptions may renew automatically for the applicable renewal period. You are
          responsible for cancelling before renewal if you do not wish to continue. Plan downgrades, cancellations, or
          non-payment may result in reduced features, disabled access, data export restrictions, or deletion after an
          applicable retention period.
        </p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "10. Refunds and Cancellations",
    content: (
      <>
        <p>
          Unless a separate written agreement states otherwise, fees for completed work, delivered milestones, consumed
          usage, activated subscriptions, custom development, consulting, setup, onboarding, emergency support, and third-
          party costs are non-refundable.
        </p>
        <p>
          For project-based services, cancellation may require payment for work performed, committed resources, approved
          milestones, non-cancellable third-party costs, and reasonable transition work. Any refund, credit, or adjustment
          is at our discretion unless required by law or expressly agreed in writing.
        </p>
      </>
    ),
  },
  {
    id: "deliverables",
    title: "11. Deliverables, Acceptance, and Change Requests",
    content: (
      <>
        <p>
          For custom development or project work, deliverables, milestones, review periods, acceptance criteria, revision
          limits, and dependencies should be described in the applicable Order Form or statement of work.
        </p>
        <p>
          Unless otherwise agreed, a deliverable will be considered accepted when you approve it in writing, deploy it to
          production, use it commercially, fail to reject it with specific reasons within the agreed review period, or
          otherwise indicate acceptance through conduct.
        </p>
        <p>
          Requests that materially change scope, assumptions, integrations, design, architecture, timeline, complexity,
          acceptance criteria, third-party dependencies, or deliverables may require a written change request, revised
          timeline, and additional fees.
        </p>
      </>
    ),
  },
  {
    id: "support-maintenance",
    title: "12. Support, Maintenance, and Availability",
    content: (
      <>
        <p>
          Support and maintenance obligations apply only if included in an applicable plan, Order Form, support agreement,
          or written arrangement. Support may include bug triage, technical assistance, monitoring, updates, patches,
          incident investigation, and operational guidance depending on the agreed scope.
        </p>
        <p>
          Unless expressly agreed in a service level agreement, we do not guarantee uninterrupted availability, specific
          response times, permanent compatibility with third-party services, or error-free operation. Services may be
          unavailable due to maintenance, upgrades, infrastructure issues, third-party provider failures, security events,
          force majeure, or circumstances outside our reasonable control.
        </p>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "13. Third-Party Services and Dependencies",
    content: (
      <>
        <p>
          Our services and deliverables may integrate with or depend on third-party platforms, APIs, libraries, hosting
          providers, payment processors, analytics tools, app stores, marketplaces, open-source packages, AI services,
          databases, email providers, identity providers, or other external services.
        </p>
        <p>
          We are not responsible for third-party services, terms, outages, price changes, API changes, data practices,
          security incidents, policy changes, feature removals, rate limits, or discontinuation. You are responsible for
          maintaining your own third-party accounts, licenses, billing, credentials, and compliance with third-party terms.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "14. Intellectual Property Rights",
    content: (
      <>
        <p>
          Except for rights expressly granted to you, Coreor.net and its licensors retain all rights, title, and interest
          in and to our pre-existing technology, software, frameworks, tools, templates, libraries, know-how, workflows,
          documentation, designs, methods, processes, reusable code, internal systems, and service infrastructure.
        </p>
        <p>
          Subject to full payment of all applicable fees and unless otherwise agreed in writing, ownership or license
          rights in custom deliverables will be handled as described in the applicable Order Form or written agreement.
          If no separate written agreement exists, we grant you a non-exclusive, non-transferable, worldwide license to
          use the delivered work for your internal business purposes or the specific project purpose for which it was
          delivered.
        </p>
        <p>
          We may reuse general skills, ideas, concepts, know-how, techniques, architecture patterns, reusable components,
          and non-confidential learnings developed or acquired during the provision of services, provided that we do not
          disclose your confidential information or proprietary materials.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "15. User Content and Client Materials",
    content: (
      <>
        <p>
          You retain ownership of User Content and materials you provide to us. You grant Coreor.net a limited license to
          host, copy, process, transmit, display, modify, and use User Content as necessary to provide, secure, maintain,
          troubleshoot, and improve the services, comply with law, and enforce these Terms.
        </p>
        <p>
          You represent and warrant that you have all necessary rights, permissions, consents, and legal bases to provide
          User Content to us and to allow us to process it as contemplated by these Terms and any applicable Order Form.
        </p>
        <p>
          We may remove or restrict User Content if we reasonably believe it violates these Terms, applicable law, third-
          party rights, security requirements, or platform policies.
        </p>
      </>
    ),
  },
  {
    id: "feedback",
    title: "16. Feedback",
    content: (
      <p>
        If you provide feedback, ideas, suggestions, feature requests, bug reports, or recommendations, you grant us a
        worldwide, perpetual, irrevocable, royalty-free license to use, modify, commercialize, and incorporate that
        feedback into our products, services, documentation, processes, or business without restriction or compensation to
        you, provided that we do not disclose your confidential information.
      </p>
    ),
  },
  {
    id: "confidentiality",
    title: "17. Confidentiality",
    content: (
      <>
        <p>
          Each party may receive confidential or proprietary information from the other party. Confidential information
          includes non-public business, technical, financial, product, security, pricing, customer, roadmap, source code,
          credential, architecture, and operational information that should reasonably be understood as confidential.
        </p>
        <p>
          Each party agrees to protect the other party’s confidential information using reasonable care, to use it only
          for purposes of performing or receiving the services, and not to disclose it except to personnel, contractors,
          advisors, or service providers who need to know and are bound by confidentiality obligations.
        </p>
        <p>
          Confidentiality obligations do not apply to information that is publicly available without breach, already known
          without restriction, independently developed without use of confidential information, rightfully received from a
          third party without restriction, or required to be disclosed by law.
        </p>
      </>
    ),
  },
  {
    id: "data-protection",
    title: "18. Data Protection and Privacy",
    content: (
      <>
        <p>
          We process personal data in accordance with our Privacy Policy and applicable data protection laws. Depending on
          the context, Coreor.net may act as a data controller or as a data processor/service provider on behalf of a
          client.
        </p>
        <p>
          If we process personal data on your behalf as a processor, the parties may need to enter into a data processing
          agreement or similar terms addressing instructions, confidentiality, security, subprocessors, data subject
          requests, breach notification, audits, deletion, and international transfers.
        </p>
        <p>
          You are responsible for ensuring that personal data you provide to us has been collected and shared lawfully,
          that required notices and consents have been obtained, and that your use of the services complies with privacy,
          employment, marketing, consumer protection, and data protection laws applicable to you.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "19. Security",
    content: (
      <>
        <p>
          We use reasonable technical and organizational measures designed to protect systems, accounts, infrastructure,
          and personal data. However, no system, network, application, or transmission method is completely secure.
        </p>
        <p>
          You are responsible for securing your own devices, accounts, credentials, systems, servers, repositories,
          databases, third-party integrations, and user access. You must not share credentials insecurely or expose API
          keys, private tokens, production secrets, or administrative access in public repositories, tickets, chats, or
          other insecure channels.
        </p>
      </>
    ),
  },
  {
    id: "open-source",
    title: "20. Open-Source Software",
    content: (
      <>
        <p>
          Deliverables or services may include open-source software, libraries, packages, frameworks, or dependencies.
          Open-source components are governed by their respective licenses, not by these Terms. You agree to comply with
          applicable open-source license obligations.
        </p>
        <p>
          Unless expressly agreed, we do not warrant that open-source components will remain maintained, vulnerability-
          free, compatible, or available. Security updates, dependency upgrades, license reviews, and long-term maintenance
          may require a separate support or maintenance arrangement.
        </p>
      </>
    ),
  },
  {
    id: "ai-features",
    title: "21. AI, Automation, and Generated Outputs",
    content: (
      <>
        <p>
          Some services or deliverables may include AI-assisted, automated, algorithmic, or machine-learning features,
          depending on the project scope or product configuration. Such features may produce outputs that require human
          review, validation, testing, and business judgment before use.
        </p>
        <p>
          You are responsible for reviewing AI-assisted outputs before relying on them, especially where outputs may
          affect legal, financial, employment, medical, security, safety, or other high-impact decisions. Unless expressly
          agreed, we do not guarantee that AI-generated or automated outputs will be accurate, complete, non-infringing,
          unbiased, secure, or suitable for a particular purpose.
        </p>
      </>
    ),
  },
  {
    id: "warranties-disclaimers",
    title: "22. Disclaimers",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, the services are provided on an “as is” and “as available” basis unless
          a separate written agreement states otherwise. We disclaim all warranties, whether express, implied, statutory,
          or otherwise, including warranties of merchantability, fitness for a particular purpose, title, non-infringement,
          availability, accuracy, security, compatibility, and error-free operation.
        </p>
        <p>
          We do not warrant that the services will meet all of your requirements, operate without interruption, be free of
          defects or vulnerabilities, remain compatible with all third-party services, or achieve any specific commercial,
          technical, legal, financial, or operational outcome.
        </p>
      </>
    ),
  },
  {
    id: "limitation-liability",
    title: "23. Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, Coreor.net will not be liable for indirect, incidental, special,
          consequential, exemplary, or punitive damages, or for loss of profits, revenue, goodwill, data, business,
          opportunities, anticipated savings, or business interruption, even if we have been advised of the possibility of
          such damages.
        </p>
        <p>
          To the maximum extent permitted by law, our total aggregate liability arising out of or related to the services
          or these Terms will not exceed the amount paid by you to Coreor.net for the specific service giving rise to the
          claim during the three months preceding the event giving rise to liability, unless a separate written agreement
          states a different liability cap.
        </p>
        <p>
          Some jurisdictions do not allow certain limitations of liability. In such cases, the limitations will apply only
          to the fullest extent permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "24. Indemnification",
    content: (
      <p>
        You agree to indemnify, defend, and hold harmless Coreor.net, its affiliates, officers, employees, contractors,
        and service providers from and against claims, damages, liabilities, losses, costs, and expenses, including
        reasonable legal fees, arising out of or related to your use of the services, User Content, breach of these Terms,
        violation of law, infringement of third-party rights, misuse of deliverables, or failure to comply with third-
        party terms.
      </p>
    ),
  },
  {
    id: "suspension-termination",
    title: "25. Suspension and Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to the services, in whole or in part, if we reasonably believe that you have
          violated these Terms, failed to pay amounts due, created security or legal risk, misused the services, infringed
          third-party rights, or caused harm to Coreor.net, other users, infrastructure, or third parties.
        </p>
        <p>
          You may stop using the services at any time. Termination does not relieve you of payment obligations accrued
          before termination. Provisions that by their nature should survive termination will survive, including payment,
          confidentiality, intellectual property, disclaimers, limitations of liability, indemnification, dispute
          resolution, and recordkeeping provisions.
        </p>
      </>
    ),
  },
  {
    id: "export-compliance",
    title: "26. Export Control and Sanctions Compliance",
    content: (
      <p>
        You agree not to access, use, export, re-export, transfer, or make available the services, software, deliverables,
        documentation, or technical data in violation of applicable export control, sanctions, embargo, or trade compliance
        laws. You represent that you are not located in, organized under the laws of, or ordinarily resident in a country
        or region subject to comprehensive sanctions, and that you are not listed on any applicable restricted party list.
      </p>
    ),
  },
  {
    id: "beta-services",
    title: "27. Beta, Preview, and Experimental Features",
    content: (
      <>
        <p>
          We may offer beta, preview, pilot, early access, experimental, or evaluation features. These features may be
          incomplete, unstable, changed, suspended, or discontinued at any time. They may contain errors, produce
          unexpected results, or be subject to additional restrictions.
        </p>
        <p>
          Beta features are provided for testing and feedback purposes unless otherwise stated. You should not rely on
          beta features for production, critical, regulated, or high-impact use unless we expressly agree in writing.
        </p>
      </>
    ),
  },
  {
    id: "publicity",
    title: "28. Publicity and References",
    content: (
      <p>
        Unless otherwise agreed in writing, we may identify you as a client or user by name and logo in our portfolio,
        website, proposals, marketing materials, and case studies, provided that we do not disclose confidential
        information. You may request that we stop using your name or logo for future marketing materials by contacting us.
      </p>
    ),
  },
  {
    id: "communications",
    title: "29. Communications and Notices",
    content: (
      <p>
        We may communicate with you by email, website notices, dashboard messages, support channels, invoices, or other
        reasonable methods. You agree that electronic communications satisfy any legal requirement that communications be
        in writing, unless applicable law requires a different form. You are responsible for keeping contact information
        current and monitoring official communication channels.
      </p>
    ),
  },
  {
    id: "changes",
    title: "30. Changes to These Terms",
    content: (
      <>
        <p>
          We may update these Terms from time to time to reflect changes in our services, legal requirements, business
          practices, technical infrastructure, or risk controls. The updated version will be posted on this page with the
          updated effective date.
        </p>
        <p>
          If a change materially affects your rights or obligations, we will take reasonable steps to provide notice where
          appropriate. Continued use of the services after the updated Terms become effective constitutes acceptance of the
          updated Terms.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "31. Governing Law and Dispute Resolution",
    content: (
      <>
        <p>
          Unless a separate written agreement states otherwise, these Terms and any dispute arising out of or related to
          them or the services will be governed by the laws of Turkey, without regard to conflict of law principles.
        </p>
        <p>
          The parties will first attempt to resolve disputes through good-faith discussions. If the dispute cannot be
          resolved informally, the competent courts and enforcement offices of Ankara, Turkey will have jurisdiction,
          unless mandatory consumer protection or applicable law requires another forum.
        </p>
      </>
    ),
  },
  {
    id: "miscellaneous",
    title: "32. Miscellaneous",
    content: (
      <>
        <p>
          These Terms, together with any applicable Order Form, written agreement, Privacy Policy, Cookie Policy, and
          incorporated documents, form the entire agreement between you and Coreor.net regarding the services unless a
          separate signed agreement states otherwise.
        </p>
        <p>
          You may not assign or transfer these Terms without our prior written consent. We may assign these Terms in
          connection with a merger, acquisition, corporate reorganization, sale of assets, or by operation of law. Failure
          to enforce a provision is not a waiver. If any provision is found unenforceable, the remaining provisions remain
          in effect. Headings are for convenience only and do not affect interpretation.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "33. Contact",
    content: (
      <p>
        If you have questions about these Terms, you can contact us at:
        <br />
        <br />
        {COMPANY_NAME}
        <br />
        Ankara, Turkey
        <br />
        Email: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    ),
  },
]

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen bg-background pt-28 pb-24 text-foreground">
      <div className="relative mx-auto max-w-6xl px-6">
        <header className="rounded-[2rem] border border-border/60 bg-card/50 p-6 shadow-sm backdrop-blur sm:p-10">
          <Badge className="mb-6 border border-primary/30 bg-primary/10 text-xs uppercase tracking-widest text-primary hover:bg-primary/10">
            Terms of Service
          </Badge>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            These Terms of Service govern your access to and use of Coreor.net’s websites, software, applications, APIs,
            development services, consulting services, technical support, documentation, and related offerings.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
            Please read these Terms carefully. By using our services, requesting work, creating an account, submitting a
            form, or entering into an order with Coreor.net, you agree to these Terms unless a separate signed agreement
            states otherwise.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Last updated</p>
              <p className="mt-1 font-medium text-foreground">{LAST_UPDATED}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Provider</p>
              <p className="mt-1 font-medium text-foreground">{COMPANY_NAME}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-background/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Contact</p>
              <p className="mt-1 font-medium text-foreground">{CONTACT_EMAIL}</p>
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <nav className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-3xl border border-border/60 bg-card/50 p-5 shadow-sm backdrop-blur">
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

                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
