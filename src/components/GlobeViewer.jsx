import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";
import axios from "axios";

const getPolygonCenter = (geometry) => {
  if (!geometry) return { lat: 0, lng: 0 };

  const allCoords = [];

  const extractCoords = (coords) => {
    if (!Array.isArray(coords)) return;

    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      allCoords.push(coords);
      return;
    }

    coords.forEach(extractCoords);
  };

  extractCoords(geometry.coordinates);

  if (!allCoords.length) return { lat: 0, lng: 0 };

  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  allCoords.forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
};

const getCountryName = (polygon) => {
  return (
    polygon?.properties?.name ||
    polygon?.properties?.ADMIN ||
    polygon?.properties?.NAME ||
    "Nazione selezionata"
  );
};

const GlobeViewer = ({
  isSpinning,
  pin,
  selectedCountryName,
  onCountryClick,
}) => {
  const globeRef = useRef();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
        );

        setCountries(response.data.features || []);
      } catch (error) {
        console.error("Errore caricamento geojson:", error);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ altitude: 2.1 });

    const controls = globeRef.current.controls();

    controls.autoRotate = isSpinning;
    controls.autoRotateSpeed = 50;
    controls.enablePan = false;

    // blocca completamente la rotazione quando OFF
    if (!isSpinning) {
      controls.autoRotate = false;
    }
  }, [isSpinning]);

  const pointsData = useMemo(() => {
    if (!pin) return [];
    return [pin];
  }, [pin]);

  return (
    <div className="globe-wrapper">
      <Globe
        ref={globeRef}
        width={900}
        height={580}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={countries}
        polygonAltitude={(polygon) => {
          const countryName = getCountryName(polygon);
          return countryName === selectedCountryName ? 0.025 : 0.01;
        }}
        polygonCapColor={(polygon) => {
          const countryName = getCountryName(polygon);
          return countryName === selectedCountryName
            ? "rgba(37,86,245,0.75)"
            : "rgba(255,255,255,0.05)";
        }}
        polygonSideColor={(polygon) => {
          const countryName = getCountryName(polygon);
          return countryName === selectedCountryName
            ? "rgba(37,86,245,0.35)"
            : "rgba(255,255,255,0.03)";
        }}
        polygonStrokeColor={(polygon) => {
          const countryName = getCountryName(polygon);
          return countryName === selectedCountryName
            ? "rgba(20,40,120,0.95)"
            : "rgba(255,255,255,0.18)";
        }}
        onPolygonClick={(polygon) => {
          const countryName = getCountryName(polygon);
          const center = getPolygonCenter(polygon?.geometry);

          onCountryClick({
            countryName,
            lat: center.lat,
            lng: center.lng,
          });
        }}
        polygonsTransitionDuration={250}
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointRadius={0.6}
        pointAltitude={0.03}
        pointColor={() => "#ff4d4f"}
      />
    </div>
  );
};

export default GlobeViewer;
