import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import EmptyState from '../components/EmptyState';

/**
 * Announcements — the host platform pushes live updates in; this
 * section just renders whatever array it's given via props, with a
 * sensible empty state before the first announcement goes out.
 */
export default function Announcements({ items = [] }) {
  return (
    <SectionLayout id="announcements">
      <SectionTitle eyebrow="Stay updated" title="Announcements" />
      {items.length === 0 ? (
        <EmptyState title="No announcements yet" description="Organizer updates will appear here in real time." icon="📣" />
      ) : (
        <ul className="space-y-4">
          {items.map((a, i) => (
            <li key={i} className="bg-base-card border border-base-line rounded-xl2 p-4 text-sm text-text-muted">{a}</li>
          ))}
        </ul>
      )}
    </SectionLayout>
  );
}
