import "./App.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";
import mapIcon from "./assets/map-svgrepo-com.svg";
import reportsIcon from "./assets/reports-svgrepo-com.svg";
import cameraIcon from "./assets/camera-svgrepo-com.svg";
import ranksIcon from "./assets/ranks-svgrepo-com.svg";
import profileIcon from "./assets/profile-2-svgrepo-com.svg";

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
    <div className="app-shell">
      <div className="app-content">
        <div className="map-page">
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
                      console.log("clicked marker", item); // debug (kollar click)
                      setSelectedTrash(item);
                    },
                  }}
                />
              ))}
            </MapContainer>

            {/* MODAL (must be inside map wrapper so it layers correctly) */}
            {selectedTrash && (
              <div className="modal-overlay" role="dialog" aria-modal="true">
                <div className="modal">
                  <button
                    className="close-btn"
                    onClick={() => setSelectedTrash(null)}
                    aria-label="Close"
                  >
                    ✕
                  </button>

                  <img
                    src={selectedTrash.image}
                    className="modal-img"
                    alt="Trash report"
                  />

                  <h2>{selectedTrash.category}</h2>
                  <p>Mängd: {selectedTrash.amount}</p>
                  <p>Poäng: {selectedTrash.points}</p>

                  <button className="btn btn-primary" type="button">
                    Rapportera som upplockat
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="top-right">
            <button className="icon-btn" type="button" aria-label="Notifications">
              🔔
            </button>
          </div>
        </div>
      </div>

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          className="nav-item nav-active"
          type="button"
          onClick={() => {
            setSelectedTrash(null);
          }}
        >
          <img className="nav-icon" src={mapIcon} alt="" aria-hidden="true" />
          <span>Map</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => {}}
        >
          <img className="nav-icon" src={reportsIcon} alt="" aria-hidden="true" />
          <span>Reports</span>
        </button>

        <button
          className="nav-camera"
          type="button"
          onClick={() => {}}
          aria-label="Camera"
        >
          <img className="nav-icon nav-icon-camera" src={cameraIcon} alt="" aria-hidden="true" />
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => {}}
        >
          <img className="nav-icon" src={ranksIcon} alt="" aria-hidden="true" />
          <span>Ranks</span>
        </button>

        <button
          className="nav-item"
          type="button"
          onClick={() => {}}
        >
          <img className="nav-icon" src={profileIcon} alt="" aria-hidden="true" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default App;