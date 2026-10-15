import { useState } from 'react';
import { studioOneGallery } from '../../data/studioOneDetail';

function ProductGallery() {
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = studioOneGallery[activeImage];

  return (
    <section className="pdp-gallery" aria-label="Product images">
      <div className="pdp-gallery__main">
        <span className="pdp-gallery__view">VIEW {String(activeImage + 1).padStart(2, '0')} / STUDIO SERIES</span>
        <img src={currentImage.image} alt={currentImage.alt} />
        <span className="pdp-gallery__sku">NX-S1 • 2025</span>
      </div>
      <div className="pdp-gallery__thumbs" role="group" aria-label="Choose product image">
        {studioOneGallery.map((image, index) => (
          <button
            className={`pdp-gallery__thumb${index === activeImage ? ' pdp-gallery__thumb--active' : ''}`}
            key={image.label}
            type="button"
            aria-label={`Show ${image.label.toLowerCase()} image`}
            aria-pressed={index === activeImage}
            onClick={() => setActiveImage(index)}
          >
            <img src={image.image} alt="" loading="lazy" />
          </button>
        ))}
        <span className="pdp-gallery__rotation">360° <span>Gallery</span></span>
      </div>
      <div className="pdp-gallery__caption">
        <span><span className="status-dot" />PRECISION ACOUSTIC CAVITY</span>
        <span>TOLERANCE ±0.02MM</span>
      </div>
    </section>
  );
}

export default ProductGallery;
