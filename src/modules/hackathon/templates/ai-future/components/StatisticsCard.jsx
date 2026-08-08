import CounterAnimation from '../animations/CounterAnimation';

/** One stat tile — used in a StaggerGroup grid by the Statistics section. */
export default function StatisticsCard({ label, value, prefix = '', suffix = '' }) {
  return (
    <div className="bg-base-card border border-base-line rounded-xl2 p-6 text-center">
      <div className="font-display text-3xl md:text-4xl font-bold text-signal-violet">
        <CounterAnimation value={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className="text-text-muted text-sm mt-2">{label}</p>
    </div>
  );
}
