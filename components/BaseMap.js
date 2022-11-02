import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react';
import geojsonFeature from './sample.geojson'

function Winds() {



  const map = useMap()

  useEffect(() => {
    L.geoJSON(geojsonFeature).addTo(map);
  }, [map]);

  return null
}



const BaseMap = () => {

  return (
    <MapContainer center={[-28.89, 30.4]} zoom={12} style={{ height: "700px", width: "100%" }}>
      <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Winds />
    </MapContainer>
  )
}

export default BaseMap
