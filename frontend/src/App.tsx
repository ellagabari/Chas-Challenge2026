import "./App.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";

type TrashReport = {
  id: number;
  position: [number, number];
  category: string;
  amount: string;
  points: number;
  image: string;
};

function App() {
  const [selectedTrash, setSelectedTrash] = useState<TrashReport | null>(null);

  const trashReports: TrashReport[] = [
    {
      id: 1,
      position: [57.7089, 11.9746],
      category: "Plast",
      amount: "Medium",
      points: 50,
      image:
        "https://images.unsplash.com/photo-1604187351574-c75ca79f5807",
    },
    {
      id: 2,
      position: [57.715, 11.98],
      category: "Glas",
      amount: "Small",
      points: 30,
      image:
        "https://images.unsplash.com/photo-1618477461853-4b1f0f0f0f0f",
    },
  ];

  return (
    <div className="container">

      {/* MAP */}
      <div className="map">

        <MapContainer
          center={[57.7089, 11.9746]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {trashReports.map((item) => (
            <Marker
              key={item.id}
              position={item.position}
              eventHandlers={{
                click: () => {
                  console.log("clicked marker", item); // debug
                  setSelectedTrash(item);
                },
              }}
            />
          ))}
        </MapContainer>

        {/* MODAL (must be INSIDE map wrapper so it layers correctly) */}
        {selectedTrash && (
          <div className="modal-overlay">
            <div className="modal">

              <button
                className="close-btn"
                onClick={() => setSelectedTrash(null)}
              >
                ✕
              </button>

              <img
                src={selectedTrash.image}
                className="modal-img"
              />

              <h2>{selectedTrash.category}</h2>
              <p>Mängd: {selectedTrash.amount}</p>
              <p>Points: {selectedTrash.points}</p>

              <button className="report-btn">
                Rapportera som upplockat
              </button>

            </div>
          </div>
        )}

      </div>

      {/* TOP RIGHT */}
      <div className="top-right">🔔</div>

      {/* MAIN BUTTON */}
      <button className="main-btn">
        ANMÄL SKRÄPIGT OMRÅDE
      </button>

      {/* BOTTOM NAV */}
      <div className="bottom-nav">
        <div>🏠<p>Home</p></div>
        <div>🏆<p>Leaderboard</p></div>
        <div>👤<p>Konto</p></div>
      </div>

    </div>
  );
}

export default App;