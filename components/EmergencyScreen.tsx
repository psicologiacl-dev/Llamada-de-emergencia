
import React, { useState } from 'react';
import { Settings } from '../types';
import { PhoneIcon, MessageIcon, PoliceIcon, RepeatIcon, CancelIcon } from './icons';

interface EmergencyScreenProps {
  settings: Settings;
  onCancel: () => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({ settings, onCancel }) => {
  const [contactIndex, setContactIndex] = useState(0);
  const [sequenceFailed, setSequenceFailed] = useState(false);

  const handleNextContact = () => {
    if (contactIndex < settings.contacts.length - 1) {
      setContactIndex(contactIndex + 1);
    } else {
      setSequenceFailed(true);
    }
  };

  const handleRepeat = () => {
    setContactIndex(0);
    setSequenceFailed(false);
  };

  const currentContact = settings.contacts[contactIndex];
  const smsBody = encodeURIComponent(settings.smsMessage);
  const policeNumber = '911'; // A universal emergency number

  if (sequenceFailed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Ningún contacto respondió</h2>
        <p className="text-2xl mb-12">¿Qué desea hacer ahora?</p>
        <div className="w-full max-w-md space-y-6">
          <button onClick={handleRepeat} className="w-full flex flex-col items-center justify-center gap-3 p-6 bg-blue-600 hover:bg-blue-700 rounded-xl text-3xl font-bold">
            <RepeatIcon className="w-12 h-12" />
            <span>Repetir Llamadas</span>
          </button>
          <a href={`tel:${policeNumber}`} className="w-full inline-flex flex-col items-center justify-center gap-3 p-6 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-3xl font-bold text-black">
            <PoliceIcon className="w-12 h-12" />
            <span>Llamar a la Policía</span>
          </a>
          <button onClick={onCancel} className="w-full flex flex-col items-center justify-center gap-3 p-6 bg-gray-600 hover:bg-gray-700 rounded-xl text-3xl font-bold">
            <CancelIcon className="w-12 h-12" />
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 bg-red-800 text-white">
      <div className="text-center flex-grow flex flex-col justify-center">
        <p className="text-3xl mb-2">Llamando a contacto de emergencia</p>
        <h2 className="text-6xl font-bold mb-8">{`(${contactIndex + 1}/${settings.contacts.length})`}</h2>
        <p className="text-5xl font-mono mb-12 break-all">{currentContact.number}</p>
        
        <div className="grid grid-cols-1 gap-6 max-w-lg mx-auto w-full">
          <a
            href={`tel:${currentContact.number}`}
            className="flex flex-col items-center justify-center text-center gap-4 bg-green-600 hover:bg-green-700 text-white font-bold p-8 rounded-2xl text-4xl"
          >
            <PhoneIcon className="w-16 h-16" />
            Llamar Ahora
          </a>
          {settings.smsEnabled && (
             <a
              href={`sms:${currentContact.number}?body=${smsBody}`}
              className="flex flex-col items-center justify-center text-center gap-4 bg-sky-600 hover:bg-sky-700 text-white font-bold p-8 rounded-2xl text-4xl"
            >
              <MessageIcon className="w-16 h-16" />
              Enviar SMS
            </a>
          )}
        </div>
        
        <div className="mt-12 max-w-lg mx-auto w-full">
            <p className="text-2xl mb-4">Si no hay respuesta, intente con el siguiente.</p>
            <button onClick={handleNextContact} className="w-full p-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-3xl font-bold">
             {contactIndex < settings.contacts.length - 1 ? 'Siguiente Contacto' : 'Nadie Respondió'}
            </button>
        </div>
      </div>
      
      <footer className="sticky bottom-4">
        <button onClick={onCancel} className="w-full p-5 bg-gray-700 hover:bg-gray-800 rounded-lg text-3xl font-bold shadow-lg">
          Cancelar Emergencia
        </button>
      </footer>
    </div>
  );
};
