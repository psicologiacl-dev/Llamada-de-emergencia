
export interface Contact {
  id: string;
  number: string;
}

export interface Settings {
  contacts: Contact[];
  smsEnabled: boolean;
  smsMessage: string;
}
