import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet'
import L from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'node_modules/leaflet/dist/leaflet.css'
import 'node_modules/leaflet-draw/dist/leaflet.draw.css'
import { useEffect } from 'react';
import DrawTool from './DrawTool'
import { useState } from 'react';
import { FaDownload } from 'react-icons/fa'


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
  function flipArray(arr) {
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
    id: `sample_cover.tif:${Math.random().toString().slice(3, 9)}`,
    properties: {
      filename: "sample_cover.tif",
      val: 3,
    }
  }
  return { ...feature, ...metadata }
}



const BaseMap = ({ fileData }) => {
  const [selectedFeature, setSelectedFeature] = useState(null)
  const [geojson, setGeojson] = useState(fileData)

  const DownloadTxtFile = () => {
    const downloadObject = JSON.stringify(geojson)
    const element = document.createElement("a");
    const file = new Blob([downloadObject], { type: 'text/json' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
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
    <div>
      <button className='ml-auto py-2 px-6 ring-1 ring-gray-400 shadow-lg hover:bg-gray-100  gap-2 rounded-full  m-3 flex items-center' onClick={DownloadTxtFile}>
        <FaDownload /><span>Get GeoJSON</span>
      </button>
      <div className='border-2 border-black rounded '>

        <MapContainer center={[-28.89, 30.4]} zoom={12} style={{ height: "700px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DrawTool selectedFeature={selectedFeature} updateGeoJSON={UpdateGeoJSON} />
          <AllFeatures geojson={geojson} setSelectedFeature={setSelectedFeature} />
        </MapContainer>
      </div>
    </div>
  )
}

export default BaseMap
