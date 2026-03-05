"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Layers, Navigation, Maximize2 } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN || "";

interface MapboxMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  zoom?: number;
  enable3D?: boolean;
  defaultView?: "2d" | "3d";
  pitch3D?: number;
  bearing3D?: number;
  markerColor?: string;
  className?: string;
  showDirections?: boolean;
}

export default function MapboxMap({
  latitude,
  longitude,
  title = "Our Office",
  address,
  zoom = 15,
  enable3D = true,
  defaultView = "3d",
  pitch3D = 60,
  bearing3D = -20,
  markerColor = "#2563eb",
  className = "w-full h-[500px] lg:h-[600px]",
  showDirections = true,
}: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  const [is3D, setIs3D] = useState(defaultView === "3d");

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    if (!mapboxgl.accessToken) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [longitude, latitude],
      zoom,
      pitch: is3D ? pitch3D : 0,
      bearing: is3D ? bearing3D : 0,
      antialias: true,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-right",
    );

    mapRef.current = map;

    const el = document.createElement("div");
    el.className = "custom-marker";
    el.innerHTML = `
      <div style="background: white; border-radius: 12px; padding: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 2px solid ${markerColor};">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="${markerColor}" stroke-width="2.5" fill="none">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3" fill="${markerColor}20"></circle>
        </svg>
      </div>
    `;

    const popup = new mapboxgl.Popup({
      offset: 35,
      closeButton: false,
      maxWidth: "280px",
    }).setHTML(`
      <div style="padding: 12px; font-family: inherit;">
        <h3 style="font-weight: 700; font-size: 14px; margin: 0; color: #111827;">${title}</h3>
        ${address ? `<p style="font-size: 12px; color: #6b7280; margin: 4px 0 0 0;">${address}</p>` : ""}
      </div>
    `);

    markerRef.current = new mapboxgl.Marker(el)
      .setLngLat([longitude, latitude])
      .setPopup(popup)
      .addTo(map);

    map.on("load", () => {
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 14,
        paint: {
          "fill-extrusion-color": [
            "interpolate",
            ["linear"],
            ["get", "height"],
            0,
            "#dbeafe",
            50,
            "#bfdbfe",
            100,
            "#93c5fd",
          ],
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.8,
        },
      });
    });

    return () => map.remove();
  }, [latitude, longitude, is3D]);

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      "_blank",
    );
  };

  return (
    <div className="relative rounded-[40px] overflow-hidden shadow-xl border border-gray-100 bg-white">
      <div ref={mapContainerRef} className={className} />

      <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
        {enable3D && (
          <button
            onClick={() => setIs3D((prev) => !prev)}
            className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-bold border border-gray-100 hover:bg-gray-50 transition-all duration-300"
          >
            <Layers
              size={18}
              className={is3D ? "text-blue-600" : "text-gray-400"}
            />
            <span>{is3D ? "2D View" : "3D View"}</span>
          </button>
        )}

        {showDirections && (
          <button
            onClick={handleGetDirections}
            className="bg-[#2563eb] text-white px-5 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-bold hover:bg-[#1d4ed8] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <Navigation size={18} />
            <span>Get Directions</span>
          </button>
        )}
      </div>

      <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-10">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-3xl shadow-xl flex items-center gap-4 max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Maximize2 size={20} />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm leading-tight">
              {title}
            </p>
            <p className="text-gray-500 text-[11px] font-medium mt-0.5 uppercase tracking-tight">
              {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
