export interface Contact {
  firstName: string;
  email: string;
  lastName: string;
  id: string;
}

export interface ContactDto {
  firstName: string;
  email: string;
  lastName: string;
  id: string;
}

export interface ConversationDTO {
  name: string;
  messages: Message[];
  id: string;
  users: Contact;
}

export interface Conversation {
  name: string;
  messages: Message[];
  id: string;
  users: Contact;
}

export interface Message {
  id: string;
  content: string;
}
