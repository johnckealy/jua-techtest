import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import  L from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { data, options, contourData } from './data'
import { useEffect } from 'react';
import { contourf, getColor, colors, onEachContour} from './contour'



function MyComponent() {

  const map = useMap()

  useEffect(() => {

    contourf(L)

    L.contour(contourData, {
      thresholds: 50,
      style: (feature) => {
        return {
          color: getColor(feature.geometry.value, 10.5, 13.6, colors),
          opacity: 0,
          fillOpacity: 1,
        };
      },
      onEachFeature: onEachContour(),
    }).addTo(map);


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
      <MyComponent/>
    </MapContainer>
  )
}

export default Map
