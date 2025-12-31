export default function ConsoleFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="console-frame">
      {children}
    </div>
  );
}
