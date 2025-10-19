import { useState } from "react";
import "./contact.css";


export default function Contact() {
  const [status, setStatus] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to your email service / backend
    setStatus("Thanks! We received your message and will reply soon.");
    e.currentTarget.reset();
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <header className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch we’d love to hear from you.</p>
      </header>

      {/* Body */}
      <section className="contact-body">
        <div className="contact-grid">
          {/* Left column: Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p className="lede">
              Questions about orders, custom cakes, or bulk treats?
              Send us a message or reach us using the details below.
            </p>

            <ul className="info-list">
              <li className="info-item">
                <span className="i i-pin" aria-hidden />
                <div>
                  <strong>Address</strong>
                  <p>7728 Dr. A Santos Compound<br/>Available nationwide</p>
                </div>
              </li>

              <li className="info-item">
                <span className="i i-phone" aria-hidden />
                <div>
                  <strong>Phone</strong>
                  <p>+63 945 548 6691</p>
                </div>
              </li>

              <li className="info-item">
                <span className="i i-mail" aria-hidden />
                <div>
                  <strong>Email</strong>
                  <p>valenzuelamarkyuri09@gmail.com</p>
                </div>
              </li>

              <li className="info-item">
                <span className="i i-clock" aria-hidden />
                <div>
                  <strong>Support Hours</strong>
                  <p>
                    Mon–Sat: 9:00 AM – 7:00 PM<br/>
                    Sun: 10:00 AM – 5:00 PM<br/>
                    Philippine Standard Time
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right column: Form */}
          <form className="contact-form" onSubmit={onSubmit}>
            <h3>Send us a Message</h3>

            <label>
              Name *
              <input type="text" name="name" required placeholder="Your name"/>
            </label>

            <label>
              Email *
              <input type="email" name="email" required placeholder="you@example.com"/>
            </label>

            <label>
              Subject *
              <input type="text" name="subject" required placeholder="Subject"/>
            </label>

            <label>
              Message *
              <textarea name="message" rows={5} required placeholder="How can we help?"></textarea>
            </label>

            <button type="submit" className="send-btn">Send Message</button>

            {status && <div className="form-status" role="status">{status}</div>}
          </form>
        </div>
      </section>
    </main>
  );
}
