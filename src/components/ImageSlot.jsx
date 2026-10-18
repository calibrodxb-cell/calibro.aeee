'use client';

// Renders a real image when `src` is given; otherwise falls back to a
// placeholder box — swap in your own asset by passing `src`.
export default function ImageSlot({ placeholder, src, mobileSrc, style }) {
  if (src) {
    const image = (
      <img
        src={src}
        alt={placeholder || ''}
        loading="lazy"
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }}
      />
    );

    if (mobileSrc) {
      return (
        <picture style={{ width: '100%', height: '100%', display: 'block' }}>
          <source media="(max-width: 760px)" srcSet={mobileSrc} />
          {image}
        </picture>
      );
    }

    return (
      image
    );
  }
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'var(--color-border-soft)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 12,
        color: 'var(--color-text-faint)',
        fontSize: 13,
        ...style
      }}
    >
      {placeholder}
    </div>
  );
}
