import { useRef, useCallback, useMemo } from 'react';
import Map, { GeolocateControl, Source, Layer, Marker } from 'react-map-gl';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useAlerts } from '../hooks/useAlerts';
import MapMarker from './MapMarker';
import ReportsPanel from './ReportsPanel';
import { useMantineColorScheme, ActionIcon, Tooltip } from '@mantine/core';
import { IconCurrentLocation, IconAlertCircle } from '@tabler/icons-react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = "pk.eyJ1IjoidmljdG9yeWZvcnBoaWwiLCJhIjoiY201amFjYTBnMTU4dDJsb2cyMjR1bm16dCJ9.9Zrl9WtrLBK6tXgDJNtUFg";
const MAPBOX_STYLE = "mapbox://styles/victoryforphil/cm6kba0x000ci01re6n43e5u5";
const MAPBOX_DARK_STYLE = "mapbox://styles/victoryforphil/cm6kbliw300cl01reb5t7ff84";

// Convert miles to meters for the circle radius
const milesToMeters = (miles) => miles * 1609.34;

function IceMap() {
  const { markers, removeMarker } = useMapMarkers();
  const { alerts, addAlert } = useAlerts();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const mapRef = useRef();
  const geolocateRef = useRef();

  // Create GeoJSON for alert circles
  const alertCircles = useMemo(() => ({
    type: 'FeatureCollection',
    features: alerts.map(alert => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [alert.longitude, alert.latitude]
      },
      properties: {
        id: alert.id,
        radius: milesToMeters(alert.radius)
      }
    }))
  }), [alerts]);

  const circleLayer = {
    id: 'alert-circles',
    type: 'circle',
    paint: {
      'circle-radius': [
        'interpolate',
        ['exponential', 2],
        ['zoom'],
        0, ['/', ['get', 'radius'], 100000],
        20, ['*', ['get', 'radius'], 10]
      ],
      'circle-color': isDark ? '#FF0000' : '#FF0000',
      'circle-opacity': isDark ? 0.5 : 0.5,
      'circle-stroke-width': 2,
      'circle-stroke-color': isDark ? '#FF0000' : '#FF0000',
      'circle-stroke-opacity': isDark ? 0.5 : 0.6,
      'circle-pitch-alignment': 'map',
      'circle-pitch-scale': 'map'
    }
  };

  const handleMapClick = useCallback((event) => {
    const { lng, lat } = event.lngLat;
    
    // Add a new alert at the clicked location
    addAlert({
      latitude: lat,
      longitude: lng,
      radius: 0.25, // Default radius of 0.25 miles
      title: "New Ice Alert",
      description: "Click to edit alert details"
    });
  }, [addAlert]);

  const handleReportClick = useCallback((report) => {
    if (!mapRef.current) return;

    // Get the map's current bounds
    const bounds = mapRef.current.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    
    // Calculate the vertical offset to position the marker in the top quarter
    const latOffset = (ne.lat - sw.lat) * -0.25;
    
    mapRef.current.flyTo({
      center: [report.longitude, report.latitude + latOffset],
      zoom: 15,
      duration: 2000,
    });
  }, []);

  const handleLocateUser = useCallback(() => {
    geolocateRef.current?.trigger();
  }, []);

  return (
    <>
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: '100%', height: 'calc(100vh - 60px)' }}
        mapStyle={isDark ? MAPBOX_DARK_STYLE : MAPBOX_STYLE}
        onClick={handleMapClick}
      >
        <Source type="geojson" data={alertCircles}>
          <Layer {...circleLayer} />
        </Source>

        {/* Add markers for alert centers */}
        {alerts.map(alert => (
          <Marker
            key={alert.id}
            longitude={alert.longitude}
            latitude={alert.latitude}
          >
            <IconAlertCircle size={24} color={isDark ? '#FFFFFF' : '#FF0000'} />
          </Marker>
        ))}

        <GeolocateControl
          ref={geolocateRef}
          position="bottom-right"
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          showUserHeading={true}
          showAccuracyCircle={true}
          style={{ display: 'none' }}
        />
        
        {markers.map(marker => (
          <MapMarker
            key={marker.id}
            marker={marker}
            onRemove={removeMarker}
          />
        ))}
      </Map>

      <Tooltip label="Find my location">
        <ActionIcon
          variant="filled"
          size="lg"
          radius="md"
          color="blue"
          onClick={handleLocateUser}
          style={{
            position: 'absolute',
            top: '100px',
            right: '10px',
            zIndex: 1,
          }}
        >
          <IconCurrentLocation style={{ width: '20px', height: '20px' }} />
        </ActionIcon>
      </Tooltip>

      <ReportsPanel
        reports={markers}
        onReportClick={handleReportClick}
      />
    </>
  );
}

export default IceMap; 