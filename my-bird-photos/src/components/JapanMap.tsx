import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl = "/geojson/prefectures.geojson";

interface IJapanMapProps {
  setTooltipContent: (content: string) => void;
  onSelectPrefecture: (prefecture: string | null) => void;
}

const JapanMap: React.FC<IJapanMapProps> = ({ setTooltipContent, onSelectPrefecture }) => {
  const [position, setPosition] = useState({ coordinates: [138, 38] as [number, number], zoom: 4 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position: { coordinates: [number, number]; zoom: number }) {
    setPosition(position);
  }

  return (
    <>
      <ComposableMap
        data-tip=""
        projection="geoMercator"
        projectionConfig={{
          center: [138, 38],
          scale: 1000
        }}
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setTooltipContent(geo.properties.name_ja);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  onClick={() => {
                    onSelectPrefecture(geo.properties.name_ja);
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      stroke: "#FFFFFF",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      stroke: "#FFFFFF",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      stroke: "#FFFFFF",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#eee"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#eee"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default memo(JapanMap);
