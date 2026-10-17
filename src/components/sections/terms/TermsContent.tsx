"use client";

import { CalendarDays } from "lucide-react";
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants";

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    paragraphs: [
      `By using this website you agree to these terms. If you do not agree with them, please do not use the site. These terms apply to everyone who visits, whether or not you are a patient of ${SITE_NAME}.`,
      "We may update these terms from time to time. Continuing to use the site after we post a change means you accept the revised version."
    ]
  },
  {
    id: "not-medical-advice",
    heading: "This site is not medical advice",
    paragraphs: [
      "Everything on this website is general information about dental care. It is not a diagnosis, not a treatment plan, and not a substitute for being examined by a clinician who can see your mouth.",
      "Do not delay seeking professional advice, or disregard advice you have already been given, because of something you read here. If you are in pain, have facial swelling, or have had a tooth knocked out, contact us or seek urgent care immediately."
    ]
  },
  {
    id: "no-relationship",
    heading: "No dentist–patient relationship",
    paragraphs: [
      "Reading this site, sending a message through a form, or requesting an appointment does not by itself create a dentist–patient relationship. That relationship begins when you attend an appointment and we agree to provide care.",
      "Our forms are not monitored outside opening hours and are not a route for urgent problems. Please call the practice instead."
    ]
  },
  {
    id: "use-of-site",
    heading: "Acceptable use",
    paragraphs: ["When using this website, you agree not to:"],
    bullets: [
      "Use it for any unlawful purpose or in breach of any applicable regulation.",
      "Attempt to gain unauthorised access to any part of the site, its servers or connected systems.",
      "Introduce malware, or otherwise interfere with the site's operation or security.",
      "Scrape, harvest or reproduce content in bulk without our written permission.",
      "Submit false information, or another person's details without their consent."
    ]
  },
  {
    id: "intellectual-property",
    heading: "Intellectual property",
    paragraphs: [
      `All content on this site — text, photographs, graphics, logos and layout — belongs to ${SITE_NAME} or its licensors and is protected by copyright and trademark law.`,
      "You may view and print pages for your own personal, non-commercial use. Any other reproduction, distribution or modification requires our written permission."
    ]
  },
  {
    id: "before-after",
    heading: "Treatment photographs",
    paragraphs: [
      "Before-and-after photographs on this site show real patients treated at this practice and are published with written consent. They illustrate what has been achieved in particular cases.",
      "They are not a promise or guarantee of any result. Outcomes vary with bone quality, gum health, healing, home care and other factors specific to each person. Only an examination can tell you what is realistic for you."
    ]
  },
  {
    id: "third-party",
    heading: "Third-party links and services",
    paragraphs: [
      "This site links to third-party services such as mapping, review platforms and insurance providers. We do not control those sites and are not responsible for their content, availability or privacy practices. A link is not an endorsement."
    ]
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    paragraphs: [
      "This website is provided on an “as is” basis. While we take reasonable care to keep the information accurate and current, we do not warrant that it is complete, error-free or continuously available.",
      "To the fullest extent permitted by law, we exclude liability for any indirect or consequential loss arising from your use of, or inability to use, this website. Nothing in these terms limits any liability that cannot lawfully be limited, including liability for personal injury caused by negligence in the provision of dental care."
    ]
  },
  {
    id: "appointments",
    heading: "Appointments and cancellations",
    paragraphs: [
      "An appointment request submitted through this site is a request, not a confirmed booking. Your appointment is confirmed only once a member of our team has contacted you.",
      "We ask for 48 hours' notice to cancel or reschedule so the slot can be offered to someone else. Repeated short-notice cancellations may incur a fee, which we will always tell you about in advance."
    ]
  },
  {
    id: "governing-law",
    heading: "Governing law",
    paragraphs: [
      `These terms are governed by the laws of the State of ${CONTACT_INFO.address.state === "OR" ? "Oregon" : CONTACT_INFO.address.state}, without regard to its conflict of law provisions. Any dispute arising from them will be handled by the courts of that state.`
    ]
  },
  {
    id: "contact",
    heading: "Contact us about these terms",
    paragraphs: [
      `If anything here is unclear, contact us at ${CONTACT_INFO.email} or call ${CONTACT_INFO.phone}. We are at ${CONTACT_INFO.address.full}.`
    ]
  }
];

const defaultData = {
  tagline: { text: "Terms" },
  title: { text: "Terms of Use" },
  description: { text: "" },
  buttons: [],
  assets: [],
  lists: [
    {
      name: "sections",
      items: SECTIONS.map((section) => ({
        title: { text: section.heading },
        description: { text: section.paragraphs.join("\n\n") },
        extraDetails: { anchor: section.id }
      }))
    }
  ],
  extraDetails: { last_updated: "6 August 2026" }
};

interface TermsContentProps {
  data?: Record<string, any> | null;
}

export default function TermsContent({ data: cmsData }: TermsContentProps) {
  const data = cmsData ?? defaultData;

  return (
    <section className="section dark" id="terms-content">
      <div className="container">
        <div className="split-grid reverse">
          <div className="prose-shell">
            <p className="legal-meta" data-reveal>
              <CalendarDays size={14} aria-hidden="true" />
              Last updated {data.extraDetails?.last_updated}
            </p>

            <div className="prose-block">
              {SECTIONS.map((section, index) => (
                <div key={section.id} data-reveal data-delay={Math.min(index * 0.03, 0.2)}>
                  <h2 id={section.id}>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 40)}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <nav className="prose-toc" aria-label="On this page">
            <h3>On this page</h3>
            <ol>
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
