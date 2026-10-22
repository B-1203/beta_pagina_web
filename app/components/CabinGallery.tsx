'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from 'react';

type CabinGalleryProps = {
  cabinName: string;
  images: string[];
};

function getImageAlt(image: string, cabinName: string, index: number) {
  const fileName = image
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ');

  return fileName && fileName !== 'imagen frontend'
    ? `${cabinName}: ${fileName}`
    : `Fotografía ${index + 1} de ${cabinName}`;
}

export default function CabinGallery({ cabinName, images }: CabinGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const imageButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const swipeStartRef = useRef<number | null>(null);
  const imageCount = images.length;
  const activeImage = images[activeIndex];

  const showPrevious = useCallback(() => {
    setActiveIndex((index) => (index - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const showNext = useCallback(() => {
    setActiveIndex((index) => (index + 1) % imageCount);
  }, [imageCount]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest('button')) {
      return;
    }

    swipeStartRef.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartRef.current === null) {
      return;
    }

    const swipeDistance = event.clientX - swipeStartRef.current;
    swipeStartRef.current = null;

    if (Math.abs(swipeDistance) > 50 && imageCount > 1) {
      if (swipeDistance < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
  };

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const returnFocus = returnFocusRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (event.key === 'ArrowLeft' && imageCount > 1) {
        event.preventDefault();
        showPrevious();
      } else if (event.key === 'ArrowRight' && imageCount > 1) {
        event.preventDefault();
        showNext();
      } else if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll<HTMLElement>(
          '.cabin-lightbox button:not(:disabled)',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      returnFocus?.focus();
    };
  }, [imageCount, isLightboxOpen, showNext, showPrevious]);

  if (imageCount === 0) {
    return <div className="cabin-image" aria-label={`Sin fotografías de ${cabinName}`} />;
  }

  return (
    <>
      <div
        className="cabin-image cabin-carousel"
        aria-label={`Galería de ${cabinName}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartRef.current = null;
        }}
      >
        <div
          className="cabin-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              className="cabin-carousel-slide"
              key={`${image}-${index}`}
              aria-hidden={index !== activeIndex}
            >
              <button
                className="cabin-image-trigger"
                type="button"
                aria-label={`Ampliar ${cabinName}, fotografía ${index + 1} de ${imageCount}`}
                onClick={() => {
                  setActiveIndex(index);
                  returnFocusRef.current = imageButtonRef.current;
                  setIsLightboxOpen(true);
                }}
                tabIndex={index === activeIndex ? 0 : -1}
                ref={index === activeIndex ? imageButtonRef : null}
              >
                <Image
                  src={image}
                  alt={getImageAlt(image, cabinName, index)}
                  fill
                  sizes="(max-width: 720px) 100vw, (max-width: 980px) 50vw, 33vw"
                />
              </button>
            </div>
          ))}
        </div>

        <span className="image-tag">{cabinName}</span>

        {imageCount > 1 && (
          <>
            <button
              className="cabin-carousel-arrow cabin-carousel-arrow-previous"
              type="button"
              aria-label={`Fotografía anterior de ${cabinName}`}
              onClick={showPrevious}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              className="cabin-carousel-arrow cabin-carousel-arrow-next"
              type="button"
              aria-label={`Siguiente fotografía de ${cabinName}`}
              onClick={showNext}
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}

        <div className="cabin-carousel-status" aria-live="polite" aria-atomic="true">
          {activeIndex + 1} / {imageCount}
        </div>

        {imageCount > 1 && (
          <div className="cabin-carousel-dots" aria-label="Seleccionar fotografía">
            {images.map((image, index) => (
              <button
                className={`cabin-carousel-dot${index === activeIndex ? ' is-active' : ''}`}
                key={`${image}-dot-${index}`}
                type="button"
                aria-label={`Mostrar fotografía ${index + 1} de ${imageCount}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && activeImage && (
        <div
          className="cabin-lightbox"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsLightboxOpen(false);
            }
          }}
        >
          <div
            className="cabin-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`Galería de ${cabinName}`}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeStartRef.current = null;
            }}
          >
            <button
              className="cabin-lightbox-close"
              type="button"
              aria-label="Cerrar galería"
              onClick={() => setIsLightboxOpen(false)}
              ref={closeButtonRef}
            >
              <span aria-hidden="true">×</span>
            </button>

            {imageCount > 1 && (
              <button
                className="cabin-lightbox-arrow cabin-lightbox-arrow-previous"
                type="button"
                aria-label={`Fotografía anterior de ${cabinName}`}
                onClick={showPrevious}
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}

            <div className="cabin-lightbox-image">
              <Image
                src={activeImage}
                alt={getImageAlt(activeImage, cabinName, activeIndex)}
                fill
                sizes="100vw"
                priority
              />
            </div>

            {imageCount > 1 && (
              <button
                className="cabin-lightbox-arrow cabin-lightbox-arrow-next"
                type="button"
                aria-label={`Siguiente fotografía de ${cabinName}`}
                onClick={showNext}
              >
                <span aria-hidden="true">›</span>
              </button>
            )}

            <span className="cabin-lightbox-status" aria-live="polite" aria-atomic="true">
              {activeIndex + 1} / {imageCount}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
