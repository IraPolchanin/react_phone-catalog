import React, { useState } from 'react';

import styles from './ProductGallery.module.scss';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  if (images.length === 0) {
    return (
      <div className={styles.gallery}>
        <div className={styles.mainImage}>No images available</div>
      </div>
    );
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`${styles.thumbnail} ${
              selectedImage === image ? styles.selected : ''
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      <div className={styles.mainImage}>
        <img src={selectedImage} alt="Selected product" />
      </div>
    </div>
  );
};
