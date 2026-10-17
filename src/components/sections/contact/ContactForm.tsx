"use client";

import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { APPOINTMENT_REASONS } from "@/lib/constants";

const defaultData = {
  tagline: { text: "Send a message" },
  title: { text: "Tell us how we can help." },
  description: {
    text: "We reply to every message within one working day. For anything urgent, please call the practice instead."
  },
  buttons: [{ text: "Send Message", url: "#" }],
  assets: [],
  lists: [
    {
      name: "reasons",
      items: APPOINTMENT_REASONS.map((reason) => ({ title: { text: reason } }))
    }
  ],
  extraDetails: {
    privacy_note:
      "Please do not include symptoms, medications, insurance ID numbers or other health details in this form — it is not a secure channel. We will collect anything clinical over the phone or at your visit."
  }
};

interface ContactFormProps {
  data?: Record<string, any> | null;
}

export default function ContactForm({ data: cmsData }: ContactFormProps) {
  const data = cmsData ?? defaultData;
  const reasons = data.lists?.[0]?.items ?? [];
  const [submitted, setSubmitted] = useState(false);

  // No backend is wired yet — the success state stands in until one is.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="form-card on-dark" data-reveal>
      {submitted ? (
        <div className="form-success">
          <span className="tick" aria-hidden="true">
            <Check size={28} />
          </span>
          <h3>Message received</h3>
          <p className="form-intro" style={{ margin: 0 }}>
            Thank you — someone from the front desk will be in touch within one working day. If it
            is urgent, please call us rather than waiting on this.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate={false}>
          <h2>{data.title?.text}</h2>
          <p className="form-intro">{data.description?.text}</p>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="contact-name">Full name</label>
              <input id="contact-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">Phone</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="contact-reason">What is this about?</label>
              <select id="contact-reason" name="reason" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {reasons.map((reason: any, index: number) => (
                  <option key={reason.title?.text ?? index} value={reason.title?.text}>
                    {reason.title?.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="field full">
              <label htmlFor="contact-preferred">Preferred date (optional)</label>
              <input id="contact-preferred" name="preferred" type="date" />
            </div>
            <div className="field full">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Let us know what you would like to ask about — no clinical details needed here."
                required
              />
            </div>
          </div>

          <div className="privacy-note">
            <Lock size={15} aria-hidden="true" />
            <span>{data.extraDetails?.privacy_note}</span>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit" data-magnetic>
              {data.buttons?.[0]?.text ?? "Send Message"}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
