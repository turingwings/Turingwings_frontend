import { Link } from 'react-router-dom';
import { footerNav } from '../config/navigation';
import { useEventData } from '../hooks/useEventData';
import { FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';

const iconMap = { twitter: FaTwitter, linkedin: FaLinkedin, instagram: FaInstagram, discord: FaDiscord };

/** Footer — link columns + socials driven entirely by config/navigation.js. */
export default function Footer() {
  const { meta, contact } = useEventData();

  return (
    <footer className="border-t border-base-line bg-base-raised mt-24">
      <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <p className="font-display font-bold text-lg mb-2">{meta.name}</p>
          <p className="text-text-muted text-sm max-w-xs">{meta.tagline}</p>
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="inline-block mt-4 text-sm text-signal-cyan hover:underline">
              {contact.email}
            </a>
          )}
          <div className="flex gap-4 mt-6">
            {footerNav.socials.map((s) => {
              const Icon = iconMap[s.icon];
              return (
                <a key={s.label} href={s.href} aria-label={s.label} className="text-text-muted hover:text-signal-violet transition-colors">
                  {Icon ? <Icon size={18} /> : s.label}
                </a>
              );
            })}
          </div>
        </div>

        {footerNav.columns.map((col) => (
          <div key={col.title}>
            <p className="font-display text-sm font-semibold mb-4 text-text">{col.title}</p>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-text-muted hover:text-text transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-base-line py-6 text-center text-xs text-text-faint">
        © {new Date().getFullYear()} {meta.name} · Built on the Turing Wings Event Template Library
      </div>
    </footer>
  );
}
