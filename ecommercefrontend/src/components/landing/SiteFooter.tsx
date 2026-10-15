import { useState, type FormEvent } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand brand--footer" to="/" aria-label="NEXUS home">NEXUS<span>®</span></Link>
            <p>Engineered minimalist consumer electronics, refined acoustics, and workstation displays crafted with precision.</p>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="newsletter-email">Email for hardware updates</label>
              <input id="newsletter-email" type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe to hardware updates"><FaArrowRight aria-hidden="true" /></button>
            </form>
            {subscribed && <span className="subscribe-success" role="status">You’re on the list. Thank you.</span>}
          </div>
          <div>
            <h2>Explore</h2>
            <Link to="/#categories">Audio &amp; Sound</Link>
            <Link to="/#categories">Computing</Link>
            <Link to="/#categories">Displays</Link>
            <Link to="/#categories">Accessories</Link>
          </div>
          <div>
            <h2>Support</h2>
            <Link to="/products/studio-one-headphone#pdp-information">Technical specifications</Link>
            <Link to="/#manifesto">Warranty &amp; repairs</Link>
            <Link to="/#manifesto">Firmware &amp; drivers</Link>
            <Link to="/#manifesto">Contact the studio</Link>
          </div>
          <div className="footer-note">
            <span className="footer-note__index">EST. 2018 — STOCKHOLM, SE</span>
            <p>Buy less.<br />Choose well.<br />Make it last.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 NEXUS Studio. Built to last.</span>
          <span>Privacy&nbsp;&nbsp; · &nbsp;&nbsp;Terms&nbsp;&nbsp; · &nbsp;&nbsp;Shipping</span>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
