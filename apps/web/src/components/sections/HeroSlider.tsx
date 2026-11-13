import { useCallback, useEffect, useState } from "react";
import { Icon } from "../primitives/Icon";

export interface Slide {
  src: string;
  alt: string;
}

function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * Slideshow state. Autoplay meets WCAG 2.2.2 (Pause, Stop, Hide):
 * - a visible pause/play control
 * - pauses while the pointer is over the hero or focus is inside it
 * - pauses while the tab is hidden
 * - never autoplays when the visitor prefers reduced motion
 */
export function useSlider(count: number, intervalMs: number) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [interacting, setInteracting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  const running = count > 1 && playing && !interacting && !tabHidden;
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => go(index + 1), intervalMs);
    return () => window.clearTimeout(timer);
  }, [running, index, intervalMs, go]);

  return {
    index,
    playing,
    count,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    togglePlaying: () => setPlaying((p) => !p),
    /** Spread onto the hero <section> to pause on hover and focus. */
    pauseHandlers: {
      onMouseEnter: () => setInteracting(true),
      onMouseLeave: () => setInteracting(false),
      onFocus: () => setInteracting(true),
      onBlur: (e: React.FocusEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
      },
    },
  };
}

type Slider = ReturnType<typeof useSlider>;

/** Decorative, crossfading background layer. Hidden from assistive technology. */
export function SlideLayer({ slides, index }: { slides: Slide[]; index: number }) {
  return (
    <div className="hero-slider" aria-hidden="true">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt=""
          className={`hero-slider__image${i === index ? " is-active" : ""}`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      ))}
    </div>
  );
}

export function SlideControls({ slider }: { slider: Slider }) {
  const { index, count, playing } = slider;
  if (count < 2) return null;
  return (
    <div className="hero-slider__controls-wrap">
      <div className="container hero-slider__controls-row">
        <div className="hero-slider__controls" role="group" aria-label="Background slideshow">
          <button type="button" className="hero-slider__btn" onClick={slider.togglePlaying} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
            <Icon name={playing ? "pause" : "play"} size={18} />
          </button>
          <button type="button" className="hero-slider__btn" onClick={slider.prev} aria-label="Previous slide">
            <Icon name="chevronLeft" size={18} />
          </button>
          <div className="hero-slider__dots">
            {Array.from({ length: count }, (_, i) => (
              <button
                key={i}
                type="button"
                className="hero-slider__dot"
                onClick={() => slider.go(i)}
                aria-label={`Show slide ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" className="hero-slider__btn" onClick={slider.next} aria-label="Next slide">
            <Icon name="chevronRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
