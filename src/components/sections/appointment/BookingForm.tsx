"use client";

import { useState } from "react";
import { Check, Lock, Phone } from "lucide-react";
import {
  APPOINTMENT_REASONS,
  CONTACT_INFO,
  INSURANCE_ACCEPTED,
  PHONE_HREF,
  PREFERRED_TIMES
} from "@/lib/constants";

const defaultData = {
  tagline: { text: "Book a visit" },
  title: { text: "Request an appointment." },
  description: {
    text: "Send this through and the front desk will call to confirm a time — usually within a couple of hours during opening hours."
  },
  buttons: [{ text: "Request Appointment", url: "#" }],
  assets: [],
  lists: [
    {
      name: "reasons",
      items: APPOINTMENT_REASONS.map((reason) => ({ title: { text: reason } }))
    },
    {
      name: "preferred-times",
      items: PREFERRED_TIMES.map((time) => ({ title: { text: time } }))
    },
    {
      name: "insurance",
      items: INSURANCE_ACCEPTED.map((plan) => ({ title: { text: plan } }))
    }
  ],
  extraDetails: {
    privacy_note:
      "Please leave out symptoms, medications and insurance ID numbers — this form is not a secure channel. We will take anything clinical over the phone when we confirm your appointment.",
    urgent_note: "In pain right now? Call us instead — we hold same-day slots open every working day."
  }
};

interface BookingFormProps {
  data?: Record<string, any> | null;
}

export default function BookingForm({ data: cmsData }: BookingFormProps) {
  const data = cmsData ?? defaultData;
  const reasons = data.lists?.[0]?.items ?? [];
  const times = data.lists?.[1]?.items ?? [];
  const insurance = data.lists?.[2]?.items ?? [];
  const [submitted, setSubmitted] = useState(false);

  // No backend is wired yet — the success state stands in until one is.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section dark" id="booking">
      <div className="container">
        <div className="split-grid reverse">
          <div className="form-card on-dark" data-reveal>
            {submitted ? (
              <div className="form-success">
                <span className="tick" aria-hidden="true">
                  <Check size={28} />
                </span>
                <h3>Request received</h3>
                <p className="form-intro" style={{ margin: 0 }}>
                  Thank you. We will call to confirm your time — usually within a couple of hours
                  during opening hours. Nothing is booked until you have heard from us.
                </p>
                <a className="btn btn-primary" href={PHONE_HREF}>
                  Call {CONTACT_INFO.phone}
                  <span className="arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2>{data.title?.text}</h2>
                <p className="form-intro">{data.description?.text}</p>

                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="booking-name">Full name</label>
                    <input id="booking-name" name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="booking-phone">Phone</label>
                    <input id="booking-phone" name="phone" type="tel" autoComplete="tel" required />
                  </div>
                  <div className="field">
                    <label htmlFor="booking-email">Email</label>
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="booking-patient">Are you a new patient?</label>
                    <select id="booking-patient" name="patient" defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      <option value="new">New patient</option>
                      <option value="existing">Existing patient</option>
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="booking-reason">Reason for visit</label>
                    <select id="booking-reason" name="reason" defaultValue="">
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
                  <div className="field">
                    <label htmlFor="booking-date">Preferred date</label>
                    <input id="booking-date" name="date" type="date" />
                  </div>
                  <div className="field">
                    <label htmlFor="booking-time">Preferred time</label>
                    <select id="booking-time" name="time" defaultValue="">
                      <option value="" disabled>
                        Choose one
                      </option>
                      {times.map((time: any, index: number) => (
                        <option key={time.title?.text ?? index} value={time.title?.text}>
                          {time.title?.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field full">
                    <label htmlFor="booking-notes">Anything we should know? (optional)</label>
                    <textarea
                      id="booking-notes"
                      name="notes"
                      placeholder="Scheduling constraints, accessibility needs, or if you would prefer a particular dentist."
                    />
                  </div>
                </div>

                <div className="privacy-note">
                  <Lock size={15} aria-hidden="true" />
                  <span>{data.extraDetails?.privacy_note}</span>
                </div>

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit" data-magnetic>
                    {data.buttons?.[0]?.text ?? "Request Appointment"}
                    <span className="arrow" aria-hidden="true">
                      ↗
                    </span>
                  </button>
                  <a className="btn btn-outline-cream" href={PHONE_HREF}>
                    <Phone size={14} aria-hidden="true" />
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </form>
            )}
          </div>

          <div>
            <span className="eyebrow-mark on-dark" data-reveal>
              <Phone size={14} aria-hidden="true" />
              {data.tagline?.text}
            </span>
            <h2
              className="h-display h2"
              data-split
              style={{ color: "var(--cream-text)", marginTop: 6 }}
            >
              Prefer to talk it through?
            </h2>
            <p className="body-md on-dark" data-reveal data-delay="0.1" style={{ marginTop: 18 }}>
              {data.extraDetails?.urgent_note}
            </p>

            <div className="info-list" style={{ marginTop: 24 }}>
              <div className="info-row" data-reveal data-delay="0.16">
                <span className="card-icon lime" aria-hidden="true">
                  <Phone size={17} />
                </span>
                <div>
                  <div className="info-label">Call the practice</div>
                  <div className="info-value">
                    <a href={PHONE_HREF}>{CONTACT_INFO.phone}</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 26 }} data-reveal data-delay="0.22">
              <div className="info-label" style={{ marginBottom: 12 }}>
                Insurance we accept
              </div>
              <div className="accred-row" style={{ marginTop: 0 }}>
                {insurance.map((plan: any, index: number) => (
                  <span className="pill-tag" key={plan.title?.text ?? index}>
                    {plan.title?.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
