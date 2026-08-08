/** One gallery photo tile — click to open in a lightbox Modal (wired in Gallery page/section). */
export default function GalleryCard({ src, caption, onClick }) {
  return (
    <button onClick={onClick} className="relative group overflow-hidden rounded-xl2 border border-base-line block w-full text-left">
      <img src={src} alt={caption} className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      {caption && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-white text-xs p-3">{caption}</span>
      )}
    </button>
  );
}
