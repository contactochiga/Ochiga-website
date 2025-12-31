type Props = {
  title: string;
  color: string;
  description: string;
};

export default function CapabilityCard({ title, color, description }: Props) {
  return (
    <div className="cap-card">
      <div className="cap-bar" style={{ backgroundColor: color }} />
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
