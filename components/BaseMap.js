import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'node_modules/leaflet/dist/leaflet.css'
import 'node_modules/leaflet-draw/dist/leaflet.draw.css'
import { useEffect } from 'react';
import geojsonFeature from './sample.geojson'
import DrawTool from './DrawTool'
import { useState } from 'react';


function AllFeatures({ geojson, setSelectedFeature }) {

  const map = useMap()

  const ReRenderFeatures = () => {
    map.eachLayer(layer => {
      if (layer.feature) {
        map.removeLayer(layer)
      }
    })
    const onEachFeature = (feature, layer) => {
      layer.on('click', (e) => {
        setSelectedFeature(e.target.feature)
      })
    }
    L.geoJSON(geojson, { onEachFeature: onEachFeature }).addTo(map);
  }

  useEffect(() => {
    ReRenderFeatures();
  }, [map]);

  ReRenderFeatures();

}




const BaseMap = () => {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [geojson, setGeojson] = useState(geojsonFeature)

  let modifedGeojson = JSON.parse(JSON.stringify(geojson));

  const UpdateGeoJSON = (newFeatureGeo) => {
    modifedGeojson.features.forEach((feature, index) => {
      if (feature.id === newFeatureGeo.features[newFeatureGeo.features.length-1].id) {
        modifedGeojson.features[index] = newFeatureGeo.features[newFeatureGeo.features.length-1]
      }
    })

    setGeojson(modifedGeojson)
  }

  return (
    <>
      <MapContainer center={[-28.89, 30.4]} zoom={12} style={{ height: "700px", width: "100%" }}>
        <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawTool selectedFeature={selectedFeature} updateGeoJSON={UpdateGeoJSON} />
        <AllFeatures geojson={geojson} setSelectedFeature={setSelectedFeature} />
      </MapContainer>
    </>
  )
}

export default BaseMap
