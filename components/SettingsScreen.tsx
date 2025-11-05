
import React, { useState } from 'react';
import { Settings, Contact } from '../types';
import { BackIcon, PlusIcon, TrashIcon } from './icons';

interface SettingsScreenProps {
  initialSettings: Settings;
  onSave: (newSettings: Settings) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ initialSettings, onSave, onBack }) => {
  const [contacts, setContacts] = useState<Contact[]>(initialSettings.contacts);
  const [smsEnabled, setSmsEnabled] = useState(initialSettings.smsEnabled);
  const [smsMessage, setSmsMessage] = useState(initialSettings.smsMessage);

  const handleContactChange = (id: string, number: string) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, number } : c));
  };

  const addContact = () => {
    if (contacts.length < 5) {
      setContacts([...contacts, { id: Date.now().toString(), number: '' }]);
    }
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleSave = () => {
    onSave({
      contacts: contacts.filter(c => c.number.trim() !== ''),
      smsEnabled,
      smsMessage,
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-4 sm:p-6 bg-gray-800 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="p-3 rounded-full hover:bg-gray-700" aria-label="Volver">
          <BackIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold ml-4">Ajustes</h1>
      </header>
      
      <div className="flex-grow space-y-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Contactos de Emergencia (Máx 5)</h2>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={contact.id} className="flex items-center gap-2 bg-gray-700 p-3 rounded-lg">
                <span className="text-2xl font-mono text-gray-400">{index + 1}.</span>
                <input
                  type="tel"
                  placeholder="Número de teléfono"
                  value={contact.number}
                  onChange={(e) => handleContactChange(contact.id, e.target.value)}
                  className="flex-grow bg-gray-800 p-4 text-2xl rounded-md border-2 border-gray-600 focus:border-blue-500 focus:outline-none"
                />
                <button onClick={() => removeContact(contact.id)} className="p-3 bg-red-600 hover:bg-red-700 rounded-full" aria-label="Eliminar contacto">
                  <TrashIcon className="w-7 h-7" />
                </button>
              </div>
            ))}
            {contacts.length < 5 && (
              <button onClick={addContact} className="w-full flex items-center justify-center gap-2 mt-4 p-4 bg-green-600 hover:bg-green-700 rounded-lg text-2xl">
                <PlusIcon className="w-8 h-8" />
                Añadir Contacto
              </button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4">Mensaje de Texto (SMS)</h2>
          <div className="bg-gray-700 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sms-toggle" className="text-2xl cursor-pointer">Enviar SMS de alerta</label>
              <button
                id="sms-toggle"
                onClick={() => setSmsEnabled(!smsEnabled)}
                role="switch"
                aria-checked={smsEnabled}
                className={`relative inline-flex items-center h-10 rounded-full w-20 transition-colors ${smsEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                <span className={`inline-block w-8 h-8 transform bg-white rounded-full transition-transform ${smsEnabled ? 'translate-x-11' : 'translate-x-1'}`} />
              </button>
            </div>
            {smsEnabled && (
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                rows={4}
                className="w-full bg-gray-800 p-4 text-xl rounded-md border-2 border-gray-600 focus:border-blue-500 focus:outline-none"
                aria-label="Mensaje de emergencia"
              />
            )}
          </div>
        </div>
      </div>

      <footer className="mt-8 sticky bottom-4">
        <button onClick={handleSave} className="w-full p-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-3xl font-bold shadow-lg">
          Guardar Cambios
        </button>
      </footer>
    </div>
  );
};
