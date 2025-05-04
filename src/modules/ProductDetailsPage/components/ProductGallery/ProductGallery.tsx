import React, { useState, useEffect } from 'react';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  useEffect(() => {
    setSelectedImage(images[0] || '');
  }, [images]);

  if (images.length === 0) {
    return (
      <div
        className={styles.gallery}
        role="group"
        aria-label="Product image gallery"
      >
        <div className={styles.mainImage}>No images available</div>
      </div>
    );
  }

  return (
    <div
      className={styles.gallery}
      role="group"
      aria-label="Product image gallery"
    >
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className={`${styles.thumbnail} ${
              selectedImage === image ? styles.selected : ''
            }`}
            onClick={() => setSelectedImage(image)}
            aria-current={selectedImage === image ? 'true' : 'false'}
          />
        ))}
      </div>
      <div className={styles.mainImage}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected product" />
        ) : (
          <div>No image selected</div>
        )}
      </div>
    </div>
  );
};
