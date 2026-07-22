const tones = [
  ['#eaf2ff', '#2563eb'],
  ['#eafff3', '#00a86b'],
  ['#fff0f3', '#e91e4d'],
  ['#fff9df', '#d99000'],
  ['#f0efff', '#6654e8'],
];

export default function StatCard({
  title,
  value,
  icon: Icon,
  index = 0,
}) {
  const [bg, color] =
    tones[index % tones.length];

  return (
    <div className="wp-stat-card">

      <div
        className="wp-stat-icon"
        style={{
          background: bg,
          color,
        }}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div className="min-w-0">

        <p className="wp-stat-label">
          {title}
        </p>

        <p className="wp-stat-value">
          {value}
        </p>

      </div>

    </div>
  );
}