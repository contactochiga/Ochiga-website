export default function TwinFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="twin-frame">
      <div className="twin-header">
        <span className="status-dot" />
        <span>LIVE DIGITAL TWIN — READ ONLY</span>
      </div>
      <div className="twin-body">{children}</div>
    </div>
  );
}
