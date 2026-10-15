import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaPlayCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Hero() {
  const [showKeynote, setShowKeynote] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showKeynote) {
      return;
    }

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    closeButtonRef.current?.focus();

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowKeynote(false);
        return;
      }
      if (event.key !== 'Tab') {
        return;
      }

      const dialog = document.querySelector<HTMLElement>('.keynote-dialog');
      const focusableElements = dialog?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleDialogKeys);
    return () => {
      window.removeEventListener('keydown', handleDialogKeys);
      previousFocus?.focus();
    };
  }, [showKeynote]);

  return (
    <section className="hero section-wrap" aria-labelledby="hero-title">
      <div className="hero__copy">
        <div className="eyebrow-row">
          <span className="status-pill"><span className="status-dot" />2025 Flagship Architecture</span>
          <span className="eyebrow-separator">|</span>
          <span className="eyebrow">HW REV 3.4 • $349 USD</span>
        </div>
        <h1 id="hero-title">Precision acoustic architecture. Engineered in Stockholm.</h1>
        <p className="hero__description">
          Milled from solid aerospace-grade aluminum with acoustic chambers tuned
          down to 0.02% THD. Featuring adaptive hybrid active noise cancellation
          and proprietary low-latency wireless transmission.
        </p>
        <div className="hero__specs">
          <div className="spec-chip">
            <span className="material-symbols-outlined" aria-hidden="true">graphic_eq</span>
            <span><small>Acoustic core</small><strong>40mm Beryllium Drivers</strong></span>
          </div>
          <div className="spec-chip">
            <span className="material-symbols-outlined" aria-hidden="true">battery_charging_full</span>
            <span><small>Autonomy</small><strong>55hr Battery Life</strong></span>
          </div>
          <div className="spec-chip">
            <span className="material-symbols-outlined" aria-hidden="true">graphic_eq</span>
            <span><small>Master bitstream</small><strong>Lossless 24-bit/96kHz</strong></span>
          </div>
        </div>
        <div className="hero__actions">
          <Link className="button button--dark" to="/products/studio-one-headphone">
            Explore Studio One <FaArrowRight aria-hidden="true" />
          </Link>
          <button className="button button--soft" onClick={() => setShowKeynote(true)}>
            <FaPlayCircle aria-hidden="true" /> Watch 60s Keynote <span className="video-tag">4K HDR</span>
          </button>
        </div>
      </div>
      <div className="hero__visual">
        <div className="hero__image-frame">
          <div className="image-callout image-callout--top">
            <small>Sensor Vector 0.1A</small>
            <span>Weight: 268g • Clamp: 4.2N</span>
          </div>
          <span className="image-tag">CNC Matte Titanium Finish</span>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK5CacQV6_ODSvb0mB42ylkn0zvGyXUMfGl73BsmcUOGE4WzUJnp_yMnXKedgISGWJot0UjLjmaetFQmnCzr66gFkyurmb91SGbmwa-d8A2jnB3NNbqQrOOtdPmN7aQ6oa_Uyh5NvNv7pCgBU_PuFbqSqNdA0tsYKlKsLYTc8Q62k8wJW1_Zgu_nK3uJiG8jOiRiPkPcVLTclnfXf7g59-a3ojthPJ658VtdWwXmJ7BA-qf-ksSKY88Q"
            alt="Matte black and titanium NEXUS Studio One over-ear headphones"
          />
          <div className="image-callout image-callout--bottom">
            <span><span className="status-dot status-dot--green" />Acoustic Curve: Harman Target Ref</span>
            <svg viewBox="0 0 100 25" role="img" aria-label="Acoustic frequency response curve">
              <path d="M0,20 Q15,18 25,12 T50,11 T75,9 T90,14 T100,22" />
            </svg>
          </div>
        </div>
      </div>
      {showKeynote && (
        <div className="dialog-backdrop" role="presentation" onClick={() => setShowKeynote(false)}>
          <section
            className="keynote-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="keynote-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="keynote-dialog__header">
              <h2 id="keynote-title">NEXUS Studio One • Stockholm Keynote</h2>
              <button
                ref={closeButtonRef}
                className="icon-button"
                aria-label="Close keynote"
                onClick={() => setShowKeynote(false)}
              >
                ×
              </button>
            </div>
            <div className="keynote-dialog__screen">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzwsYEGQpyTzBKc_bBEhE5OYw6XfmGDEvYtsnqxAluKLvRRhUW6jIHTsDuYgWe0mTU9tCrLcGqz4WPT89sdCs90MXutMONVc0kbRcnwfidmczd8fAe8HpJs80e7_5Wcv2czKSgmj2EE2JTdZlWSaudueEGv-iWNrHXMWAog8m66eLWsRm-PNyPqti3Tna9Og1zL9SQNG5eWi-D9piev_fT3uBi6Cw_AYc4BnatM2gWTEd9pxUa3T85EQ"
                alt="NEXUS acoustic engineering keynote still"
              />
              <div className="keynote-dialog__caption">
                <FaPlayCircle aria-hidden="true" />
                <strong>4K Lossless Acoustic Test Reel</strong>
                <span>Engineered by NEXUS Audio Lab • Stockholm, SE</span>
              </div>
            </div>
            <div className="keynote-dialog__footer">
              <span>Codec: AV1 • 3840×2160 @ 60fps</span>
              <button className="button button--soft" onClick={() => setShowKeynote(false)}>Dismiss Keynote</button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default Hero;
