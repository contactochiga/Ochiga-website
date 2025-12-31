export default function Metric({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="metric">
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
