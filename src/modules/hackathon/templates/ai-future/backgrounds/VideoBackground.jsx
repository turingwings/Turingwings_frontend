/** Full-bleed muted looping video, for events with a promo reel. Falls back gracefully if no src. */
export default function VideoBackground({ src, poster, className = '' }) {
  if (!src) return null;
  return (
    <video className={`w-full h-full object-cover ${className}`} autoPlay muted loop playsInline poster={poster} aria-hidden="true">
      <source src={src} type="video/mp4" />
    </video>
  );
}
