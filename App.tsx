
import React, { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import { Settings } from './types';
import { HomeScreen } from './components/HomeScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { EmergencyScreen } from './components/EmergencyScreen';

type AppState = 'home' | 'settings' | 'emergency';

const DEFAULT_SETTINGS: Settings = {
  contacts: [],
  smsEnabled: true,
  smsMessage: 'Este es un mensaje de emergencia. Estoy intentando llamar.',
};

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [settings, setSettings] = useLocalStorage<Settings>('emergency-settings', DEFAULT_SETTINGS);

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setAppState('home');
  };

  const renderContent = () => {
    switch (appState) {
      case 'settings':
        return (
          <SettingsScreen
            initialSettings={settings}
            onSave={handleSaveSettings}
            onBack={() => setAppState('home')}
          />
        );
      case 'emergency':
        return (
          <EmergencyScreen
            settings={settings}
            onCancel={() => setAppState('home')}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            onStartEmergency={() => setAppState('emergency')}
            onGoToSettings={() => setAppState('settings')}
            hasContacts={settings.contacts.length > 0}
          />
        );
    }
  };

  return (
    <main className="min-h-screen">
      {renderContent()}
    </main>
  );
}

export default App;
