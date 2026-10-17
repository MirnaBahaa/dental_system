"use client";

import { CalendarDays } from "lucide-react";
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants";

const SECTIONS = [
  {
    id: "who-we-are",
    heading: "Who we are",
    paragraphs: [
      `${SITE_NAME} operates this website and the dental practice at ${CONTACT_INFO.address.full}. This notice explains what personal information we collect through the website, why we collect it, and the choices you have about it.`,
      "Information you give us during treatment is protected health information and is governed by our separate Notice of Privacy Practices under HIPAA, which we provide at your first visit and can send on request."
    ]
  },
  {
    id: "what-we-collect",
    heading: "What we collect",
    paragraphs: ["Through this website we may collect:"],
    bullets: [
      "Contact details you enter into a form — your name, phone number, email address and any preferred appointment time.",
      "Messages you choose to send us. Our forms ask you not to include clinical details, and we do not require them.",
      "Technical information collected automatically: IP address, browser type, device type, pages visited and referring site.",
      "Analytics and advertising identifiers where you have consented to them, including Google Analytics and Meta Pixel identifiers."
    ]
  },
  {
    id: "how-we-use-it",
    heading: "How we use it",
    paragraphs: ["We use the information above to:"],
    bullets: [
      "Respond to your enquiry and arrange or confirm an appointment.",
      "Verify insurance coverage where you have asked us to.",
      "Keep the website working, secure and reasonably fast.",
      "Understand which pages people find useful so we can improve them.",
      "Meet our legal, regulatory and professional record-keeping obligations."
    ]
  },
  {
    id: "hipaa",
    heading: "Health information and HIPAA",
    paragraphs: [
      "Website forms are not a secure channel and are not intended for protected health information. Please do not send symptoms, diagnoses, medications, insurance ID numbers or treatment details through them — call the practice instead.",
      "Once you become a patient, your clinical records are held in our practice management system and handled strictly in accordance with HIPAA and our Notice of Privacy Practices. We do not use clinical records for marketing, and we do not sell personal information to anyone, ever."
    ]
  },
  {
    id: "sharing",
    heading: "Who we share it with",
    paragraphs: [
      "We share personal information only where it is necessary, and only with parties bound to protect it:"
    ],
    bullets: [
      "Service providers who host this website, deliver our email, or run our practice management and scheduling systems.",
      "Your insurance carrier, where you have asked us to verify or submit a claim on your behalf.",
      "Other healthcare providers involved in your care, with your consent or as permitted by HIPAA.",
      "Regulators, courts or law enforcement where we are legally required to do so."
    ]
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    paragraphs: [
      "We use cookies and similar technologies to keep the site working and to measure how it is used. Analytics and advertising cookies are only set where you have consented to them, and you can withdraw consent at any time through your browser settings.",
      "Most browsers let you refuse or delete cookies. Blocking essential cookies may stop parts of the site from working properly."
    ]
  },
  {
    id: "retention",
    heading: "How long we keep it",
    paragraphs: [
      "Enquiries that do not become appointments are deleted within twelve months. Patient records are retained for the period required by state law and our professional obligations, which is generally at least seven years after the last appointment, and longer for records relating to minors."
    ]
  },
  {
    id: "your-rights",
    heading: "Your rights",
    paragraphs: ["Depending on where you live, you may have the right to:"],
    bullets: [
      "Ask what personal information we hold about you and receive a copy.",
      "Ask us to correct information that is inaccurate or incomplete.",
      "Ask us to delete information, where we are not legally required to keep it.",
      "Object to or restrict certain processing, including marketing.",
      "Withdraw consent for analytics or advertising cookies at any time."
    ],
    footer: "We will respond to any request within thirty days, and we will never charge you for making one."
  },
  {
    id: "children",
    heading: "Children's privacy",
    paragraphs: [
      "This website is not directed at children, and we do not knowingly collect information online from anyone under thirteen. Appointment details for a child are provided by a parent or guardian. If you believe a child has submitted information to us, contact us and we will delete it."
    ]
  },
  {
    id: "changes",
    heading: "Changes to this notice",
    paragraphs: [
      "We review this notice periodically and will post any updated version on this page with a revised date. Material changes affecting how we handle your information will be highlighted at the top of the page."
    ]
  },
  {
    id: "contact",
    heading: "Contact us about privacy",
    paragraphs: [
      `Questions, requests or complaints about privacy can go to our Privacy Officer at ${CONTACT_INFO.email}, by phone on ${CONTACT_INFO.phone}, or by post to ${CONTACT_INFO.address.full}.`
    ]
  }
];

const defaultData = {
  tagline: { text: "Privacy" },
  title: { text: "Privacy Policy" },
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

interface PrivacyContentProps {
  data?: Record<string, any> | null;
}

export default function PrivacyContent({ data: cmsData }: PrivacyContentProps) {
  const data = cmsData ?? defaultData;

  return (
    <section className="section dark" id="privacy-content">
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
                  {section.footer && <p>{section.footer}</p>}
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
