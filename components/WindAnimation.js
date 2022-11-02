import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { data } from './data'
import { useEffect } from 'react';
import streamlines from './streamlines'


const options = {
  paths: 800,
  color: "white",
  width: 1.5,
  fade: 0.97,
  duration: 10,
  maxAge: 10,
  velocityScale: 0.01,
  opacity: 1,
  xMin: 6.153,
  xMax: 6.930,
  yMin: 46.206,
  yMax: 46.519,
}

function Winds() {

  const map = useMap()

  useEffect(() => {
    streamlines(L)
    L.streamlines(data, options).addTo(map);
  }, [map]);

  return null
}



const Map = () => {



  return (
    <MapContainer center={[46.3054, 6.2241]} zoom={10} style={{ height: "700px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Winds />
    </MapContainer>
  )
}

export default Map
