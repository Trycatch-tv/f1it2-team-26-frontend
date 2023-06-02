import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map as OlMap, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import {Icon, Style} from 'ol/style.js';
import icon from './icons/pin.png'

const Map = ({latitude, longitude}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  function createStyle(src, img) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 0.96],
        crossOrigin: 'anonymous',
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined,
      }),
    });
  }

  useEffect(() => {
    const mapObject = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 6
      })
    });

    setMap(mapObject);

    return () => {
      mapObject.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (map) {
      const vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });

      const coordinates = fromLonLat([longitude, latitude]);
      const point = new Feature(new Point(coordinates));
      point.setStyle(createStyle(icon, undefined));
      vectorSource.addFeature(point);

      const extent = point.getGeometry().getExtent();
      map.getView().fit(extent, { padding: [100, 100, 100, 100], maxZoom: 18 });

      map.addLayer(vectorLayer);
    }
  }, [latitude, longitude, map]);

  return <div ref={mapRef} className="map-container" style={{ width: '400px', height: '300px' }} />;
};

export default Map;
