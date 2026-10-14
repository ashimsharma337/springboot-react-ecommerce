import { FaArrowRight } from 'react-icons/fa';
import { categories } from '../../data/storefront';

function CategoryGrid() {
  return (
    <section className="section section--white" id="categories">
      <div className="section-wrap">
        <div className="section-heading">
          <div>
            <p className="section-kicker">01 / EXPLORE BY CATEGORY</p>
            <h2>Curated ecosystems</h2>
          </div>
          <p>Hardware components built with cross-system symmetry, identical material hardness, and shared protocol interfaces.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <a className="category-card" href="#featured" key={category.name}>
              <div className="category-card__image">
                <img src={category.image} alt="" loading="lazy" />
              </div>
              <div className="category-card__body">
                <div>
                  <span className="card-eyebrow">{category.eyebrow}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <div className="category-card__meta">
                  <span>{category.units}</span>
                  <FaArrowRight aria-hidden="true" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
