/*
 * Name: Chat Interfaces
 * Description: This file contains the interfaces for the chat component.
 * Author: Adam Naoui-Busson
 */

export interface Message {
  relatedChatId: string;
  message: string;
  date: string;
  role: Role;
  status: MessageStatus;
}

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
}

export enum MessageStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  READ = 'READ',
}
