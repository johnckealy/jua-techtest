import { Map, TileLayer, FeatureGroup, Circle, useMap } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw"
import { useEffect, useRef, useState } from 'react';


const DrawTool = ({ selectedFeature, updateGeoJSON, ForceReRender }) => {
  const map = useMap()
  const ref = useRef(null);
  const [selectedLayerID , setSelectedLayerID] = useState(null)


  useEffect(() => {

    const myStyle = {
      "color": "#ff7800",
      "weight": 5,
    };

    map.eachLayer(layer => {
      if (layer == selectedLayerID) {
        map.removeLayer(layer)
      }
    })

    L.geoJSON(selectedFeature, { style: myStyle }).eachLayer((layer) => {
      ref.current?.addLayer(layer);
      setSelectedLayerID(layer)
    });
  }, [selectedFeature]);



  const handleChange = (e) => {
    const geo = ref.current?.toGeoJSON();
    updateGeoJSON(geo)
  };


  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        draw={{
          rectangle: false,
          circle: true,
          polyline: true,
          polygon: true,
          marker: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}

export default DrawTool;
