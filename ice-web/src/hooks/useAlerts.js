import { useState } from 'react';

// Example alert data structure with a single example alert
const INITIAL_ALERTS = [
  {
    id: 1,
    latitude: 37.78,
    longitude: -122.41,
    radius: 0.5, // radius in miles
    title: "Ice Warning #1",
    description: "Thin ice area - exercise caution",
    createdAt: new Date().toISOString()
  }
];

export function useAlerts() {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  const addAlert = (alert) => {
    const newAlert = {
      ...alert,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (alertId) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const updateAlert = (alertId, updates) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, ...updates } : alert
    ));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return {
    alerts,
    addAlert,
    removeAlert,
    updateAlert,
    clearAlerts
  };
} 