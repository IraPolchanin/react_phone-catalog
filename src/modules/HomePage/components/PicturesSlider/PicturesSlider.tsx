import { useState, useEffect, useCallback, useRef } from 'react';

import { Icon } from '@/components/Icon'; // Імпортуйте компонент Icon
import { Product } from '@/types/Product';
import { useProducts } from '@/contexts/ProductsContext';

import styles from './PicturesSlider.module.scss';

export const PicturesSlider = () => {
  const { featuredProducts } = useProducts();

  const customBannersData = [
    {
      title: 'Now available in our store!',
      subtitle: 'Be the first!',
      cta: 'ORDER NOW',
    },
    {
      title: 'New Collection Arrived!',
      subtitle: 'Limited stock available',
      cta: 'SHOP NOW',
    },
    {
      title: 'Special Offers!',
      subtitle: "Don't miss out",
      cta: 'VIEW DEALS',
    },
  ];

  const getProductImagePath = (product: Product): string => {
    if (!product?.image) {
      return '/img/default-product.webp';
    }

    return product.image.startsWith('/')
      ? product.image
      : `/${product.image.startsWith('img/') ? '' : 'img/'}${product.image}`;
  };

  const slides = featuredProducts.map((product, index) => ({
    image: getProductImagePath(product),
    title: customBannersData[index].title,
    subtitle: customBannersData[index].subtitle,
    cta: customBannersData[index].cta,
    productName: product.name,
    tagline:
      product.category === 'phones'
        ? 'The ultimate experience'
        : 'Innovation at its best',
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex(prev => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) {
      return;
    }

    setIsTransitioning(true);
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) {
        return;
      }

      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning, currentIndex],
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) {
      return;
    }

    const touchEndX = e.touches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (diffX > 50 && !isTransitioning) {
      goToNext();
      touchStartX.current = null;
    } else if (diffX < -50 && !isTransitioning) {
      goToPrev();
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, goToNext]);

  return (
    <div className={styles.picturesSlider}>
      <Icon
        icon="arrow_left"
        variant="slider-control"
        onClick={goToPrev}
        aria-label="Previous image"
        type="button"
      />

      <div
        ref={slideContainerRef}
        className={styles.picturesSlider__slideContainer}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={`slider-${index}`}
            className={`${styles.picturesSlider__slide} ${
              index === currentIndex
                ? styles['picturesSlider__slide--active']
                : ''
            }`}
          >
            <div className={styles.picturesSlider__content}>
              <p className={styles.picturesSlider__title}>{slide.title}</p>
              <p className={styles.picturesSlider__subtitle}>
                {slide.subtitle}
              </p>
              <button className={styles.picturesSlider__ctaButton}>
                {slide.cta}
              </button>
            </div>

            <div className={styles.picturesSlider__imageWrapper}>
              <div className={styles.picturesSlider__topText}>
                <p className={styles.picturesSlider__productName}>
                  {slide.productName}
                </p>
                <p className={styles.picturesSlider__tagline}>
                  {slide.tagline}
                </p>
              </div>
              <img
                src={slide.image}
                alt={`Promotional banner ${index + 1}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={styles.picturesSlider__image}
                onError={e => {
                  const target = e.target as HTMLImageElement;

                  target.src = '/img/default-product.webp';
                  target.classList.add(
                    styles['picturesSlider__image--fallback'],
                  );
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <Icon
        icon="arrow_right"
        variant="slider-control"
        onClick={goToNext}
        aria-label="Next image"
        type="button"
      />

      <div className={styles.picturesSlider__dots}>
        {slides.map((_, i) => (
          <button
            key={`slider-dot-${i}`}
            type="button"
            className={`${styles.picturesSlider__dot} ${
              i === currentIndex ? styles['picturesSlider__dot--active'] : ''
            }`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentIndex}
          />
        ))}
      </div>
    </div>
  );
};
