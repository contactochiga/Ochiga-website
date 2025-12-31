export default function EventLog({ events }: { events: string[] }) {
  return (
    <div className="event-log">
      <small>EVENT STREAM</small>
      <ul>
        {events.map((event, i) => (
          <li key={i}>{event}</li>
        ))}
      </ul>
    </div>
  );
}
