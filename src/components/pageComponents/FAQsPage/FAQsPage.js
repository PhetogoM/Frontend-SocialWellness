import React, { useState } from "react";
import "./FAQsPage.css";

const faqs = [
  {
    q: "What is UniPath Social Wellness?",
    a: "UniPath is a student-focused hub for campus wellbeing. You can discover events, share requests, and connect with resources that support your social and mental wellness."
  },
  {
    q: "What personal information do you store?",
    a: "We store only what is required to run the platform: your basic profile and a unique student number for verification where needed. You can read more in our privacy policy."
  },
  {
    q: "How do I submit a suggestion or request?",
    a: "Open our requests page and share what you’d like to see on campus (e.g., a new club or support service). Your submission will be reviewed by moderators or admins."
  },
  {
    q: "Why don’t I see my post immediately?",
    a: "Some content is reviewed before it appears to everyone. If your submission is pending, it will be visible once approved."
  },
  {
    q: "How do likes and reactions work?",
    a: "You can like or unlike a post. This helps surface popular ideas and activities to the community and moderators."
  },
  {
    q: "Why moderate content on UniPath?",
    a: "Moderators and admins review posts and requests to keep the space respectful and safe. They can approve, reject, or remove content that violates guidelines."
  },
  {
    q: "What languages are supported?",
    a: "Content is primarily in English, but we welcome posts in all South African languages within our chat area."
  },
  {
    q: "Accessibility and device support",
    a: "UniPath is designed to work on modern browsers and mobile devices. If you encounter accessibility issues, please let us know so we can improve."
  },
  {
    q: "Where can I find Student Counselling & Development?",
    a: (
      <>
        Visit NWU’s Student Counselling & Development page:&nbsp;
        <a
          href="https://services.nwu.ac.za/student-counselling-and-development"
          target="_blank"
          rel="noopener noreferrer"
        >
          services.nwu.ac.za/student-counselling-and-development
        </a>
        .
      </>
    )
  },
  {
  q: "Where can I connect with NWU on social media?",
  a: (
    <>
      Visit NWU’s “Connect with us” page for all official social accounts:&nbsp;
      <a
        href="https://www.nwu.ac.za/connect"
        target="_blank"
        rel="noopener noreferrer"
      >
        Connect with us
      </a>
      .
    </>
  )
}

];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faqs-fullbleed">
      <div className="faqs-content">
        <header className="faqs-header">
          <h1 className="faqs-title">FAQs</h1>
          <p className="faqs-subtitle">Quick answers for UniPath Social Wellness</p>
        </header>

        <section className="faqs-card">
          {faqs.map((item, i) => (
            <div key={i} className="faq-item">
              <button
                className={`faq-question ${openIndex === i ? "open" : ""}`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-${i}`}
              >
                <span>{item.q}</span>
                <span className="faq-icon">{openIndex === i ? "–" : "+"}</span>
              </button>
              {openIndex === i && (
                <div id={`faq-${i}`} className="faq-answer">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
