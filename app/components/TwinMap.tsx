export default function TwinMap({ topology }: { topology: any }) {
  return (
    <div className="twin-map">
      <small>DIGITAL TWIN (ABSTRACT VIEW)</small>

      <div className="nodes">
        {topology.buildings.map((b: any) => (
          <div key={b.id} className="node building">
            {b.id}
          </div>
        ))}
      </div>
    </div>
  );
}
