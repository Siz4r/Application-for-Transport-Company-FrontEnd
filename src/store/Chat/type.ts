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
  conversationName: string;
  messages: Message[];
  conversationId: string;
  users: Contact[];
}

export interface Conversation {
  conversationName: string;
  messages: Message[];
  conversationId: string;
  users: Contact[];
}

export interface Message {
  senderId: string;
  text: string;
}
