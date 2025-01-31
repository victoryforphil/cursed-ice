import { useState } from 'react';

// Example marker data structure
const PLACEHOLDER_MARKERS = [
  {
    id: 1,
    latitude: 37.8,
    longitude: -122.4,
    title: "Ice Report #1",
    description: "Dangerous ice formation reported"
  },
  {
    id: 2,
    latitude: 37.79,
    longitude: -122.41,
    title: "Ice Report #2",
    description: "Thin ice area"
  },
  {
    id: 3,
    latitude: 37.81,
    longitude: -122.39,
    title: "Ice Report #3",
    description: "Safe passage confirmed"
  }
];

export function useMapMarkers() {
  const [markers, setMarkers] = useState(PLACEHOLDER_MARKERS);

  const addMarker = (marker) => {
    setMarkers(prev => [...prev, { ...marker, id: Date.now() }]);
  };

  const removeMarker = (markerId) => {
    setMarkers(prev => prev.filter(marker => marker.id !== markerId));
  };

  const updateMarker = (markerId, updates) => {
    setMarkers(prev => prev.map(marker => 
      marker.id === markerId ? { ...marker, ...updates } : marker
    ));
  };

  return {
    markers,
    addMarker,
    removeMarker,
    updateMarker
  };
} 