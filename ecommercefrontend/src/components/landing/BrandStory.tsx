import { FaLeaf, FaShieldAlt, FaMicrochip } from 'react-icons/fa';

const values = [
  {
    icon: FaLeaf,
    title: 'Carbon Neutral Certified',
    description: 'Life-cycle audited from raw bauxite extraction to solar-powered final assembly.',
    footnote: 'ISO 14040 VERIFIED',
  },
  {
    icon: FaShieldAlt,
    title: '2-Year Warranty',
    description: 'Advance hardware swaps dispatched within 24 hours. Zero deductible, zero fine print.',
    footnote: 'GLOBAL SUPPORT TIER 1',
  },
  {
    icon: FaMicrochip,
    title: 'Pure Firmware',
    description: 'No companion apps required. Hardware flash stored in non-volatile ROM.',
    footnote: 'QMK / VIA / OPEN AUDIO',
  },
];

function BrandStory() {
  return (
    <section className="section section--white" id="manifesto">
      <div className="section-wrap story-layout">
        <div className="story-copy">
          <p className="section-kicker"><span className="status-dot" /> ENGINEERING PHILOSOPHY / MANIFESTO</p>
          <h2>Electronics reclaimed from planned obsolescence.</h2>
          <p>
            We reject glued enclosures, unrepairable batteries, and unnecessary
            telemetry apps. Every NEXUS product uses standard Torx hardware,
            open schematics, and zero resident bloatware.
          </p>
          <div className="story-stats">
            <div><strong>100%</strong><span>RECYCLED 6000-ALLOY</span></div>
            <div><strong>9.8/10</strong><span>IFIXIT REPAIR INDEX</span></div>
            <div><strong>0 KB</strong><span>BACKGROUND TELEMETRY</span></div>
          </div>
        </div>
        <div className="value-grid">
          {values.map(({ icon: Icon, title, description, footnote }) => (
            <article className="value-card" key={title}>
              <span className="value-card__icon"><Icon aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{description}</p>
              <small>{footnote}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandStory;
