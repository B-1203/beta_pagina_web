'use client';

import Image from 'next/image';
import { useEffect, useRef, type PointerEvent, type RefObject } from 'react';

type PhotoLightboxProps = {
  title: string;
  images: string[];
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  getAlt: (image: string, index: number) => string;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
};

export default function PhotoLightbox({
  title,
  images,
  activeIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  getAlt,
  returnFocusRef,
}: PhotoLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const swipeStartRef = useRef<number | null>(null);
  const activeImage = images[activeIndex];

  useEffect(() => {
    if (!isOpen || images.length === 0) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const returnFocus = returnFocusRef?.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && images.length > 1) {
        event.preventDefault();
        onPrevious();
      } else if (event.key === 'ArrowRight' && images.length > 1) {
        event.preventDefault();
        onNext();
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
  }, [
    images.length,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    returnFocusRef,
  ]);

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

    if (Math.abs(swipeDistance) > 50 && images.length > 1) {
      if (swipeDistance < 0) {
        onNext();
      } else {
        onPrevious();
      }
    }
  };

  if (!isOpen || !activeImage) {
    return null;
  }

  return (
    <div
      className="cabin-lightbox"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="cabin-lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Galería de ${title}`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStartRef.current = null;
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <button
          className="cabin-lightbox-close"
          type="button"
          aria-label="Cerrar galería"
          onClick={onClose}
          ref={closeButtonRef}
        >
          <span aria-hidden="true">×</span>
        </button>

        {images.length > 1 && (
          <button
            className="cabin-lightbox-arrow cabin-lightbox-arrow-previous"
            type="button"
            aria-label={`Fotografía anterior de ${title}`}
            onClick={onPrevious}
          >
            <span aria-hidden="true">‹</span>
          </button>
        )}

        <div className="cabin-lightbox-image">
          <Image
            key={`${activeImage}-${activeIndex}`}
            src={activeImage}
            alt={getAlt(activeImage, activeIndex)}
            fill
            sizes="100vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <button
            className="cabin-lightbox-arrow cabin-lightbox-arrow-next"
            type="button"
            aria-label={`Siguiente fotografía de ${title}`}
            onClick={onNext}
          >
            <span aria-hidden="true">›</span>
          </button>
        )}

        <span className="cabin-lightbox-status" aria-live="polite" aria-atomic="true">
          {activeIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
