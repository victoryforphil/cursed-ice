import { Marker, Popup } from 'react-map-gl';
import { useState } from 'react';
import { Paper, Text, Button, Stack, useMantineColorScheme } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';

function MapMarker({ marker, onRemove }) {
  const [showPopup, setShowPopup] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        anchor="bottom"
        onClick={(e) => {
          e.originalEvent.stopPropagation();
          setShowPopup(true);
        }}
      >
        <IconMapPin
          size={32}
          color={isDark ? "#ff6b6b" : "#FF0000"}
          style={{ cursor: 'pointer' }}
        />
      </Marker>

      {showPopup && (
        <Popup
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="top"
          onClose={() => setShowPopup(false)}
          closeOnClick={false}
        >
          <Paper p="md" shadow="sm">
            <Stack>
              <Text fw={500}>{marker.title}</Text>
              <Text size="sm">{marker.description}</Text>
              {onRemove && (
                <Button
                  variant="light"
                  color="red"
                  size="xs"
                  onClick={() => {
                    onRemove(marker.id);
                    setShowPopup(false);
                  }}
                >
                  Remove Marker
                </Button>
              )}
            </Stack>
          </Paper>
        </Popup>
      )}
    </>
  );
}

export default MapMarker; 