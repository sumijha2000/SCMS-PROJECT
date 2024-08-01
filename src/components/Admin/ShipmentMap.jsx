import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/mapStyles.css'; // Import your custom CSS
import axios from 'axios';

const ShipmentMap = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch shipment locations
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5164/get-shipment-locations'); // Update with your API
        setLocations(response.data); // Assuming response.data contains an array of locations
      } catch (error) {
        console.error('Error fetching shipment locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]}>
            <Popup>
              <strong>Shipment ID:</strong> {location.shipmentId}<br />
              <strong>Status:</strong> {location.status}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ShipmentMap;
