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


const generateNewFeatureMetadata = (feature) => {
  // This function allow us to calcualate the bbox values from the coordinates
  function flipArray(arr){
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
  }
  const flippedArray = flipArray(feature.geometry.coordinates[0])

  // Nothing fancy here - we just follow the convention of the test data
  const metadata = {
    bbox: [
      Math.min(...flippedArray[0]),
      Math.max(...flippedArray[1]),
      Math.max(...flippedArray[0]),
      Math.min(...flippedArray[1]),
    ],
    id: `sample_cover.tif:${Math.random().toString().slice(3,9)}`,
    properties: {
      filename: "sample_cover.tif",
      val: 3,
    }
  }
  return { ...feature, ...metadata}
}


const BaseMap = () => {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [geojson, setGeojson] = useState(geojsonFeature)

  let modifedGeojson = JSON.parse(JSON.stringify(geojson));

  const UpdateGeoJSON = (newFeatureGeo) => {

    const newFeature = newFeatureGeo.features[newFeatureGeo.features.length - 1]


    if (!newFeature.id) {
      newFeature = generateNewFeatureMetadata(newFeature)
      console.log(newFeature)
      modifedGeojson.features.push(newFeature)
    }

    modifedGeojson.features.forEach((feature, index) => {
      if (feature.id === newFeature.id) {
        modifedGeojson.features[index] = newFeature
      }
    })

    setGeojson(modifedGeojson)
  }

  return (
    <>
      <MapContainer center={[-28.89, 30.4]} zoom={12} style={{ height: "700px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DrawTool selectedFeature={selectedFeature} updateGeoJSON={UpdateGeoJSON} />
        <AllFeatures geojson={geojson} setSelectedFeature={setSelectedFeature} />
      </MapContainer>
    </>
  )
}

export default BaseMap
