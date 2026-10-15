import { useRef, useState, type KeyboardEvent } from 'react';
import { FaStar } from 'react-icons/fa';
import {
  studioOneBoxContents,
  studioOneReviews,
  studioOneSpecifications,
} from '../../data/studioOneDetail';

const tabs = [
  { id: 'specifications', label: 'Technical Specifications' },
  { id: 'acoustics', label: 'Acoustic Performance' },
  { id: 'box', label: "What's in the Box" },
  { id: 'reviews', label: 'Reviews & Q+A (428)' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function ProductInformation() {
  const [activeTab, setActiveTab] = useState<TabId>('specifications');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectTabByKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;

    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="pdp-information section--white" aria-label="Product information">
      <div className="section-wrap">
        <div className="pdp-tabs" role="tablist" aria-label="Product details">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => { tabRefs.current[index] = element; }}
              id={`pdp-tab-${tab.id}`}
              className={`pdp-tabs__tab${activeTab === tab.id ? ' pdp-tabs__tab--active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`pdp-panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => selectTabByKeyboard(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pdp-tab-panels">
          {tabs.map((tab) => (
            <div
              className="pdp-tab-panel"
              id={`pdp-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`pdp-tab-${tab.id}`}
              tabIndex={0}
              hidden={activeTab !== tab.id}
              key={tab.id}
            >
          {tab.id === 'specifications' && (
            <div className="pdp-spec-grid">
              {studioOneSpecifications.map((group) => (
                <article className="pdp-spec-card" key={group.group}>
                  <p className="pdp-spec-card__eyebrow">{group.group}</p>
                  <h2>{group.title}</h2>
                  <table>
                    <tbody>
                      {group.rows.map(([label, value]) => (
                        <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </article>
              ))}
            </div>
          )}

          {tab.id === 'acoustics' && (
            <div className="pdp-acoustics">
              <div className="pdp-acoustics__chart">
                <h2>Harman 2024 Reference vs. NEXUS Curve</h2>
                <p>Measured on GRAS 45CA head simulator</p>
                <svg viewBox="0 0 600 220" role="img" aria-labelledby="curve-title curve-description">
                  <title id="curve-title">Frequency response comparison</title>
                  <desc id="curve-description">The calibrated NEXUS master curve stays close to the Harman 2024 reference across bass, midrange, and treble frequencies.</desc>
                  {[40, 100, 160].map((y) => <line key={y} x1="0" x2="600" y1={y} y2={y} />)}
                  {[150, 300, 450].map((x) => <line key={x} x1={x} x2={x} y1="20" y2="180" />)}
                  <path className="curve curve--harman" d="M0 120 C45 110 70 85 120 90 S190 120 240 115 S310 75 360 95 S420 125 470 105 S540 70 600 82" />
                  <path className="curve curve--nexus" d="M0 105 C50 102 76 94 120 96 S190 108 240 105 S310 92 360 98 S420 108 470 99 S540 88 600 95" />
                </svg>
                <div className="pdp-acoustics__legend">
                  <span><i className="legend-dot legend-dot--nexus" />NEXUS Calibrated Master Curve (0.8 dB Sub-Boost)</span>
                  <span><i className="legend-dot legend-dot--harman" />Harman Target 2024 Reference</span>
                </div>
                <div className="pdp-acoustics__frequencies">
                  <span>20 Hz <small>Sub bass</small></span><span>100 Hz</span><span>1 kHz <small>Midrange</small></span><span>5 kHz</span><span>20 kHz <small>Air &amp; sparkle</small></span>
                </div>
              </div>
              <article className="pdp-isolation">
                <p className="pdp-spec-card__eyebrow">Adaptive triple-feed ANC</p>
                <h2>Acoustic isolation</h2>
                <p>Microphone sensors calculate environmental noise 384,000 times per second, deploying inverse soundwaves for adaptive noise reduction.</p>
                <div><span>Low-frequency drone <small>(Cabin / rail)</small></span><strong>−43 dB</strong></div>
                <div><span>Human speech spectrum <small>(Office)</small></span><strong>−36 dB</strong></div>
              </article>
            </div>
          )}

          {tab.id === 'box' && (
            <div className="pdp-box-grid">
              {studioOneBoxContents.map((item, index) => (
                <article className="pdp-box-item" key={item.title}>
                  <span className="pdp-box-item__number">0{index + 1}</span>
                  <span className="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          )}

          {tab.id === 'reviews' && (
            <div className="pdp-reviews">
              <aside className="pdp-review-summary">
                <p className="pdp-spec-card__eyebrow">Auditory consensus</p>
                <strong>4.9</strong>
                <div className="pdp-review-summary__stars" aria-label="Rated 4.9 out of 5"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                <span>out of 5.0 · 428 reviews</span>
                {[['5 Star', '92%'], ['4 Star', '7%'], ['3 Star', '1%']].map(([rating, percent]) => (
                  <div className="pdp-review-summary__bar" key={rating}>
                    <span>{rating}</span><span><i style={{ width: percent }} /></span><strong>{percent}</strong>
                  </div>
                ))}
                <a className="button button--dark" href="#pdp-reviews-list">Read verified reviews</a>
              </aside>
              <div className="pdp-review-list" id="pdp-reviews-list">
                {studioOneReviews.map((review) => (
                  <article className="pdp-review" key={review.initials}>
                    <div className="pdp-review__avatar" aria-hidden="true">{review.initials}</div>
                    <div className="pdp-review__content">
                      <div className="pdp-review__byline">
                        <strong>{review.name}</strong><span>{review.role}</span><time>{review.date}</time>
                      </div>
                      <p className="pdp-review__stars" aria-label="5 out of 5 stars">★★★★★</p>
                      <h2>{review.title}</h2>
                      <p>{review.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductInformation;
