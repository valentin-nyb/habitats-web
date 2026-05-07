'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from 'next-themes';
import { Property } from '@/types';

interface MapViewProps {
  properties: Property[];
  onPropertyClick: (property: Property) => void;
}

export function MapView({ properties, onPropertyClick }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDark
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 1.5,
      projection: { name: 'globe' } as mapboxgl.Projection,
      attributionControl: false,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('style.load', () => {
      if (isDark) {
        map.setFog({
          range: [-1, 2],
          'horizon-blend': 0.1,
          color: '#000000',
          'high-color': '#222222',
          'space-color': '#000000',
          'star-intensity': 0.5,
        } as mapboxgl.Fog);
      } else {
        map.setFog({} as mapboxgl.Fog);
      }
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map style on theme change
  useEffect(() => {
    if (!mapRef.current) return;
    const newStyle = isDark
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/light-v11';
    mapRef.current.setStyle(newStyle);
  }, [isDark]);

  // Add/update markers when properties change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    properties.forEach((prop) => {
      if (!prop.lat || !prop.lng) return;

      // Price tag marker element
      const el = document.createElement('div');
      el.className = 'price-marker';
      el.innerText = prop.price_text;
      el.style.cssText = `
        background-color: ${isDark ? '#000' : '#fff'};
        color: ${isDark ? '#fff' : '#000'};
        padding: 6px 12px;
        border-radius: 99px;
        font-family: Inter, sans-serif;
        font-weight: 700;
        font-size: 13px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        border: 1px solid ${isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'};
        cursor: pointer;
        white-space: nowrap;
        transition: transform 0.2s ease, background-color 0.2s ease;
      `;
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.15)';
        el.style.backgroundColor = '#bef264';
        el.style.color = '#000';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
        el.style.backgroundColor = isDark ? '#000' : '#fff';
        el.style.color = isDark ? '#fff' : '#000';
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        map.flyTo({ center: [prop.lng, prop.lat], zoom: 13, speed: 1.2 });
      });

      // Popup
      const popupHTML = `
        <div style="width:180px; cursor:pointer; border-radius:12px; overflow:hidden; font-family:Inter,sans-serif;">
          <div style="width:100%; height:90px; overflow:hidden; position:relative;">
            <img src="${prop.image_url}" style="width:100%; height:100%; object-fit:cover;" />
          </div>
          <div style="padding:10px 12px; background:${isDark ? '#111' : '#fff'};">
            <p style="font-weight:700; font-size:13px; color:${isDark ? '#fff' : '#000'}; margin:0 0 4px;">${prop.title}</p>
            <p style="font-weight:700; font-size:12px; color:#84cc16; margin:0;">${prop.price_text}</p>
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 20,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(popupHTML);

      // Click popup to open detail
      popup.on('open', () => {
        const popupEl = popup.getElement();
        if (popupEl) {
          popupEl.style.cursor = 'pointer';
          popupEl.addEventListener('click', () => onPropertyClick(prop));
        }
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([prop.lng, prop.lat])
        .setPopup(popup)
        .addTo(map);

      markersRef.current.push(marker);
    });
  }, [properties, isDark, onPropertyClick]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full"
      style={{ minHeight: '100%' }}
    />
  );
}
