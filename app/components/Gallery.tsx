'use client';

import { useCallback, useRef, useState } from 'react';
import PhotoLightbox from './PhotoLightbox';

type GalleryProps = {
  images: string[];
};

function getGalleryAlt(image: string, index: number) {
  const fileName = image
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ');

  return fileName ? `El Artesano Beach House: ${fileName}` : `Fotografía ${index + 1} de la galería`;
}

export default function Gallery({ images }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeLightbox = useCallback(() => setIsLightboxOpen(false), []);

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % images.length);
  }, [images.length]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            ref={index === activeIndex ? returnFocusRef : undefined}
            className={`gallery-item gallery-item-${index + 1}`}
            type="button"
            style={{ backgroundImage: `url(${image})` }}
            aria-label={`Ampliar ${getGalleryAlt(image, index)}`}
            onClick={() => {
              setActiveIndex(index);
              if (document.activeElement instanceof HTMLButtonElement) {
                returnFocusRef.current = document.activeElement;
              }
              setIsLightboxOpen(true);
            }}
          />
        ))}
      </div>

      <PhotoLightbox
        title="El Artesano Beach House"
        images={images}
        activeIndex={activeIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
        getAlt={getGalleryAlt}
        returnFocusRef={returnFocusRef}
      />
    </>
  );
}
