
import React from 'react';
import { SettingsIcon } from './icons';

interface HomeScreenProps {
  onStartEmergency: () => void;
  onGoToSettings: () => void;
  hasContacts: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartEmergency, onGoToSettings, hasContacts }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <div className="w-full max-w-md mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Ayuda Rápida</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12">Presione el botón rojo en caso de emergencia</p>
        
        <button
          onClick={onStartEmergency}
          disabled={!hasContacts}
          className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 bg-red-600 rounded-full text-white shadow-2xl transition-transform duration-200 ease-in-out hover:scale-105 disabled:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Botón de emergencia SOS"
        >
          <span className="text-6xl md:text-8xl font-bold tracking-wider">SOS</span>
          <div className="absolute inset-0 rounded-full border-8 border-red-500 animate-pulse"></div>
        </button>

        {!hasContacts && (
          <div className="mt-8 p-4 bg-yellow-900/50 text-yellow-200 border border-yellow-700 rounded-lg">
            <p className="text-lg font-bold">¡Atención!</p>
            <p>Debe configurar al menos un contacto de emergencia en los ajustes.</p>
          </div>
        )}

        <button
          onClick={onGoToSettings}
          className="mt-16 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-2xl transition-colors"
        >
          <SettingsIcon className="w-8 h-8" />
          <span>Ajustes</span>
        </button>
      </div>
    </div>
  );
};
