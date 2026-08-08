import { useState } from 'react';
import { useEventData } from '../hooks/useEventData';
import SectionLayout from '../layouts/SectionLayout';
import SectionTitle from '../components/SectionTitle';
import PrimaryButton from '../components/PrimaryButton';
import ScrollReveal from '../animations/ScrollReveal';

export default function RegistrationInfo({ onSubmit }) {
  const { meta, tracks, customQuestions } = useEventData();
  const [formState, setFormState] = useState({
    teamName: '',
    fullName: '',
    email: '',
    phone: '',
    college: '',
    track: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formState);
      return;
    }

    try {
      setLoading(true);
      setStatus('Submitting registration to Turing Wings server...');
      
      const eventId = meta.slug || meta.name;
      const res = await fetch(`https://turingwings-backend.onrender.com/api/events/${eventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formState.fullName || formState.teamName,
          email: formState.email,
          phone: formState.phone,
          college: formState.college,
          teamName: formState.teamName,
        }),
      });

      if (res.ok) {
        setStatus('✅ Registration Successful! Check your email for confirmation.');
        setFormState({ teamName: '', fullName: '', email: '', phone: '', college: '', track: '' });
      } else {
        const err = await res.json();
        setStatus(`❌ ${err.message || 'Registration failed.'}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionLayout id="registration">
      <SectionTitle eyebrow="Join the build" title="Register your team" description={`Registrations for ${meta.name} are open now.`} />
      <ScrollReveal className="max-w-xl mx-auto">
        {status && (
          <div className="mb-4 p-3.5 rounded-lg bg-base-card border border-signal-cyan/40 text-xs font-bold text-signal-cyan">
            {status}
          </div>
        )}
        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-text-muted mb-1">Team Lead / Full Name *</label>
            <input
              name="fullName"
              value={formState.fullName}
              onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
              placeholder="e.g. John Doe"
              className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-muted mb-1">Email Address *</label>
            <input
              name="email"
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              placeholder="e.g. john@example.com"
              className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Phone Number</label>
              <input
                name="phone"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">College / Organization</label>
              <input
                name="college"
                value={formState.college}
                onChange={(e) => setFormState({ ...formState, college: e.target.value })}
                placeholder="University / Institute"
                className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-text-muted mb-1">Team Name (Optional)</label>
            <input
              name="teamName"
              value={formState.teamName}
              onChange={(e) => setFormState({ ...formState, teamName: e.target.value })}
              placeholder="Team Name"
              className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-text-muted mb-1">Select Challenge Track *</label>
            <select
              name="track"
              value={formState.track}
              onChange={(e) => setFormState({ ...formState, track: e.target.value })}
              className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm focus:outline-none focus:border-signal-cyan text-text"
              required
            >
              <option value="" disabled>Choose a track</option>
              {tracks.map((t) => (
                <option key={t.id || t.name} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          {customQuestions && customQuestions.length > 0 && customQuestions.map((q, idx) => (
            <div key={q.id || idx}>
              <label className="block text-xs font-bold text-text-muted mb-1">{q.question} {q.required ? '*' : ''}</label>
              <input
                name={`custom_${idx}`}
                placeholder="Your response..."
                required={q.required}
                className="w-full bg-base-card border border-base-line rounded-md px-4 py-3 text-sm placeholder:text-text-faint focus:outline-none focus:border-signal-cyan text-text"
              />
            </div>
          ))}

          <PrimaryButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit registration'}
          </PrimaryButton>
        </form>
      </ScrollReveal>
    </SectionLayout>
  );
}
