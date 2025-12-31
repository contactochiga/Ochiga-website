export default function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <h1>{title}</h1>
      <div className="content">{children}</div>
    </section>
  );
}
